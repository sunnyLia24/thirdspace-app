
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
    <div className="profile-card w-full bg-white rounded-xl overflow-hidden mb-4 shadow-xl hover:shadow-2xl transition-all duration-300 card-3d">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
          <h3 className="text-white text-xl font-semibold text-3d">{title}</h3>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dating-accent/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {prompt && promptAnswer && (
        <div className="p-4 border-t border-gray-100 relative">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-dating-accent/30 to-transparent"></div>
          <p className="text-sm font-medium text-dating-dark">{prompt}</p>
          <p className="text-base mt-1">{promptAnswer}</p>
        </div>
      )}
      
      <div className="flex justify-between p-3 border-t border-gray-100">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 border-2 border-red-500 text-red-500 hover:bg-red-50 shadow-md hover:shadow-lg transition-shadow btn-hover-lift"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Pass</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 border-2 border-dating-primary text-dating-primary hover:bg-dating-light shadow-md hover:shadow-lg hover:shadow-dating-primary/20 transition-all duration-300 heart-button"
        >
          <Heart className="h-6 w-6" />
          <span className="sr-only">Like</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 border-2 border-dating-accent text-dating-accent hover:bg-blue-50 shadow-md hover:shadow-lg transition-shadow btn-hover-lift"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Comment</span>
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
