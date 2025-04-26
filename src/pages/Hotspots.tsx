import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, Star, Info, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import TopBanner from '@/components/TopBanner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Hotspot {
  id: string;
  name: string;
  type: 'cafe' | 'park' | 'landmark';
  matchPercentage?: number;
  distance?: string;
  image: string;
}

const FEATURED_HOTSPOTS: Hotspot[] = [
  {
    id: '1',
    name: 'Central Coffee Co.',
    type: 'cafe',
    matchPercentage: 85,
    distance: '0.2 mi',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb'
  },
  {
    id: '7',
    name: 'Sunset Beach',
    type: 'park',
    matchPercentage: 78,
    distance: '0.5 mi',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
  },
  {
    id: '8',
    name: 'Modern Art Gallery',
    type: 'landmark',
    matchPercentage: 72,
    distance: '1.2 mi',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04'
  }
];

const YOUR_HOTSPOTS: (Hotspot | null)[] = [
  {
    id: '2',
    name: 'Riverside Park',
    type: 'park',
    distance: '0.4 mi',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f'
  },
  {
    id: '3',
    name: 'Art Museum',
    type: 'landmark',
    image: 'https://images.unsplash.com/photo-1574217751179-c6897b0d4fd7'
  },
  null,
  null,
  null
];

const Hotspots = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? FEATURED_HOTSPOTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === FEATURED_HOTSPOTS.length - 1 ? 0 : prev + 1));
  };

  // Touch/mouse event handlers for swiping
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if ('touches' in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setOffsetX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    // If dragged more than 100px, switch cards
    if (Math.abs(offsetX) > 100) {
      if (offsetX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    
    setIsDragging(false);
    setOffsetX(0);
  };

  // Add event listeners for mouse/touch events
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleMouseMove = (e: MouseEvent) => handleDragMove(e as unknown as React.MouseEvent);
    const handleTouchMove = (e: TouchEvent) => handleDragMove(e as unknown as React.TouchEvent);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchEnd = () => handleDragEnd();

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  // Get the indices of the cards to display (previous, current, next)
  const getCardIndices = () => {
    const prevIndex = activeIndex === 0 ? FEATURED_HOTSPOTS.length - 1 : activeIndex - 1;
    const nextIndex = activeIndex === FEATURED_HOTSPOTS.length - 1 ? 0 : activeIndex + 1;
    return { prevIndex, currentIndex: activeIndex, nextIndex };
  };

  const { prevIndex, currentIndex, nextIndex } = getCardIndices();

  // Function to determine card position styles
  const getCardStyle = (index: number) => {
    if (index === currentIndex) {
      return {
        transform: `translateX(${offsetX}px) scale(1) translateZ(0)`,
        zIndex: 20,
        opacity: 1
      };
    } 
    else if (index === prevIndex) {
      const scale = isDragging && offsetX > 0 ? 0.9 + (Math.min(offsetX, 100) / 1000) : 0.9;
      return {
        transform: `translateX(calc(-85% + ${isDragging ? offsetX : 0}px)) scale(${scale}) translateZ(-50px)`,
        zIndex: 10,
        opacity: 0.8
      };
    } 
    else if (index === nextIndex) {
      const scale = isDragging && offsetX < 0 ? 0.9 + (Math.min(Math.abs(offsetX), 100) / 1000) : 0.9;
      return {
        transform: `translateX(calc(85% + ${isDragging ? offsetX : 0}px)) scale(${scale}) translateZ(-50px)`,
        zIndex: 10,
        opacity: 0.8
      };
    } 
    else {
      return {
        transform: 'translateX(150%) scale(0.8) translateZ(-100px)',
        zIndex: 5,
        opacity: 0
      };
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <TopBanner 
        title="Hotspots" 
      />

      <div className="container mx-auto px-4 py-6">
        {/* Featured Hotspot Carousel */}
        <div className="mb-8">
          <h2 className="font-medium text-gray-500 mb-4">highest match location near you</h2>
          
          <div 
            className="relative h-[400px] perspective"
            style={{ perspective: '1000px' }}
          >
            {/* Card Carousel */}
            <div 
              ref={carouselRef}
              className="relative w-full h-full"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              style={{
                transform: 'translateX(0)',
                transformStyle: 'preserve-3d'
              }}
            >
              {FEATURED_HOTSPOTS.map((hotspot, index) => (
                <Card 
                  key={hotspot.id}
                  className={cn(
                    "absolute top-0 left-0 right-0 overflow-hidden shadow-xl",
                    "transition-all duration-500 ease-out cursor-grab active:cursor-grabbing",
                  )}
                  style={{
                    width: '90%',
                    height: '100%',
                    margin: '0 auto',
                    ...getCardStyle(index)
                  }}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0">
                      <img
                        src={hotspot.image}
                        alt={hotspot.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Distance info - replacing match percentage */}
                    {hotspot.distance && (
                      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-dating-primary" />
                          <span className="text-sm font-medium text-gray-800">
                            {hotspot.distance}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Info buttons */}
                    <div className="absolute top-3 left-3">
                      <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 bg-white/80 backdrop-blur-sm shadow-md">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Location name - floating at the bottom without white bar */}
                    <div className="absolute bottom-4 left-4">
                      <h3 className="font-semibold text-xl text-white drop-shadow-lg">
                        {hotspot.name}
                      </h3>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Navigation buttons */}
            <Button 
              size="icon" 
              variant="secondary" 
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm shadow-md"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button 
              size="icon" 
              variant="secondary" 
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm shadow-md"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Indicator dots - moved below the carousel */}
          <div className="flex justify-center gap-2 mt-4 mb-8">
            {FEATURED_HOTSPOTS.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${index === activeIndex ? 'bg-dating-primary w-4' : 'bg-gray-300'}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Your Hotspots - Staggered layout */}
        <div className="mb-8">
          <h2 className="font-medium text-gray-500 mb-4">Your hotspots</h2>
          
          {/* First row - 3 circles */}
          <div className="flex justify-center gap-8 mb-6">
            {YOUR_HOTSPOTS.slice(0, 3).map((hotspot, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative mb-2">
                  <div className={cn(
                    "w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md",
                    "flex items-center justify-center",
                    !hotspot && "bg-gray-100"
                  )}>
                    {hotspot ? (
                      <img
                        src={hotspot.image}
                        alt={hotspot.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-2">
                        <Plus className="h-5 w-5 text-gray-400 mb-1" />
                        <span className="text-[10px] text-center text-gray-500 leading-tight">
                          tap to explore
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs text-center font-medium">
                  {hotspot ? hotspot.name : ""}
                </span>
              </div>
            ))}
          </div>
          
          {/* Second row - 2 circles, centered */}
          <div className="flex justify-center gap-8">
            {YOUR_HOTSPOTS.slice(3, 5).map((hotspot, index) => (
              <div key={index + 3} className="flex flex-col items-center">
                <div className="relative mb-2">
                  <div className={cn(
                    "w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md",
                    "flex items-center justify-center",
                    !hotspot && "bg-gray-100"
                  )}>
                    {hotspot ? (
                      <img
                        src={hotspot.image}
                        alt={hotspot.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-2">
                        <Plus className="h-5 w-5 text-gray-400 mb-1" />
                        <span className="text-[10px] text-center text-gray-500 leading-tight">
                          tap to explore
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs text-center font-medium">
                  {hotspot ? hotspot.name : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Explore More */}
        <div className="text-center mb-8">
          <p className="text-gray-500 mb-1">explore to unlock more hotspots</p>
          <p className="text-gray-500 mb-8">(3 miles)</p>
        </div>

        {/* Suggestion */}
        <div className="text-center">
          <p className="text-gray-500 mb-4">Have a hotspot suggestion?</p>
          <Button className="rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
            Submit location
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hotspots; 