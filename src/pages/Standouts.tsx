
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart } from 'lucide-react';
import BackButton from '@/components/BackButton';

const Standouts = () => {
  const standoutProfiles = [
    {
      id: 1,
      name: 'Emma',
      age: 27,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      prompt: 'My most irrational fear is...',
      answer: 'That my plants judge me when I forget to water them.'
    },
    {
      id: 2,
      name: 'Michael',
      age: 30,
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
      prompt: "The most spontaneous thing I've ever done...",
      answer: 'Booked a one-way ticket to Thailand with just a backpack.'
    },
    {
      id: 3,
      name: 'Sophia',
      age: 25,
      image: 'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8',
      prompt: 'A fact about me that surprises people...',
      answer: "I'm a classically trained opera singer who also loves death metal."
    }
  ];

  return (
    <div className="pb-20 min-h-screen bg-dating-light">
      <div className="bg-white pb-4 pt-8 border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-2 relative">
            <div className="absolute left-0">
              <BackButton />
            </div>
            <Sparkles className="text-dating-accent h-6 w-6 mr-2" />
            <h1 className="text-2xl font-bold text-dating-dark">Standouts</h1>
          </div>
          <p className="text-center text-gray-500 text-sm mb-4">
            Exceptional profiles refreshed daily just for you
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {standoutProfiles.map((profile) => (
            <Card key={profile.id} className="overflow-hidden profile-card">
              <div className="relative">
                <img 
                  src={profile.image} 
                  alt={profile.name} 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white text-xl font-semibold">{profile.name}, {profile.age}</h3>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="bg-white border border-gray-100 rounded-lg p-4 -mt-6 relative shadow-sm">
                  <h4 className="text-sm font-medium text-dating-dark mb-1">{profile.prompt}</h4>
                  <p className="text-base">{profile.answer}</p>
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button className="bg-dating-primary hover:bg-dating-secondary flex items-center gap-2">
                    <Heart size={18} />
                    <span>Send a Rose</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Standouts;
