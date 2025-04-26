import React, { useState } from 'react';
import ProfileSettingTemplate from '@/components/ProfileSettingTemplate';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const pronounsOptions = [
  { value: 'she/her', label: 'she/her' },
  { value: 'he/him', label: 'he/him' },
  { value: 'they/them', label: 'they/them' },
  { value: 'other', label: 'Other' },
];

const ProfilePronouns = () => {
  const [selectedPronoun, setSelectedPronoun] = useState('she/her');
  const [customPronoun, setCustomPronoun] = useState('');
  
  const handleSave = () => {
    // In a real app, you would save this to your backend
    console.log('Saving pronouns:', selectedPronoun === 'other' ? customPronoun : selectedPronoun);
  };

  return (
    <ProfileSettingTemplate title="Pronouns" onSave={handleSave}>
      <div className="p-4">
        <p className="text-gray-500 mb-6">
          This helps others know how to refer to you and gives us a better understanding of who you are.
        </p>
        
        <RadioGroup value={selectedPronoun} onValueChange={setSelectedPronoun} className="space-y-4">
          {pronounsOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
              <RadioGroupItem value={option.value} id={`pronoun-${option.value}`} className="text-purple-800" />
              <Label htmlFor={`pronoun-${option.value}`} className="flex-grow cursor-pointer font-medium">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {selectedPronoun === 'other' && (
          <div className="mt-4 pl-10">
            <Label htmlFor="custom-pronoun" className="text-sm text-gray-600 mb-2 block">
              Enter your pronouns
            </Label>
            <Input
              id="custom-pronoun"
              value={customPronoun}
              onChange={(e) => setCustomPronoun(e.target.value)}
              placeholder="Enter your pronouns"
              className="w-full border-gray-200 focus:border-purple-800 focus:ring-purple-800"
            />
          </div>
        )}
      </div>
    </ProfileSettingTemplate>
  );
};

export default ProfilePronouns; 