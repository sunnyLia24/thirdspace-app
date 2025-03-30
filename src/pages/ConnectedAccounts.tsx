import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Instagram, Facebook, Apple, AlertTriangle, CheckCircle, Link, Unlink, SearchCode } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
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

type SocialAccount = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  connected: boolean;
  username?: string;
  connectedDate?: string;
};

const ConnectedAccounts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [disconnectAccount, setDisconnectAccount] = useState<SocialAccount | null>(null);
  
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      connected: true,
      username: '@user_design',
      connectedDate: 'Connected on Jun 12, 2023',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      color: 'bg-blue-600',
      connected: false,
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: <Apple className="h-5 w-5" />,
      color: 'bg-black',
      connected: true,
      username: 'user@icloud.com',
      connectedDate: 'Connected on Feb 3, 2023',
    },
    {
      id: 'google',
      name: 'Google',
      icon: <SearchCode className="h-5 w-5" />,
      color: 'bg-red-500',
      connected: true,
      username: 'user@gmail.com',
      connectedDate: 'Connected on Jan 15, 2023',
    },
  ]);
  
  const handleConnect = (accountId: string) => {
    // In a real app, this would redirect to OAuth flow
    // For demo purposes, simulate connecting
    
    toast({
      title: "Redirecting to authentication",
      description: "You'll be redirected to connect your account",
    });
    
    // Simulate successful connection after a delay
    setTimeout(() => {
      setSocialAccounts(accounts => 
        accounts.map(account => 
          account.id === accountId
            ? {
                ...account,
                connected: true,
                username: account.id === 'facebook' ? 'User Name' : undefined,
                connectedDate: `Connected on ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
              }
            : account
        )
      );
      
      toast({
        title: "Account connected successfully",
        description: `Your ${accountId.charAt(0).toUpperCase() + accountId.slice(1)} account is now connected.`,
      });
    }, 1500);
  };
  
  const handleOpenDisconnectDialog = (account: SocialAccount) => {
    setDisconnectAccount(account);
  };
  
  const handleDisconnect = () => {
    if (!disconnectAccount) return;
    
    // In a real app, this would call an API to revoke OAuth tokens
    // For demo purposes, simulate disconnecting
    setSocialAccounts(accounts => 
      accounts.map(account => 
        account.id === disconnectAccount.id
          ? { ...account, connected: false, username: undefined, connectedDate: undefined }
          : account
      )
    );
    
    toast({
      title: "Account disconnected",
      description: `Your ${disconnectAccount.name} account has been disconnected.`,
    });
    
    setDisconnectAccount(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
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
          <h1 className="text-xl font-bold">Connected Accounts</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-1">Social Accounts</h2>
          <p className="text-gray-600 text-sm mb-6">
            Connect your social media accounts for easier login and sharing
          </p>
          
          <div className="space-y-4">
            {socialAccounts.map(account => (
              <div 
                key={account.id}
                className="border rounded-lg overflow-hidden"
              >
                <div className={`${account.color} h-2`} />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`${account.color} w-10 h-10 rounded-full flex items-center justify-center text-white`}>
                        {account.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{account.name}</h3>
                        {account.connected ? (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>{account.username}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <AlertTriangle className="h-3 w-3 text-amber-500" />
                            <span>Not connected</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      variant={account.connected ? "outline" : "default"}
                      size="sm"
                      onClick={() => account.connected 
                        ? handleOpenDisconnectDialog(account) 
                        : handleConnect(account.id)
                      }
                    >
                      {account.connected ? (
                        <span className="flex items-center gap-1">
                          <Unlink className="h-4 w-4" />
                          Disconnect
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Link className="h-4 w-4" />
                          Connect
                        </span>
                      )}
                    </Button>
                  </div>
                  
                  {account.connected && (
                    <div className="text-xs text-gray-500 mt-1">{account.connectedDate}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Third-Party Logins</CardTitle>
            <CardDescription>
              These accounts can be used to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {socialAccounts
                .filter(account => account.connected)
                .map(account => (
                  <div 
                    key={account.id} 
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`${account.color} w-8 h-8 rounded-full flex items-center justify-center text-white`}>
                        {account.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">Sign in with {account.name}</p>
                        <p className="text-xs text-gray-500">{account.username}</p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
              ))}
              
              {socialAccounts.filter(account => account.connected).length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <p>No third-party login methods configured.</p>
                  <p className="text-sm">Connect a social account above to enable it for login.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-amber-50 rounded-xl p-4 flex gap-3 mb-6">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 font-medium mb-1">Account security note</p>
            <p className="text-sm text-amber-700">
              For optimal security, we recommend keeping at least two sign-in methods 
              active at all times, including your email or phone number.
            </p>
          </div>
        </div>
      </div>
      
      <AlertDialog open={!!disconnectAccount} onOpenChange={(open) => !open && setDisconnectAccount(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect {disconnectAccount?.name}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to disconnect your {disconnectAccount?.name} account? 
              You'll no longer be able to use it to sign in or share content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDisconnect}>Disconnect</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ConnectedAccounts; 