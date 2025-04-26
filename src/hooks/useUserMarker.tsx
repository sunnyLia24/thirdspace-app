import { useRef } from 'react';
import mapboxgl from 'mapbox-gl';

export function useUserMarker(map: React.MutableRefObject<mapboxgl.Map | null>) {
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const customMarkerElementRef = useRef<HTMLDivElement | null>(null);

  // Helper function to calculate scale based on zoom level
  const calculateScaleFactor = (zoom: number, minZoom: number, maxZoom: number): number => {
    // Normalize zoom to 0-1 range
    const zoomRange = maxZoom - minZoom;
    const normalizedZoom = (zoom - minZoom) / zoomRange;
    
    // Base and max sizes
    const baseSize = 0.5;
    const maxSize = 1.8;
    
    // Calculate exponential scale factor
    const expFactor = Math.pow(maxSize / baseSize, normalizedZoom);
    const scaleFactor = baseSize * expFactor;
    
    // Clamp to prevent extreme values
    return Math.min(Math.max(scaleFactor, baseSize), maxSize);
  };

  const createUserMarker = (userLocation: [number, number]) => {
    if (!map.current) return;

    const customMarkerElement = document.createElement('div');
    customMarkerElement.className = 'lumalee-marker';
    customMarkerElement.style.zIndex = '5'; // Lower z-index so it doesn't overlap bottom nav or popups
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

    // Add CSS for the marker with updated styling for blue character
    const style = document.createElement('style');
    style.textContent = `
      .lumalee-marker {
        z-index: 5 !important; /* Lower z-index so it doesn't overlap UI elements */
      }
      .lumalee-container {
        position: relative;
        width: 50px;
        height: 50px;
        transform-origin: center bottom;
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
        transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
    
    // Apply initial scale based on current zoom level
    const currentZoom = map.current.getZoom();
    const initialScale = calculateScaleFactor(
      currentZoom, 
      map.current.getMinZoom(), 
      map.current.getMaxZoom()
    );
    
    const lumaleeContainer = customMarkerElement.querySelector('.lumalee-container');
    if (lumaleeContainer) {
      (lumaleeContainer as HTMLElement).style.transform = `scale(${initialScale})`;
    }
  };

  const updateUserMarkerScale = (map: mapboxgl.Map) => {
    if (!customMarkerElementRef.current) return;
    
    const currentZoom = map.getZoom();
    const lumaleeContainer = customMarkerElementRef.current.querySelector('.lumalee-container');
    
    // Use the helper function for consistent scaling calculation
    const clampedScale = calculateScaleFactor(
      currentZoom,
      map.getMinZoom(),
      map.getMaxZoom()
    );
    
    if (lumaleeContainer) {
      (lumaleeContainer as HTMLElement).style.transform = `scale(${clampedScale})`;
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
