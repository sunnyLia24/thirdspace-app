import React from 'react';
import mapboxgl from 'mapbox-gl';

interface MapControlsProps {
  map: mapboxgl.Map | null;
  defaultCenter: [number, number];
  defaultZoom: number;
}

export const createMapControls = (
  map: mapboxgl.Map,
  defaultCenter: [number, number],
  defaultZoom: number
) => {
  const container = document.createElement('div');
  container.className = 'map-controls';

  const style = document.createElement('style');
  style.textContent = `
    .map-controls {
      position: absolute;
      right: 20px;
      bottom: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 1;
    }

    .map-control-button {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: white;
      border: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      color: #666;
    }

    .map-control-button:hover {
      background: #f0f0f0;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .map-control-button:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .map-control-button.reset {
      font-size: 16px;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }

    .map-control-button:focus {
      outline: none;
      animation: pulse 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `;
  document.head.appendChild(style);

  // Create zoom in button
  const zoomInBtn = document.createElement('button');
  zoomInBtn.className = 'map-control-button zoom-in';
  zoomInBtn.innerHTML = '+';
  zoomInBtn.addEventListener('click', () => {
    smoothZoom(map, map.getZoom() + 1);
  });

  // Create zoom out button
  const zoomOutBtn = document.createElement('button');
  zoomOutBtn.className = 'map-control-button zoom-out';
  zoomOutBtn.innerHTML = '−';
  zoomOutBtn.addEventListener('click', () => {
    smoothZoom(map, map.getZoom() - 1);
  });

  // Create reset view button
  const resetBtn = document.createElement('button');
  resetBtn.className = 'map-control-button reset';
  resetBtn.innerHTML = '⌂';
  resetBtn.addEventListener('click', () => {
    resetView(map, defaultCenter, defaultZoom);
  });

  container.appendChild(zoomInBtn);
  container.appendChild(zoomOutBtn);
  container.appendChild(resetBtn);

  return {
    element: container,
    cleanup: () => {
      container.remove();
      style.remove();
    }
  };
};

// Smooth zoom animation
function smoothZoom(map: mapboxgl.Map, targetZoom: number) {
  const currentZoom = map.getZoom();
  const zoomDiff = targetZoom - currentZoom;

  // Calculate appropriate pitch based on zoom level
  const targetPitch = targetZoom > 15 ? 45 : 0;

  map.easeTo({
    zoom: targetZoom,
    pitch: targetPitch,
    duration: 500,
    easing: (t) => {
      // Custom easing function for smooth acceleration and deceleration
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
  });
}

// Reset view with smooth animation
function resetView(
  map: mapboxgl.Map,
  center: [number, number],
  zoom: number
) {
  map.easeTo({
    center: center,
    zoom: zoom,
    pitch: 0,
    bearing: 0,
    duration: 1000,
    easing: (t) => {
      // Smooth spring-like easing
      const t2 = t * t;
      return t2 * (3 - 2 * t);
    }
  });
} 