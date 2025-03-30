import React, { useState } from 'react';
import ProfileSettingTemplate from '@/components/ProfileSettingTemplate';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const options = [
  { id: 'men', label: 'Men' },
  { id: 'women', label: 'Women' },
  { id: 'nonbinary', label: 'Non-binary people' },
  { id: 'transgender', label: 'Transgender people' },
  { id: 'everyone', label: 'Everyone' },
];

const ProfileInterestedIn = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['men']);
  
  const handleCheckboxChange = (id: string) => {
    // Handle special case for "Everyone" option
    if (id === 'everyone') {
      if (selectedOptions.includes('everyone')) {
        setSelectedOptions([]);
      } else {
        setSelectedOptions(['everyone']);
      }
      return;
    }
    
    // If "Everyone" is selected and user selects another option, deselect "Everyone"
    const newSelectedOptions = [...selectedOptions];
    if (selectedOptions.includes('everyone')) {
      const everyoneIndex = newSelectedOptions.indexOf('everyone');
      newSelectedOptions.splice(everyoneIndex, 1);
    }
    
    // Toggle the selected option
    if (selectedOptions.includes(id)) {
      const index = newSelectedOptions.indexOf(id);
      newSelectedOptions.splice(index, 1);
    } else {
      newSelectedOptions.push(id);
    }
    
    setSelectedOptions(newSelectedOptions);
  };
  
  const handleSave = () => {
    // In a real app, you would save this to your backend
    console.log('Saving interested in:', selectedOptions);
  };

  return (
    <ProfileSettingTemplate 
      title="I'm interested in" 
      onSave={handleSave}
      hideVisibilityToggle={true}
    >
      <div className="p-4">
        <p className="text-gray-500 mb-6">
          Select who you'd like to see and potentially match with. This information is always kept private.
        </p>
        
        <div className="space-y-3">
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
              <Checkbox 
                id={`interest-${option.id}`} 
                checked={selectedOptions.includes(option.id)}
                onCheckedChange={() => handleCheckboxChange(option.id)}
                className="text-purple-800 border-gray-300 h-5 w-5"
              />
              <Label htmlFor={`interest-${option.id}`} className="flex-grow cursor-pointer font-medium">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        
        <p className="text-gray-500 text-sm mt-6">
          This preference is used to show you relevant people, but matches may include people outside of these preferences when we think there might be mutual interest.
        </p>
      </div>
    </ProfileSettingTemplate>
  );
};

export default ProfileInterestedIn; 