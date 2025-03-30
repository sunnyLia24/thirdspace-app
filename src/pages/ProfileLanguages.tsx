import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const languageOptions = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Japanese",
  "Korean",
  "Mandarin",
  "Cantonese",
  "Arabic",
  "Hindi",
  "Other"
];

const ProfileLanguages = () => {
  const navigate = useNavigate();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["English"]);

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(lang => lang !== language)
        : [...prev, language]
    );
  };

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your languages have been saved.",
    });
    navigate('/profile');
  };

  return (
    <div className="pb-20 min-h-screen bg-[#f0f3f9]">
      <div className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
        <Button 
          variant="ghost" 
          className="text-purple-800 font-medium p-2 hover:bg-purple-50 hover:text-purple-900 flex items-center"
          onClick={() => navigate('/profile')}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Button>
        <h1 className="text-xl font-bold text-gray-800">Languages</h1>
        <Button 
          variant="ghost" 
          className="text-purple-800 font-medium p-2 hover:bg-purple-50 hover:text-purple-900 flex items-center"
          onClick={handleSave}
        >
          <Save className="h-5 w-5 mr-1" />
          Save
        </Button>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500 mb-6">What languages do you speak?</p>
          
          <div className="space-y-3">
            {languageOptions.map(language => (
              <div key={language} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <Checkbox 
                  id={language} 
                  checked={selectedLanguages.includes(language)}
                  onCheckedChange={() => toggleLanguage(language)}
                />
                <Label htmlFor={language} className="cursor-pointer flex-1">
                  {language}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLanguages; 