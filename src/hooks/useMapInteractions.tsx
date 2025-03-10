
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export function useMapInteractions(
  map: React.MutableRefObject<mapboxgl.Map | null>,
  userLocation: [number, number] | null,
  updateUserMarkerScale: (map: mapboxgl.Map) => void
) {
  const setupZoomInteraction = () => {
    if (!map.current || !userLocation) return;
    
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

      if (map.current) {
        updateUserMarkerScale(map.current);
      }
    });
  };

  const setupWheelInteraction = () => {
    if (!map.current || !userLocation) return;
    
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
  };

  const setupDragInteractions = () => {
    if (!map.current) return;
    
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
  };

  return {
    setupZoomInteraction,
    setupWheelInteraction,
    setupDragInteractions
  };
}
