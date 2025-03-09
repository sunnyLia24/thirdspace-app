
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from './use-toast';

// Default token
const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1Ijoic3VubnkyNCIsImEiOiJjbTdtbDBzb2gwb2plMnBvY2lxbml0Z3pyIn0.OrQMpXUEaR_vN3MubP6JSw';

interface UseMapboxProps {
  customToken?: string;
}

export const useMapbox = ({ customToken }: UseMapboxProps = {}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const { toast } = useToast();

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
    
    if (map.current) {
      map.current.remove();
    }

    try {
      // Use custom token if provided, otherwise use default
      mapboxgl.accessToken = customToken || DEFAULT_MAPBOX_TOKEN;
      
      // Initialize map with user location
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: userLocation,
        zoom: 18, // Increased zoom level to show 50-100m around user (was 14)
        pitch: 45,
        bearing: 0,
        antialias: true,
        minZoom: 9,  // Set minimum zoom level (prevents zooming out too far)
        maxZoom: 20  // Set maximum zoom level
      });

      // Add navigation controls
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

      // Add user location marker with custom element
      markerRef.current = new mapboxgl.Marker({
        element: customMarkerElement,
        anchor: 'center'
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
      });

      // Pokemon GO style camera behavior - lower POV as user zooms in
      map.current.on('zoom', () => {
        if (!map.current) return;
        
        const currentZoom = map.current.getZoom();
        
        // Calculate pitch based on zoom level
        // At lower zoom levels, have a moderate pitch
        // As zoom increases, gradually lower the POV to ground level (higher pitch)
        let targetPitch;
        
        if (currentZoom < 15) {
          // Linear interpolation: 45° at zoom 10, gradually increasing to 60° at zoom 15
          targetPitch = 45 + ((currentZoom - 10) * 3);
          targetPitch = Math.min(Math.max(targetPitch, 45), 60);
        } else if (currentZoom >= 15 && currentZoom < 18) {
          // Linear interpolation: 60° at zoom 15, gradually increasing to 75° at zoom 18
          targetPitch = 60 + ((currentZoom - 15) * 5);
          targetPitch = Math.min(Math.max(targetPitch, 60), 75);
        } else {
          // For zoom level 18+, set to near ground level view (80°)
          targetPitch = 80;
        }
        
        // Smoothly animate to the new pitch
        map.current.easeTo({
          pitch: targetPitch,
          duration: 500,
          easing: (t) => t * (2 - t) // easeOutQuad for smooth transition
        });

        // Adjust Lumalee marker size based on zoom level
        if (map.current && customMarkerElement) {
          // Get the Lumalee container and body elements
          const lumaleeContainer = customMarkerElement.querySelector('.lumalee-container');
          const lumaleeBody = customMarkerElement.querySelector('.lumalee-body');
          
          // Calculate base size factor (smaller at low zoom, larger at high zoom)
          // Zoom range: minZoom: 9 to maxZoom: 20
          const zoomRange = map.current.getMaxZoom() - map.current.getMinZoom();
          const zoomFactor = (currentZoom - map.current.getMinZoom()) / zoomRange;
          
          // Scale from 0.6 (at lowest zoom) to 1.5 (at highest zoom)
          const scaleFactor = 0.6 + (zoomFactor * 0.9);
          
          // Apply scale transform to the Lumalee container
          if (lumaleeContainer) {
            (lumaleeContainer as HTMLElement).style.transform = `scale(${scaleFactor})`;
          }
        }
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
      if (map.current) {
        map.current.remove();
      }
    };
  }, [userLocation, customToken]);

  return {
    mapContainer,
    map,
    loading,
    error,
    userLocation
  };
};
