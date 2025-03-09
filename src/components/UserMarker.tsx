
import React from 'react';
import { NearbyUser } from '@/data/nearbyUsers';
import { cn } from '@/lib/utils';

interface UserMarkerProps {
  user: NearbyUser;
  onClick: () => void;
}

const UserMarker: React.FC<UserMarkerProps> = ({ user, onClick }) => {
  return (
    <div 
      className="user-marker cursor-pointer transition-all duration-300 hover:scale-110"
      onClick={onClick}
      aria-label={`View ${user.name}'s profile`}
    >
      <div className="relative">
        {/* User image */}
        <div 
          className={cn(
            "w-10 h-10 rounded-full border-2 overflow-hidden",
            "border-white shadow-lg hover:shadow-xl"
          )}
        >
          <img 
            src={user.profileImage} 
            alt={user.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Compatibility indicator */}
        <div 
          className={cn(
            "absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
            "bg-dating-primary text-white border border-white shadow-sm"
          )}
        >
          {user.compatibility}%
        </div>
        
        {/* Name badge */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs shadow-sm whitespace-nowrap">
          {user.name}, {user.age}
        </div>
      </div>
    </div>
  );
};

export default UserMarker;
