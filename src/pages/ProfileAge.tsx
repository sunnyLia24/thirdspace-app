import React, { useState } from 'react';
import ProfileSettingTemplate from '@/components/ProfileSettingTemplate';
import { Label } from "@/components/ui/label";
import { differenceInYears, subYears, format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

const ProfileAge = () => {
  const [birthdate, setBirthdate] = useState<Date | undefined>(subYears(new Date(), 25));
  const age = birthdate ? differenceInYears(new Date(), birthdate) : 0;
  
  const handleSave = () => {
    // In a real app, you would save this to your backend
    console.log('Saving birthdate:', birthdate, 'Age:', age);
  };

  return (
    <ProfileSettingTemplate 
      title="Age" 
      onSave={handleSave}
      hideVisibilityToggle={true}
    >
      <div className="p-4">
        <p className="text-gray-500 mb-6">
          Your age is calculated from your date of birth and is visible to potential matches.
        </p>
        
        <div>
          <Label htmlFor="birthdate" className="text-gray-700 font-medium block mb-2">
            Date of Birth
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !birthdate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {birthdate ? format(birthdate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={birthdate}
                onSelect={setBirthdate}
                initialFocus
                fromYear={1940}
                toYear={new Date().getFullYear() - 18}
                captionLayout="dropdown-buttons"
              />
            </PopoverContent>
          </Popover>
          <p className="mt-4 text-gray-700 font-medium">
            Your age: <span className="text-purple-800">{age} years old</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This cannot be changed later. Please make sure it's accurate.
          </p>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-amber-800 font-medium mb-2">Age Guidelines</h3>
          <p className="text-amber-700 text-sm">
            You must be at least 18 years old to use our services. We verify ages 
            to ensure a safe community. Your actual birthdate is not shown to others,
            only your age.
          </p>
        </div>
      </div>
    </ProfileSettingTemplate>
  );
};

export default ProfileAge; 