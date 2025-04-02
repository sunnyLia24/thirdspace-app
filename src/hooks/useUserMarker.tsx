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
        <div class="ground-rings">
          <div class="lumalee-ring ring1"></div>
          <div class="lumalee-ring ring2"></div>
        </div>
        <div class="lumalee-body"></div>
        <div class="lumalee-eye left"></div>
        <div class="lumalee-eye right"></div>
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
      .ground-rings {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
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
      .lumalee-ring {
        position: absolute;
        border-radius: 50%;
        border: 3px solid rgba(255, 255, 255, 0.8);
        animation: ring-expand 3s infinite;
        pointer-events: none;
        transform: perspective(100px) rotateX(65deg);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.6),
                    inset 0 0 10px rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(4px);
      }
      .lumalee-ring.ring1 {
        animation-delay: 0s;
      }
      .lumalee-ring.ring2 {
        animation-delay: 1.5s;
      }
      @keyframes ring-expand {
        0% {
          width: 20px;
          height: 20px;
          margin-left: -10px;
          margin-top: -10px;
          opacity: 0.9;
          border-width: 3px;
        }
        100% {
          width: 80px;
          height: 80px;
          margin-left: -40px;
          margin-top: -40px;
          opacity: 0;
          border-width: 1px;
        }
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
