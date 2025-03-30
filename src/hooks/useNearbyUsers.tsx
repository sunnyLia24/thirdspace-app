import { useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';
import UserMarker from '@/components/UserMarker';
import { nearbyUsers, NearbyUser } from '@/data/nearbyUsers';
import { getDestinationPoint } from '@/utils/mapUtils';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';

export function useNearbyUsers(map: React.MutableRefObject<mapboxgl.Map | null>) {
  const userMarkersRef = useRef<{marker: mapboxgl.Marker, user: NearbyUser}[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const displayNearbyUsers = (currentLocation: [number, number]) => {
    if (!map.current) return;

    userMarkersRef.current.forEach(({ marker }) => {
      marker.remove();
    });
    userMarkersRef.current = [];

    nearbyUsers.forEach((user, index) => {
      const angle = (index * 90) + Math.random() * 45;
      const userPos = getDestinationPoint(
        currentLocation[0], 
        currentLocation[1], 
        user.distance, 
        angle
      );
      
      user.location = userPos;
      
      const markerElement = document.createElement('div');
      markerElement.className = 'marker-container';

      createUserMarker(markerElement, user);
      
      const marker = new mapboxgl.Marker({
        element: markerElement,
        anchor: 'bottom'
      })
        .setLngLat(userPos)
        .addTo(map.current);
      
      userMarkersRef.current.push({ marker, user });
    });
  };

  const updateNearbyUsers = (newUserLocation: [number, number]) => {
    userMarkersRef.current.forEach(({ marker, user }) => {
      const userPos = getDestinationPoint(
        newUserLocation[0],
        newUserLocation[1],
        user.distance,
        Math.atan2(
          user.location[1] - newUserLocation[1],
          user.location[0] - newUserLocation[0]
        ) * (180 / Math.PI)
      );
      
      user.location = userPos;
      
      marker.setLngLat(userPos);
    });
  };

  const createUserMarker = (container: HTMLElement, user: NearbyUser) => {
    const handleClick = () => {
      console.log(`Clicked on user: ${user.name}`);
      
      navigate(`/profile/${user.id}`);
    };

    container.className = 'user-marker-container';

    ReactDOM.render(
      <UserMarker user={user} onClick={handleClick} />,
      container
    );
  };

  const cleanupUserMarkers = () => {
    userMarkersRef.current.forEach(({ marker }) => {
      marker.remove();
    });
    userMarkersRef.current = [];
  };

  return {
    displayNearbyUsers,
    updateNearbyUsers,
    cleanupUserMarkers,
    userMarkersRef
  };
}
