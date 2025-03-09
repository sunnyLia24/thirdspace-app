
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import HomeButton from './HomeButton';

// You would normally use an environment variable for this
// but for this demo we're including it directly
// Replace with your own Mapbox token if needed
const MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZWFwcCIsImEiOiJjbG9hd3EyOHkwNjZkMmxwOWZlcDZ1eW9wIn0.2iA4dGJhzJy3C_LpJcxw4w';
mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapViewProps {
  isNavVisible: boolean;
  toggleNav: () => void;
}

const MapView: React.FC<MapViewProps> = ({ isNavVisible, toggleNav }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

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
        }
      );
    } else {
      // Default to New York if geolocation is not supported
      setUserLocation([-74.0060, 40.7128]);
    }
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !userLocation) return;

    // Initialize map with user location if available
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: userLocation,
      zoom: 14,
      pitch: 45, // Tilt the map as requested
      bearing: 0,
      antialias: true,
    });

    // Add navigation controls (more compact for mobile)
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
        showCompass: true,
        showZoom: true,
      }),
      'top-right'
    );

    // Add user location marker
    new mapboxgl.Marker({ color: '#FF4D7D' })
      .setLngLat(userLocation)
      .addTo(map.current);

    // Loading handler
    map.current.on('load', () => {
      setLoading(false);
      
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

    // Enhanced mobile-friendly controls
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }));

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [userLocation]);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-80">
          <div className="w-12 h-12 border-4 border-dating-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute bottom-24 left-0 right-0 flex justify-center z-10">
        <HomeButton isActive={isNavVisible} onClick={toggleNav} />
      </div>
    </div>
  );
};

export default MapView;
