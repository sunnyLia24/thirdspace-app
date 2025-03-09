
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TopBanner from '@/components/TopBanner';
import VideoProfile from '@/components/VideoProfile';
import { useNavigate } from 'react-router-dom';

const RewindPage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Sample data for videos
  // In a real application, these would come from your API
  const profiles = [
    {
      id: 1,
      name: 'Leslie',
      age: 23,
      video: '/videos/profile1.mp4', // These should be real video paths in your public folder
      location: 'Phoenix, USA',
    },
    {
      id: 2,
      name: 'Olivia',
      age: 26,
      video: '/videos/profile2.mp4',
      location: 'Los Angeles, USA',
    },
    {
      id: 3,
      name: 'Liam',
      age: 29,
      video: '/videos/profile3.mp4',
      location: 'New York, USA',
    },
    {
      id: 4,
      name: 'Ava',
      age: 27,
      video: '/videos/profile4.mp4',
      location: 'Chicago, USA',
    }
  ];

  // Handle scroll detection to determine active profile
  const handleScroll = () => {
    if (containerRef.current) {
      const scrollPos = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      
      // Calculate which profile is most visible
      const index = Math.round(scrollPos / windowHeight);
      setActiveIndex(Math.min(index, profiles.length - 1));
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Navigate back function
  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Fixed back button at the top */}
      <div className="absolute top-0 left-0 z-20 p-4">
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full h-10 w-10 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white"
          onClick={goBack}
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Premium badge (optional) */}
      <div className="absolute top-4 right-4 z-20">
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-dating-accent to-purple-500 hover:from-purple-500 hover:to-dating-accent rounded-full shadow-lg px-3 py-1 h-auto text-xs"
        >
          <Crown className="h-3 w-3 mr-1" />
          <span>PREMIUM</span>
        </Button>
      </div>
      
      {/* Scrollable container for videos */}
      <div 
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory"
        style={{ scrollbarWidth: 'none' }} // Hide scrollbar for Firefox
      >
        {/* Hide scrollbar for Chrome, Safari and Opera */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {profiles.map((profile, index) => (
          <div 
            key={profile.id}
            className="h-screen w-full snap-start snap-always"
          >
            <VideoProfile 
              profile={profile} 
              isActive={activeIndex === index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewindPage;
