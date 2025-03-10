
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

// Map style constants for consistent styling
export const MAP_STYLES = {
  ground: '#FFFFFF',
  water: '#C7EEFF',
  roads: {
    primary: '#333333',
    secondary: '#403E43',
    tertiary: '#555555'
  },
  buildings: '#333333',
  parks: '#E8F5E9',
  trees: '#C8E6C9'
};
