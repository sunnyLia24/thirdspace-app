
// Sample nearby users data to display on the map
export interface NearbyUser {
  id: string;
  name: string;
  age: number;
  distance: number; // distance in meters
  location: [number, number]; // [longitude, latitude]
  profileImage: string;
  compatibility: number; // percentage of compatibility
}

export const nearbyUsers: NearbyUser[] = [
  {
    id: "user1",
    name: "Emma",
    age: 26,
    distance: 120,
    location: [0, 0], // Will be set dynamically based on user location
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    compatibility: 87
  },
  {
    id: "user2",
    name: "Michael",
    age: 29,
    distance: 250,
    location: [0, 0], // Will be set dynamically based on user location
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    compatibility: 92
  },
  {
    id: "user3",
    name: "Sophia",
    age: 24,
    distance: 180,
    location: [0, 0], // Will be set dynamically based on user location
    profileImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    compatibility: 78
  },
  {
    id: "user4",
    name: "David",
    age: 31,
    distance: 320,
    location: [0, 0], // Will be set dynamically based on user location
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    compatibility: 85
  }
];
