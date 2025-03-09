
import React from 'react';
import { MapPin, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileHighlightProps {
  profile: {
    id: number;
    name: string;
    age: number;
    image: string;
    location: string;
  };
  isActive: boolean;
}

const ProfileHighlight: React.FC<ProfileHighlightProps> = ({ profile, isActive }) => {
  return (
    <div className="relative w-full h-full">
      {/* Image element */}
      <img
        src={profile.image || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"}
        alt={`${profile.name}'s profile`}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback image if the original fails to load
          e.currentTarget.src = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";
        }}
      />
      
      {/* Darker glassmorphism overlay covering the entire photo */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/50 pointer-events-none" />
      
      {/* Premium access button in the center with neon trace animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Button 
          variant="outline" 
          className="relative bg-black/60 text-white border-white/50 hover:bg-black/70 backdrop-blur-sm overflow-hidden"
        >
          <Lock className="h-4 w-4 mr-2" />
          <span className="text-neon">Premium Access</span>
          {/* Animated neon border trace effect */}
          <span className="absolute inset-0 border border-dating-primary opacity-0 animate-left-to-right"></span>
        </Button>
      </div>
      
      {/* Content at bottom - name, age, location and upgrade now */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
        <h2 className="text-white text-4xl font-bold">{profile.name}</h2>
        <div className="flex items-center text-white text-2xl font-semibold">
          <span>{profile.age}</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-white/80">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{profile.location}</span>
          </div>
          
          {/* Upgrade Now text at bottom */}
          <span className="text-neon text-sm font-medium">Upgrade Now</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHighlight;
