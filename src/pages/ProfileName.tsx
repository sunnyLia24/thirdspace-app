import React, { useState } from 'react';
import ProfileSettingTemplate from '@/components/ProfileSettingTemplate';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProfileName = () => {
  const [firstName, setFirstName] = useState('Lia');
  const [lastName, setLastName] = useState('Choi');
  
  const handleSave = () => {
    // In a real app, you would save this to your backend
    console.log('Saving name:', { firstName, lastName });
  };

  return (
    <ProfileSettingTemplate 
      title="Name" 
      onSave={handleSave}
      hideVisibilityToggle={true}
    >
      <div className="p-4">
        <p className="text-gray-500 mb-6">
          Your name is visible to everyone on your profile. We use your first name for matching.
        </p>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="firstName" className="text-gray-700 font-medium block mb-2">
              First Name
            </Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your first name"
              className="w-full border-gray-200 focus:border-purple-800 focus:ring-purple-800"
            />
          </div>
          
          <div>
            <Label htmlFor="lastName" className="text-gray-700 font-medium block mb-2">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Your last name"
              className="w-full border-gray-200 focus:border-purple-800 focus:ring-purple-800"
            />
            <p className="text-sm text-gray-500 mt-2">
              For security, only your first name will be shown on your profile.
            </p>
          </div>
        </div>
      </div>
    </ProfileSettingTemplate>
  );
};

export default ProfileName; 