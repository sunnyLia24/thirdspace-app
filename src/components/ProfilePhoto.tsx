
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProfilePhotoProps {
  photo: string;
  index: number;
  userName: string;
  isPressedImage: boolean;
  onPressStart: (e: React.MouseEvent | React.TouchEvent, content: string, type: string) => void;
  onPressEnd: () => void;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  photo,
  index,
  userName,
  isPressedImage,
  onPressStart,
  onPressEnd
}) => {
  return (
    <Card className="rounded-xl shadow-md overflow-hidden">
      <div className="relative">
        <img 
          src={photo} 
          alt={`${userName}'s photo ${index + 1}`} 
          className="w-full h-[400px] object-cover transition-all duration-150"
          style={{
            boxShadow: isPressedImage
              ? 'none'
              : '0 16px 32px rgba(0, 0, 0, 0.25), 0 0 15px rgba(185, 230, 243, 0.4)'
          }}
          onMouseDown={(e) => onPressStart(e, `${userName}'s additional photo ${index + 1}`, 'image')}
          onMouseUp={onPressEnd}
          onMouseLeave={onPressEnd}
          onTouchStart={(e) => onPressStart(e, `${userName}'s additional photo ${index + 1}`, 'image')}
          onTouchEnd={onPressEnd}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
          <Button 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-rose-400"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProfilePhoto;
