import React, { useState } from 'react';
import ProfileSettingTemplate from '@/components/ProfileSettingTemplate';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, RefreshCw } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const ProfileLocation = () => {
  const [location, setLocation] = useState("Hell's Kitchen");
  const [isDetecting, setIsDetecting] = useState(false);
  
  const handleUseCurrentLocation = () => {
    setIsDetecting(true);
    
    // Simulate getting the location after a delay
    setTimeout(() => {
      setLocation("Manhattan, New York");
      setIsDetecting(false);
    }, 2000);
  };
  
  const handleSave = () => {
    // In a real app, you would save this to your backend
    console.log('Saving location:', location);
  };

  return (
    <ProfileSettingTemplate 
      title="Location" 
      onSave={handleSave}
    >
      <div className="p-4">
        <p className="text-gray-500 mb-6">
          Your location helps us find potential matches near you. You can enter it manually or use your current location.
        </p>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="location" className="text-gray-700 font-medium block mb-2">
              Your Location
            </Label>
            <div className="flex">
              <div className="relative flex-grow">
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location"
                  className="w-full border-gray-200 focus:border-purple-800 focus:ring-purple-800 pr-10"
                  disabled={isDetecting}
                />
                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <Separator className="flex-grow" />
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <Separator className="flex-grow" />
          </div>
          
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleUseCurrentLocation}
            disabled={isDetecting}
          >
            {isDetecting ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Navigation className="h-4 w-4" />
            )}
            {isDetecting ? "Detecting your location..." : "Use Current Location"}
          </Button>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-800 font-medium mb-2">Location Privacy</h3>
            <p className="text-gray-600 text-sm">
              Your exact location is never shared with other users. We only show approximate
              distances to protect your privacy.
            </p>
          </div>
        </div>
      </div>
    </ProfileSettingTemplate>
  );
};

export default ProfileLocation; 