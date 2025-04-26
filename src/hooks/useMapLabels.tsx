import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export function useMapLabels(map: React.MutableRefObject<mapboxgl.Map | null>) {
  const removeLabels = () => {
    if (!map.current) return;

    // List of common label layer types
    const labelLayers = [
      'place-label',
      'poi-label',
      'road-label',
      'transit-label',
      'building-label',
      'water-label',
      'state-label',
      'country-label',
      'settlement-label',
      'neighborhood-label',
      'airport-label',
      'park-label',
      'mountain-label',
      'water-point-label',
      'water-line-label',
      'natural-point-label',
      'natural-line-label',
      'road-number-shield',
      'road-intersection',
      'transit-station-label',
      'transit-line-label',
      'building-number',
      'building-name'
    ];

    // Hide all label layers
    labelLayers.forEach(layerName => {
      if (map.current?.getLayer(layerName)) {
        map.current.setLayoutProperty(layerName, 'visibility', 'none');
      }
    });
  };

  useEffect(() => {
    if (map.current) {
      if (map.current.isStyleLoaded()) {
        removeLabels();
      } else {
        map.current.once('style.load', removeLabels);
      }
    }

    return () => {
      if (map.current) {
        map.current.off('style.load', removeLabels);
      }
    };
  }, [map.current]);

  return { removeLabels };
} 