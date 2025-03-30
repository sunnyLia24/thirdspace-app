import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Shield, Search, AlertTriangle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/components/ui/use-toast';

// Mock data for blocked users
const MOCK_BLOCKED_USERS = [
  {
    id: "1",
    name: "Alex Johnson",
    blockedDate: new Date(2023, 9, 15),
    avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
  },
  {
    id: "2",
    name: "Morgan Smith",
    blockedDate: new Date(2023, 8, 27),
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
  },
  {
    id: "3",
    name: "Taylor Wong",
    blockedDate: new Date(2023, 7, 8),
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
  },
  {
    id: "4",
    name: "Jordan Lee",
    blockedDate: new Date(2023, 6, 14),
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    id: "5",
    name: "Casey Martinez",
    blockedDate: new Date(2023, 5, 22),
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
  }
];

type BlockedUserProps = {
  user: {
    id: string;
    name: string;
    blockedDate: Date;
    avatarUrl: string;
  };
  onUnblock: (id: string) => void;
};

const BlockedUserItem = ({ user, onUnblock }: BlockedUserProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const handleUnblock = () => {
    setShowConfirmDialog(true);
  };
  
  const confirmUnblock = () => {
    onUnblock(user.id);
    setShowConfirmDialog(false);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <>
      <div className="flex items-center justify-between py-3 border-b border-gray-100">
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-3">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">
              Blocked on {format(user.blockedDate, 'MMM d, yyyy')}
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleUnblock}
        >
          Unblock
        </Button>
      </div>
      
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unblock {user.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This person will be able to see your profile, send you messages, and interact with you again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmUnblock}>Unblock</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const BlockedUsers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [blockedUsers, setBlockedUsers] = useState(MOCK_BLOCKED_USERS);
  
  const filteredUsers = blockedUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleUnblock = (userId: string) => {
    // In a real app, this would call an API to unblock the user
    setBlockedUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    
    const user = blockedUsers.find(user => user.id === userId);
    toast({
      title: "User unblocked",
      description: `${user?.name} has been unblocked.`,
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Blocked Users</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search blocked users"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          {filteredUsers.length > 0 ? (
            <div className="p-4">
              {filteredUsers.map(user => (
                <BlockedUserItem 
                  key={user.id} 
                  user={user} 
                  onUnblock={handleUnblock} 
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              {searchQuery ? (
                <>
                  <p className="text-gray-700 font-medium mb-2">No results for "{searchQuery}"</p>
                  <p className="text-gray-500 text-sm">Try a different search term</p>
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-4">
                    <Shield className="h-12 w-12 text-gray-300" />
                  </div>
                  <p className="text-gray-700 font-medium mb-2">No blocked users</p>
                  <p className="text-gray-500 text-sm">Users you block will appear here</p>
                </>
              )}
            </div>
          )}
        </div>
        
        <div className="bg-amber-50 rounded-xl p-4 flex gap-3 mb-6">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 font-medium mb-1">About blocking</p>
            <p className="text-sm text-amber-700">
              When you block someone, they won't be able to see your profile, 
              send you messages, or interact with you in any way. They won't be 
              notified that you've blocked them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedUsers; 