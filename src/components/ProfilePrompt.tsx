
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ProfilePromptProps {
  prompt: string;
  answer: string;
  onPressStart: (e: React.MouseEvent | React.TouchEvent, content: string, type: string, imageUrl?: string) => void;
  onPressEnd: () => void;
}

const ProfilePrompt: React.FC<ProfilePromptProps> = ({
  prompt,
  answer,
  onPressStart,
  onPressEnd
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsPressed(true);
    // Pass the full prompt answer as the content for the feedback bubble
    onPressStart(e, answer, 'prompt');
  };

  const handlePressEnd = () => {
    setIsPressed(false);
    onPressEnd();
  };

  return (
    <Card className={`rounded-xl overflow-hidden transition-all duration-150 ${
      isPressed ? 'shadow-none transform scale-[0.98]' : 'shadow-md'
    }`}>
      <CardContent 
        className="p-6"
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        <h3 className="text-lg font-medium text-gray-600 mb-2">{prompt}</h3>
        <p className="text-3xl font-serif mb-4">{answer}</p>
      </CardContent>
    </Card>
  );
};

export default ProfilePrompt;
