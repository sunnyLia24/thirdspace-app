
import React from 'react';
import { Settings, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const TopNav = () => {
  return (
    <div className="absolute left-4 top-32 z-20 flex flex-col gap-6">
      <Link 
        to="/settings" 
        className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] flex items-center justify-center group"
        aria-label="Settings"
      >
        <Settings className={cn(
          "h-6 w-6 text-dating-dark transition-transform duration-300",
          "group-hover:scale-110 group-hover:text-dating-primary"
        )} />
      </Link>
      <Link 
        to="/hotspots" 
        className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] flex items-center justify-center group"
        aria-label="Hotspots"
      >
        <MapPin className={cn(
          "h-6 w-6 text-dating-dark transition-transform duration-300",
          "group-hover:scale-110 group-hover:text-dating-primary"
        )} />
      </Link>
      <Link 
        to="/friends" 
        className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] flex items-center justify-center group"
        aria-label="Friends"
      >
        <Users className={cn(
          "h-6 w-6 text-dating-dark transition-transform duration-300",
          "group-hover:scale-110 group-hover:text-dating-primary"
        )} />
      </Link>
    </div>
  );
};

export default TopNav;
