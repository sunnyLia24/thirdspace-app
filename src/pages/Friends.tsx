import React, { useState } from 'react';
import { UserPlus, Search, Map, MoreHorizontal, Link2, QrCode, X, HelpCircle } from 'lucide-react';
import TopBanner from '@/components/TopBanner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Friend {
  id: string;
  name: string;
  photo: string;
  badge?: string;
  verified?: boolean;
}

interface Match {
  id: string;
  name: string;
  photo: string;
}

const FRIENDS: Friend[] = [
  {
    id: '1',
    name: 'Alex Chen',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    badge: 'Explorer',
    verified: true
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    badge: 'Social Butterfly'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    badge: 'Coffee Lover',
    verified: true
  },
  {
    id: '4',
    name: 'Emma Davis',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
  },
  {
    id: '5',
    name: 'Tom Wilson',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    badge: 'Local Guide'
  }
];

const YOUR_MATCHES: Match[] = [
  {
    id: 'm1',
    name: 'Jessica Parker',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
  },
  {
    id: 'm2',
    name: 'Ryan Cooper',
    photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5'
  },
  {
    id: 'm3',
    name: 'Lisa Wang',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04'
  }
];

const Friends = () => {
  const navigate = useNavigate();
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [friendId, setFriendId] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [showMatches, setShowMatches] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [showConnectionAnimation, setShowConnectionAnimation] = useState(false);

  const handleAddFriendClick = () => {
    setShowAddFriendModal(true);
  };

  const handleAddFriendConfirm = () => {
    // Logic to add friend with friendId
    console.log(`Adding friend with ID: ${friendId}`);
    setFriendId('');
    setShowAddFriendModal(false);
  };

  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  const navigateToQrCode = () => {
    navigate('/qrcode');
  };

  const handleConnectClick = (friend: Friend) => {
    setSelectedFriend(friend);
    setShowConnectModal(true);
    setShowMatches(false);
    setSelectedMatch(null);
  };

  const handleQuestionMarkClick = () => {
    setShowMatches(true);
  };

  const handleMatchSelect = (match: Match) => {
    setSelectedMatch(match);
    setShowConnectionAnimation(true);
    
    setTimeout(() => {
      setShowConnectionAnimation(false);
      setShowConnectModal(false);
      setSelectedFriend(null);
      setSelectedMatch(null);
      setShowMatches(false);
    }, 3000);
  };

  // Filter friends based on search query when search is active
  const filteredFriends = showSearchBar && searchQuery
    ? FRIENDS.filter(friend => 
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : FRIENDS;

  return (
    <div className="min-h-screen bg-white">
      <TopBanner title="Friends" />

      <div className="container mx-auto px-4 pt-4 pb-20">
        {/* Search Bar - Only shown when search is active */}
        {showSearchBar && (
          <div className="mb-6 relative">
            <Input
              type="text"
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 py-3 w-full bg-gray-100 rounded-full"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full"
              onClick={() => setShowSearchBar(false)}
            >
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        )}

        {/* Action Buttons - Centered */}
        <div className="flex justify-center items-center gap-20 mb-12">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center justify-center p-4 h-auto"
            onClick={handleAddFriendClick}
          >
            <div className="p-4 flex items-center justify-center">
              <UserPlus 
                className="h-24 w-24 text-gray-700" 
                strokeWidth={1.5} 
                style={{ transform: 'scale(1.5)' }}
              />
            </div>
            <span className="text-base mt-0 font-medium">Add Friend</span>
          </Button>

          <Button 
            variant="ghost" 
            className="flex flex-col items-center justify-center p-4 h-auto"
            onClick={handleSearchClick}
          >
            <div className="p-4 flex items-center justify-center">
              <Search 
                className="h-24 w-24 text-gray-700" 
                strokeWidth={1.5} 
                style={{ transform: 'scale(1.5)' }}
              />
            </div>
            <span className="text-base mt-0 font-medium">Search</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center justify-center p-4 h-auto"
            onClick={navigateToQrCode}
          >
            <div className="p-4 flex items-center justify-center">
              <QrCode 
                className="h-24 w-24 text-gray-700" 
                strokeWidth={1.5} 
                style={{ transform: 'scale(1.5)' }}
              />
            </div>
            <span className="text-base mt-0 font-medium">QR Code</span>
          </Button>
        </div>

        {/* Friends List */}
        <div className="space-y-4">
          {filteredFriends.map((friend) => (
            <div key={friend.id} className="flex items-center p-3 border-b border-gray-100">
              {/* Profile Picture */}
              <div className="relative mr-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={friend.photo}
                    alt={friend.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {friend.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-dating-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] border-2 border-white">
                    ✓
                  </div>
                )}
              </div>

              {/* Name only - without Badge */}
              <div className="flex-1">
                <h3 className="font-medium">{friend.name}</h3>
              </div>

              {/* Actions */}
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-10 w-10" 
                  title="Connect with a friend"
                  onClick={() => handleConnectClick(friend)}
                >
                  <Link2 className="h-5 w-5 text-blue-500" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                  <MoreHorizontal className="h-6 w-6 text-gray-400" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Friend Modal with Blurred Background */}
      {showAddFriendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setShowAddFriendModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white rounded-xl shadow-xl p-6 w-[85%] max-w-md z-10">
            <h3 className="text-xl font-semibold mb-4">Add Friend</h3>
            <p className="text-gray-600 mb-4">Enter your friend's ID to connect</p>
            
            <Input
              type="text"
              placeholder="Friend ID"
              value={friendId}
              onChange={(e) => setFriendId(e.target.value)}
              className="mb-4"
              autoFocus
            />
            
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowAddFriendModal(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="default"
                onClick={handleAddFriendConfirm}
                disabled={!friendId.trim()}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Connect Friend Modal */}
      <AnimatePresence>
        {showConnectModal && selectedFriend && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blurred Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!showConnectionAnimation) {
                  setShowConnectModal(false);
                  setSelectedFriend(null);
                  setShowMatches(false);
                }
              }}
            ></motion.div>
            
            {/* Connect UI */}
            <motion.div 
              className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md z-10 flex items-center justify-between"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              {/* Friend Profile */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-dating-primary mb-2">
                  <img
                    src={selectedFriend.photo}
                    alt={selectedFriend.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium">{selectedFriend.name}</p>
              </div>

              {/* Connection Animation or Question Mark */}
              {showConnectionAnimation && selectedMatch ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <motion.div
                    className="h-1 bg-dating-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }}
                    transition={{ duration: 1 }}
                  ></motion.div>
                  <motion.div 
                    className="text-dating-primary text-2xl font-bold mt-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    Connected!
                  </motion.div>
                </div>
              ) : (
                <div className="flex-1 flex justify-center items-center">
                  {showMatches ? (
                    <div className="w-full max-h-60 overflow-y-auto">
                      <h3 className="text-center font-medium mb-4">Connect with:</h3>
                      <div className="space-y-3">
                        {YOUR_MATCHES.map(match => (
                          <div 
                            key={match.id} 
                            className="flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                            onClick={() => handleMatchSelect(match)}
                          >
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                              <img 
                                src={match.photo}
                                alt={match.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{match.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={handleQuestionMarkClick}
                    >
                      <HelpCircle className="h-10 w-10 text-dating-primary" />
                    </button>
                  )}
                </div>
              )}

              {/* If connection animation is showing, display the match */}
              {showConnectionAnimation && selectedMatch && (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-dating-primary mb-2">
                    <img
                      src={selectedMatch.photo}
                      alt={selectedMatch.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium">{selectedMatch.name}</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Friends; 