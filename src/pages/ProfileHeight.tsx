import React, { useState } from 'react';
import ProfileSettingTemplate from '@/components/ProfileSettingTemplate';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

const ProfileHeight = () => {
  const [unit, setUnit] = useState<'ft' | 'cm'>('ft');
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(8);
  const [heightCm, setHeightCm] = useState(173);
  
  // When changing units, convert the height
  const handleUnitChange = (newUnit: 'ft' | 'cm') => {
    setUnit(newUnit);
    if (newUnit === 'cm' && unit === 'ft') {
      // Convert feet/inches to cm
      setHeightCm(Math.round((heightFeet * 12 + heightInches) * 2.54));
    } else if (newUnit === 'ft' && unit === 'cm') {
      // Convert cm to feet/inches
      const totalInches = Math.round(heightCm / 2.54);
      setHeightFeet(Math.floor(totalInches / 12));
      setHeightInches(totalInches % 12);
    }
  };
  
  const handleFeetChange = (value: number[]) => {
    setHeightFeet(value[0]);
  };
  
  const handleInchesChange = (value: number[]) => {
    setHeightInches(value[0]);
  };
  
  const handleCmChange = (value: number[]) => {
    setHeightCm(value[0]);
  };
  
  const handleSave = () => {
    // In a real app, you would save this to your backend
    if (unit === 'ft') {
      console.log('Saving height:', `${heightFeet}' ${heightInches}"`);
    } else {
      console.log('Saving height:', `${heightCm} cm`);
    }
  };

  return (
    <ProfileSettingTemplate 
      title="Height" 
      onSave={handleSave}
    >
      <div className="p-4">
        <p className="text-gray-500 mb-6">
          Your height will be displayed on your profile. You can choose to show it in feet/inches or centimeters.
        </p>
        
        <div className="mb-6">
          <Label className="text-gray-700 font-medium block mb-3">
            Unit of Measurement
          </Label>
          <RadioGroup 
            value={unit} 
            onValueChange={(value) => handleUnitChange(value as 'ft' | 'cm')}
            className="flex space-x-4 mb-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ft" id="unit-ft" className="text-purple-800" />
              <Label htmlFor="unit-ft">Feet/Inches</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cm" id="unit-cm" className="text-purple-800" />
              <Label htmlFor="unit-cm">Centimeters</Label>
            </div>
          </RadioGroup>
        </div>
        
        {unit === 'ft' ? (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-gray-700">Feet</Label>
                <span className="text-gray-700 font-medium">{heightFeet} ft</span>
              </div>
              <Slider
                defaultValue={[heightFeet]}
                value={[heightFeet]}
                onValueChange={handleFeetChange}
                max={7}
                min={4}
                step={1}
                className="text-purple-800"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-gray-700">Inches</Label>
                <span className="text-gray-700 font-medium">{heightInches} in</span>
              </div>
              <Slider
                defaultValue={[heightInches]}
                value={[heightInches]}
                onValueChange={handleInchesChange}
                max={11}
                min={0}
                step={1}
                className="text-purple-800"
              />
            </div>
            
            <div className="py-4 text-center">
              <span className="text-xl font-medium text-purple-800">
                {heightFeet}' {heightInches}"
              </span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-gray-700">Height</Label>
              <span className="text-gray-700 font-medium">{heightCm} cm</span>
            </div>
            <Slider
              defaultValue={[heightCm]}
              value={[heightCm]}
              onValueChange={handleCmChange}
              max={220}
              min={140}
              step={1}
              className="text-purple-800"
            />
            
            <div className="py-4 text-center">
              <span className="text-xl font-medium text-purple-800">
                {heightCm} cm
              </span>
            </div>
          </div>
        )}
      </div>
    </ProfileSettingTemplate>
  );
};

export default ProfileHeight; 