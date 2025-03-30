import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ProfileHighlight from '@/components/ProfileHighlight';

const RewindPage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Sample data for profiles with updated image paths
  const profiles = [
    {
      id: 1,
      name: 'Leslie',
      age: 23,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      location: 'Phoenix, USA',
    },
    {
      id: 2,
      name: 'Olivia',
      age: 26,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      location: 'Los Angeles, USA',
    },
    {
      id: 3,
      name: 'Liam',
      age: 29,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      location: 'New York, USA',
    },
    {
      id: 4,
      name: 'Ava',
      age: 27,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
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
      
      {/* Scrollable container for profiles */}
      <div 
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory hide-scrollbar"
      >
        {profiles.map((profile, index) => (
          <div 
            key={profile.id}
            className="h-screen w-full snap-start snap-always"
          >
            <ProfileHighlight 
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
