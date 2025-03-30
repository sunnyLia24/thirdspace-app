
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleBack}
      className={`rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg hover:shadow-dating-accent/10 transition-all duration-300 transform hover:-translate-y-1 ${className}`}
      aria-label="Back to map"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
