
import React, { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface TopBannerProps {
  title: string;
  leftIcon?: ReactNode;
  rightContent?: ReactNode;
  onBackClick?: () => void;
  showBackButton?: boolean;
}

const TopBanner = ({
  title,
  leftIcon,
  rightContent,
  onBackClick,
  showBackButton = true,
}: TopBannerProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-md pt-2 pb-1 sticky top-0 z-10 shadow-sm border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {showBackButton ? (
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-white/30 transition-colors"
              onClick={handleBackClick}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : (
            <div className="w-10"></div> // Empty space for alignment
          )}
          
          <div className="flex items-center">
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          
          {rightContent || <div className="w-10"></div>}
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
