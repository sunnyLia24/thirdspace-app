
import React from 'react';
import { Settings, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const TopNav = () => {
  return (
    <div className="absolute left-4 top-20 z-20 flex flex-col gap-6">
      <Link 
        to="/settings" 
        className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] flex items-center justify-center group relative"
        aria-label="Settings"
      >
        <div className="absolute inset-0 rounded-full bg-dating-accent/0 group-hover:bg-dating-accent/10 transition-colors duration-300"></div>
        <Settings className={cn(
          "h-6 w-6 text-dating-dark transition-transform duration-300 z-10",
          "group-hover:scale-110 group-hover:text-dating-primary"
        )} />
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(185,230,243,0.5)] transition-opacity duration-300"></div>
      </Link>
      <Link 
        to="/hotspots" 
        className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] flex items-center justify-center group relative"
        aria-label="Hotspots"
      >
        <div className="absolute inset-0 rounded-full bg-dating-accent/0 group-hover:bg-dating-accent/10 transition-colors duration-300"></div>
        <MapPin className={cn(
          "h-6 w-6 text-dating-dark transition-transform duration-300 z-10",
          "group-hover:scale-110 group-hover:text-dating-primary"
        )} />
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(185,230,243,0.5)] transition-opacity duration-300"></div>
      </Link>
      <Link 
        to="/friends" 
        className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] flex items-center justify-center group relative"
        aria-label="Friends"
      >
        <div className="absolute inset-0 rounded-full bg-dating-accent/0 group-hover:bg-dating-accent/10 transition-colors duration-300"></div>
        <Users className={cn(
          "h-6 w-6 text-dating-dark transition-transform duration-300 z-10",
          "group-hover:scale-110 group-hover:text-dating-primary"
        )} />
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(185,230,243,0.5)] transition-opacity duration-300"></div>
      </Link>
    </div>
  );
};

export default TopNav;
