
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { nearbyUsers } from '@/data/nearbyUsers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, X, MessageCircle, ArrowLeft } from 'lucide-react';
import ProfileCard from '@/components/ProfileCard';
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
    }
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
      <div className="bg-white pb-4 pt-8 border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-dating-dark">{user.name}'s Profile</h1>
            </div>
          </div>
          
          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{user.name}, {user.age}</h2>
                  <p className="text-gray-500">{user.distance}m away</p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="p-2 rounded-lg bg-muted">
                  <p className="text-xl font-semibold">{user.compatibility}%</p>
                  <p className="text-xs text-gray-500">Compatibility</p>
                </div>
                <div className="p-2 rounded-lg bg-muted">
                  <p className="text-xl font-semibold">24</p>
                  <p className="text-xs text-gray-500">Mutual Friends</p>
                </div>
                <div className="p-2 rounded-lg bg-muted">
                  <p className="text-xl font-semibold">3</p>
                  <p className="text-xs text-gray-500">Similar Interests</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-2 border-red-500 text-red-500 hover:bg-red-50"
                  onClick={() => navigate('/')}
                >
                  <X className="mr-2 h-5 w-5" />
                  Pass
                </Button>
                <Button 
                  className="flex-1 bg-dating-primary hover:bg-dating-secondary"
                  onClick={handleLike}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Like
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
                  onClick={handleMessage}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Photo Gallery</h2>
        <div className="space-y-4">
          <ProfileCard 
            image={user.profileImage}
            title={`${user.name}, ${user.age}`}
            prompt={profilePrompts[0].prompt}
            promptAnswer={profilePrompts[0].answer}
          />
          <ProfileCard 
            image="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
            title={`${user.name}, ${user.age}`}
            prompt={profilePrompts[1].prompt}
            promptAnswer={profilePrompts[1].answer}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
