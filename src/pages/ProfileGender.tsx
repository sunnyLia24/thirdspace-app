import React, { useState } from 'react';
import ProfileSettingTemplate from '@/components/ProfileSettingTemplate';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const genderOptions = [
  { value: 'woman', label: 'Woman' },
  { value: 'man', label: 'Man' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'transgender', label: 'Transgender' },
  { value: 'transgender_woman', label: 'Transgender Woman' },
  { value: 'transgender_man', label: 'Transgender Man' },
  { value: 'other', label: 'Other' },
];

const ProfileGender = () => {
  const [selectedGender, setSelectedGender] = useState('woman');
  const [customGender, setCustomGender] = useState('');
  
  const handleSave = () => {
    // In a real app, you would save this to your backend
    console.log('Saving gender:', selectedGender === 'other' ? customGender : selectedGender);
  };

  return (
    <ProfileSettingTemplate title="Gender" onSave={handleSave}>
      <div className="p-4">
        <p className="text-gray-500 mb-6">
          Select your gender to help us create the right experiences for you. This helps us match you with the right people.
        </p>
        
        <RadioGroup value={selectedGender} onValueChange={setSelectedGender} className="space-y-3">
          {genderOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
              <RadioGroupItem value={option.value} id={`gender-${option.value}`} className="text-purple-800" />
              <Label htmlFor={`gender-${option.value}`} className="flex-grow cursor-pointer font-medium">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {selectedGender === 'other' && (
          <div className="mt-4 pl-10">
            <Label htmlFor="custom-gender" className="text-sm text-gray-600 mb-2 block">
              How do you identify?
            </Label>
            <Input
              id="custom-gender"
              value={customGender}
              onChange={(e) => setCustomGender(e.target.value)}
              placeholder="Enter your gender identity"
              className="w-full border-gray-200 focus:border-purple-800 focus:ring-purple-800"
            />
          </div>
        )}
      </div>
    </ProfileSettingTemplate>
  );
};

export default ProfileGender; 