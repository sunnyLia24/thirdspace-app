import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export function useBuildingStyling(map: React.MutableRefObject<mapboxgl.Map | null>) {
  const applyBuildingStyling = () => {
    if (!map.current) return;

    // Remove old layers first to prevent conflicts
    const layersToRemove = [
      'building-extrusion',
      'landmark-buildings',
      'landmark-details',
      'building-landmark',
      'building-landmark-windows',
      'building-landmark-entrance'
    ];
    
    layersToRemove.forEach(layer => {
      if (map.current && map.current.getLayer(layer)) {
        map.current.removeLayer(layer);
      }
    });

    // Add landmark buildings layer FIRST
    map.current.addLayer({
      'id': 'landmark-buildings',
      'type': 'fill-extrusion',
      'source': 'composite',
      'source-layer': 'building',
      'minzoom': 14,
      'filter': ['any',
        // Libraries
        ['any',
          ['==', ['get', 'name'], 'New York Public Library'],
          ['==', ['get', 'name'], 'Stephen A. Schwarzman Building'],
          ['==', ['get', 'name'], 'NYPL'],
          ['all',
            ['==', ['get', 'type'], 'library'],
            ['>=', ['get', 'height'], 20]
          ]
        ],
        // Empire State Building
        ['any',
          ['==', ['get', 'name'], 'Empire State Building'],
          ['==', ['get', 'name'], 'ESB'],
          ['all',
            ['==', ['get', 'class'], 'skyscraper'],
            ['>=', ['get', 'height'], 200]
          ]
        ],
        // Chrysler Building
        ['any',
          ['==', ['get', 'name'], 'Chrysler Building'],
          ['all',
            ['==', ['get', 'class'], 'skyscraper'],
            ['>=', ['get', 'height'], 200]
          ]
        ],
        // Grand Central
        ['any',
          ['==', ['get', 'name'], 'Grand Central Terminal'],
          ['==', ['get', 'name'], 'Grand Central Station'],
          ['==', ['get', 'name'], 'GCT'],
          ['all',
            ['==', ['get', 'type'], 'train_station'],
            ['>=', ['get', 'height'], 20]
          ]
        ],
        // One World Trade Center
        ['any',
          ['==', ['get', 'name'], 'One World Trade Center'],
          ['==', ['get', 'name'], '1 WTC'],
          ['==', ['get', 'name'], 'Freedom Tower'],
          ['all',
            ['==', ['get', 'class'], 'skyscraper'],
            ['>=', ['get', 'height'], 400]
          ]
        ],
        // General landmark classes as fallback
        ['all',
          ['any',
            ['==', ['get', 'class'], 'landmark'],
            ['==', ['get', 'class'], 'major'],
            ['==', ['get', 'type'], 'landmark'],
            ['==', ['get', 'maki'], 'landmark']
          ],
          ['>=', ['get', 'height'], 20]
        ]
      ],
      'paint': {
        'fill-extrusion-color': '#ffffff',
        'fill-extrusion-height': [
          'case',
          ['has', 'height'], ['get', 'height'],
          ['has', 'render_height'], ['get', 'render_height'],
          ['has', 'building:height'], ['get', 'building:height'],
          ['has', 'building:levels'], ['*', ['get', 'building:levels'], 3],
          50 // default height if no height data available
        ],
        'fill-extrusion-base': 0,
        'fill-extrusion-opacity': 0.9,
        'fill-extrusion-vertical-gradient': true
      }
    });

    // Then add regular buildings layer
    map.current.addLayer({
      'id': 'building-extrusion',
      'source': 'composite',
      'source-layer': 'building',
      'filter': [
        'all',
        ['!', 
          ['any',
            // Libraries
            ['==', ['get', 'name'], 'New York Public Library'],
            ['==', ['get', 'name'], 'Stephen A. Schwarzman Building'],
            ['==', ['get', 'name'], 'NYPL'],
            ['==', ['get', 'type'], 'library'],
            // Empire State Building
            ['==', ['get', 'name'], 'Empire State Building'],
            ['==', ['get', 'name'], 'ESB'],
            // Chrysler Building
            ['==', ['get', 'name'], 'Chrysler Building'],
            // Grand Central
            ['==', ['get', 'name'], 'Grand Central Terminal'],
            ['==', ['get', 'name'], 'Grand Central Station'],
            ['==', ['get', 'name'], 'GCT'],
            ['==', ['get', 'type'], 'train_station'],
            // One World Trade Center
            ['==', ['get', 'name'], 'One World Trade Center'],
            ['==', ['get', 'name'], '1 WTC'],
            ['==', ['get', 'name'], 'Freedom Tower']
          ]
        ]
      ],
      'type': 'fill-extrusion',
      'minzoom': 14,
      'paint': {
        'fill-extrusion-color': '#ffffff',
        'fill-extrusion-height': [
          'interpolate', ['linear'], ['zoom'],
          14, 0,
          14.5, 4
        ],
        'fill-extrusion-base': 0,
        'fill-extrusion-opacity': 0.6,
        'fill-extrusion-vertical-gradient': true
      }
    });
  };

  useEffect(() => {
    if (map.current) {
      if (map.current.isStyleLoaded()) {
        applyBuildingStyling();
      } else {
        map.current.once('style.load', applyBuildingStyling);
      }
      map.current.on('zoom', applyBuildingStyling);
    }

    return () => {
      if (map.current) {
        map.current.off('style.load', applyBuildingStyling);
        map.current.off('zoom', applyBuildingStyling);
      }
    };
  }, [map.current]);

  return { applyBuildingStyling };
} 