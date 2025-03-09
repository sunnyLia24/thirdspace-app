
import React from 'react';
import { MapPin } from 'lucide-react';

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
      
      {/* Full glassmorphism overlay covering the entire photo */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30 pointer-events-none" />
      
      {/* Content at bottom - name, age and location */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
        <h2 className="text-white text-4xl font-bold">{profile.name}</h2>
        <div className="flex items-center text-white text-2xl font-semibold">
          <span>{profile.age}</span>
        </div>
        
        <div className="flex items-center text-white/80 mt-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{profile.location}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHighlight;
