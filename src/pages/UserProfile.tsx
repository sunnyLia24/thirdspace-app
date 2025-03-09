import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { nearbyUsers } from '@/data/nearbyUsers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  X, 
  MoreHorizontal, 
  BadgeCheck, 
  Cake, 
  User, 
  Magnet, 
  Briefcase, 
  ArrowLeft,
  Flag,
  UserX
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FeedbackBubble from '@/components/FeedbackBubble';
import ClickAnimation from '@/components/ClickAnimation';
import ProfilePrompt from '@/components/ProfilePrompt';
import ProfilePhoto from '@/components/ProfilePhoto';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [feedbackBubble, setFeedbackBubble] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: '',
    type: '', // 'image' or 'prompt'
    imageUrl: '' // New property to store the image URL
  });
  const [feedbackText, setFeedbackText] = useState('');
  
  const [clickAnimation, setClickAnimation] = useState({
    visible: false,
    x: 0,
    y: 0,
    progress: 0,
    width: 0,
    height: 0,
    elementRect: null as DOMRect | null
  });
  
  const [pressedElement, setPressedElement] = useState<{
    element: HTMLElement | null,
    imageUrl?: string
  }>({ element: null });
  
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

  const handlePressStart = (e: React.MouseEvent | React.TouchEvent, content: string, type: string, imageUrl?: string) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    const imgUrl = imageUrl || (type === 'image' && target.tagName === 'IMG' 
      ? (target as HTMLImageElement).src 
      : undefined);
    
    setPressedElement({
      element: target,
      imageUrl: imgUrl
    });
    
    startTimeRef.current = Date.now();
    
    setClickAnimation({
      visible: true,
      x: clientX,
      y: clientY,
      progress: 0,
      width: rect.width,
      height: rect.height,
      elementRect: rect
    });
    
    const animateProgress = () => {
      const elapsedTime = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsedTime / 1000, 1); // 1 second animation
      
      setClickAnimation(prev => ({
        ...prev,
        progress
      }));
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateProgress);
      } else {
        setFeedbackBubble({
          visible: true,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          content,
          type,
          imageUrl: imgUrl || ''
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
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        content,
        type,
        imageUrl: imgUrl || ''
      });
    }, 1000); // 1 second timeout
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
    
    setPressedElement({ element: null });
    
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

  const handleBackClick = () => {
    navigate('/');
  };

  const handleBlockUser = () => {
    toast({
      title: "User blocked",
      description: `You have blocked ${user.name}.`,
      variant: "default"
    });
  };

  const handleReportUser = () => {
    toast({
      title: "Report submitted",
      description: `Your report for ${user.name} has been submitted for review.`,
      variant: "default"
    });
  };

  return (
    <div className="pb-6 bg-gray-50 min-h-screen">
      <div className="bg-white/70 backdrop-blur-md pt-2 pb-1 sticky top-0 z-10 shadow-sm border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-white/30 transition-colors"
              onClick={handleBackClick}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-white/30 transition-colors"
                  aria-label="More options"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-white/90 backdrop-blur-sm shadow-lg border border-white/20">
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer" 
                  onClick={handleBlockUser}
                >
                  <UserX className="h-4 w-4" /> 
                  <span>Block user</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer text-destructive" 
                  onClick={handleReportUser}
                >
                  <Flag className="h-4 w-4" /> 
                  <span>Report user</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-4 space-y-4">
        <Card className={`overflow-hidden rounded-xl transition-all duration-150 ${
          pressedElement.element && pressedElement.element.tagName === 'IMG' && 
          (pressedElement.element as HTMLImageElement).src === user.profileImage 
            ? 'shadow-none transform scale-[0.98]' 
            : 'shadow-md'
        }`}>
          <div className="relative">
            <img 
              src={user.profileImage} 
              alt={user.name} 
              className="w-full h-[400px] object-cover"
              onMouseDown={(e) => handlePressStart(e, "", 'image', user.profileImage)}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={(e) => handlePressStart(e, "", 'image', user.profileImage)}
              onTouchEnd={handlePressEnd}
            />
          </div>
        </Card>
        
        <ProfilePrompt 
          prompt={profilePrompts[0].prompt}
          answer={profilePrompts[0].answer}
          onPressStart={handlePressStart}
          onPressEnd={handlePressEnd}
        />
        
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
        
        <ProfilePrompt 
          prompt={profilePrompts[1].prompt}
          answer={profilePrompts[1].answer}
          onPressStart={handlePressStart}
          onPressEnd={handlePressEnd}
        />
        
        <div className="flex flex-col gap-4">
          {userPhotos.map((photo, index) => (
            <ProfilePhoto
              key={index}
              photo={photo}
              index={index}
              userName={user.name}
              onPressStart={handlePressStart}
              onPressEnd={handlePressEnd}
            />
          ))}
        </div>
        
        <ProfilePrompt 
          prompt={profilePrompts[2].prompt}
          answer={profilePrompts[2].answer}
          onPressStart={handlePressStart}
          onPressEnd={handlePressEnd}
        />
      </div>

      <ClickAnimation 
        visible={clickAnimation.visible}
        x={clickAnimation.x}
        y={clickAnimation.y}
        progress={clickAnimation.progress}
        elementRect={clickAnimation.elementRect}
      />

      <FeedbackBubble
        visible={feedbackBubble.visible}
        content={feedbackBubble.content}
        type={feedbackBubble.type}
        feedbackText={feedbackText}
        setFeedbackText={setFeedbackText}
        onSend={handleSendFeedback}
        onClose={closeFeedbackBubble}
        imageUrl={feedbackBubble.imageUrl}
      />
    </div>
  );
};

export default UserProfile;
