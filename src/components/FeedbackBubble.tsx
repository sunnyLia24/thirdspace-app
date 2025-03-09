
import React from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FeedbackBubbleProps {
  visible: boolean;
  content: string;
  type: string;
  feedbackText: string;
  setFeedbackText: (text: string) => void;
  onSend: () => void;
  onClose: () => void;
}

const FeedbackBubble: React.FC<FeedbackBubbleProps> = ({
  visible,
  content,
  type,
  feedbackText,
  setFeedbackText,
  onSend,
  onClose
}) => {
  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      <div 
        className="fixed z-50 bg-white rounded-xl shadow-xl w-[320px] max-w-[90vw]"
        style={{ 
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="p-3 border-b">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-sm">Send a message about this</h4>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 animate-pulse-gentle">
            {content}
          </p>
        </div>
        <div className="p-3">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="text-sm"
              autoFocus
            />
            <Button 
              onClick={onSend}
              className="bg-dating-accent hover:bg-dating-accent/90 flex items-center"
            >
              <Send className="h-4 w-4 mr-1" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackBubble;
