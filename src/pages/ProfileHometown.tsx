import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const ProfileHometown = () => {
  const navigate = useNavigate();
  const [hometownValue, setHometownValue] = useState("New Jersey");

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your hometown has been saved.",
    });
    navigate('/profile');
  };

  return (
    <div className="pb-20 min-h-screen bg-[#f0f3f9]">
      <div className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
        <Button 
          variant="ghost" 
          className="text-purple-800 font-medium p-2 hover:bg-purple-50 hover:text-purple-900 flex items-center"
          onClick={() => navigate('/profile')}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Button>
        <h1 className="text-xl font-bold text-gray-800">Hometown</h1>
        <Button 
          variant="ghost" 
          className="text-purple-800 font-medium p-2 hover:bg-purple-50 hover:text-purple-900 flex items-center"
          onClick={handleSave}
        >
          <Save className="h-5 w-5 mr-1" />
          Save
        </Button>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="hometown" className="text-gray-500 block mb-2">Where are you from?</Label>
              <Input
                id="hometown"
                placeholder="Your hometown"
                value={hometownValue}
                onChange={(e) => setHometownValue(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
              <p className="text-gray-400 text-sm mt-2">This will be shown on your profile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHometown; 