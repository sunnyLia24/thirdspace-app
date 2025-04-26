import React from 'react';
import { cn } from '@/lib/utils';

interface HotspotMarkerProps {
  hotspot: {
    id: string;
    name: string;
    type: string;
    description?: string;
    imageUrl?: string;
  };
  onClick: () => void;
}

const HotspotMarker: React.FC<HotspotMarkerProps> = ({ hotspot, onClick }) => {
  return (
    <div 
      className="relative cursor-pointer group"
      onClick={onClick}
      aria-label={`View ${hotspot.name} details`}
    >
      <div className="transform transition-transform duration-300 group-hover:scale-110">
        {/* Hotspot icon */}
        <div 
          className={cn(
            "w-12 h-12 rounded-full border-2 overflow-hidden",
            "border-white shadow-lg group-hover:shadow-xl",
            "bg-gradient-to-br from-blue-500 to-purple-600"
          )}
        >
          {hotspot.imageUrl ? (
            <img 
              src={hotspot.imageUrl} 
              alt={hotspot.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          )}
        </div>
        
        {/* Name badge */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-0.5 rounded-full text-xs shadow-md whitespace-nowrap border border-gray-100">
          {hotspot.name}
        </div>
        
        {/* Type indicator */}
        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-white text-blue-600 border border-blue-200 shadow-sm">
          {hotspot.type === 'coffee' ? '☕' : 
           hotspot.type === 'library' ? '📚' : '📍'}
        </div>
      </div>
    </div>
  );
};

export default HotspotMarker; 