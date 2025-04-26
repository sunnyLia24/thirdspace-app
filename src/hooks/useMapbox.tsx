import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from './use-toast';
import { DEFAULT_MAPBOX_TOKEN } from '@/utils/mapUtils';
import { useUserLocation } from './useUserLocation';
import { useNearbyUsers } from './useNearbyUsers';
import { useMapStyling } from './useMapStyling';
import { useUserMarker } from './useUserMarker';
import { useMapInteractions } from './useMapInteractions';

interface UseMapboxProps {
  customToken?: string;
}

export const useMapbox = ({ customToken }: UseMapboxProps = {}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Get user location
  const { userLocation, setUserLocation } = useUserLocation();
  
  // Initialize hooks that depend on map
  const { displayNearbyUsers, updateNearbyUsers, cleanupUserMarkers } = useNearbyUsers(map);
  const { applyMapStyling } = useMapStyling(map);
  const { 
    markerRef, 
    createUserMarker, 
    updateUserMarkerScale, 
    updateUserMarkerPosition 
  } = useUserMarker(map);
  const { 
    setupZoomInteraction, 
    setupDragInteractions 
  } = useMapInteractions(map, userLocation, updateUserMarkerScale);

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

    cleanupUserMarkers();

    try {
      // Add global marker z-index CSS
      const markerStyle = document.createElement('style');
      markerStyle.textContent = `
        .lumalee-marker, .mapboxgl-marker.lumalee-marker {
          z-index: 1000 !important;
        }
        .user-marker-container, .mapboxgl-marker.user-marker-container {
          z-index: 100 !important;
        }
        .hotspot-marker-container, .mapboxgl-marker.hotspot-marker-container {
          z-index: 100 !important;
        }
      `;
      document.head.appendChild(markerStyle);
      
      mapboxgl.accessToken = customToken || DEFAULT_MAPBOX_TOKEN;
      
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/sunny24/cm8x3e9xg007g01s46myee8yf',
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

      map.current.on('load', () => {
        setLoading(false);
        setError(null);
        
        if (map.current) {
          applyMapStyling();
          
          // First, display nearby users and hotspots
          displayNearbyUsers(userLocation);
          
          // Then create the user marker so it's added last (appears on top)
          createUserMarker(userLocation);
          
          if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
              (position) => {
                const newLocation: [number, number] = [
                  position.coords.longitude,
                  position.coords.latitude
                ];
                
                updateUserMarkerPosition(newLocation);
                
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
        }
      });

      setupZoomInteraction();
      setupDragInteractions();

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
          cleanupUserMarkers();
          map.current.remove();
        } catch (e) {
          console.error("Error during map cleanup:", e);
        }
        map.current = null;
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
