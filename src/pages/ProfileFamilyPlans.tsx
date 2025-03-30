import React, { useState } from 'react';
import ProfileSettingTemplate from '@/components/ProfileSettingTemplate';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const familyPlansOptions = [
  { id: 'want_children', label: "I want children" },
  { id: 'want_more_children', label: "I want more children" },
  { id: 'dont_want_children', label: "I don't want children" },
  { id: 'have_children_want_more', label: "I have children and want more" },
  { id: 'have_children_done', label: "I have children and don't want more" },
  { id: 'not_sure', label: "Not sure yet" },
  { id: 'prefer_not_say', label: "Prefer not to say" },
];

const ProfileFamilyPlans = () => {
  const [selectedOption, setSelectedOption] = useState('not_sure');
  
  const handleSave = () => {
    // In a real app, you would save this to your backend
    const option = familyPlansOptions.find(option => option.id === selectedOption);
    console.log('Saving family plans:', option?.label);
  };

  return (
    <ProfileSettingTemplate 
      title="Family Plans" 
      onSave={handleSave}
    >
      <div className="p-4">
        <p className="text-gray-500 mb-6">
          Share your future family plans to help find someone who shares similar goals.
        </p>
        
        <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-4">
          {familyPlansOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
              <RadioGroupItem value={option.id} id={`family-plans-${option.id}`} className="text-purple-800" />
              <Label htmlFor={`family-plans-${option.id}`} className="flex-grow cursor-pointer font-medium">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        <p className="text-sm text-gray-500 mt-6">
          Family plans can be an important compatibility factor for many people.
          Being upfront about your desires can help you find more meaningful connections.
        </p>
      </div>
    </ProfileSettingTemplate>
  );
};

export default ProfileFamilyPlans; 