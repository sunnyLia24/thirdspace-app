
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { nearbyUsers } from '@/data/nearbyUsers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, X, MoreHorizontal, BadgeCheck, Cake, User, Magnet, Briefcase, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for the feedback bubble
  const [feedbackBubble, setFeedbackBubble] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: '',
    type: '' // 'image' or 'prompt'
  });
  const [feedbackText, setFeedbackText] = useState('');
  
  // Refs for press timers
  const pressTimerRef = useRef<number | null>(null);
  
  // Find the user by ID
  const user = nearbyUsers.find(u => u.id === userId);
  
  // If user not found, show error and redirect back
  if (!user) {
    // Navigate back to map after displaying error
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

  // Profile prompts data for this user
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

  // User details
  const userDetails = [
    { icon: <Cake className="h-5 w-5" />, text: "22" },
    { icon: <User className="h-5 w-5" />, text: "Man" },
    { icon: <Magnet className="h-5 w-5" />, text: "Straight" },
    { icon: <Briefcase className="h-5 w-5" />, text: "Server" }
  ];

  // Handle press start for long press detection
  const handlePressStart = (e: React.MouseEvent | React.TouchEvent, content: string, type: string) => {
    // Get position for the bubble
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    pressTimerRef.current = window.setTimeout(() => {
      setFeedbackBubble({
        visible: true,
        x: clientX,
        y: clientY - 100, // Position bubble above the pointer
        content,
        type
      });
    }, 3000); // 3 second hold time
  };

  // Handle press end
  const handlePressEnd = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  // Handle sending the feedback
  const handleSendFeedback = () => {
    if (feedbackText.trim()) {
      toast({
        title: "Feedback sent!",
        description: `Your message about "${feedbackBubble.content.substring(0, 20)}..." was sent.`,
      });
      
      // Reset the state
      setFeedbackBubble(prev => ({ ...prev, visible: false }));
      setFeedbackText('');
    }
  };

  // Close the feedback bubble
  const closeFeedbackBubble = () => {
    setFeedbackBubble(prev => ({ ...prev, visible: false }));
    setFeedbackText('');
  };

  return (
    <div className="pb-6 bg-gray-50 min-h-screen">
      {/* Header with username and more options */}
      <div className="bg-white pt-2 pb-1 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="w-8"></div> {/* Empty div for centering */}
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
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-4 space-y-4">
        {/* Main photo card */}
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
            {/* Verified badge */}
            <div className="absolute top-4 left-4 flex items-center bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
              <BadgeCheck className="h-5 w-5 text-purple-700 mr-1" />
              <span className="text-purple-700 font-medium">Verified</span>
            </div>
            {/* Like button */}
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
        
        {/* First prompt - "My most irrational fear" */}
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
            
            {/* Like button for prompts */}
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
        
        {/* User details card */}
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
        
        {/* Remaining prompts */}
        {profilePrompts.slice(1).map((item, index) => (
          <Card key={index} className="rounded-xl shadow-md overflow-hidden">
            <CardContent 
              className="p-6" 
              onMouseDown={(e) => handlePressStart(e, item.answer, 'prompt')}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={(e) => handlePressStart(e, item.answer, 'prompt')}
              onTouchEnd={handlePressEnd}
            >
              <h3 className="text-lg font-medium text-gray-600 mb-2">{item.prompt}</h3>
              <p className="text-3xl font-serif mb-4">{item.answer}</p>
              
              {/* Like button for prompts */}
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
        ))}
      </div>

      {/* Feedback bubble */}
      {feedbackBubble.visible && (
        <div 
          className="fixed z-50 bg-white rounded-xl shadow-xl max-w-xs animate-fade-in"
          style={{ 
            left: Math.min(feedbackBubble.x, window.innerWidth - 300), 
            top: Math.max(feedbackBubble.y, 100),
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
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
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
              />
              <Button 
                onClick={handleSendFeedback}
                className="bg-dating-accent hover:bg-dating-accent/90"
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
