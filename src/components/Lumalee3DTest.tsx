import React from 'react';
import Lumalee3D from './Lumalee3D';

const Lumalee3DTest: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Lumalee 3D Test</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Lumalee3D size={1.5} enableControls={true} />
      </div>
      
      <p className="mt-4 text-gray-600">
        You can rotate, zoom in/out, and pan the 3D character using your mouse.
      </p>
      
      <div className="mt-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Changes Made:</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>Fixed solid appearance by removing transparent materials</li>
          <li>Replaced random flame animations with subtle bobbing</li>
          <li>Fixed positioning on map with proper anchoring</li>
          <li>Disabled OrbitControls in map view</li>
          <li>Added proper scaling based on zoom level</li>
        </ul>
      </div>
    </div>
  );
};

export default Lumalee3DTest; 