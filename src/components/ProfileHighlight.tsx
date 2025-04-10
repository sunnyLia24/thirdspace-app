
import React from 'react';
import { MapPin, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import PremiumPlans from './PremiumPlans';

interface ProfileHighlightProps {
  profile: {
    id: number;
    name: string;
    age: number;
    image: string;
    location: string;
  };
  isActive: boolean;
}

const ProfileHighlight: React.FC<ProfileHighlightProps> = ({ profile, isActive }) => {
  return (
    <div className="relative w-full h-full">
      {/* Image element */}
      <img
        src={profile.image || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"}
        alt={`${profile.name}'s profile`}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback image if the original fails to load
          e.currentTarget.src = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";
        }}
      />
      
      {/* Darker glassmorphism overlay covering the entire photo */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/50 pointer-events-none" />
      
      {/* Premium access button in the center with neon trace animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative">
              <Button 
                variant="outline" 
                className="bg-black/60 text-white border-white/50 hover:bg-black/70 backdrop-blur-sm"
              >
                <Lock className="h-4 w-4 mr-2" />
                <span className="text-neon">Premium Access</span>
              </Button>
              {/* Animated neon border trace effect outside the button */}
              <span className="absolute -inset-1 rounded-md border border-transparent outline outline-1 outline-offset-2 outline-dating-primary animate-border-trace"></span>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <PremiumPlans />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Content at bottom - name, age, location and upgrade now */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
        <h2 className="text-white text-4xl font-bold">{profile.name}</h2>
        <div className="flex items-center text-white text-2xl font-semibold">
          <span>{profile.age}</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-white/80">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{profile.location}</span>
          </div>
          
          {/* Upgrade Now text at bottom */}
          <Dialog>
            <DialogTrigger asChild>
              <span className="text-neon text-sm font-medium cursor-pointer">Upgrade Now</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
              <PremiumPlans />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ProfileHighlight;
