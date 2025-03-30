import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBanner from '@/components/TopBanner';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share } from 'lucide-react';

const QrCode = () => {
  const navigate = useNavigate();
  const userId = "USER12345"; // This would be fetched from user context/state

  // Generate QR code image URL - in a real app, this would be generated on the backend
  // Here we're using a simple online QR code generator as an example
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${userId}`;

  return (
    <div className="min-h-screen bg-white">
      <TopBanner 
        title="My QR Code" 
        showBackButton={true}
        onBackClick={() => navigate(-1)}
      />

      <div className="container mx-auto px-4 pt-8 pb-20 flex flex-col items-center">
        {/* QR Code Display */}
        <div className="p-6 bg-white rounded-xl shadow-md mb-6">
          <img 
            src={qrCodeUrl} 
            alt="Your QR Code" 
            className="w-64 h-64"
          />
        </div>

        {/* User ID */}
        <div className="text-center mb-8">
          <p className="text-gray-500 mb-2">Your ID</p>
          <h2 className="text-2xl font-bold tracking-wider">{userId}</h2>
        </div>

        {/* Instructions */}
        <div className="text-center max-w-md mb-8">
          <p className="text-gray-600">
            Share your QR code with friends to connect instantly. They can scan it with their camera in the app.
          </p>
        </div>

        {/* Share Button */}
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => {
            // Share functionality would go here
            console.log('Share QR code');
          }}
        >
          <Share className="h-4 w-4" />
          Share My QR Code
        </Button>
      </div>
    </div>
  );
};

export default QrCode; 