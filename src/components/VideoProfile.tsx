
import React, { useRef, useEffect, useState } from 'react';
import { Heart, MessageSquare, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoProfileProps {
  profile: {
    id: number;
    name: string;
    age: number;
    video: string;
    location: string;
    liked?: boolean;
  };
  isActive: boolean;
}

const VideoProfile: React.FC<VideoProfileProps> = ({ profile, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(profile.liked || false);
  
  // Handle video playback when this profile becomes active
  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.currentTime = 0;
      
      // Add a small delay to ensure smooth playback after scrolling
      const playPromise = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(err => {
            console.log("Video play failed:", err);
          });
        }
      }, 100);
      
      // Loop the video every 10 seconds
      const loopTimer = setInterval(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(err => {
            console.log("Video loop failed:", err);
          });
        }
      }, 10000);
      
      return () => {
        clearTimeout(playPromise);
        clearInterval(loopTimer);
        if (videoRef.current) {
          videoRef.current.pause();
        }
      };
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive]);
  
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
  
  return (
    <div className="relative w-full h-full">
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
        loop={false}
        poster={profile.video.replace('.mp4', '.jpg')}
      >
        <source src={profile.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
      
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
        {/* Profile info */}
        <div className="mb-6">
          <h2 className="text-white text-4xl font-bold">{profile.name}</h2>
          <div className="flex items-center text-white text-2xl font-semibold">
            <span>{profile.age}</span>
          </div>
          <div className="flex items-center text-white/80 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{profile.location}</span>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full h-12 w-12 bg-white/20 backdrop-blur-sm hover:bg-white/30"
            onClick={toggleLike}
          >
            <Heart 
              className={`h-6 w-6 ${isLiked ? 'fill-dating-primary text-dating-primary' : 'text-white'}`} 
            />
            <span className="sr-only">Like</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full h-12 w-12 bg-white/20 backdrop-blur-sm hover:bg-white/30"
          >
            <MessageSquare className="h-6 w-6 text-white" />
            <span className="sr-only">Message</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoProfile;
