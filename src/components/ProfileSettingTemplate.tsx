import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// Neuromorphic style constants
const neuBackground = "bg-[#f0f3f9]";
const neuElevated = "bg-white shadow-[3px_3px_10px_#d1d9e6,-3px_-3px_10px_#ffffff]";
const neuRounded = "rounded-xl";

interface ProfileSettingTemplateProps {
  title: string;
  children: React.ReactNode;
  onSave?: () => void;
  hideVisibilityToggle?: boolean;
}

const ProfileSettingTemplate: React.FC<ProfileSettingTemplateProps> = ({ 
  title, 
  children, 
  onSave,
  hideVisibilityToggle = false
}) => {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState<'Visible' | 'Hidden'>('Visible');

  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      toast({
        title: "Changes saved",
        description: "Your profile has been updated successfully.",
      });
    }
    navigate(-1);
  };

  return (
    <div className={`pb-20 ${neuBackground} min-h-screen`}>
      <div className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
        <Button 
          variant="ghost" 
          className="text-purple-800 font-medium p-2 hover:bg-purple-50 hover:text-purple-900 flex items-center"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Button>
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        <Button 
          variant="ghost" 
          className="text-purple-800 font-medium p-2 hover:bg-purple-50 hover:text-purple-900 flex items-center"
          onClick={handleSave}
        >
          <Check className="h-5 w-5 mr-1" />
          Save
        </Button>
      </div>

      <div className="container mx-auto px-4 py-6">
        {!hideVisibilityToggle && (
          <div className={`mb-6 ${neuElevated} ${neuRounded} p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-800">Visibility</h2>
                <p className="text-gray-500 text-sm mt-1">Control who can see this information</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={visibility === 'Visible' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setVisibility('Visible')}
                  className={visibility === 'Visible' ? 'bg-purple-800 hover:bg-purple-700' : ''}
                >
                  Visible
                </Button>
                <Button
                  variant={visibility === 'Hidden' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setVisibility('Hidden')}
                  className={visibility === 'Hidden' ? 'bg-purple-800 hover:bg-purple-700' : ''}
                >
                  Hidden
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className={`${neuElevated} ${neuRounded} overflow-hidden`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingTemplate; 