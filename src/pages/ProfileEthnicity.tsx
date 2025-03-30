import React, { useState } from 'react';
import ProfileSettingTemplate from '@/components/ProfileSettingTemplate';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ethnicityOptions = [
  { id: 'asian_east', label: 'East Asian' },
  { id: 'asian_south', label: 'South Asian' },
  { id: 'asian_southeast', label: 'Southeast Asian' },
  { id: 'black', label: 'Black / African Descent' },
  { id: 'hispanic', label: 'Hispanic / Latino' },
  { id: 'middle_eastern', label: 'Middle Eastern' },
  { id: 'native_american', label: 'Native American' },
  { id: 'pacific_islander', label: 'Pacific Islander' },
  { id: 'white', label: 'White / Caucasian' },
  { id: 'other', label: 'Other' },
  { id: 'prefer_not_say', label: 'Prefer not to say' },
];

const ProfileEthnicity = () => {
  const [selectedEthnicities, setSelectedEthnicities] = useState<string[]>(['asian_east', 'white']);
  
  const handleCheckboxChange = (id: string) => {
    // Special case for "Prefer not to say"
    if (id === 'prefer_not_say') {
      if (selectedEthnicities.includes('prefer_not_say')) {
        setSelectedEthnicities([]);
      } else {
        setSelectedEthnicities(['prefer_not_say']);
      }
      return;
    }
    
    // If "Prefer not to say" is selected and user selects another option, deselect "Prefer not to say"
    const newSelectedEthnicities = [...selectedEthnicities];
    if (selectedEthnicities.includes('prefer_not_say')) {
      const preferNotSayIndex = newSelectedEthnicities.indexOf('prefer_not_say');
      newSelectedEthnicities.splice(preferNotSayIndex, 1);
    }
    
    // Toggle the selected option
    if (selectedEthnicities.includes(id)) {
      const index = newSelectedEthnicities.indexOf(id);
      newSelectedEthnicities.splice(index, 1);
    } else {
      newSelectedEthnicities.push(id);
    }
    
    setSelectedEthnicities(newSelectedEthnicities);
  };
  
  const handleSave = () => {
    // In a real app, you would save this to your backend
    const ethnicities = selectedEthnicities.map(id => 
      ethnicityOptions.find(option => option.id === id)?.label
    ).filter(Boolean);
    
    console.log('Saving ethnicities:', ethnicities);
  };

  return (
    <ProfileSettingTemplate 
      title="Ethnicity" 
      onSave={handleSave}
    >
      <div className="p-4">
        <p className="text-gray-500 mb-6">
          Select the ethnic backgrounds that best describe you. You can select multiple options.
        </p>
        
        <div className="space-y-3">
          {ethnicityOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
              <Checkbox 
                id={`ethnicity-${option.id}`} 
                checked={selectedEthnicities.includes(option.id)}
                onCheckedChange={() => handleCheckboxChange(option.id)}
                className="text-purple-800 border-gray-300 h-5 w-5"
              />
              <Label htmlFor={`ethnicity-${option.id}`} className="flex-grow cursor-pointer font-medium">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </ProfileSettingTemplate>
  );
};

export default ProfileEthnicity; 