// Utility function to calculate a destination point given a starting point, distance, and bearing
export function getDestinationPoint(
  startLng: number, 
  startLat: number, 
  distanceMeters: number, 
  bearingDegrees: number
): [number, number] {
  const R = 6371000;
  const bearing = (bearingDegrees * Math.PI) / 180;
  const lat1 = (startLat * Math.PI) / 180;
  const lon1 = (startLng * Math.PI) / 180;
  const angularDistance = distanceMeters / R;
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(angularDistance) +
    Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(bearing)
  );
  const lon2 = lon1 + Math.atan2(
    Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(lat1),
    Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2)
  );
  const newLat = (lat2 * 180) / Math.PI;
  const newLng = (lon2 * 180) / Math.PI;
  return [newLng, newLat];
}

// Utility function to calculate distance between two coordinates (Haversine formula)
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180; 
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  const distance = R * c; // Distance in km
  return distance;
}

export const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1Ijoic3VubnkyNCIsImEiOiJjbTdtbDBzb2gwb2plMnBvY2lxbml0Z3pyIn0.OrQMpXUEaR_vN3MubP6JSw';

// Default location (Bryant Park, NYC) for when geolocation fails
export const DEFAULT_LOCATION: [number, number] = [-73.9832, 40.7536];

// Isometric view settings
export const ISOMETRIC_VIEW = {
  pitch: 50,           // Pitched up for 3D effect
  bearing: 30,         // Slight rotation for isometric look
  maxPitch: 60,        // Maximum allowed pitch
  minZoom: 14,         // Keep zoom close enough to see details
  maxZoom: 19,         // Don't allow too much zoom
  padding: {           // Default padding for map movements
    top: 100,
    bottom: 100,
    left: 100,
    right: 100
  }
};

// Map style configurations
export const MAP_STYLES = {
  default: 'mapbox://styles/mapbox/light-v11',
  dark: 'mapbox://styles/mapbox/dark-v11',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  streets: 'mapbox://styles/mapbox/streets-v12'
};
