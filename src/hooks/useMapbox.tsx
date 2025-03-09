import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from './use-toast';
import { useNavigate } from 'react-router-dom';
import { nearbyUsers, NearbyUser } from '@/data/nearbyUsers';
import ReactDOM from 'react-dom';
import UserMarker from '@/components/UserMarker';

const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1Ijoic3VubnkyNCIsImEiOiJjbTdtbDBzb2gwb2plMnBvY2lxbml0Z3pyIn0.OrQMpXUEaR_vN3MubP6JSw';

function getDestinationPoint(
  startLng: number, 
  startLat: number, 
  distanceMeters: number, 
  bearingDegrees: number
): [number, number] {
  const R = 6371000;
  const bearing = (bearingDegrees * Math.PI) / 180;
  const lat1 = (startLat * Math.PI) / 180;
  const lon1 = (startLng * Math.PI) / 180;
  const angularDistance = distanceMeters / R;
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(angularDistance) +
    Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(bearing)
  );
  const lon2 = lon1 + Math.atan2(
    Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(lat1),
    Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2)
  );
  const newLat = (lat2 * 180) / Math.PI;
  const newLng = (lon2 * 180) / Math.PI;
  return [newLng, newLat];
}

interface UseMapboxProps {
  customToken?: string;
}

export const useMapbox = ({ customToken }: UseMapboxProps = {}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const customMarkerElementRef = useRef<HTMLDivElement | null>(null);
  const userMarkersRef = useRef<{marker: mapboxgl.Marker, user: NearbyUser}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.longitude, position.coords.latitude]);
        },
        (error) => {
          console.error('Error getting user location:', error);
          setUserLocation([-74.0060, 40.7128]);
          toast({
            title: "Location access denied",
            description: "Using default location instead",
            variant: "default"
          });
        }
      );
    } else {
      setUserLocation([-74.0060, 40.7128]);
      toast({
        title: "Geolocation not supported",
        description: "Using default location instead",
        variant: "default"
      });
    }
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !userLocation) return;

    if (map.current) {
      try {
        map.current.remove();
      } catch (e) {
        console.error("Error removing map:", e);
      }
      map.current = null;
    }

    userMarkersRef.current.forEach(({ marker }) => {
      marker.remove();
    });
    userMarkersRef.current = [];

    try {
      mapboxgl.accessToken = customToken || DEFAULT_MAPBOX_TOKEN;
      
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation,
        zoom: 18,
        pitch: 45,
        bearing: 0,
        antialias: true,
        minZoom: 9,
        maxZoom: 20,
        dragRotate: true,
        dragPan: true
      });

      map.current = newMap;

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
          showCompass: true,
          showZoom: true
        }),
        'top-right'
      );

      const customMarkerElement = document.createElement('div');
      customMarkerElement.className = 'lumalee-marker';
      customMarkerElement.innerHTML = `
        <div class="lumalee-container">
          <div class="lumalee-body"></div>
          <div class="lumalee-eye left"></div>
          <div class="lumalee-eye right"></div>
          <div class="lumalee-sparkle s1"></div>
          <div class="lumalee-sparkle s2"></div>
          <div class="lumalee-sparkle s3"></div>
          <div class="lumalee-sparkle s4"></div>
        </div>
      `;

      customMarkerElementRef.current = customMarkerElement;

      markerRef.current = new mapboxgl.Marker({
        element: customMarkerElement,
        anchor: 'bottom'
      })
        .setLngLat(userLocation)
        .addTo(map.current);

      map.current.on('load', () => {
        setLoading(false);
        setError(null);
        
        if (map.current) {
          map.current.setPaintProperty('sky', 'sky-atmosphere-sun', [0, 0]);
          map.current.setPaintProperty('sky', 'sky-atmosphere-sun-intensity', 15);
          map.current.setPaintProperty('sky', 'sky-opacity', 0.9);
          map.current.setPaintProperty('sky', 'sky-type', 'atmosphere');
          map.current.setPaintProperty('sky', 'sky-atmosphere-color', '#33C3F0');
          
          map.current.setPaintProperty('water', 'fill-color', '#0FA0CE');
          
          map.current.setPaintProperty('land', 'background-color', '#f0f9fc');
          
          map.current.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
              'fill-extrusion-color': '#FEC6A1',
              'fill-extrusion-height': [
                'interpolate', ['linear'], ['zoom'],
                15, 0,
                15.05, ['*', ['get', 'height'], 0.5]
              ],
              'fill-extrusion-base': [
                'interpolate', ['linear'], ['zoom'],
                15, 0,
                15.05, ['*', ['get', 'min_height'], 0.5]
              ],
              'fill-extrusion-opacity': 0.6
            }
          });
          
          map.current.setPaintProperty('road-primary', 'line-color', '#a1dbeb');
          map.current.setPaintProperty('road-secondary', 'line-color', '#a1dbeb');
          map.current.setPaintProperty('road-tertiary', 'line-color', '#d6f1f8');
          
          map.current.setPaintProperty('landuse-park', 'fill-color', '#d6f1f8');
          map.current.setPaintProperty('landcover-tree', 'fill-color', '#5bbce0');
        }
        
        displayNearbyUsers(userLocation);
        
        if (navigator.geolocation) {
          const watchId = navigator.geolocation.watchPosition(
            (position) => {
              const newLocation: [number, number] = [
                position.coords.longitude,
                position.coords.latitude
              ];
              
              if (markerRef.current) {
                markerRef.current.setLngLat(newLocation);
              }
              
              if (map.current) {
                map.current.setCenter(newLocation);
              }
              
              setUserLocation(newLocation);
              
              updateNearbyUsers(newLocation);
            },
            (error) => {
              console.error('Error watching position:', error);
            },
            {
              enableHighAccuracy: true,
              maximumAge: 0,
              timeout: 5000
            }
          );
          
          return () => {
            navigator.geolocation.clearWatch(watchId);
          };
        }
      });

      map.current.on('zoom', () => {
        if (!map.current || !userLocation) return;
        
        map.current.setCenter(userLocation);
        
        const currentZoom = map.current.getZoom();
        
        let targetPitch;
        
        if (currentZoom < 15) {
          targetPitch = 45 + ((currentZoom - 10) * 3);
          targetPitch = Math.min(Math.max(targetPitch, 45), 60);
        } else if (currentZoom >= 15 && currentZoom < 18) {
          targetPitch = 60 + ((currentZoom - 15) * 5);
          targetPitch = Math.min(Math.max(targetPitch, 60), 75);
        } else {
          targetPitch = 80;
        }
        
        map.current.easeTo({
          center: userLocation,
          pitch: targetPitch,
          duration: 300,
          easing: (t) => t * (2 - t)
        });

        if (customMarkerElementRef.current) {
          const lumaleeContainer = customMarkerElementRef.current.querySelector('.lumalee-container');
          
          const zoomRange = map.current.getMaxZoom() - map.current.getMinZoom();
          const zoomFactor = (currentZoom - map.current.getMinZoom()) / zoomRange;
          
          const scaleFactor = 0.6 + (zoomFactor * 0.9);
          
          if (lumaleeContainer) {
            (lumaleeContainer as HTMLElement).style.transform = `scale(${scaleFactor})`;
          }
        }
      });

      map.current.on('wheel', (e) => {
        if (!map.current || !userLocation) return;
        
        e.preventDefault();
        
        const currentZoom = map.current.getZoom();
        const delta = e.originalEvent.deltaY * -0.01;
        const newZoom = currentZoom + delta;
        
        const clampedZoom = Math.min(Math.max(newZoom, map.current.getMinZoom()), map.current.getMaxZoom());
        
        map.current.easeTo({
          center: userLocation,
          zoom: clampedZoom,
          duration: 100
        });
      });

      map.current.on('dragstart', (e) => {
        if ('button' in e.originalEvent) {
          const mouseEvent = e.originalEvent as MouseEvent;
          if (mouseEvent.button === 2 || mouseEvent.buttons === 2) {
            const canvas = map.current?.getCanvas();
            if (canvas) {
              canvas.style.cursor = 'grabbing';
            }
          }
        }
      });

      map.current.on('contextmenu', (e) => {
        e.preventDefault();
      });

      map.current.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }));
    } catch (error) {
      console.error("Error initializing map:", error);
      setError("Failed to initialize map. Please check your Mapbox token.");
      setLoading(false);
      toast({
        title: "Map Error",
        description: "Failed to initialize map. Please check your Mapbox token.",
        variant: "destructive"
      });
    }

    return () => {
      if (map.current) {
        try {
          userMarkersRef.current.forEach(({ marker }) => {
            marker.remove();
          });
          userMarkersRef.current = [];
          
          map.current.remove();
        } catch (e) {
          console.error("Error during map cleanup:", e);
        }
        map.current = null;
      }
    };
  }, [userLocation, customToken]);

  const displayNearbyUsers = (currentLocation: [number, number]) => {
    if (!map.current) return;

    userMarkersRef.current.forEach(({ marker }) => {
      marker.remove();
    });
    userMarkersRef.current = [];

    nearbyUsers.forEach((user, index) => {
      const angle = (index * 90) + Math.random() * 45;
      const userPos = getDestinationPoint(
        currentLocation[0], 
        currentLocation[1], 
        user.distance, 
        angle
      );
      
      user.location = userPos;
      
      const markerElement = document.createElement('div');
      markerElement.className = 'marker-container';

      createUserMarker(markerElement, user);
      
      const marker = new mapboxgl.Marker({
        element: markerElement,
        anchor: 'bottom'
      })
        .setLngLat(userPos)
        .addTo(map.current);
      
      userMarkersRef.current.push({ marker, user });
    });
  };

  const updateNearbyUsers = (newUserLocation: [number, number]) => {
    userMarkersRef.current.forEach(({ marker, user }) => {
      const userPos = getDestinationPoint(
        newUserLocation[0],
        newUserLocation[1],
        user.distance,
        Math.atan2(
          user.location[1] - newUserLocation[1],
          user.location[0] - newUserLocation[0]
        ) * (180 / Math.PI)
      );
      
      user.location = userPos;
      
      marker.setLngLat(userPos);
    });
  };

  const createUserMarker = (container: HTMLElement, user: NearbyUser) => {
    const handleClick = () => {
      console.log(`Clicked on user: ${user.name}`);
      
      toast({
        title: `Viewing ${user.name}'s profile`,
        description: `${user.compatibility}% compatibility match!`,
        variant: "default"
      });
      
      navigate(`/profile/${user.id}`);
    };

    container.className = 'user-marker-container';

    ReactDOM.render(
      <UserMarker user={user} onClick={handleClick} />,
      container
    );
  };

  return {
    mapContainer,
    map,
    loading,
    error,
    userLocation
  };
};
