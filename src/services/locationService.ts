interface PointOfInterest {
  id: number;
  name: string;
  type: 'cafe' | 'park' | 'landmark';
  location: [number, number];
}

export async function fetchNearbyLocations(
  center: [number, number],
  radius: number = 1000
): Promise<PointOfInterest[]> {
  const [lat, lon] = center;
  
  // Overpass API query to find cafes and parks
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="cafe"](around:${radius},${lat},${lon});
      way["leisure"="park"](around:${radius},${lat},${lon});
      node["tourism"="attraction"](around:${radius},${lat},${lon});
    );
    out body;
    >;
    out skel qt;
  `;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query
    });

    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }

    const data = await response.json();
    
    return data.elements
      .filter((element: any) => element.tags && element.tags.name)
      .map((element: any) => ({
        id: element.id,
        name: element.tags.name,
        type: element.tags.amenity === 'cafe' 
          ? 'cafe' 
          : element.tags.leisure === 'park'
          ? 'park'
          : 'landmark',
        location: [
          element.lon || element.center.lon,
          element.lat || element.center.lat
        ] as [number, number]
      }));
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
} 