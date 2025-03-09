
import React, { useState } from 'react';
import HomeButton from './HomeButton';
import TopNav from './TopNav';
import MapLoading from './MapLoading';
import MapError from './MapError';
import MapTitle from './MapTitle';
import { useMapbox } from '@/hooks/useMapbox';

interface MapViewProps {
  isNavVisible: boolean;
  toggleNav: () => void;
}

const MapView: React.FC<MapViewProps> = ({ isNavVisible, toggleNav }) => {
  const [customToken, setCustomToken] = useState('');
  const { mapContainer, loading, error, map } = useMapbox({ customToken });

  const handleSubmitToken = (token: string) => {
    setCustomToken(token);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Loading State */}
      {loading && <MapLoading />}
      
      {/* Map Container */}
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Top Navigation */}
      <TopNav />
      
      {/* Title Component */}
      <MapTitle />
      
      {/* Error State / Token Input */}
      {!map && !loading && (
        <MapError onSubmitToken={handleSubmitToken} />
      )}
      
      {/* Home Button and Bottom Nav */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center z-10">
        {isNavVisible && (
          <div className="mb-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg">
            <div className="flex space-x-4">
              {/* We'll leave this empty for now - the BottomNav component will be repositioned in MainLayout.tsx */}
            </div>
          </div>
        )}
        <HomeButton isActive={isNavVisible} onClick={toggleNav} />
      </div>
    </div>
  );
};

export default MapView;
