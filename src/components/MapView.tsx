import React, { useState } from 'react';
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

const MapView: React.FC<MapViewProps> = ({ isNavVisible }) => {
  const [customToken, setCustomToken] = useState('');
  const { mapContainer, loading, error, map } = useMapbox({ customToken });

  const handleSubmitToken = (token: string) => {
    setCustomToken(token);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Map Container - place this first so it's behind other elements */}
      <div ref={mapContainer} className="absolute inset-0" style={{ cursor: 'grab' }} />
      
      {/* Gradient overlay for aesthetic appeal */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-dating-light/30 to-transparent z-[1]" />
      
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
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default MapView;
