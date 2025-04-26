import React, { useState } from 'react';
import ProfileSettingTemplate from '@/components/ProfileSettingTemplate';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const sexualityOptions = [
  { value: 'straight', label: 'Straight' },
  { value: 'gay', label: 'Gay' },
  { value: 'lesbian', label: 'Lesbian' },
  { value: 'bisexual', label: 'Bisexual' },
  { value: 'queer', label: 'Queer' },
  { value: 'pansexual', label: 'Pansexual' },
  { value: 'demisexual', label: 'Demisexual' },
  { value: 'asexual', label: 'Asexual' },
  { value: 'other', label: 'Other' },
];

const ProfileSexuality = () => {
  const [selectedSexuality, setSelectedSexuality] = useState('straight');
  const [customSexuality, setCustomSexuality] = useState('');
  
  const handleSave = () => {
    // In a real app, you would save this to your backend
    console.log('Saving sexuality:', selectedSexuality === 'other' ? customSexuality : selectedSexuality);
  };

  return (
    <ProfileSettingTemplate title="Sexuality" onSave={handleSave}>
      <div className="p-4">
        <p className="text-gray-500 mb-6">
          Select your sexual orientation to help us find the right matches for you.
        </p>
        
        <RadioGroup value={selectedSexuality} onValueChange={setSelectedSexuality} className="space-y-3">
          {sexualityOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
              <RadioGroupItem value={option.value} id={`sexuality-${option.value}`} className="text-purple-800" />
              <Label htmlFor={`sexuality-${option.value}`} className="flex-grow cursor-pointer font-medium">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {selectedSexuality === 'other' && (
          <div className="mt-4 pl-10">
            <Label htmlFor="custom-sexuality" className="text-sm text-gray-600 mb-2 block">
              How do you identify?
            </Label>
            <Input
              id="custom-sexuality"
              value={customSexuality}
              onChange={(e) => setCustomSexuality(e.target.value)}
              placeholder="Enter your sexual orientation"
              className="w-full border-gray-200 focus:border-purple-800 focus:ring-purple-800"
            />
          </div>
        )}
      </div>
    </ProfileSettingTemplate>
  );
};

export default ProfileSexuality; 