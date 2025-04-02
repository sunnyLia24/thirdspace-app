import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { nearbyUsers, NearbyUser } from '@/data/nearbyUsers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  X, 
  BadgeCheck, 
  Cake, 
  User, 
  Magnet, 
  Briefcase, 
  ArrowLeft,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FeedbackBubble from '@/components/FeedbackBubble';
import ClickAnimation from '@/components/ClickAnimation';
import ProfilePrompt from '@/components/ProfilePrompt';
import ProfilePhoto from '@/components/ProfilePhoto';

// Extend the NearbyUser interface with additional fields we need
interface EnhancedUser {
  id: string | number;
  name: string;
  age: number;
  distance: number;
  location: [number, number];
  profileImage: string;
  compatibility: number;
  verified?: boolean;
  bio?: string;
}

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
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
  
  const [swipeDirection, setSwipeDirection] = useState<'none' | 'left' | 'right'>('none');
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [nopeAnimation, setNopeAnimation] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const currentX = useRef<number>(0);
  
  const [user, setUser] = useState<EnhancedUser | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [accessedFromChat, setAccessedFromChat] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're coming from a chat
    const searchParams = new URLSearchParams(location.search);
    const fromChat = searchParams.get('fromChat') === 'true';
    const chatIdParam = searchParams.get('chatId');
    
    if (fromChat) {
      setAccessedFromChat(true);
      if (chatIdParam) {
        setChatId(chatIdParam);
      }
    }
    
    // First try to find the user in nearbyUsers
    const basicUser = nearbyUsers.find(u => u.id === userId);
    
    if (basicUser) {
      setUser({
        ...basicUser,
        verified: Math.random() > 0.5, // Random verification for demo
        bio: "I love exploring new places, taking photos, and trying local coffee shops. Let's connect if we share these interests!"
      });
      setLoading(false);
    } else if (userId && (userId.startsWith('user'))) {
      // Create a mock user for the map profile case
      setUser({
        id: userId,
        name: userId === 'user1' ? 'Sophia' : userId === 'user2' ? 'Emma' : 'Olivia',
        age: 25 + Math.floor(Math.random() * 5),
        distance: 500 + Math.floor(Math.random() * 1000),
        location: [0, 0],
        profileImage: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 10000000)}`,
        compatibility: 75 + Math.floor(Math.random() * 20),
        verified: Math.random() > 0.5,
        bio: "I love exploring new places, taking photos, and trying local coffee shops. Let's connect if we share these interests!"
      });
      setLoading(false);
    } else if (userId) {
      // Handle numeric IDs from the Messages component
      // Create mock users for chat profiles
      const numericId = Number(userId);
      
      const chatUsers = {
        1: {
          id: "1",
          name: "Alex Parker",
          age: 28,
          distance: 3000,
          location: [0, 0],
          profileImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
          compatibility: 85,
          verified: true,
          bio: "Coffee enthusiast, amateur photographer, and avid hiker. Looking for someone to share adventures with!"
        },
        2: {
          id: "2",
          name: "Jamie Chen",
          age: 26,
          distance: 5000,
          location: [0, 0],
          profileImage: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f",
          compatibility: 78,
          verified: true,
          bio: "Outdoor lover and hiking enthusiast. Always planning my next adventure in nature."
        },
        3: {
          id: "3",
          name: "Morgan Taylor",
          age: 24,
          distance: 7000,
          location: [0, 0],
          profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
          compatibility: 92,
          verified: false,
          bio: "Music lover, indie rock fanatic, and concert-goer. Always looking for new bands to discover."
        },
        4: {
          id: "4",
          name: "Sam Rodriguez",
          age: 30,
          distance: 4000,
          location: [0, 0],
          profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          compatibility: 88,
          verified: true,
          bio: "Foodie who loves trying new restaurants. Let's grab dinner sometime!"
        }
      };
      
      if (chatUsers[numericId]) {
        setUser(chatUsers[numericId] as EnhancedUser);
        setAccessedFromChat(true);
        setLoading(false);
      } else {
        // If still not found, show error and navigate back
        toast({
          title: "User not found",
          description: "Could not find the user profile you're looking for.",
          variant: "destructive"
        });
        navigate('/');
      }
    } else {
      // If no userId provided, show error and navigate back
      toast({
        title: "User not found",
        description: "Could not find the user profile you're looking for.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [userId, navigate, toast, location.search]);

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
    "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    "https://images.unsplash.com/photo-1542103749-8ef59b94f47e",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
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
      
      setTimeout(() => {
        navigate('/');
      }, 800); // This delay matches the animation timing in FeedbackBubble
    }
  };

  const closeFeedbackBubble = () => {
    setFeedbackBubble(prev => ({ ...prev, visible: false }));
    setFeedbackText('');
  };

  const handleBackClick = () => {
    if (accessedFromChat && chatId) {
      // Go back to the specific chat conversation
      navigate('/messages', { state: { activeConversationId: chatId } });
    } else if (accessedFromChat) {
      // Fallback to the general messages page
      navigate('/messages');
    } else {
      navigate(-1);
    }
  };

  const handleMessageClick = () => {
    navigate('/messages');
  };

  const handleLike = () => {
    setLikeAnimation(true);
    setSwipeDirection('right');
    setSwipeProgress(100);
    
    toast({
      title: "You liked " + (accessedFromChat ? user?.name.split(' ')[0] : user?.name),
      description: "We'll let them know!",
      variant: "default"
    });
    
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  
  const handleNope = () => {
    setNopeAnimation(true);
    setSwipeDirection('left');
    setSwipeProgress(100);
    
    toast({
      variant: "default",
      title: "Passed on " + (accessedFromChat ? user?.name.split(' ')[0] : user?.name),
      description: "No worries, plenty more people to discover!"
    });
    
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    currentX.current = e.touches[0].clientX;
    const deltaX = currentX.current - startX.current;
    const screenWidth = window.innerWidth;
    
    const progress = Math.min(Math.abs(deltaX) / (screenWidth * 0.5), 1) * 100;
    
    setSwipeProgress(progress);
    
    if (deltaX > 0) {
      setSwipeDirection('right');
    } else if (deltaX < 0) {
      setSwipeDirection('left');
    }
    
    if (profileRef.current) {
      const rotate = deltaX * 0.1;
      profileRef.current.style.transform = `translateX(${deltaX}px) rotate(${rotate}deg)`;
    }
  };
  
  const handleTouchEnd = () => {
    if (swipeProgress > 40) {
      if (swipeDirection === 'right') {
        handleLike();
      } else if (swipeDirection === 'left') {
        handleNope();
      }
    } else {
      if (profileRef.current) {
        profileRef.current.style.transform = 'translateX(0) rotate(0deg)';
        setSwipeDirection('none');
        setSwipeProgress(0);
      }
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="pb-6 bg-gray-50 min-h-screen relative">
      <div className="bg-white/70 backdrop-blur-md pt-2 pb-1 sticky top-0 z-10 shadow-sm border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {!accessedFromChat ? (
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-white/30 transition-colors"
                onClick={handleBackClick}
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            ) : (
              <div className="w-10"></div>
            )}
            <h2 className="text-xl font-bold gradient-text">
              {accessedFromChat 
                ? user.name.split(' ')[0] // Only show first name when accessed from chat
                : user.name
              }
            </h2>
            {accessedFromChat ? (
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-white/30 transition-colors"
                onClick={handleBackClick}
                aria-label="Back to messages"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            ) : (
              <div className="w-10"></div>
            )}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-4 pb-16">
        {/* 1. Profile picture with verification badge outside of interactive elements */}
        <div 
          className="relative mb-4 rounded-2xl overflow-hidden transition-transform active:scale-[0.98]"
          onMouseDown={(e) => handlePressStart(e, "Their perfect profile photo", "image")}
          onMouseUp={handlePressEnd}
          onTouchStart={(e) => handlePressStart(e, "Their perfect profile photo", "image")}
          onTouchEnd={handlePressEnd}
        >
            <img 
              src={user.profileImage} 
              alt={accessedFromChat ? user.name.split(' ')[0] : user.name} 
              className="w-full h-96 object-cover"
            />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">
                    {accessedFromChat 
                      ? user.name.split(' ')[0] // Only show first name when accessed from chat
                      : user.name
                    }, {user.age}
                  </h2>
                  {user.verified && (
                    <BadgeCheck className="h-5 w-5 text-blue-400" />
                  )}
                </div>
                {!accessedFromChat && (
                  <p className="text-sm opacity-90">{user.distance} meters away</p>
                )}
              </div>
            </div>
          </div>
        </div>
            
        {/* 2. Second picture - separated */}
        <div 
          className="relative mb-4 rounded-2xl overflow-hidden transition-transform active:scale-[0.98]"
          onMouseDown={(e) => handlePressStart(e, "Their second photo", "image", userPhotos[0])}
              onMouseUp={handlePressEnd}
          onTouchStart={(e) => handlePressStart(e, "Their second photo", "image", userPhotos[0])}
              onTouchEnd={handlePressEnd}
        >
          <img 
            src={userPhotos[0]} 
            alt={`${accessedFromChat ? user.name.split(' ')[0] : user.name}'s photo 2`} 
            className="w-full h-96 object-cover"
          />
        </div>
        
        {/* 3. First prompt - removed card background */}
        <div className="mb-4">
        <ProfilePrompt 
          prompt={profilePrompts[0].prompt}
          answer={profilePrompts[0].answer}
            onPressStart={(e) => handlePressStart(e, profilePrompts[0].prompt, 'prompt')}
          onPressEnd={handlePressEnd}
        />
        </div>
            
        {/* 4. Scrollable details bar (horizontal scroll) - removed arrow */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
          <div className="overflow-x-auto p-4 bg-gray-50">
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
              <div className="text-center flex flex-col items-center bg-white rounded-xl p-3 shadow-sm min-w-[100px]">
                <Cake className="h-6 w-6 text-gray-700 mb-1" />
                <span className="text-sm font-medium">{user.age}</span>
                <span className="text-xs text-gray-500">Age</span>
              </div>
              <div className="text-center flex flex-col items-center bg-white rounded-xl p-3 shadow-sm min-w-[100px]">
                <User className="h-6 w-6 text-gray-700 mb-1" />
                <span className="text-sm font-medium">Man</span>
                <span className="text-xs text-gray-500">Gender</span>
              </div>
              <div className="text-center flex flex-col items-center bg-white rounded-xl p-3 shadow-sm min-w-[100px]">
                <Magnet className="h-6 w-6 text-gray-700 mb-1" />
                <span className="text-sm font-medium">Straight</span>
                <span className="text-xs text-gray-500">Orientation</span>
              </div>
              <div className="text-center flex flex-col items-center bg-white rounded-xl p-3 shadow-sm min-w-[100px]">
                <Briefcase className="h-6 w-6 text-gray-700 mb-1" />
                <span className="text-sm font-medium">Server</span>
                <span className="text-xs text-gray-500">Job</span>
              </div>
              <div className="text-center flex flex-col items-center bg-white rounded-xl p-3 shadow-sm min-w-[100px]">
                <BadgeCheck className="h-6 w-6 text-gray-700 mb-1" />
                <span className="text-sm font-medium">{user.verified ? 'Yes' : 'No'}</span>
                <span className="text-xs text-gray-500">Verified</span>
                </div>
            </div>
          </div>
        </div>
            
        {/* 5. Third picture */}
        <div 
          className="relative mb-4 rounded-2xl overflow-hidden transition-transform active:scale-[0.98]"
          onMouseDown={(e) => handlePressStart(e, "Their third photo", "image", userPhotos[1])}
          onMouseUp={handlePressEnd}
          onTouchStart={(e) => handlePressStart(e, "Their third photo", "image", userPhotos[1])}
          onTouchEnd={handlePressEnd}
        >
          <img 
            src={userPhotos[1]} 
            alt={`${accessedFromChat ? user.name.split(' ')[0] : user.name}'s photo 3`} 
            className="w-full h-96 object-cover"
          />
        </div>
            
        {/* 6. Second prompt - removed card background */}
        <div className="mb-4">
        <ProfilePrompt 
          prompt={profilePrompts[1].prompt}
          answer={profilePrompts[1].answer}
            onPressStart={(e) => handlePressStart(e, profilePrompts[1].prompt, 'prompt')}
          onPressEnd={handlePressEnd}
        />
        </div>
        
        {/* New photo after second prompt */}
        <div 
          className="relative mb-4 rounded-2xl overflow-hidden transition-transform active:scale-[0.98]"
          onMouseDown={(e) => handlePressStart(e, "Their fourth photo", "image", userPhotos[2])}
          onMouseUp={handlePressEnd}
          onTouchStart={(e) => handlePressStart(e, "Their fourth photo", "image", userPhotos[2])}
          onTouchEnd={handlePressEnd}
        >
          <img 
            src={userPhotos[2]} 
            alt={`${accessedFromChat ? user.name.split(' ')[0] : user.name}'s photo 4`} 
            className="w-full h-96 object-cover"
          />
        </div>
        
        {/* 7. Third prompt - removed card background */}
        <div className="mb-4">
        <ProfilePrompt 
          prompt={profilePrompts[2].prompt}
          answer={profilePrompts[2].answer}
            onPressStart={(e) => handlePressStart(e, profilePrompts[2].prompt, 'prompt')}
          onPressEnd={handlePressEnd}
        />
      </div>

        {/* New photo after last prompt */}
        <div 
          className="relative mb-4 rounded-2xl overflow-hidden transition-transform active:scale-[0.98]"
          onMouseDown={(e) => handlePressStart(e, "Their fifth photo", "image", userPhotos[3])}
          onMouseUp={handlePressEnd}
          onTouchStart={(e) => handlePressStart(e, "Their fifth photo", "image", userPhotos[3])}
          onTouchEnd={handlePressEnd}
        >
          <img 
            src={userPhotos[3]} 
            alt={`${accessedFromChat ? user.name.split(' ')[0] : user.name}'s photo 5`} 
            className="w-full h-96 object-cover"
          />
        </div>
      </div>
      
      {/* Message button fixed at bottom */}
      <div className="fixed bottom-0 inset-x-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-200">
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
          onClick={handleMessageClick}
        >
          <MessageCircle className="h-5 w-5" />
          Message {accessedFromChat ? user.name.split(' ')[0] : user.name}
        </Button>
      </div>
      
      {feedbackBubble.visible && (
        <FeedbackBubble
          visible={true}
          content={feedbackBubble.content}
          type={feedbackBubble.type}
          imageUrl={feedbackBubble.imageUrl}
          onClose={closeFeedbackBubble}
          onSend={handleSendFeedback}
          feedbackText={feedbackText}
          setFeedbackText={setFeedbackText}
        />
      )}
      
      {clickAnimation.visible && (
      <ClickAnimation 
          visible={true}
        x={clickAnimation.x}
        y={clickAnimation.y}
        progress={clickAnimation.progress}
        elementRect={clickAnimation.elementRect}
      />
      )}
    </div>
  );
};

export default UserProfile;
