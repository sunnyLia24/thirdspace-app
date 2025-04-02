import React from 'react';
import { Settings, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const TopNav = () => {
  return (
    <div className="absolute left-4 top-4 z-20 flex flex-col gap-3">
      <Link 
        to="/settings" 
        className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] flex items-center justify-center group relative"
        aria-label="Settings"
      >
        <div className="absolute inset-0 rounded-full bg-azure/0 group-hover:bg-azure/10 transition-colors duration-300"></div>
        <Settings className={cn(
          "h-5 w-5 text-darkgray transition-transform duration-300 z-10",
          "group-hover:scale-110 group-hover:text-azure"
        )} />
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(26,164,218,0.5)] transition-opacity duration-300"></div>
      </Link>
      <Link 
        to="/hotspots" 
        className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] flex items-center justify-center group relative"
        aria-label="Hotspots"
      >
        <div className="absolute inset-0 rounded-full bg-azure/0 group-hover:bg-azure/10 transition-colors duration-300"></div>
        <MapPin className={cn(
          "h-5 w-5 text-darkgray transition-transform duration-300 z-10",
          "group-hover:scale-110 group-hover:text-azure"
        )} />
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(26,164,218,0.5)] transition-opacity duration-300"></div>
      </Link>
      <Link 
        to="/friends" 
        className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] flex items-center justify-center group relative"
        aria-label="Friends"
      >
        <div className="absolute inset-0 rounded-full bg-azure/0 group-hover:bg-azure/10 transition-colors duration-300"></div>
        <Users className={cn(
          "h-5 w-5 text-darkgray transition-transform duration-300 z-10",
          "group-hover:scale-110 group-hover:text-azure"
        )} />
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(26,164,218,0.5)] transition-opacity duration-300"></div>
      </Link>
    </div>
  );
};

export default TopNav;
