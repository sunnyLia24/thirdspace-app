
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { nearbyUsers } from '@/data/nearbyUsers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, X, MessageCircle, ArrowLeft, MapPin, Calendar, Users, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
      prompt: "My simple pleasures...",
      answer: "Coffee at sunrise, reading on rainy days, and exploring new hiking trails."
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

  // User interests
  const interests = [
    "Hiking", "Photography", "Coffee", "Reading", "Live Music", "Yoga"
  ];

  const handleLike = () => {
    toast({
      title: "Liked!",
      description: `You liked ${user.name}'s profile. We'll let them know!`,
      variant: "default"
    });
  };

  const handleMessage = () => {
    toast({
      title: "Message sent!",
      description: `You can now chat with ${user.name}!`,
      variant: "default"
    });
    navigate('/messages');
  };

  return (
    <div className="pb-20 bg-dating-light min-h-screen">
      {/* Header with back button */}
      <div className="bg-white pb-3 pt-6 border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="hover:bg-gray-100 mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-dating-dark">Profile</h1>
          </div>
        </div>
      </div>
      
      {/* Hero image */}
      <div className="relative h-80 bg-dating-primary/20">
        <img 
          src={user.profileImage} 
          alt={user.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
        
        {/* Profile info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-3xl font-bold">{user.name}, {user.age}</h2>
          <div className="flex items-center mt-1">
            <MapPin className="h-4 w-4 mr-1 opacity-80" />
            <p className="text-sm opacity-90">{user.distance}m away</p>
          </div>
        </div>
      </div>
      
      {/* Profile stats */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <Card className="shadow-lg border-none rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-3 divide-x divide-gray-100">
              <div className="py-4 px-2 text-center">
                <p className="text-2xl font-bold text-dating-accent">{user.compatibility}%</p>
                <p className="text-xs text-gray-500">Match</p>
              </div>
              <div className="py-4 px-2 text-center">
                <p className="text-2xl font-bold text-dating-accent">24</p>
                <p className="text-xs text-gray-500">Mutual Friends</p>
              </div>
              <div className="py-4 px-2 text-center">
                <p className="text-2xl font-bold text-dating-accent">6</p>
                <p className="text-xs text-gray-500">Interests</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Profile content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* About section */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-dating-dark flex items-center">
            <Users className="h-5 w-5 mr-2 text-dating-accent" />
            About
          </h3>
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-700">
                Passionate photographer and outdoor enthusiast. I love exploring new trails and capturing beautiful moments. Looking for someone to share adventures with!
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Interests */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-dating-dark flex items-center">
            <Star className="h-5 w-5 mr-2 text-dating-accent" />
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span 
                key={index} 
                className="px-3 py-1.5 bg-white rounded-full text-sm border border-dating-primary text-dating-dark shadow-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
        
        {/* Prompts */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-dating-dark flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-dating-accent" />
            Prompts
          </h3>
          <div className="space-y-3">
            {profilePrompts.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <p className="text-sm font-medium text-dating-accent mb-1">{item.prompt}</p>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                  {index === 0 && (
                    <div className="h-48 bg-gray-100">
                      <img 
                        src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e" 
                        alt="Prompt visual" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Action buttons - fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-4 z-10">
        <div className="container mx-auto flex justify-between gap-2">
          <Button 
            variant="outline" 
            className="flex-1 border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-full"
            onClick={() => navigate('/')}
          >
            <X className="mr-2 h-5 w-5" />
            Pass
          </Button>
          <Button 
            className="flex-1 bg-dating-primary hover:bg-dating-secondary text-dating-dark font-medium rounded-full"
            onClick={handleLike}
          >
            <Heart className="mr-2 h-5 w-5" />
            Like
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-2 border-dating-accent text-dating-accent hover:bg-blue-50 rounded-full"
            onClick={handleMessage}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
