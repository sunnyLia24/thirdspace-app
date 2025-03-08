
import React from 'react';
import { Heart, MessageCircle, Sparkles, UserRound, Rewind } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BottomNavProps {
  visible: boolean;
  currentRoute: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ visible, currentRoute }) => {
  const navItems = [
    { icon: Rewind, label: 'Rewind', route: '/rewind' },
    { icon: MessageCircle, label: 'Messages', route: '/messages' },
    { icon: Sparkles, label: 'Standouts', route: '/standouts' },
    { icon: UserRound, label: 'Profile', route: '/profile' },
  ];

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg 
        transition-transform duration-300 ease-in-out z-10
        ${visible ? 'transform translate-y-0' : 'transform translate-y-full'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;
            
            return (
              <Link 
                to={item.route} 
                key={item.label}
                className={`flex flex-col items-center justify-center space-y-1 py-2 px-3 rounded-lg transition-colors
                  ${isActive ? 'text-dating-primary' : 'text-gray-500 hover:text-dating-secondary'}`}
              >
                <Icon className={`h-6 w-6 ${isActive ? 'text-dating-primary' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
