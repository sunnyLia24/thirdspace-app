
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, X, MessageCircle } from 'lucide-react';

interface ProfileCardProps {
  image: string;
  title: string;
  prompt?: string;
  promptAnswer?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  image, 
  title, 
  prompt, 
  promptAnswer 
}) => {
  return (
    <div className="profile-card w-full bg-white rounded-xl overflow-hidden mb-4">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-xl font-semibold">{title}</h3>
        </div>
      </div>
      
      {prompt && promptAnswer && (
        <div className="p-4 border-t border-gray-100">
          <p className="text-sm font-medium text-dating-dark">{prompt}</p>
          <p className="text-base mt-1">{promptAnswer}</p>
        </div>
      )}
      
      <div className="flex justify-between p-3 border-t border-gray-100">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 border-2 border-red-500 text-red-500 hover:bg-red-50"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Pass</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 border-2 border-dating-primary text-dating-primary hover:bg-pink-50"
        >
          <Heart className="h-6 w-6" />
          <span className="sr-only">Like</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Comment</span>
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
