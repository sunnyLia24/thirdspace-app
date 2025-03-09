
import React, { useState } from 'react';
import HomeButton from './HomeButton';
import TopNav from './TopNav';
import MapLoading from './MapLoading';
import MapError from './MapError';
import MapTitle from './MapTitle';
import { useMapbox } from '@/hooks/useMapbox';
import { Toaster } from './ui/toaster';

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
      {/* Map Container - place this first so it's behind other elements */}
      <div ref={mapContainer} className="absolute inset-0" style={{ cursor: 'grab' }} />
      
      {/* Loading State */}
      {loading && <MapLoading />}
      
      {/* Top Navigation */}
      <TopNav />
      
      {/* Title Component */}
      <MapTitle />
      
      {/* Error State / Token Input */}
      {error && (
        <MapError onSubmitToken={handleSubmitToken} />
      )}
      
      {/* Rotation Instructions */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full py-1 px-3 text-xs font-medium shadow-md z-10 pointer-events-none">
        Right-click + drag to rotate around Lumalee
      </div>
      
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
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default MapView;
