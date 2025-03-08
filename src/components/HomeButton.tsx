
import React from 'react';
import { Heart } from 'lucide-react';

interface HomeButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ isActive, onClick }) => {
  return (
    <button
      className={`heart-button p-4 rounded-full bg-gradient-to-r from-dating-primary to-dating-secondary
        transition-all duration-300 shadow-lg z-20 ${isActive ? 'scale-110' : 'scale-100'}`}
      onClick={onClick}
      aria-label="Toggle navigation"
    >
      <Heart className="w-8 h-8 text-white animate-pulse-gentle" fill="white" />
    </button>
  );
};

export default HomeButton;
