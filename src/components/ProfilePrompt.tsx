
import React from 'react';
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
  return (
    <Card className="rounded-xl shadow-md overflow-hidden">
      <CardContent 
        className="p-6"
        onMouseDown={(e) => onPressStart(e, answer, 'prompt')}
        onMouseUp={onPressEnd}
        onMouseLeave={onPressEnd}
        onTouchStart={(e) => onPressStart(e, answer, 'prompt')}
        onTouchEnd={onPressEnd}
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
