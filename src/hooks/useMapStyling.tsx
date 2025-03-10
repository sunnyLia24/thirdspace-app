
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAP_STYLES } from '@/utils/mapUtils';

export function useMapStyling(map: React.MutableRefObject<mapboxgl.Map | null>) {
  const applyMapStyling = () => {
    if (!map.current) return;
    
    // Apply sky gradient
    map.current.setPaintProperty('sky', 'sky-type', 'gradient');
    map.current.setPaintProperty('sky', 'sky-gradient', [
      'interpolate',
      ['linear'],
      ['sky-radial-progress'],
      0.8,
      '#50AEF9',
      1,
      '#E5EEFE'
    ]);
    map.current.setPaintProperty('sky', 'sky-opacity', 0.8);
    
    // Water styling
    map.current.setPaintProperty('water', 'fill-color', MAP_STYLES.water);
    
    // Land styling
    map.current.setPaintProperty('land', 'background-color', MAP_STYLES.ground);
    
    // Enhanced 3D buildings with sleeker styling
    map.current.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': MAP_STYLES.buildings,
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
    
    // Road styling - using the blue color
    map.current.setPaintProperty('road-primary', 'line-color', MAP_STYLES.roads.primary);
    map.current.setPaintProperty('road-secondary', 'line-color', MAP_STYLES.roads.secondary);
    map.current.setPaintProperty('road-tertiary', 'line-color', MAP_STYLES.roads.tertiary);
    
    // Add subtle shadows to roads for depth
    map.current.setPaintProperty('road-primary-case', 'line-color', '#0000000A');
    map.current.setPaintProperty('road-secondary-case', 'line-color', '#0000000A');
    map.current.setPaintProperty('road-tertiary-case', 'line-color', '#0000000A');
    
    // Park and tree styling with more muted colors to match ground
    map.current.setPaintProperty('landuse-park', 'fill-color', MAP_STYLES.parks);
    map.current.setPaintProperty('landcover-tree', 'fill-color', MAP_STYLES.trees);
  };

  return { applyMapStyling };
}

