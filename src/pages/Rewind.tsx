import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rewind, Heart, X, Crown } from 'lucide-react';
import TopBanner from '@/components/TopBanner';

const RewindPage = () => {
  const passedProfiles = [
    {
      id: 1,
      name: 'Olivia',
      age: 26,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      distance: '3 miles away'
    },
    {
      id: 2,
      name: 'Liam',
      age: 29,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
      distance: '5 miles away'
    },
    {
      id: 3,
      name: 'Ava',
      age: 27,
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
      distance: '7 miles away'
    }
  ];

  return (
    <div className="pb-20 min-h-screen bg-dating-light">
      <TopBanner 
        title="Rewind" 
        leftIcon={<Rewind className="text-dating-accent h-6 w-6" />} 
      />
      
      <div className="container mx-auto px-4 py-2">
        <p className="text-center text-gray-500 text-sm mb-4">
          Give passed profiles a second chance
        </p>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <Card className="p-4 mb-6 border-dating-accent border-dashed bg-white/80">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-dating-accent/10 rounded-full flex items-center justify-center mr-4">
              <Crown className="h-5 w-5 text-dating-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Upgrade to Premium</h3>
              <p className="text-sm text-gray-500">Unlimited rewinds and more premium features</p>
            </div>
          </div>
          <Button className="w-full mt-4 bg-gradient-to-r from-dating-accent to-purple-500 hover:from-purple-500 hover:to-dating-accent">
            Get Premium
          </Button>
        </Card>
        
        {passedProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {passedProfiles.map((profile) => (
              <Card key={profile.id} className="overflow-hidden profile-card">
                <div className="relative">
                  <img 
                    src={profile.image} 
                    alt={profile.name} 
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white text-lg font-semibold">{profile.name}, {profile.age}</h3>
                    <p className="text-white/80 text-sm">{profile.distance}</p>
                  </div>
                </div>
                
                <div className="flex justify-between p-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-10 w-10 border-2 border-red-500 text-red-500 hover:bg-red-50"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Pass</span>
                  </Button>
                  
                  <Button 
                    className="px-4 bg-dating-primary hover:bg-dating-secondary flex items-center gap-2"
                  >
                    <Rewind size={16} />
                    <span>Rewind</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-10 w-10 border-2 border-dating-primary text-dating-primary hover:bg-pink-50"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Like</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 bg-dating-light rounded-full flex items-center justify-center mb-4">
              <Rewind className="h-8 w-8 text-dating-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No passed profiles</h3>
            <p className="text-gray-500 max-w-md">
              When you pass on someone, they'll appear here for a second chance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RewindPage;
