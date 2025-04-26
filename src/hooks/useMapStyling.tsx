import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { ISOMETRIC_VIEW } from '@/utils/mapUtils';

export function useMapStyling(map: React.MutableRefObject<mapboxgl.Map | null>) {
  const applyMapStyling = () => {
    if (!map.current) return;

    // Set isometric view settings
    map.current.easeTo({
      pitch: ISOMETRIC_VIEW.pitch,
      bearing: ISOMETRIC_VIEW.bearing,
      duration: 1500
    });
    
    // Update interaction constraints
    map.current.setMaxPitch(ISOMETRIC_VIEW.maxPitch);
    map.current.setMinZoom(ISOMETRIC_VIEW.minZoom);
    map.current.setMaxZoom(ISOMETRIC_VIEW.maxZoom);
  };

  return { applyMapStyling };
}
