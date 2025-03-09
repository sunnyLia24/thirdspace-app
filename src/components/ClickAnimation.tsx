
import React from 'react';

interface ClickAnimationProps {
  visible: boolean;
  x: number;
  y: number;
  progress: number;
  elementRect: DOMRect | null;
}

const ClickAnimation: React.FC<ClickAnimationProps> = ({
  visible,
  x,
  y,
  progress,
  elementRect
}) => {
  if (!visible || !elementRect) return null;

  return (
    <div 
      className="fixed z-40 pointer-events-none"
      style={{
        left: x - 50, // Center the circle
        top: y - 50,
        width: 100, // Fixed size circle
        height: 100
      }}
    >
      {/* Outer static border */}
      <div 
        className="absolute inset-0 rounded-full border-2 border-white"
        style={{
          boxShadow: `0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 30px #FFFFFF`
        }}
      />
      
      {/* Inner expanding glow */}
      <div 
        className="absolute inset-0 bg-white rounded-full"
        style={{
          transform: `scale(${progress})`,
          transformOrigin: 'center',
          boxShadow: `0 0 15px #FFFFFF, 0 0 30px #FFFFFF`
        }}
      />
    </div>
  );
};

export default ClickAnimation;
