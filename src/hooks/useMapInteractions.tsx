import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export function useMapInteractions(
  map: React.MutableRefObject<mapboxgl.Map | null>,
  userLocation: [number, number] | null,
  updateUserMarkerScale: (map: mapboxgl.Map) => void
) {
  const setupZoomInteraction = () => {
    if (!map.current) return;

    // Update marker scale on all zoom-related events
    map.current.on('zoom', () => {
      if (map.current) {
        updateUserMarkerScale(map.current);
      }
    });
    
    // Also update scale when zoom ends (for smoother experience)
    map.current.on('zoomend', () => {
      if (map.current) {
        updateUserMarkerScale(map.current);
      }
    });
    
    // Update scale initially
    updateUserMarkerScale(map.current);
  };

  const setupDragInteractions = () => {
    if (!map.current) return;
    
    // Update marker scale after drag interactions (which might include zoom)
    map.current.on('moveend', () => {
      if (map.current) {
        updateUserMarkerScale(map.current);
      }
    });
  };

  return {
    setupZoomInteraction,
    setupDragInteractions
  };
}
