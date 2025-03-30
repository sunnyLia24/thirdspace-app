import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const options = [
  "Yes",
  "Sometimes",
  "Rarely",
  "No",
  "Prefer not to say"
];

const ProfileMarijuana = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("No");

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your marijuana preference has been saved.",
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
        <h1 className="text-xl font-bold text-gray-800">Marijuana</h1>
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
          <p className="text-gray-500 mb-6">Do you use marijuana?</p>
          
          <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-3">
            {options.map(option => (
              <div key={option} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <Label htmlFor={option} className="cursor-pointer w-full">
                  {option}
                </Label>
                <RadioGroupItem value={option} id={option} />
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default ProfileMarijuana; 