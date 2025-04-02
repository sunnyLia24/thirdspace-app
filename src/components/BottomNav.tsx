import React, { useState } from 'react';
import { Heart, MessageCircle, Sparkles, UserRound, Rewind, Search, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BottomNavProps {
  visible: boolean;
  currentRoute: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ visible, currentRoute }) => {
  const [buttonPressed, setButtonPressed] = useState<string | null>(null);
  
  const navItems = [
    { 
      icon: Rewind, 
      label: 'Rewind', 
      route: '/rewind',
      color: '#FFD166'
    },
    { 
      icon: MessageCircle, 
      label: 'Chat', 
      route: '/messages',
      color: '#1AA4DA'
    },
    { 
      icon: null, // Placeholder for center button
      label: 'Explore', 
      route: '/explore',
      color: 'transparent'
    },
    { 
      icon: Sparkles, 
      label: 'Standouts', 
      route: '/standouts',
      color: '#FFD166'
    },
    { 
      icon: UserRound, 
      label: 'Profile', 
      route: '/profile',
      color: '#1AA4DA'
    },
  ];

  const handleButtonPress = (route: string) => {
    setButtonPressed(route);
    
    // Reset the pressed state after animation completes
    setTimeout(() => {
      setButtonPressed(null);
    }, 300);
  };

  return (
    <div 
      className={`w-full bg-white h-14 border-t border-gray-100
        transition-transform duration-300 ease-in-out
        ${visible ? 'transform translate-y-0' : 'transform translate-y-full'}`}
    >
      <div className="w-full h-full">
        <div className="flex justify-around items-center h-full relative">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;
            const isPressed = buttonPressed === item.route;
            
            // Special center button
            if (index === 2) {
              return (
                <div 
                  key={item.label}
                  className="relative flex flex-col items-center justify-center"
                >
                  <Link 
                    to={item.route}
                    className="absolute -top-5 w-12 h-12 rounded-full bg-butter flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 pulse-effect"
                    onClick={() => handleButtonPress(item.route)}
                    aria-label={item.label}
                  >
                    <Compass className="h-6 w-6 text-white" />
                  </Link>
                  <span className="text-[10px] font-medium mt-6 text-gray-500">{item.label}</span>
                </div>
              );
            }
            
            return (
              <Link 
                to={item.route} 
                key={item.label}
                className={`flex flex-col items-center justify-center space-y-0 py-1 transition-all
                  ${isPressed ? 'transform scale-90' : 'transform scale-100'}
                  ${isActive ? 'text-dating-primary' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => handleButtonPress(item.route)}
                style={{ transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                {Icon && (
                  <div className="p-1 rounded-full relative">
                    <Icon 
                      className={`h-5 w-5 transition-colors duration-200 ease-out
                        ${isActive ? '' : 'text-gray-500'}`} 
                      style={{ 
                        color: isActive ? item.color : '' 
                      }} 
                    />
                    {isActive && (
                      <span 
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                    )}
                  </div>
                )}
                <span 
                  className={`text-[10px] font-medium transition-colors duration-200 ease-out
                    ${isActive ? 'font-semibold' : ''}`}
                  style={{ 
                    color: isActive ? item.color : '' 
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
