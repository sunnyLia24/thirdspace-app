import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from './use-toast';
import { DEFAULT_MAPBOX_TOKEN } from '@/utils/mapUtils';
import { useUserLocation } from './useUserLocation';
import { useNearbyUsers } from './useNearbyUsers';
import { useUserMarker } from './useUserMarker';
import { useMapInteractions } from './useMapInteractions';
import { useBuildingStyling } from './useBuildingStyling';
import { useMapLabels } from './useMapLabels';

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
  const { 
    markerRef, 
    createUserMarker, 
    updateUserMarkerScale, 
    updateUserMarkerPosition 
  } = useUserMarker(map);
  const { 
    setupZoomInteraction, 
    setupWheelInteraction, 
    setupDragInteractions 
  } = useMapInteractions(map, userLocation, updateUserMarkerScale);
  const { applyBuildingStyling } = useBuildingStyling(map);
  const { removeLabels } = useMapLabels(map);

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
      mapboxgl.accessToken = customToken || DEFAULT_MAPBOX_TOKEN;
      
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation,
        zoom: 18,
        pitch: 60,
        bearing: 45,
        antialias: true,
        minZoom: 14,
        maxZoom: 20,
        dragRotate: true,
        dragPan: true,
        maxPitch: 85,
        minPitch: 0
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

      createUserMarker(userLocation);

      map.current.on('load', () => {
        setLoading(false);
        setError(null);
        
        if (map.current) {
          applyBuildingStyling();
          removeLabels();
          displayNearbyUsers(userLocation);
          
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
      setupWheelInteraction();
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
