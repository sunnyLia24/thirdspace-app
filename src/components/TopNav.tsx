
import React from 'react';
import { Settings, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopNav = () => {
  return (
    <div className="absolute top-0 left-0 z-20 p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-full shadow-md flex items-center">
        <Link 
          to="/settings" 
          className="p-3 flex items-center justify-center hover:bg-gray-100 rounded-full"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5 text-dating-dark" />
        </Link>
        <Link 
          to="/hotspots" 
          className="p-3 flex items-center justify-center hover:bg-gray-100 rounded-full"
          aria-label="Hotspots"
        >
          <MapPin className="h-5 w-5 text-dating-dark" />
        </Link>
        <Link 
          to="/friends" 
          className="p-3 flex items-center justify-center hover:bg-gray-100 rounded-full"
          aria-label="Friends"
        >
          <Users className="h-5 w-5 text-dating-dark" />
        </Link>
      </div>
    </div>
  );
};

export default TopNav;
