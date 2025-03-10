
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export function useMapStyling(map: React.MutableRefObject<mapboxgl.Map | null>) {
  const applyMapStyling = () => {
    if (!map.current) return;
    
    // Apply sleeker sky style
    map.current.setPaintProperty('sky', 'sky-atmosphere-sun', [0, 0]);
    map.current.setPaintProperty('sky', 'sky-atmosphere-sun-intensity', 15);
    map.current.setPaintProperty('sky', 'sky-opacity', 0.8);
    map.current.setPaintProperty('sky', 'sky-type', 'atmosphere');
    map.current.setPaintProperty('sky', 'sky-atmosphere-color', '#C7EEFF');
    
    // Water styling - using a lighter blue that works with white
    map.current.setPaintProperty('water', 'fill-color', '#C7EEFF');
    
    // Land styling - using white as requested
    map.current.setPaintProperty('land', 'background-color', '#FFFFFF');
    
    // Enhanced 3D buildings with sleeker styling
    map.current.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': '#333333',
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
        'fill-extrusion-opacity': 0.7
      }
    });
    
    // Road styling - dark streets against white background
    map.current.setPaintProperty('road-primary', 'line-color', '#333333');
    map.current.setPaintProperty('road-secondary', 'line-color', '#403E43');
    map.current.setPaintProperty('road-tertiary', 'line-color', '#555555');
    
    // Add subtle shadows to roads for depth
    map.current.setPaintProperty('road-primary-case', 'line-color', '#0000000A');
    map.current.setPaintProperty('road-secondary-case', 'line-color', '#0000000A');
    map.current.setPaintProperty('road-tertiary-case', 'line-color', '#0000000A');
    
    // Park and tree styling with more muted colors to match white background
    map.current.setPaintProperty('landuse-park', 'fill-color', '#E8F5E9');
    map.current.setPaintProperty('landcover-tree', 'fill-color', '#C8E6C9');
  };

  return { applyMapStyling };
}
