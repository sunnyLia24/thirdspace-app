import React, { useState } from 'react';
import ProfileSettingTemplate from '@/components/ProfileSettingTemplate';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const childrenOptions = [
  { id: 'no_children', label: "I don't have children" },
  { id: 'have_children_not_home', label: "I have children, but they don't live with me" },
  { id: 'have_children_home', label: "I have children, and they sometimes live with me" },
  { id: 'have_children_full_time', label: "I have children, and they live with me" },
  { id: 'prefer_not_say', label: "Prefer not to say" },
];

const ProfileChildren = () => {
  const [selectedOption, setSelectedOption] = useState('no_children');
  
  const handleSave = () => {
    // In a real app, you would save this to your backend
    const option = childrenOptions.find(option => option.id === selectedOption);
    console.log('Saving children status:', option?.label);
  };

  return (
    <ProfileSettingTemplate 
      title="Children" 
      onSave={handleSave}
    >
      <div className="p-4">
        <p className="text-gray-500 mb-6">
          Let others know about your children status. This helps find compatible matches who share similar life circumstances.
        </p>
        
        <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-4">
          {childrenOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
              <RadioGroupItem value={option.id} id={`children-${option.id}`} className="text-purple-800" />
              <Label htmlFor={`children-${option.id}`} className="flex-grow cursor-pointer font-medium">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </ProfileSettingTemplate>
  );
};

export default ProfileChildren; 