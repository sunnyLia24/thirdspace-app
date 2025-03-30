import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAP_STYLES, ISOMETRIC_VIEW } from '@/utils/mapUtils';

export function useMapStyling(map: React.MutableRefObject<mapboxgl.Map | null>) {
  const applyMapStyling = () => {
    if (!map.current) return;
    
    // Apply sky gradient - softer blue for stylized look
    map.current.setPaintProperty('sky', 'sky-type', 'gradient');
    map.current.setPaintProperty('sky', 'sky-gradient', [
      'interpolate',
      ['linear'],
      ['sky-radial-progress'],
      0.8,
      '#A4D6F5',
      1,
      '#E5F4FF'
    ]);
    map.current.setPaintProperty('sky', 'sky-opacity', 0.7);
    
    // Water styling - lighter blue
    map.current.setPaintProperty('water', 'fill-color', MAP_STYLES.water);
    
    // Land styling - light neutral color
    map.current.setPaintProperty('land', 'background-color', MAP_STYLES.ground);

    // Remove existing 3D buildings layer if it exists
    if (map.current.getLayer('3d-buildings')) {
      map.current.removeLayer('3d-buildings');
    }
    
    // Enhanced 3D buildings with cartoon-like styling
    map.current.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 14,
      'paint': {
        'fill-extrusion-color': [
          'match',
          ['get', 'type'],
          'residential', MAP_STYLES.buildings.residential,
          'commercial', MAP_STYLES.buildings.commercial,
          'retail', MAP_STYLES.buildings.commercial,
          MAP_STYLES.buildings.default
        ],
        'fill-extrusion-height': [
          'interpolate', ['linear'], ['zoom'],
          14, 0,
          14.5, ['*', ['get', 'height'], 2]  // Exaggerate building heights
        ],
        'fill-extrusion-base': [
          'interpolate', ['linear'], ['zoom'],
          14, 0,
          14.5, ['*', ['get', 'min_height'], 1.5]
        ],
        'fill-extrusion-opacity': 0.95,  // More solid looking
        'fill-extrusion-vertical-gradient': true  // Add subtle gradient for depth
      }
    });

    // Add a shadow layer under buildings for depth
    map.current.addLayer({
      'id': 'building-shadows',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill',
      'minzoom': 14,
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-color': MAP_STYLES.shadows,
        'fill-opacity': 0.4,
        'fill-translate': [5, 5]  // Offset to create shadow effect
      }
    }, '3d-buildings');
    
    // Road styling - white roads with subtle shadows
    map.current.setPaintProperty('road-primary', 'line-color', MAP_STYLES.roads.primary);
    map.current.setPaintProperty('road-secondary', 'line-color', MAP_STYLES.roads.secondary);
    map.current.setPaintProperty('road-tertiary', 'line-color', MAP_STYLES.roads.tertiary);
    
    // Add border/shadow to roads for depth
    map.current.setPaintProperty('road-primary-case', 'line-color', MAP_STYLES.shadows);
    map.current.setPaintProperty('road-secondary-case', 'line-color', MAP_STYLES.shadows);
    map.current.setPaintProperty('road-tertiary-case', 'line-color', MAP_STYLES.shadows);
    
    // Make road lines slightly wider for cartoonish effect
    map.current.setPaintProperty('road-primary', 'line-width', [
      'interpolate', ['linear'], ['zoom'],
      12, 2,
      16, 6
    ]);
    map.current.setPaintProperty('road-secondary', 'line-width', [
      'interpolate', ['linear'], ['zoom'],
      12, 1.5,
      16, 5
    ]);
    
    // Parks and trees - vibrant greens
    map.current.setPaintProperty('landuse-park', 'fill-color', MAP_STYLES.parks);
    map.current.setPaintProperty('landcover-tree', 'fill-color', MAP_STYLES.trees);
    map.current.setPaintProperty('landcover-vegetation', 'fill-color', MAP_STYLES.trees);
    
    // Add a custom layer for tree objects if it doesn't exist
    if (!map.current.getLayer('tree-objects')) {
      map.current.addLayer({
        'id': 'tree-objects',
        'source': 'composite',
        'source-layer': 'landcover',
        'filter': ['==', 'class', 'wood'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': MAP_STYLES.trees,
          'fill-extrusion-height': 10,
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 0.9,
          'fill-extrusion-vertical-gradient': true
        }
      });
    }
    
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
