
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
        <div class="lumalee-shadow"></div>
      </div>
    `;

    // Add CSS for the marker with updated styling for white background
    const style = document.createElement('style');
    style.textContent = `
      .lumalee-container {
        position: relative;
        width: 50px;
        height: 50px;
        transform-origin: center bottom;
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
      }
      .lumalee-body {
        position: absolute;
        width: 40px;
        height: 40px;
        background: #5bbce0;
        border-radius: 50%;
        left: 5px;
        top: 5px;
        animation: pulse 2s infinite ease-in-out;
        box-shadow: 0 2px 12px rgba(91, 188, 224, 0.4);
      }
      .lumalee-eye {
        position: absolute;
        width: 8px;
        height: 8px;
        background: #333;
        border-radius: 50%;
        top: 18px;
        z-index: 2;
      }
      .lumalee-eye.left {
        left: 15px;
      }
      .lumalee-eye.right {
        right: 15px;
      }
      .lumalee-sparkle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: white;
        border-radius: 50%;
        z-index: 3;
        opacity: 0.8;
        animation: twinkle 1.5s infinite alternate;
      }
      .lumalee-sparkle.s1 {
        top: 10px;
        left: 10px;
        animation-delay: 0s;
      }
      .lumalee-sparkle.s2 {
        top: 8px;
        right: 12px;
        animation-delay: 0.3s;
      }
      .lumalee-sparkle.s3 {
        bottom: 10px;
        left: 12px;
        animation-delay: 0.6s;
      }
      .lumalee-sparkle.s4 {
        bottom: 8px;
        right: 10px;
        animation-delay: 0.9s;
      }
      .lumalee-shadow {
        position: absolute;
        bottom: -4px;
        left: 10px;
        width: 30px;
        height: 6px;
        background: rgba(0,0,0,0.15);
        border-radius: 50%;
        filter: blur(2px);
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      @keyframes twinkle {
        0% { opacity: 0.4; }
        100% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);

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
