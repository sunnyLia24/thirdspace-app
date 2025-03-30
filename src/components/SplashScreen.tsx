import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
  minimumDisplayTime?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onComplete, 
  minimumDisplayTime = 2000 
}) => {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 800); // Wait for exit animation to complete
    }, minimumDisplayTime);
    
    return () => clearTimeout(timer);
  }, [minimumDisplayTime, onComplete]);
  
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-dating-primary to-dating-secondary z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 0.3, 
              duration: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="relative w-32 h-32 mb-8"
          >
            {/* Logo SVG - Heart with location pin */}
            <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Left heart shape */}
              <motion.path 
                d="M35 42C27.824 42 22 47.824 22 55C22 72 50 90 60 96C55.068 92.054 42.368 83.038 34.4 72" 
                stroke="white" 
                strokeWidth="5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
              />
              
              {/* Right heart shape */}
              <motion.path 
                d="M85 42C92.176 42 98 47.824 98 55C98 72 70 90 60 96C64.932 92.054 77.632 83.038 85.6 72" 
                stroke="white" 
                strokeWidth="5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
              />
              
              {/* Map pin dot */}
              <motion.circle 
                cx="60" 
                cy="55" 
                r="12" 
                fill="white"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              />
              
              {/* Map pin outline */}
              <motion.path 
                d="M60 75C60 75 76 60 76 50C76 42.268 68.732 36 60 36C51.268 36 44 42.268 44 50C44 60 60 75 60 75Z" 
                stroke="white" 
                strokeWidth="5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold text-white mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Third Space
          </motion.h1>
          
          <motion.p 
            className="text-white/80 text-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Connect in real places
          </motion.p>
          
          <motion.div 
            className="mt-12 flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
            <span className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></span>
            <span className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: "600ms" }}></span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen; 