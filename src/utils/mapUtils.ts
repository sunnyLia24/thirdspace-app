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

export const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1Ijoic3VubnkyNCIsImEiOiJjbTdtbDBzb2gwb2plMnBvY2lxbml0Z3pyIn0.OrQMpXUEaR_vN3MubP6JSw';

// Default location (New York City) for when geolocation fails
export const DEFAULT_LOCATION: [number, number] = [-74.0060, 40.7128];

// Map style constants for isometric, stylized look
export const MAP_STYLES = {
  ground: '#F0F4F7',  // Light gray background
  water: '#B6E1F2',   // Soft blue water
  roads: {
    primary: '#FFFFFF',    // White roads
    secondary: '#FFFFFF',  // White roads
    tertiary: '#FFFFFF'    // White roads
  },
  buildings: {
    residential: '#F2E0CB',  // Beige/tan for residential buildings
    commercial: '#E0E0E0',   // Light gray for commercial buildings
    landmark: '#E8DAB2',     // Tan for landmarks
    default: '#EEEEEE'       // Default building color
  },
  parks: '#B0D9A5',          // Bright green for parks
  trees: '#5DAE56',          // Vibrant green for trees
  parkingLot: '#E1E1E1',     // Light gray for parking lots
  shadows: 'rgba(0, 0, 0, 0.15)'  // Subtle shadows
};

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
