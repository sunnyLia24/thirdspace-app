
import { useRef } from 'react';
import mapboxgl from 'mapbox-gl';

export function useUserMarker(map: React.MutableRefObject<mapboxgl.Map | null>) {
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const customMarkerElementRef = useRef<HTMLDivElement | null>(null);

  const createUserMarker = (userLocation: [number, number]) => {
    if (!map.current) return;

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
  };

  const updateUserMarkerScale = (map: mapboxgl.Map) => {
    if (!customMarkerElementRef.current) return;
    
    const currentZoom = map.getZoom();
    const lumaleeContainer = customMarkerElementRef.current.querySelector('.lumalee-container');
    
    const zoomRange = map.getMaxZoom() - map.getMinZoom();
    const zoomFactor = (currentZoom - map.getMinZoom()) / zoomRange;
    
    const scaleFactor = 0.6 + (zoomFactor * 0.9);
    
    if (lumaleeContainer) {
      (lumaleeContainer as HTMLElement).style.transform = `scale(${scaleFactor})`;
    }
  };

  const updateUserMarkerPosition = (newLocation: [number, number]) => {
    if (markerRef.current) {
      markerRef.current.setLngLat(newLocation);
    }
  };

  return {
    markerRef,
    customMarkerElementRef,
    createUserMarker,
    updateUserMarkerScale,
    updateUserMarkerPosition
  };
}
