
import React, { useState } from 'react';
import { X, Send, CheckCheck } from 'lucide-react';
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
  imageUrl?: string;
}

const FeedbackBubble: React.FC<FeedbackBubbleProps> = ({
  visible,
  content,
  type,
  feedbackText,
  setFeedbackText,
  onSend,
  onClose,
  imageUrl
}) => {
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [confetti, setConfetti] = useState<Array<{id: number, x: number, y: number, size: number, color: string}>>([]);

  if (!visible) return null;
  
  const handleSend = () => {
    if (feedbackText.trim()) {
      setIsSending(true);
      
      // Create confetti particles
      const newConfetti = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: 50 + Math.random() * 260,
        y: 20 + Math.random() * 50,
        size: 5 + Math.random() * 10,
        color: ['#FF5252', '#FFD740', '#64FFDA', '#448AFF', '#E040FB'][Math.floor(Math.random() * 5)]
      }));
      
      setConfetti(newConfetti);
      
      // Show "Sent" confirmation
      setTimeout(() => {
        setSent(true);
        
        // Call the onSend callback after animation
        setTimeout(() => {
          onSend();
          // Reset states
          setIsSending(false);
          setSent(false);
          setConfetti([]);
        }, 800);
      }, 700);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      <div 
        className="fixed z-50 bg-white rounded-xl shadow-xl w-[360px] max-w-[90vw]"
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
          {type === 'image' && imageUrl ? (
            <div className="mt-2 rounded-lg overflow-hidden">
              <img 
                src={imageUrl} 
                alt="Selected content" 
                className="w-full h-[250px] object-cover bg-gray-100"
              />
            </div>
          ) : type === 'prompt' ? (
            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
              <p className="text-xl font-serif">{content}</p>
            </div>
          ) : (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2 animate-pulse-gentle">
              {content}
            </p>
          )}
        </div>
        <div className="p-3 relative overflow-hidden">
          {/* Confetti animation */}
          {confetti.map((particle) => (
            <div 
              key={particle.id}
              className="absolute animate-[confetti_1s_ease-out_forwards]" 
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                borderRadius: '50%',
                transform: 'translateY(0)',
              }}
            />
          ))}
          
          <div className={`flex gap-2 ${isSending ? 'animate-[pop_0.4s_ease-out]' : ''}`}>
            <Input
              placeholder="Type your message..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="text-sm"
              autoFocus
              disabled={isSending}
            />
            {sent ? (
              <Button 
                disabled
                className="bg-green-500 hover:bg-green-500 flex items-center animate-[fade-in_0.3s_ease-out]"
              >
                <CheckCheck className="h-4 w-4 mr-1" />
                Sent!
              </Button>
            ) : (
              <Button 
                onClick={handleSend}
                className="bg-dating-accent hover:bg-dating-accent/90 flex items-center"
                disabled={isSending || !feedbackText.trim()}
              >
                <Send className="h-4 w-4 mr-1" />
                Send
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes pop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default FeedbackBubble;
