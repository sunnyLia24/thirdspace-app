import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Phone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Country codes for the dropdown
const countryCodes = [
  { value: '+1', label: 'United States (+1)' },
  { value: '+44', label: 'United Kingdom (+44)' },
  { value: '+61', label: 'Australia (+61)' },
  { value: '+33', label: 'France (+33)' },
  { value: '+49', label: 'Germany (+49)' },
  { value: '+91', label: 'India (+91)' },
  { value: '+81', label: 'Japan (+81)' },
  { value: '+86', label: 'China (+86)' },
  { value: '+52', label: 'Mexico (+52)' },
  { value: '+55', label: 'Brazil (+55)' },
];

const EditPhone = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  const handleSendVerification = () => {
    // Basic validation
    if (!phoneNumber || phoneNumber.length < 8) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Verification code sent",
    });
    setVerificationSent(true);
  };
  
  const handleVerifyCode = () => {
    // Basic validation
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "Invalid verification code",
        description: "Please enter the 6-digit code",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      toast({
        title: "Phone verified successfully",
      });
      navigate('/settings');
    }, 1000);
  };
  
  const formatPhoneNumber = (value: string) => {
    // Only allow digits
    const digits = value.replace(/\D/g, '');
    setPhoneNumber(digits);
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
          <h1 className="text-xl font-bold">Phone Number</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {!verificationSent ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="text-sm font-medium mb-2 block text-gray-700">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => formatPhoneNumber(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <Button 
                className="w-full mt-4"
                onClick={handleSendVerification}
                disabled={!phoneNumber}
              >
                Send Verification Code
              </Button>
            </div>
          ) : (
            <div className="space-y-4">              
              <p className="text-center text-gray-700 mb-2">
                Enter the 6-digit code sent to<br />
                <span className="font-medium">{countryCode} {phoneNumber}</span>
              </p>
              
              <Input
                placeholder="6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-xl tracking-widest"
                maxLength={6}
              />
              
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setVerificationSent(false)}
                >
                  Back
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleVerifyCode}
                  disabled={verificationCode.length !== 6 || isVerifying}
                >
                  {isVerifying ? 'Verifying...' : 'Verify'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPhone; 