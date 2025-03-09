
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

interface ProfilePhotoProps {
  photo: string;
  index: number;
  userName: string;
  onPressStart: (e: React.MouseEvent | React.TouchEvent, content: string, type: string) => void;
  onPressEnd: () => void;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  photo,
  index,
  userName,
  onPressStart,
  onPressEnd
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handlePressStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsPressed(true);
    onPressStart(e, `${userName}'s additional photo ${index + 1}`, 'image');
  };
  
  const handlePressEnd = () => {
    setIsPressed(false);
    onPressEnd();
  };
  
  return (
    <Card className={`rounded-xl overflow-hidden transition-all duration-150 ${
      isPressed ? 'shadow-none transform scale-[0.98]' : 'shadow-md'
    }`}>
      <div className="relative">
        <img 
          src={photo} 
          alt={`${userName}'s photo ${index + 1}`} 
          className="w-full h-[400px] object-cover"
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
        />
      </div>
    </Card>
  );
};

export default ProfilePhoto;
