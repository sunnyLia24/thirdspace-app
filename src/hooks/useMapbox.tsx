
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from './use-toast';
import { useNavigate } from 'react-router-dom';
import { nearbyUsers, NearbyUser } from '@/data/nearbyUsers';
import ReactDOM from 'react-dom';
import UserMarker from '@/components/UserMarker';

// Default token
const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1Ijoic3VubnkyNCIsImEiOiJjbTdtbDBzb2gwb2plMnBvY2lxbml0Z3pyIn0.OrQMpXUEaR_vN3MubP6JSw';

// Function to calculate a point at a given distance and bearing from a starting point
function getDestinationPoint(
  startLng: number, 
  startLat: number, 
  distanceMeters: number, 
  bearingDegrees: number
): [number, number] {
  // Earth's radius in meters
  const R = 6371000;
  
  // Convert bearing to radians
  const bearing = (bearingDegrees * Math.PI) / 180;
  
  // Convert latitude to radians
  const lat1 = (startLat * Math.PI) / 180;
  const lon1 = (startLng * Math.PI) / 180;
  
  // Calculate angular distance
  const angularDistance = distanceMeters / R;
  
  // Calculate new latitude
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(angularDistance) +
    Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(bearing)
  );
  
  // Calculate new longitude
  const lon2 = lon1 + Math.atan2(
    Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(lat1),
    Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2)
  );
  
  // Convert back to degrees
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

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.longitude, position.coords.latitude]);
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Default to New York if location access is denied
          setUserLocation([-74.0060, 40.7128]);
          toast({
            title: "Location access denied",
            description: "Using default location instead",
            variant: "default"
          });
        }
      );
    } else {
      // Default to New York if geolocation is not supported
      setUserLocation([-74.0060, 40.7128]);
      toast({
        title: "Geolocation not supported",
        description: "Using default location instead",
        variant: "default"
      });
    }
  }, []);

  // Initialize map when user location is set
  useEffect(() => {
    if (!mapContainer.current || !userLocation) return;

    // Clear any existing map instance properly
    if (map.current) {
      try {
        map.current.remove();
      } catch (e) {
        console.error("Error removing map:", e);
      }
      map.current = null;
    }

    // Clear any existing user markers
    userMarkersRef.current.forEach(({ marker }) => {
      marker.remove();
    });
    userMarkersRef.current = [];

    try {
      // Use custom token if provided, otherwise use default
      mapboxgl.accessToken = customToken || DEFAULT_MAPBOX_TOKEN;
      
      // Initialize map with user location
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: userLocation,
        zoom: 18, // Increased zoom level to show 50-100m around user
        pitch: 45,
        bearing: 0,
        antialias: true,
        minZoom: 9,  // Set minimum zoom level
        maxZoom: 20, // Set maximum zoom level
        dragRotate: true,
        dragPan: true, // Enable panning to allow for rotation
      });
      
      map.current = newMap;

      // Add rotation control
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
          showCompass: true,
          showZoom: true,
        }),
        'top-right'
      );

      // Create custom marker element
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
      
      // Store reference to the marker element
      customMarkerElementRef.current = customMarkerElement;

      // Add user location marker with custom element
      markerRef.current = new mapboxgl.Marker({
        element: customMarkerElement,
        anchor: 'bottom'
      })
        .setLngLat(userLocation)
        .addTo(map.current);

      // Loading handler
      map.current.on('load', () => {
        setLoading(false);
        setError(null);
        
        // Add 3D building layer
        if (map.current) {
          map.current.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
              'fill-extrusion-color': '#aaa',
              'fill-extrusion-height': [
                'interpolate', ['linear'], ['zoom'],
                15, 0,
                15.05, ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate', ['linear'], ['zoom'],
                15, 0,
                15.05, ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.6
            }
          });
        }
        
        // Position nearby users around the user's location
        displayNearbyUsers(userLocation);
        
        // Set up watch position to update marker and map center when user moves
        if (navigator.geolocation) {
          const watchId = navigator.geolocation.watchPosition(
            (position) => {
              const newLocation: [number, number] = [
                position.coords.longitude,
                position.coords.latitude
              ];
              
              // Update marker position
              if (markerRef.current) {
                markerRef.current.setLngLat(newLocation);
              }
              
              // Update map center to keep user centered
              if (map.current) {
                map.current.setCenter(newLocation);
              }
              
              // Update stored location
              setUserLocation(newLocation);
              
              // Update nearby user positions relative to new user location
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
          
          // Store watchId for cleanup
          return () => {
            navigator.geolocation.clearWatch(watchId);
          };
        }
      });

      // Setup map camera behavior based on zoom level
      map.current.on('zoom', () => {
        if (!map.current || !userLocation) return;
        
        // Ensure the map stays centered on the user's location during zoom
        map.current.setCenter(userLocation);
        
        const currentZoom = map.current.getZoom();
        
        // Calculate pitch based on zoom level
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
        
        // Smoothly animate to the new pitch
        map.current.easeTo({
          center: userLocation,
          pitch: targetPitch,
          duration: 300,
          easing: (t) => t * (2 - t) // easeOutQuad for smooth transition
        });

        // Adjust Lumalee marker size based on zoom level
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

      // Also fix the wheel zoom to stay centered on user's location
      map.current.on('wheel', (e) => {
        if (!map.current || !userLocation) return;
        
        // Prevent the default wheel behavior
        e.preventDefault();
        
        // Calculate new zoom level
        const currentZoom = map.current.getZoom();
        const delta = e.originalEvent.deltaY * -0.01;
        const newZoom = currentZoom + delta;
        
        // Ensure zoom is within bounds
        const clampedZoom = Math.min(Math.max(newZoom, map.current.getMinZoom()), map.current.getMaxZoom());
        
        // Apply zoom while keeping centered on user location
        map.current.easeTo({
          center: userLocation,
          zoom: clampedZoom,
          duration: 100
        });
      });

      // Add rotation controls to make it easier to rotate around the user's location
      map.current.on('dragstart', (e) => {
        // Check if event is a MouseEvent and if right mouse button is pressed (for rotation)
        if ('button' in e.originalEvent) {
          const mouseEvent = e.originalEvent as MouseEvent;
          if (mouseEvent.button === 2 || mouseEvent.buttons === 2) {
            // Set cursor to indicate rotation
            const canvas = map.current?.getCanvas();
            if (canvas) {
              canvas.style.cursor = 'grabbing';
            }
          }
        }
      });

      // Right-click and drag for rotation around the user's position
      map.current.on('contextmenu', (e) => {
        // Prevent the default context menu
        e.preventDefault();
      });

      // Enhanced mobile-friendly controls
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

    // Cleanup
    return () => {
      // Safely clean up the map instance
      if (map.current) {
        try {
          // Remove all user markers
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

  // Function to position nearby users around the user's current location
  const displayNearbyUsers = (currentLocation: [number, number]) => {
    if (!map.current) return;

    // Remove any existing markers
    userMarkersRef.current.forEach(({ marker }) => {
      marker.remove();
    });
    userMarkersRef.current = [];

    // For each nearby user, create a marker at a random angle
    nearbyUsers.forEach((user, index) => {
      // Calculate a random position around the user within distance
      const angle = (index * 90) + Math.random() * 45; // Space users around in different directions
      const userPos = getDestinationPoint(
        currentLocation[0], 
        currentLocation[1], 
        user.distance, 
        angle
      );
      
      // Update user location
      user.location = userPos;
      
      // Create marker element container
      const markerElement = document.createElement('div');
      markerElement.className = 'marker-container';

      // Create and add the React component to the marker
      createUserMarker(markerElement, user);
      
      // Add marker to the map
      const marker = new mapboxgl.Marker({
        element: markerElement,
        anchor: 'bottom'
      })
        .setLngLat(userPos)
        .addTo(map.current);
      
      // Store reference to the marker and user
      userMarkersRef.current.push({ marker, user });
    });
  };

  // Update nearby users' positions when user moves
  const updateNearbyUsers = (newUserLocation: [number, number]) => {
    userMarkersRef.current.forEach(({ marker, user }) => {
      // Recalculate position based on the user's new location
      const userPos = getDestinationPoint(
        newUserLocation[0],
        newUserLocation[1],
        user.distance,
        // Keep the same angle relative to the user
        Math.atan2(
          user.location[1] - newUserLocation[1],
          user.location[0] - newUserLocation[0]
        ) * (180 / Math.PI)
      );
      
      // Update user location
      user.location = userPos;
      
      // Update marker position
      marker.setLngLat(userPos);
    });
  };

  // Helper function to render React component into the marker element
  const createUserMarker = (container: HTMLElement, user: NearbyUser) => {
    const handleClick = () => {
      // When a user marker is clicked, navigate to a profile page
      console.log(`Clicked on user: ${user.name}`);
      
      // Show a toast notification
      toast({
        title: `Viewing ${user.name}'s profile`,
        description: `${user.compatibility}% compatibility match!`,
        variant: "default"
      });
      
      // Navigate to a dynamic profile page using the user ID
      navigate(`/profile/${user.id}`);
    };

    // Add a stable class name to the container for styling
    container.className = 'user-marker-container';

    // Render the React component into the container
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
