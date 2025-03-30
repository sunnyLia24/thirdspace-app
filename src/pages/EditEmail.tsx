import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const EditEmail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentEmail, setCurrentEmail] = useState('user@example.com');
  const [newEmail, setNewEmail] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSendVerification = () => {
    // Basic email validation
    if (!newEmail || !/\S+@\S+\.\S+/.test(newEmail)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    if (newEmail === currentEmail) {
      toast({
        title: "No change detected",
        description: "The new email address is the same as your current email",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate sending verification email
    setTimeout(() => {
      setIsSubmitting(false);
      setVerificationSent(true);
      
      toast({
        title: "Verification email sent",
      });
    }, 500);
  };
  
  const handleResendVerification = () => {
    setIsSubmitting(true);
    
    // Simulate resending verification email
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Verification email resent",
      });
    }, 500);
  };
  
  const handleCancel = () => {
    if (verificationSent) {
      setVerificationSent(false);
      setNewEmail('');
    } else {
      navigate(-1);
    }
  };
  
  // For demo purposes, simulate completing verification
  const handleCompleteForDemo = () => {
    toast({
      title: "Email verified successfully",
    });
    navigate('/settings');
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
          <h1 className="text-xl font-bold">Email Address</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {!verificationSent ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-gray-700">
                  Current Email
                </label>
                <Input
                  value={currentEmail}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="text-sm font-medium mb-2 block text-gray-700">
                  New Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter new email address"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                
                <Button 
                  className="flex-1"
                  onClick={handleSendVerification}
                  disabled={!newEmail || isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Verify Email'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <Mail className="h-12 w-12 mx-auto text-blue-500 mb-2" />
                <p className="font-medium text-gray-900">Verification email sent to:</p>
                <p className="font-medium text-blue-600">{newEmail}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Click the link in the email to verify your address
                </p>
              </div>
              
              <div className="flex flex-col gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResendVerification}
                  disabled={isSubmitting}
                >
                  Resend Email
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                >
                  Change Email
                </Button>
                
                {/* This button is only for demo purposes */}
                <Button
                  className="mt-4"
                  onClick={handleCompleteForDemo}
                >
                  (Demo: Simulate Verification)
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditEmail; 