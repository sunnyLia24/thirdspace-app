
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Edit, Share2 } from 'lucide-react';
import ProfileCard from '@/components/ProfileCard';
import BackButton from '@/components/BackButton';

const Profile = () => {
  // This would typically come from an API or user data
  const profileCards = [
    {
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      title: 'Jessica, 28',
      prompt: 'My simple pleasures...',
      promptAnswer: 'A good book, morning coffee, and beach walks at sunset.'
    },
    {
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      title: 'Jessica, 28',
      prompt: 'I geek out on...',
      promptAnswer: 'True crime podcasts, 90s sitcoms, and astronomy.'
    },
    {
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      title: 'Jessica, 28',
      prompt: 'A fact about me that surprises people...',
      promptAnswer: "I've hiked in 12 different countries and speak 3 languages."
    }
  ];

  return (
    <div className="pb-20 bg-dating-light min-h-screen">
      <div className="bg-white pb-4 pt-8 border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <BackButton />
              <h1 className="text-2xl font-bold text-dating-dark">My Profile</h1>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Edit className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-dating-primary flex items-center justify-center">
                  <span className="text-white text-xl font-bold">J</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Jessica Thompson</h2>
                  <p className="text-gray-500">New York, NY</p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="p-2 rounded-lg bg-muted">
                  <p className="text-xl font-semibold">85%</p>
                  <p className="text-xs text-gray-500">Compatibility</p>
                </div>
                <div className="p-2 rounded-lg bg-muted">
                  <p className="text-xl font-semibold">46</p>
                  <p className="text-xs text-gray-500">Connections</p>
                </div>
                <div className="p-2 rounded-lg bg-muted">
                  <p className="text-xl font-semibold">12</p>
                  <p className="text-xs text-gray-500">Likes</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Button className="w-full bg-dating-primary hover:bg-dating-secondary">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">My Photos & Prompts</h2>
        <div className="space-y-4">
          {profileCards.map((card, index) => (
            <ProfileCard 
              key={index}
              image={card.image}
              title={card.title}
              prompt={card.prompt}
              promptAnswer={card.promptAnswer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
