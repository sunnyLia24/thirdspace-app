import React from 'react';
import mapboxgl from 'mapbox-gl';

export const createRadarPulse = (map: mapboxgl.Map) => {
  const pulseContainer = document.createElement('div');
  pulseContainer.className = 'radar-pulse-container';

  const style = document.createElement('style');
  style.textContent = `
    .radar-pulse-container {
      position: absolute;
      width: 200px;
      height: 200px;
      pointer-events: none;
      transform: translate(-50%, -50%);
    }
    .radar-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: radar-pulse 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      background: radial-gradient(circle, rgba(255,192,203,0.3) 0%, rgba(255,192,203,0) 70%);
    }
    .radar-ring:nth-child(2) {
      animation-delay: -1s;
    }
    .radar-ring:nth-child(3) {
      animation-delay: -2s;
    }
    @keyframes radar-pulse {
      0% {
        transform: scale(0.1);
        opacity: 0.8;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Create three rings for a layered effect
  for (let i = 0; i < 3; i++) {
    const ring = document.createElement('div');
    ring.className = 'radar-ring';
    pulseContainer.appendChild(ring);
  }

  const marker = new mapboxgl.Marker(pulseContainer)
    .setLngLat([0, 0])
    .addTo(map);

  return {
    updatePosition: (lngLat: [number, number]) => {
      marker.setLngLat(lngLat);
    },
    cleanup: () => {
      marker.remove();
      style.remove();
    }
  };
}; 