
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { nearbyUsers } from '@/data/nearbyUsers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, X, MoreHorizontal, BadgeCheck, Cake, User, Magnet, Briefcase, Send, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [feedbackBubble, setFeedbackBubble] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: '',
    type: '' // 'image' or 'prompt'
  });
  const [feedbackText, setFeedbackText] = useState('');
  
  const [clickAnimation, setClickAnimation] = useState({
    visible: false,
    x: 0,
    y: 0,
    progress: 0
  });
  
  const pressTimerRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  
  const user = nearbyUsers.find(u => u.id === userId);
  
  if (!user) {
    React.useEffect(() => {
      toast({
        title: "User not found",
        description: "Could not find the user profile you're looking for.",
        variant: "destructive"
      });
      navigate('/');
    }, []);
    
    return null;
  }

  const profilePrompts = [
    {
      prompt: "My most irrational fear",
      answer: "dying before cool shit gets invented."
    },
    {
      prompt: "A perfect day looks like...",
      answer: "Starting with yoga, brunch with friends, and ending with live music or a movie."
    },
    {
      prompt: "My favorite travel story...",
      answer: "Getting lost in Tokyo and finding the most amazing hidden ramen shop with the help of locals."
    }
  ];

  const userPhotos = [
    "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
  ];

  const userDetails = [
    { icon: <Cake className="h-5 w-5" />, text: "22" },
    { icon: <User className="h-5 w-5" />, text: "Man" },
    { icon: <Magnet className="h-5 w-5" />, text: "Straight" },
    { icon: <Briefcase className="h-5 w-5" />, text: "Server" }
  ];

  const handlePressStart = (e: React.MouseEvent | React.TouchEvent, content: string, type: string) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    startTimeRef.current = Date.now();
    
    setClickAnimation({
      visible: true,
      x: clientX,
      y: clientY,
      progress: 0
    });
    
    const animateProgress = () => {
      const elapsedTime = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsedTime / 2000, 1);
      
      setClickAnimation(prev => ({
        ...prev,
        progress
      }));
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateProgress);
      } else {
        setFeedbackBubble({
          visible: true,
          x: clientX,
          y: clientY - 100,
          content,
          type
        });
        
        setClickAnimation(prev => ({
          ...prev,
          visible: false
        }));
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(animateProgress);
    
    pressTimerRef.current = window.setTimeout(() => {
      setFeedbackBubble({
        visible: true,
        x: clientX,
        y: clientY - 100,
        content,
        type
      });
    }, 2000);
  };

  const handlePressEnd = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    setClickAnimation(prev => ({
      ...prev,
      visible: false
    }));
  };

  const handleSendFeedback = () => {
    if (feedbackText.trim()) {
      toast({
        title: "Feedback sent!",
        description: `Your message about "${feedbackBubble.content.substring(0, 20)}..." was sent.`,
      });
      
      setFeedbackBubble(prev => ({ ...prev, visible: false }));
      setFeedbackText('');
    }
  };

  const closeFeedbackBubble = () => {
    setFeedbackBubble(prev => ({ ...prev, visible: false }));
    setFeedbackText('');
  };

  return (
    <div className="pb-6 bg-gray-50 min-h-screen">
      <div className="bg-white pt-2 pb-1 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="w-8"></div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-gray-100"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-4 space-y-4">
        <Card className="overflow-hidden rounded-xl shadow-md">
          <div className="relative">
            <img 
              src={user.profileImage} 
              alt={user.name} 
              className="w-full h-[400px] object-cover"
              onMouseDown={(e) => handlePressStart(e, `${user.name}'s profile picture`, 'image')}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={(e) => handlePressStart(e, `${user.name}'s profile picture`, 'image')}
              onTouchEnd={handlePressEnd}
            />
            <div className="absolute top-4 left-4 flex items-center bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
              <BadgeCheck className="h-5 w-5 text-purple-700 mr-1" />
              <span className="text-purple-700 font-medium">Verified</span>
            </div>
            <div className="absolute bottom-4 right-4">
              <Button 
                size="icon" 
                className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-dating-accent"
              >
                <Heart className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </Card>
        
        <Card className="rounded-xl shadow-md overflow-hidden">
          <CardContent 
            className="p-6"
            onMouseDown={(e) => handlePressStart(e, profilePrompts[0].answer, 'prompt')}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={(e) => handlePressStart(e, profilePrompts[0].answer, 'prompt')}
            onTouchEnd={handlePressEnd}
          >
            <h3 className="text-lg font-medium text-gray-600 mb-2">{profilePrompts[0].prompt}</h3>
            <p className="text-3xl font-serif mb-4">{profilePrompts[0].answer}</p>
            
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
        
        <Card className="rounded-xl shadow-md overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-4 divide-x divide-gray-100">
              {userDetails.map((detail, index) => (
                <div key={index} className="flex flex-col items-center justify-center py-5">
                  {detail.icon}
                  <span className="mt-1 text-gray-800 font-medium">{detail.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-xl shadow-md overflow-hidden">
          <CardContent 
            className="p-6" 
            onMouseDown={(e) => handlePressStart(e, profilePrompts[1].answer, 'prompt')}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={(e) => handlePressStart(e, profilePrompts[1].answer, 'prompt')}
            onTouchEnd={handlePressEnd}
          >
            <h3 className="text-lg font-medium text-gray-600 mb-2">{profilePrompts[1].prompt}</h3>
            <p className="text-3xl font-serif mb-4">{profilePrompts[1].answer}</p>
            
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
        
        {/* Changed from grid to flex column layout for photos */}
        <div className="flex flex-col gap-4">
          {userPhotos.map((photo, index) => (
            <Card key={index} className="rounded-xl shadow-md overflow-hidden">
              <div className="relative">
                <img 
                  src={photo} 
                  alt={`${user.name}'s photo ${index + 1}`} 
                  className="w-full h-40 object-cover"
                  onMouseDown={(e) => handlePressStart(e, `${user.name}'s additional photo ${index + 1}`, 'image')}
                  onMouseUp={handlePressEnd}
                  onMouseLeave={handlePressEnd}
                  onTouchStart={(e) => handlePressStart(e, `${user.name}'s additional photo ${index + 1}`, 'image')}
                  onTouchEnd={handlePressEnd}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <Button 
                    size="icon" 
                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-rose-400"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <Card className="rounded-xl shadow-md overflow-hidden">
          <CardContent 
            className="p-6" 
            onMouseDown={(e) => handlePressStart(e, profilePrompts[2].answer, 'prompt')}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={(e) => handlePressStart(e, profilePrompts[2].answer, 'prompt')}
            onTouchEnd={handlePressEnd}
          >
            <h3 className="text-lg font-medium text-gray-600 mb-2">{profilePrompts[2].prompt}</h3>
            <p className="text-3xl font-serif mb-4">{profilePrompts[2].answer}</p>
            
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
      </div>

      {clickAnimation.visible && (
        <div 
          className="fixed z-40 rounded-full pointer-events-none"
          style={{
            left: clickAnimation.x - 30,
            top: clickAnimation.y - 30,
            width: '60px',
            height: '60px',
            border: '2px solid #5bbce0',
            transform: `scale(${clickAnimation.progress * 0.7 + 0.3})`,
            opacity: clickAnimation.progress < 1 ? 1 : 0,
            transition: 'opacity 0.2s ease'
          }}
        >
          <div 
            className="absolute inset-0 rounded-full bg-dating-accent"
            style={{
              clipPath: `circle(${clickAnimation.progress * 100}% at center)`,
              opacity: 0.4
            }}
          />
          {clickAnimation.progress > 0.1 && (
            <div 
              className="absolute inset-0 flex items-center justify-center text-white font-bold"
              style={{
                transform: `scale(${Math.min(clickAnimation.progress * 1.5, 1)})`,
                opacity: Math.min(clickAnimation.progress * 2, 1)
              }}
            >
              {Math.round(clickAnimation.progress * 100)}%
            </div>
          )}
        </div>
      )}

      {feedbackBubble.visible && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}

      {feedbackBubble.visible && (
        <div 
          className="fixed z-50 bg-white rounded-xl shadow-xl max-w-xs animate-fade-in"
          style={{ 
            left: Math.min(feedbackBubble.x, window.innerWidth - 300), 
            top: Math.max(feedbackBubble.y, 100),
            animation: 'scale-in 0.3s ease-out forwards'
          }}
        >
          <div className="p-3 border-b">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-sm">Send a message about this</h4>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={closeFeedbackBubble}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2 animate-pulse-gentle">
              {feedbackBubble.content}
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
                onClick={handleSendFeedback}
                className="bg-dating-accent hover:bg-dating-accent/90 flex items-center"
              >
                <Send className="h-4 w-4 mr-1" />
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
