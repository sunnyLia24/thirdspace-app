
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MapErrorProps {
  onSubmitToken: (token: string) => void;
}

const MapError: React.FC<MapErrorProps> = ({ onSubmitToken }) => {
  const [mapTokenInput, setMapTokenInput] = useState('');
  
  const handleSubmitToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapTokenInput.trim()) {
      onSubmitToken(mapTokenInput.trim());
    }
  };

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <Card className="w-11/12 max-w-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-dating-dark mb-4">Map Failed to Load</h2>
          <p className="text-sm text-gray-600 mb-4">
            Please enter your Mapbox token to initialize the map. You can find your token in your Mapbox account dashboard.
          </p>
          <form onSubmit={handleSubmitToken} className="space-y-4">
            <input
              type="text"
              value={mapTokenInput}
              onChange={(e) => setMapTokenInput(e.target.value)}
              placeholder="Enter your Mapbox token"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-full bg-dating-primary text-white py-2 px-4 rounded hover:bg-dating-primary/90 transition-colors"
            >
              Load Map
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapError;
