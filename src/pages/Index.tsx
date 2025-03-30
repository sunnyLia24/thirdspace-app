// Update this page (the content is just a fallback if you fail to update the page)

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { nearbyUsers } from '@/data/nearbyUsers';
import { Button } from '@/components/ui/button';
import { Heart, X, Star, ThumbsUp, MessageCircle } from 'lucide-react';

const MAX_ROTATION = 20; // Maximum card rotation in degrees
const SWIPE_THRESHOLD = 100; // Minimum swipe distance to trigger action

const Index = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<null | 'left' | 'right'>(null);
  const [showEmptyState, setShowEmptyState] = useState(false);
  
  // Motion values for the card's position and rotation
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-MAX_ROTATION, 0, MAX_ROTATION]);
  const cardOpacity = useTransform(x, [-100, 0, 100], [0.7, 1, 0.7]);
  
  // References for swipe gestures
  const constraintsRef = useRef(null);
  
  // Reset position when card index changes
  useEffect(() => {
    x.set(0);
  }, [currentIndex, x]);
  
  // Get current profile
  const currentProfile = nearbyUsers[currentIndex];
  
  // Check if we've gone through all profiles
  useEffect(() => {
    if (currentIndex >= nearbyUsers.length) {
      setShowEmptyState(true);
    }
  }, [currentIndex]);
  
  // Handle swipe gestures
  const handleDragEnd = (_, info) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      // Swiped right - like
      handleLike();
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      // Swiped left - pass
      handlePass();
    } else {
      // Reset position
      x.set(0);
    }
  };
  
  // Action handlers
  const handleLike = () => {
    setExitDirection('right');
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setExitDirection(null);
    }, 300);
  };
  
  const handlePass = () => {
    setExitDirection('left');
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setExitDirection(null);
    }, 300);
  };
  
  const handleSuperLike = () => {
    // Simulate a super-like animation
    const timeline = [
      { scale: 1, rotate: 0, y: 0 },
      { scale: 1.1, rotate: -5, y: -10 },
      { scale: 1.1, rotate: 5, y: -10 },
      { scale: 1.1, rotate: 0, y: -150 }
    ];
    
    let step = 0;
    const interval = setInterval(() => {
      if (step < timeline.length) {
        x.set(0);
        document.querySelector('.profile-card')?.style.setProperty('transform', 
          `scale(${timeline[step].scale}) rotate(${timeline[step].rotate}deg) translateY(${timeline[step].y}px)`);
        step++;
      } else {
        clearInterval(interval);
        setCurrentIndex(prev => prev + 1);
      }
    }, 150);
  };
  
  const handleViewProfile = () => {
    if (currentProfile) {
      navigate(`/profile/${currentProfile.id}`);
    }
  };
  
  // UI for when no more profiles are available
  if (showEmptyState) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <MessageCircle className="w-16 h-16 text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold mb-2">You're all caught up!</h1>
        <p className="text-gray-500 mb-8">There are no more profiles to show right now. Check back later!</p>
        <Button className="bg-gradient-to-r from-dating-primary to-dating-secondary text-white" onClick={() => setCurrentIndex(0)}>
          Start Over
        </Button>
      </div>
    );
  }
  
  return (
    <div className="relative h-full flex flex-col items-center justify-center p-4 overflow-hidden">
      <div ref={constraintsRef} className="relative w-full max-w-md h-[70vh] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentProfile && (
            <motion.div 
              key={currentProfile.id}
              className="profile-card absolute w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
              style={{ 
                x, 
                rotate,
                opacity: cardOpacity,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
              drag="x"
              dragConstraints={constraintsRef}
              onDragEnd={handleDragEnd}
              dragElastic={0.15}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ 
                x: exitDirection === 'left' ? -300 : exitDirection === 'right' ? 300 : 0,
                opacity: 0,
                scale: 0.9,
                transition: { duration: 0.3 }
              }}
              transition={{ type: 'spring', damping: 15 }}
            >
              {/* Card content */}
              <div className="relative h-[55vh]">
                <img 
                  src={currentProfile.profileImage} 
                  alt={currentProfile.name} 
                  className="w-full h-[55vh] object-cover"
                  onClick={handleViewProfile}
                />
                
                {/* Information overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                  <div className="flex items-end justify-between">
                    <div>
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        {currentProfile.name}, {currentProfile.age}
                      </h2>
                      <p className="text-sm opacity-80">{currentProfile.distance}m away</p>
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs mr-2">
                          {currentProfile.compatibility}% Match
                        </span>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="like-indicator flex items-center justify-center px-4 py-2 border-2 border-white rounded-lg font-bold text-xl rotate-12"
                      initial={{ opacity: 0 }}
                      style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
                    >
                      LIKE
                    </motion.div>
                    
                    <motion.div 
                      className="pass-indicator flex items-center justify-center px-4 py-2 border-2 border-white rounded-lg font-bold text-xl -rotate-12"
                      initial={{ opacity: 0 }}
                      style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
                    >
                      PASS
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Interaction hints */}
              <div className="p-4 text-center text-gray-500 text-sm">
                <p>Tap to view profile, swipe to decide</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Action buttons */}
      <div className="fixed bottom-24 left-0 right-0 flex justify-center items-center gap-5 p-4">
        <Button
          onClick={handlePass}
          className="w-16 h-16 rounded-full bg-white shadow-lg hover:bg-gray-100 border border-gray-200 flex items-center justify-center transform transition-transform hover:scale-105 active:scale-95"
        >
          <X className="w-8 h-8 text-dating-error" />
        </Button>
        
        <Button
          onClick={handleSuperLike}
          className="w-12 h-12 rounded-full bg-dating-accent text-white shadow-lg hover:bg-dating-accent/90 flex items-center justify-center transform transition-transform hover:scale-105 active:scale-95"
        >
          <Star className="w-6 h-6" />
        </Button>
        
        <Button
          onClick={handleLike}
          className="w-16 h-16 rounded-full bg-white shadow-lg hover:bg-gray-100 border border-gray-200 flex items-center justify-center transform transition-transform hover:scale-105 active:scale-95"
        >
          <Heart className="w-8 h-8 text-dating-success" />
        </Button>
      </div>
      
      {/* Hidden card for showing on swipe start */}
      {nearbyUsers[currentIndex + 1] && (
        <div 
          className="absolute w-full max-w-md h-[70vh] bg-white rounded-2xl shadow-xl overflow-hidden scale-95 opacity-50"
          style={{ 
            zIndex: -1,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img 
            src={nearbyUsers[currentIndex + 1].profileImage} 
            alt={nearbyUsers[currentIndex + 1].name} 
            className="w-full h-[55vh] object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default Index;
