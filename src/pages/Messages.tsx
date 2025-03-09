
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, MessageCircle } from 'lucide-react';
import BackButton from '@/components/BackButton';

const Messages = () => {
  const conversations = [
    {
      id: 1,
      name: 'Alex Parker',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5',
      lastMessage: 'Do you want to grab coffee sometime?',
      time: '2m ago',
      unread: true
    },
    {
      id: 2,
      name: 'Jamie Chen',
      avatar: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f',
      lastMessage: 'That hiking spot sounds amazing!',
      time: '1h ago',
      unread: false
    },
    {
      id: 3,
      name: 'Morgan Taylor',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
      lastMessage: 'I love that band too. Their new album is great.',
      time: '5h ago',
      unread: false
    },
    {
      id: 4,
      name: 'Sam Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      lastMessage: 'Sure, Friday works for me!',
      time: '1d ago',
      unread: false
    }
  ];

  return (
    <div className="pb-20 min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center mb-4 relative">
            <div className="absolute left-0">
              <BackButton />
            </div>
            <h1 className="text-2xl font-bold text-center text-dating-dark">Messages</h1>
          </div>
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              className="pl-10 bg-gray-50 border-gray-200" 
              placeholder="Search conversations" 
            />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-2">
        {conversations.length > 0 ? (
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <Card key={conversation.id} className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img 
                      src={conversation.avatar} 
                      alt={conversation.name} 
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    {conversation.unread && (
                      <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-dating-primary"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-semibold truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className={`text-sm truncate ${conversation.unread ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 bg-dating-light rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-dating-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
            <p className="text-gray-500 max-w-md">
              When you connect with someone, your conversations will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
