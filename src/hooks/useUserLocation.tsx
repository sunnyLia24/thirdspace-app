
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { DEFAULT_LOCATION } from '@/utils/mapUtils';

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.longitude, position.coords.latitude]);
        },
        (error) => {
          console.error('Error getting user location:', error);
          setUserLocation(DEFAULT_LOCATION);
          toast({
            title: "Location access denied",
            description: "Using default location instead",
            variant: "default"
          });
        }
      );
    } else {
      setUserLocation(DEFAULT_LOCATION);
      toast({
        title: "Geolocation not supported",
        description: "Using default location instead",
        variant: "default"
      });
    }
  }, []);

  return { userLocation, setUserLocation };
}
