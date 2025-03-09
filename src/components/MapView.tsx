
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import HomeButton from './HomeButton';
import TopNav from './TopNav';
import { Card, CardContent } from '@/components/ui/card';

// Using a more reliable token
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
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
  const [mapTokenInput, setMapTokenInput] = useState('');
  const [customToken, setCustomToken] = useState('');

  // Function to initialize map with custom token if provided
  const initializeMap = (token?: string) => {
    if (!mapContainer.current || !userLocation) return;
    
    if (map.current) {
      map.current.remove();
    }

    // Use custom token if provided, otherwise use default
    if (token) {
      mapboxgl.accessToken = token;
    } else {
      mapboxgl.accessToken = MAPBOX_TOKEN;
    }
    
    try {
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
    } catch (error) {
      console.error("Error initializing map:", error);
      setLoading(false);
    }
  };

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

  // Initialize map when user location is set
  useEffect(() => {
    if (userLocation) {
      initializeMap(customToken || undefined);
    }
    
    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [userLocation, customToken]);

  // Handle custom token submission
  const handleSubmitToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapTokenInput.trim()) {
      setCustomToken(mapTokenInput.trim());
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-80">
          <div className="w-12 h-12 border-4 border-dating-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Top Navigation */}
      <TopNav />
      
      {/* Third Spaces Title with Enhanced Glow Effect */}
      <div className="absolute top-8 left-0 right-0 flex justify-center z-10">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-dating-primary via-dating-accent to-dating-secondary rounded-lg blur opacity-75 animate-pulse-gentle"></div>
          <Card className="relative border-none">
            <CardContent className="flex flex-col items-center justify-center p-4">
              <h1 className="text-2xl font-extrabold text-dating-dark bg-clip-text text-transparent bg-gradient-to-r from-dating-primary to-dating-accent">
                Third Spaces
              </h1>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Map Token Input (only shown if map initialization fails) */}
      {!map.current && !loading && userLocation && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <Card className="w-11/12 max-w-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-dating-dark mb-4">Map Failed to Load</h2>
              <p className="text-sm text-gray-600 mb-4">
                Please enter your Mapbox token to initialize the map. You can find your token in your Mapbox account dashboard.
              </p>
              <form onSubmit={handleSubmitToken} className="space-y-4">
                <input
                  type="text"
                  value={mapTokenInput}
                  onChange={(e) => setMapTokenInput(e.target.value)}
                  placeholder="Enter your Mapbox token"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-dating-primary text-white py-2 px-4 rounded hover:bg-dating-primary/90 transition-colors"
                >
                  Load Map
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Home Button and Bottom Nav */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center z-10">
        {isNavVisible && (
          <div className="mb-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg">
            <div className="flex space-x-4">
              {/* We'll leave this empty for now - the BottomNav component will be repositioned in MainLayout.tsx */}
            </div>
          </div>
        )}
        <HomeButton isActive={isNavVisible} onClick={toggleNav} />
      </div>
    </div>
  );
};

export default MapView;
