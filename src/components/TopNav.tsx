
import React from 'react';
import { Settings, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const TopNav = () => {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardContent className="p-2">
          <div className="flex flex-col gap-4">
            <Link 
              to="/settings" 
              className="p-3 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-200 group"
              aria-label="Settings"
            >
              <Settings className={cn(
                "h-6 w-6 text-dating-dark transition-transform duration-300",
                "group-hover:scale-110 group-hover:text-dating-primary"
              )} />
            </Link>
            <Link 
              to="/hotspots" 
              className="p-3 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-200 group"
              aria-label="Hotspots"
            >
              <MapPin className={cn(
                "h-6 w-6 text-dating-dark transition-transform duration-300",
                "group-hover:scale-110 group-hover:text-dating-primary"
              )} />
            </Link>
            <Link 
              to="/friends" 
              className="p-3 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-200 group"
              aria-label="Friends"
            >
              <Users className={cn(
                "h-6 w-6 text-dating-dark transition-transform duration-300",
                "group-hover:scale-110 group-hover:text-dating-primary"
              )} />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopNav;
