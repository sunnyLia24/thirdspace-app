
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
        src={profile.image}
        alt={`${profile.name}'s profile`}
        className="w-full h-full object-cover"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
      
      {/* Glassmorphism info panel at top */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="backdrop-blur-md bg-white/10 rounded-xl shadow-lg border border-white/20 p-4">
          <h2 className="text-white text-4xl font-bold">{profile.name}</h2>
          <div className="flex items-center text-white text-2xl font-semibold">
            <span>{profile.age}</span>
          </div>
        </div>
      </div>
      
      {/* Content overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
        <div className="backdrop-blur-md bg-black/30 rounded-xl p-4 border border-white/10">
          <div className="flex items-center text-white/80">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{profile.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHighlight;
