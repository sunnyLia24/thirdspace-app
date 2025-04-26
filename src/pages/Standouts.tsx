import React from 'react';
import { Heart, Info, Lock, Clock } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Standouts = () => {
  const navigate = useNavigate();

  // Mock data for recommended profiles
  const recommendedProfiles = [
    {
      id: 1,
      name: 'Brad',
      age: 28,
      verified: true,
      image: 'https://images.unsplash.com/photo-1513757271889-0a172a7c3313?q=80&w=2070',
      hobbies: ['Paddle boarding', 'Outdoors', 'Travel'],
      location: '3 miles away'
    },
    {
      id: 2,
      name: 'John',
      age: 24,
      verified: false,
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048',
      hobbies: ['Hiking', 'Photography', 'Coffee'],
      location: '5 miles away'
    },
    {
      id: 3,
      name: 'Alex',
      age: 30,
      verified: true,
      image: 'https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?q=80&w=1974',
      hobbies: ['Music', 'Cooking', 'Fitness'],
      location: '2 miles away'
    },
    {
      id: 4,
      name: 'Michael',
      age: 26,
      verified: false,
      image: 'https://images.unsplash.com/photo-1596075780750-81249df16d19?q=80&w=1974',
      hobbies: ['Tennis', 'Reading', 'Art'],
      location: '7 miles away'
    }
  ];

  // Locked profiles that require upgrade or refresh
  const lockedProfiles = [
    {
      id: 5,
      name: 'Daniel',
      age: 29,
      verified: true,
      image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=2070',
      type: 'upgrade'
    },
    {
      id: 6,
      name: 'Ryan',
      age: 31,
      verified: false,
      image: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?q=80&w=2070',
      type: 'time',
      hours: 4
    },
    {
      id: 7,
      name: 'Chris',
      age: 27,
      verified: true,
      image: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=2070',
      type: 'upgrade'
    },
    {
      id: 8,
      name: 'James',
      age: 33,
      verified: false,
      image: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2070',
      type: 'time',
      hours: 8
    },
    {
      id: 9,
      name: 'Thomas',
      age: 25,
      verified: true,
      image: 'https://images.unsplash.com/photo-1598897516650-e64ff9673686?q=80&w=2024',
      type: 'time',
      hours: 12
    }
  ];

  const handleLike = (profileId: number) => {
    console.log(`Liked profile ${profileId}`);
    // Add animation or visual feedback
  };

  const viewProfile = (profileId: number) => {
    // Explicitly pass that we're coming from standouts
    console.log('Navigating to profile from standouts');
    navigate(`/profile/${profileId}`, {
      state: { from: 'standouts' }
    });
  };

  const handleUpgrade = () => {
    // Navigate to subscription page
    navigate('/subscription');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-4xl font-bold mb-2">Standouts</h1>
        <div className="mb-4">
          <button className="bg-blue-400 text-black font-medium py-2 px-4 rounded-full text-sm">
            See new people in 20 hours
          </button>
        </div>
        <p className="text-gray-700 text-lg">
          Connect over common ground with people who match your vibe, refreshed every day.
        </p>
      </div>

      {/* Recommended Section */}
      <div className="px-6 pt-4">
        <h2 className="text-2xl font-bold mb-4">Recommended for you</h2>
        
        <div className="space-y-6">
          {/* Available profiles */}
          {recommendedProfiles.map((profile) => (
            <div 
              key={profile.id} 
              className="bg-white rounded-2xl shadow-md overflow-hidden"
              onClick={() => viewProfile(profile.id)}
            >
              <div className="relative">
                <img 
                  src={profile.image} 
                  alt={profile.name} 
                  className="w-full h-[430px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="text-white">
                      <div className="flex items-center gap-1">
                        <h3 className="text-2xl font-semibold">{profile.name}, {profile.age}</h3>
                        {profile.verified && (
                          <span className="inline-block bg-blue-500 h-5 w-5 rounded-full text-white flex items-center justify-center text-xs">✓</span>
                        )}
                      </div>
                    </div>
                    
                    <button 
                      className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(profile.id);
                      }}
                    >
                      <Heart className="h-6 w-6 text-black" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Locked profiles requiring upgrade or time */}
          {lockedProfiles.map((profile) => (
            <div 
              key={profile.id} 
              className="bg-white rounded-2xl shadow-md overflow-hidden relative"
            >
              <div className="relative">
                {/* Blurred image */}
                <img 
                  src={profile.image} 
                  alt={profile.name} 
                  className="w-full h-[430px] object-cover blur-lg brightness-75"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center text-center p-6">
                  <Clock className="h-12 w-12 text-white mb-4" />
                  <h4 className="text-white text-3xl font-bold mb-2">Refresh in 4h</h4>
                  <h4 className="text-white text-3xl font-bold mb-2">Upgrade to see profiles</h4>
                  <p className="text-white/90 mb-6 text-lg">New profiles will be available soon</p>
                  <div 
                    className="px-8 py-3 rounded-full bg-white/20 text-white text-lg cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpgrade();
                    }}
                  >
                    Upgrade Now
                  </div>
                </div>
                
                {/* Profile info at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="text-white">
                      <div className="flex items-center gap-1">
                        <h3 className="text-2xl font-semibold">{profile.name}, {profile.age}</h3>
                        {profile.verified && (
                          <span className="inline-block bg-blue-500 h-5 w-5 rounded-full text-white flex items-center justify-center text-xs">✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mt-6 mb-4">
          <Info className="h-4 w-4 mr-2" />
          <p>Based on your profile and past matches</p>
        </div>
      </div>
    </div>
  );
};

export default Standouts;
