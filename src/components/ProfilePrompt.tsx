
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProfilePromptProps {
  prompt: string;
  answer: string;
  onPressStart: (e: React.MouseEvent | React.TouchEvent, content: string, type: string) => void;
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
        
        <div className="flex justify-end">
          <Button 
            size="icon" 
            variant="ghost"
            className="h-12 w-12 rounded-full text-rose-400 hover:bg-rose-50"
          >
            <Heart className="h-6 w-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePrompt;
