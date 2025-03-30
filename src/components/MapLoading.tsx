
import React from 'react';

const MapLoading: React.FC = () => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-80">
      <div className="w-12 h-12 border-4 border-dating-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default MapLoading;
