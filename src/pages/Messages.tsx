import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, ArrowLeft, Send, Info, X } from 'lucide-react';
import TopBanner from '@/components/TopBanner';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useNavigate, useLocation } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sent: boolean;
  time: string;
  read?: boolean;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  messages: Message[];
  isOnline?: boolean;
}

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const conversations: Conversation[] = [
    {
      id: 1,
      name: 'Alex Parker',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5',
      lastMessage: 'Do you want to grab coffee sometime?',
      time: '2m ago',
      unread: true,
      isOnline: true,
      messages: [
        { id: 1, text: "Hey there! How are you doing?", sent: false, time: "11:42 AM" },
        { id: 2, text: "I'm good, thanks! Just checking out some new restaurants in the area.", sent: true, time: "11:45 AM" },
        { id: 3, text: "That sounds fun! Any good finds?", sent: false, time: "11:48 AM" },
        { id: 4, text: "Yes! There's a new coffee shop downtown that has amazing pastries.", sent: true, time: "11:52 AM" },
        { id: 5, text: "Do you want to grab coffee sometime?", sent: false, time: "11:55 AM", read: true }
      ]
    },
    {
      id: 2,
      name: 'Jamie Chen',
      avatar: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f',
      lastMessage: 'That hiking spot sounds amazing!',
      time: '1h ago',
      unread: false,
      isOnline: false,
      messages: [
        { id: 1, text: "I was thinking of going hiking this weekend.", sent: true, time: "10:22 AM" },
        { id: 2, text: "Oh nice! Where are you planning to go?", sent: false, time: "10:25 AM" },
        { id: 3, text: "There's a trail near Lake Michigan that's supposed to be beautiful this time of year.", sent: true, time: "10:30 AM" },
        { id: 4, text: "That hiking spot sounds amazing!", sent: false, time: "10:34 AM", read: true }
      ]
    },
    {
      id: 3,
      name: 'Morgan Taylor',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
      lastMessage: 'I love that band too. Their new album is great.',
      time: '5h ago',
      unread: false,
      isOnline: true,
      messages: [
        { id: 1, text: "Did you listen to that playlist I sent you?", sent: false, time: "9:15 AM" },
        { id: 2, text: "Yes! I really liked the indie rock songs.", sent: true, time: "9:20 AM" },
        { id: 3, text: "Have you heard of Glass Animals?", sent: false, time: "9:22 AM" },
        { id: 4, text: "Of course! They're one of my favorite bands right now.", sent: true, time: "9:25 AM" },
        { id: 5, text: "I love that band too. Their new album is great.", sent: false, time: "9:30 AM", read: true }
      ]
    },
    {
      id: 4,
      name: 'Sam Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      lastMessage: 'Sure, Friday works for me!',
      time: '1d ago',
      unread: false,
      isOnline: false,
      messages: [
        { id: 1, text: "Would you like to grab dinner this week?", sent: true, time: "Yesterday" },
        { id: 2, text: "I'd love to! What day were you thinking?", sent: false, time: "Yesterday" },
        { id: 3, text: "How about Friday evening?", sent: true, time: "Yesterday" },
        { id: 4, text: "Sure, Friday works for me!", sent: false, time: "Yesterday", read: true }
      ]
    }
  ];

  // Check if we need to activate a specific conversation from navigation state
  useEffect(() => {
    if (location.state && location.state.activeConversationId) {
      const conversationId = Number(location.state.activeConversationId);
      const conversation = conversations.find(c => c.id === conversationId);
      if (conversation) {
        openConversation(conversation);
      }
    }
  }, [location.state]);

  // Effect to hide bottom navigation when conversation is active
  useEffect(() => {
    if (activeConversation) {
      // Create a more aggressive style to hide the bottom nav
      const styleTag = document.createElement('style');
      styleTag.id = 'hide-bottom-nav-style';
      styleTag.innerHTML = `
        /* Target the bottom navigation with multiple selectors */
        .fixed-bottom-nav, 
        .bottom-navigation, 
        nav.fixed.bottom-0,
        [class*="bottom-0"][class*="fixed"],
        div[class*="bottom-0"][class*="fixed"],
        nav[class*="bottom-0"],
        div:has(> .chat, > .explore, > .profile),
        div:has(> [aria-label="Rewind"], > [aria-label="Chat"], > [aria-label="Explore"], > [aria-label="Standouts"], > [aria-label="Profile"]) {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          z-index: -1 !important;
        }
        
        /* Add padding to ensure enough space at bottom */
        body, #root, main, .app-container {
          padding-bottom: 0 !important;
          margin-bottom: 0 !important;
        }
      `;
      document.head.appendChild(styleTag);
      
      // Also try to directly remove it from DOM for persistent cases
      setTimeout(() => {
        const possibleNavs = [
          ...document.querySelectorAll('.fixed-bottom-nav, .bottom-navigation, nav.fixed.bottom-0'),
          ...document.querySelectorAll('[class*="bottom-0"][class*="fixed"]'),
          ...document.querySelectorAll('div:has(> .chat, > .explore, > .profile)'),
          ...document.querySelectorAll('div:has(> [aria-label="Rewind"], > [aria-label="Chat"], > [aria-label="Explore"], > [aria-label="Standouts"], > [aria-label="Profile"])')
        ];
        
        possibleNavs.forEach(nav => {
          if (nav) {
            (nav as HTMLElement).style.display = 'none';
            (nav as HTMLElement).style.visibility = 'hidden';
            nav.setAttribute('data-hidden-by-chat', 'true');
          }
        });
      }, 100);
    } else {
      // Remove the style when conversation is closed
      const existingStyle = document.getElementById('hide-bottom-nav-style');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // Restore any elements we hid
      document.querySelectorAll('[data-hidden-by-chat="true"]').forEach(el => {
        (el as HTMLElement).style.display = '';
        (el as HTMLElement).style.visibility = '';
        el.removeAttribute('data-hidden-by-chat');
      });
    }
    
    // Cleanup function to restore bottom nav when unmounting
    return () => {
      const existingStyle = document.getElementById('hide-bottom-nav-style');
      if (existingStyle) {
        existingStyle.remove();
      }
      document.querySelectorAll('[data-hidden-by-chat="true"]').forEach(el => {
        (el as HTMLElement).style.display = '';
        (el as HTMLElement).style.visibility = '';
        el.removeAttribute('data-hidden-by-chat');
      });
    };
  }, [activeConversation]);

  // Scroll to bottom whenever messages change or conversation changes
  useEffect(() => {
    if (activeConversation && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [activeConversation]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;
    
    // In a real app, you would send this to an API
    const updatedConversation = {
      ...activeConversation,
      messages: [
        ...activeConversation.messages,
        {
          id: activeConversation.messages.length + 1,
          text: newMessage,
          sent: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false
        }
      ],
      lastMessage: newMessage,
      time: 'Just now'
    };
    
    // Update the conversations list
    setActiveConversation(updatedConversation);
    setNewMessage('');
    
    // Scroll to bottom after sending a message
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 100);
    
    // Simulate a reply after 2 seconds
    setTimeout(() => {
      if (activeConversation?.id === updatedConversation.id) {
        const replyMessage = {
          id: updatedConversation.messages.length + 1,
          text: "Thanks for your message! I'll get back to you soon.",
          sent: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: true
        };
        
        setActiveConversation({
          ...updatedConversation,
          messages: [...updatedConversation.messages, replyMessage],
          lastMessage: replyMessage.text,
          time: 'Just now'
        });
        
        // Scroll to bottom after receiving a message
        setTimeout(() => {
          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
          }
        }, 100);
      }
    }, 2000);
  };

  const openConversation = (conversation: Conversation) => {
    // Mark as read when opening
    const updatedConversation = {
      ...conversation,
      unread: false
    };
    setActiveConversation(updatedConversation);
  };

  const closeConversation = () => {
    setActiveConversation(null);
  };

  const viewUserProfile = (userId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the event from bubbling up
    navigate(`/profile/${userId}?fromChat=true&chatId=${activeConversation.id}`);
  };

  return (
    <div className="pb-20 min-h-screen bg-gradient-to-b from-white to-dating-light relative">
      {/* Conversation List View */}
      {!activeConversation ? (
        <>
          <TopBanner title="Messages" showBackButton={false} />
          
          <div className="container mx-auto px-4 py-4">
            {conversations.length > 0 ? (
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <Card 
                    key={conversation.id} 
                    className="p-3 hover:bg-white cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-transparent hover:border-dating-accent/10"
                    onClick={() => openConversation(conversation)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img 
                          src={conversation.avatar} 
                          alt={conversation.name} 
                          className="h-12 w-12 rounded-full object-cover shadow-md"
                        />
                        {conversation.unread && (
                          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-dating-primary shadow-md shadow-dating-primary/50 glow-effect"></span>
                        )}
                        {conversation.isOnline && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
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
                <div className="h-16 w-16 bg-dating-light rounded-full flex items-center justify-center mb-4 shadow-xl relative">
                  <MessageCircle className="h-8 w-8 text-dating-primary" />
                  <div className="absolute inset-0 rounded-full bg-dating-accent/20 blur-md animate-pulse"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                <p className="text-gray-500 max-w-md">
                  When you connect with someone, your conversations will appear here.
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        // Chat Room View - Using a layout that guarantees the input stays at bottom
        <div className="h-screen flex flex-col bg-white">
          {/* Chat Header - Keep at top */}
          <div className="bg-white py-3 px-3 flex items-center z-10 sticky top-0 shadow-sm">
            <button 
              onClick={closeConversation}
              className="mr-3 rounded-full p-2 hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            
            <div className="flex-1 text-center">
              <h2 className="text-base font-medium">{activeConversation.name.split(' ')[0]} {activeConversation.name.split(' ')[1]?.charAt(0) || ''}</h2>
            </div>
            
            <div className="relative">
              <img 
                src={activeConversation.avatar} 
                alt={activeConversation.name} 
                className="h-10 w-10 rounded-full object-cover shadow-md border-2 border-white"
              />
            </div>
          </div>
          
          {/* Messages Container */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 bg-gray-50"
            style={{ paddingBottom: "80px" }}
          >
            <div className="space-y-4">
              {activeConversation.messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sent ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
                      message.sent 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-white text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-base">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message Input - Fixed at bottom */}
          <div 
            className="bg-white py-3 px-3 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]"
            style={{ 
              position: "fixed", 
              bottom: 0, 
              left: 0, 
              right: 0,
              width: "100%" 
            }}
          >
            <div className="flex items-center space-x-3 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="pl-4 pr-10 py-2 text-base rounded-full bg-gray-100 border-gray-200 focus:border-blue-300"
                  placeholder="Type a message..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                {newMessage && (
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setNewMessage('')}
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              <button 
                className={`rounded-full p-3 ${
                  newMessage.trim() 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-200 text-gray-400'
                }`}
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
