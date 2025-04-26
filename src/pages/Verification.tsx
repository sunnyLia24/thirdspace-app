import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  BadgeCheck, 
  Camera, 
  Upload, 
  Shield, 
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const Verification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);
  
  const handleSelfieCapture = () => {
    // In a real app, this would open the camera
    toast({
      title: "Selfie captured",
      description: "Your selfie has been uploaded successfully.",
    });
    setSelfieUploaded(true);
  };
  
  const handleIdUpload = () => {
    // In a real app, this would open a file picker
    toast({
      title: "ID uploaded",
      description: "Your ID has been uploaded successfully.",
    });
    setIdUploaded(true);
  };
  
  const handleSubmit = () => {
    if (selfieUploaded && idUploaded) {
      toast({
        title: "Verification submitted",
        description: "Your verification request has been submitted for review. We'll notify you once it's approved.",
      });
      // Navigate back with a small delay
      setTimeout(() => navigate(-1), 1500);
    } else {
      toast({
        title: "Missing required documents",
        description: "Please capture a selfie and upload your ID to complete verification.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-6">
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
          <h1 className="text-xl font-bold">Account Verification</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-6">
        <div className="bg-purple-50 rounded-xl p-4 flex gap-3 mb-6">
          <BadgeCheck className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-purple-800 font-medium mb-1">Why verify your account?</p>
            <p className="text-sm text-purple-700">
              Verified accounts receive a badge, get more visibility, and build trust with other users.
              Verification helps maintain a safe community for everyone.
            </p>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="mr-2 h-5 w-5 text-purple-600" />
              Step 1: Take a Selfie
            </CardTitle>
            <CardDescription>
              We'll use this to confirm you're the person in your profile photos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`border-2 border-dashed rounded-lg p-8 mb-4 text-center 
              ${selfieUploaded ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
              {selfieUploaded ? (
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="h-10 w-10 text-green-500 mb-2" />
                  <p className="text-green-700 font-medium">Selfie uploaded successfully</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Camera className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-500 mb-2">Take a clear photo of your face</p>
                  <p className="text-xs text-gray-400 mb-4">Make sure you're in good lighting and your face is clearly visible</p>
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleSelfieCapture} 
              variant={selfieUploaded ? "outline" : "default"} 
              className="w-full"
            >
              {selfieUploaded ? "Retake Selfie" : "Take Selfie"}
            </Button>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5 text-purple-600" />
              Step 2: Upload ID
            </CardTitle>
            <CardDescription>
              Upload a government-issued photo ID (driver's license, passport, etc.)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`border-2 border-dashed rounded-lg p-8 mb-4 text-center 
              ${idUploaded ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
              {idUploaded ? (
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="h-10 w-10 text-green-500 mb-2" />
                  <p className="text-green-700 font-medium">ID uploaded successfully</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-500 mb-2">Tap to upload your ID</p>
                  <p className="text-xs text-gray-400 mb-4">Make sure all details are clearly visible</p>
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleIdUpload} 
              variant={idUploaded ? "outline" : "default"} 
              className="w-full"
            >
              {idUploaded ? "Replace ID" : "Upload ID"}
            </Button>
          </CardContent>
        </Card>
        
        <div className="bg-amber-50 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium mb-1">Privacy Protection</p>
              <p className="text-sm text-amber-700 mb-2">
                Your ID is used for verification only and will be deleted after review.
                We never share your personal information with other users.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Info className="h-4 w-4 text-amber-600" />
                <p className="text-xs text-amber-700">
                  Verification usually takes 1-2 business days
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          variant="default" 
          className="w-full"
          onClick={handleSubmit}
          disabled={!selfieUploaded || !idUploaded}
        >
          <BadgeCheck className="mr-2 h-5 w-5" />
          Submit for Verification
        </Button>
      </div>
    </div>
  );
};

export default Verification; 