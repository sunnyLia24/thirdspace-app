
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export function useMapStyling(map: React.MutableRefObject<mapboxgl.Map | null>) {
  const applyMapStyling = () => {
    if (!map.current) return;
    
    // Apply sleeker sky style
    map.current.setPaintProperty('sky', 'sky-atmosphere-sun', [0, 0]);
    map.current.setPaintProperty('sky', 'sky-atmosphere-sun-intensity', 15);
    map.current.setPaintProperty('sky', 'sky-opacity', 0.9);
    map.current.setPaintProperty('sky', 'sky-type', 'atmosphere');
    map.current.setPaintProperty('sky', 'sky-atmosphere-color', '#33C3F0');
    
    // Water styling - using a more vibrant blue
    map.current.setPaintProperty('water', 'fill-color', '#0FA0CE');
    
    // Land styling - using dark gray as requested
    map.current.setPaintProperty('land', 'background-color', '#333333');
    
    // Enhanced 3D buildings with sleeker styling
    map.current.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': '#1A365D',
        'fill-extrusion-height': [
          'interpolate', ['linear'], ['zoom'],
          15, 0,
          15.05, ['*', ['get', 'height'], 0.5]
        ],
        'fill-extrusion-base': [
          'interpolate', ['linear'], ['zoom'],
          15, 0,
          15.05, ['*', ['get', 'min_height'], 0.5]
        ],
        'fill-extrusion-opacity': 0.6
      }
    });
    
    // Road styling for better contrast against the dark background
    map.current.setPaintProperty('road-primary', 'line-color', '#B9E6F3');
    map.current.setPaintProperty('road-secondary', 'line-color', '#a1dbeb');
    map.current.setPaintProperty('road-tertiary', 'line-color', '#d6f1f8');
    
    // Park and tree styling for more vibrant appearance
    map.current.setPaintProperty('landuse-park', 'fill-color', '#8EDA8C');
    map.current.setPaintProperty('landcover-tree', 'fill-color', '#5BB359');
  };

  return { applyMapStyling };
}
