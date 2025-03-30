import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Edit2, Eye, Plus, Save, ArrowLeft, X, ChevronRight, Sparkles, MapPin } from 'lucide-react';
import TopBanner from '@/components/TopBanner';
import { useNavigate, Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Neuromorphic style constants
const neuBackground = "bg-[#f0f3f9]";
const neuInset = "bg-[#f0f3f9] shadow-[inset_3px_3px_6px_#c8cfd8,inset_-3px_-3px_6px_#ffffff]";
const neuElevated = "bg-white shadow-[3px_3px_10px_#d1d9e6,-3px_-3px_10px_#ffffff]";
const neuPurple = "bg-[#e6dcf5]";
const neuPurpleElevated = "bg-[#e6dcf5] shadow-[3px_3px_10px_#c3bacd,-3px_-3px_10px_#ffffff]";
const neuPurpleInset = "bg-[#e6dcf5] shadow-[inset_3px_3px_6px_#c3bacd,inset_-3px_-3px_6px_#ffffff]";
const neuRounded = "rounded-xl";
const neuTransition = "transition-all duration-300";

const ProfileItem = ({ 
  label, 
  value, 
  visibility = 'Visible', 
  onClick,
  alwaysVisible = false
}: { 
  label: string; 
  value: string; 
  visibility?: 'Visible' | 'Hidden' | 'Always Visible'; 
  onClick?: () => void;
  alwaysVisible?: boolean;
}) => (
  <div 
    className="py-4 px-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex flex-col">
      <span className="text-lg font-medium text-gray-800">{label}</span>
      <span className="text-gray-500 mt-1">{value}</span>
    </div>
    <div className="flex items-center">
      <span className={`mr-3 px-3 py-1 rounded-lg ${visibility === 'Visible' ? 'text-purple-800 bg-purple-100' : visibility === 'Hidden' ? 'text-gray-500 bg-gray-100' : 'text-purple-700 bg-purple-100'}`}>
        {alwaysVisible ? 'Always Visible' : visibility}
      </span>
      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
        <ChevronRight className="h-5 w-5 text-gray-500" />
      </div>
    </div>
  </div>
);

const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    {title && <h2 className="text-xl text-gray-600 mb-3 px-2 font-semibold">{title}</h2>}
    <div className={`${neuElevated} ${neuRounded} overflow-hidden`}>
      {children}
    </div>
  </div>
);

const WritePrompt = ({ 
  prompt, 
  answer, 
  onRemove, 
  onEdit
}: { 
  prompt: string; 
  answer: string; 
  onRemove?: () => void;
  onEdit?: () => void;
}) => (
  <div className={`${neuElevated} ${neuRounded} p-5 mb-4 relative`}>
    <div className="pb-4">
      <h3 className="text-lg font-semibold text-gray-800">{prompt}</h3>
      <p className="text-gray-600 mt-2">{answer}</p>
    </div>
    <div className="border-t border-gray-100 pt-4">
      <Button 
        variant="secondary" 
        className={`w-full ${neuPurpleElevated} hover:shadow-[4px_4px_8px_#c3bacd,-4px_-4px_8px_#ffffff] active:${neuPurpleInset} text-purple-800 border-0 ${neuRounded} ${neuTransition}`}
      >
        <Sparkles className="w-4 h-4 mr-2" />
        Try a small change
      </Button>
    </div>
    {onRemove && (
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 h-8 w-8 rounded-full"
        onClick={onRemove}
      >
        <X className="h-4 w-4 text-white" />
      </Button>
    )}
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("edit");
  const [editingItem, setEditingItem] = useState<string | null>(null);
  
  // User profile information
  const [profileInfo, setProfileInfo] = useState({
    name: 'Lia Choi',
    age: 25,
    height: "5' 8\"",
    location: "Hell's Kitchen",
    ethnicity: "East Asian, White/Caucasian",
    children: "Don't have children",
    familyPlans: "Not sure",
    covidVaccine: "Prefer not to say",
    pets: "None",
    zodiacSign: "None",
    drinking: "Yes",
    smoking: "No",
    marijuana: "No",
    drugs: "No",
    work: "Nbcu",
    jobTitle: "None",
    school: "Boston University",
    educationLevel: "Undergrad",
    religiousBeliefs: "Other",
    hometown: "New Jersey",
    politics: "Prefer not to say",
    languagesSpoken: "None",
    datingIntentions: "Long-term relationship",
    relationshipType: "Monogamy",
    gender: "Woman",
    sexuality: "Straight",
    interestedIn: "Men",
    matchNote: "None",
    pronouns: "None"
  });

  // Visibility settings
  const [visibility, setVisibility] = useState({
    ethnicity: "Visible",
    children: "Hidden",
    familyPlans: "Hidden",
    covidVaccine: "Hidden",
    pets: "Hidden",
    zodiacSign: "Hidden",
    drinking: "Visible",
    smoking: "Visible", 
    marijuana: "Visible",
    drugs: "Visible",
    work: "Hidden",
    jobTitle: "Hidden",
    school: "Visible",
    educationLevel: "Always Hidden",
    religiousBeliefs: "Hidden",
    hometown: "Visible",
    politics: "Hidden",
    languagesSpoken: "Hidden",
    datingIntentions: "Visible",
    relationshipType: "Visible",
    gender: "Visible",
    sexuality: "Hidden",
    interestedIn: "Always Hidden",
    matchNote: "Hidden",
    pronouns: "Hidden"
  });
  
  // Profile photos
  const [photos, setPhotos] = useState([
    { id: 'photo-1', content: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', hasPrompt: false },
    { id: 'photo-2', content: 'https://images.unsplash.com/photo-1517841905240-472988babdf9', hasPrompt: false },
    { id: 'photo-3', content: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1', hasPrompt: false },
    { id: 'photo-4', content: 'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8', hasPrompt: true },
    { id: 'photo-5', content: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8', hasPrompt: true },
    { id: 'photo-6', content: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e', hasPrompt: true },
  ]);
  
  // Prompts
  const [writtenPrompts, setWrittenPrompts] = useState([
    { 
      id: 'prompt-1', 
      question: 'My favorite line from a movie', 
      answer: 'Sometimes it\'s the very people who no one imagines anything of, who do the things no one can imagine.',
    },
    { 
      id: 'prompt-2', 
      question: 'The way to win me over is', 
      answer: 'Taking me on a fun first date 😊 and not playing hard to get 😳',
    },
    { 
      id: 'prompt-3', 
      question: 'My most irrational fear', 
      answer: 'Rollercoasters and yogurt',
    },
  ]);
  
  // Save changes and go to map
  const saveChangesAndNavigate = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    navigate('/');
  };
  
  // Toggle top photo feature
  const [topPhotoEnabled, setTopPhotoEnabled] = useState(true);

  // Handle removing a prompt
  const handleRemovePrompt = (promptId: string) => {
    setWrittenPrompts(prev => prev.filter(p => p.id !== promptId));
  };

  // Handle removing a photo
  const handleRemovePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  return (
    <div className={`pb-20 ${neuBackground} min-h-screen`}>
      <div className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
        <Button 
          variant="ghost" 
          className="text-purple-800 font-medium p-2 hover:bg-purple-50 hover:text-purple-900 flex items-center"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Button>
        <h1 className="text-xl font-bold text-gray-800">Lia</h1>
        <Button 
          variant="ghost" 
          className="text-purple-800 font-medium p-2 hover:bg-purple-50 hover:text-purple-900 flex items-center"
          onClick={saveChangesAndNavigate}
        >
          <Save className="h-5 w-5 mr-1" />
          Save
        </Button>
      </div>
      
      <Tabs defaultValue="edit" className="w-full">
        <div className="bg-white border-b border-gray-200 px-4 sticky top-[72px] z-10">
          <TabsList className="w-full grid grid-cols-2 bg-transparent h-14">
            <TabsTrigger 
              value="edit" 
              className={`h-full data-[state=active]:text-purple-800 data-[state=active]:border-b-2 data-[state=active]:border-purple-800 text-xl font-medium ${neuTransition}`}
            >
              Edit
            </TabsTrigger>
            <TabsTrigger 
              value="view" 
              className={`h-full data-[state=active]:text-purple-800 data-[state=active]:border-b-2 data-[state=active]:border-purple-800 text-xl font-medium text-gray-500 ${neuTransition}`}
            >
              View
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="edit" className="px-5 pt-6 space-y-8 mt-0 h-full">
          <ProfileSection title="My Photos & Videos">
            <div className="p-5">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {photos.map(photo => (
                  <div key={photo.id} className={`aspect-square relative ${neuElevated} ${neuRounded} p-2 overflow-hidden`}>
                    <img 
                      src={photo.content} 
                      alt="Profile photo" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 h-8 w-8 rounded-full"
                      onClick={() => handleRemovePhoto(photo.id)}
                    >
                      <X className="h-5 w-5 text-white" />
                    </Button>
                    {photo.hasPrompt && (
                      <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                        Prompt
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <p className="text-gray-500 mb-5 text-center">Tap to edit, drag to reorder</p>
              
              <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl">
              <div>
                  <p className="font-medium text-gray-800">Top Photo</p>
                  <p className="text-gray-500 text-sm mt-1">We'll continuously test your profile pics and put the most popular one first.</p>
                </div>
                <Switch 
                  checked={topPhotoEnabled} 
                  onCheckedChange={setTopPhotoEnabled}
                  className="data-[state=checked]:bg-purple-800"
                />
              </div>
            </div>
          </ProfileSection>
          
          <ProfileSection title="Identity">
            <ProfileItem 
              label="Pronouns" 
              value={profileInfo.pronouns} 
              visibility={visibility.pronouns as any} 
              onClick={() => navigate('/profile/pronouns')}
            />
            <ProfileItem 
              label="Gender" 
              value={profileInfo.gender} 
              visibility={visibility.gender as any} 
              onClick={() => navigate('/profile/gender')}
            />
            <ProfileItem 
              label="Sexuality" 
              value={profileInfo.sexuality} 
              visibility={visibility.sexuality as any} 
              onClick={() => navigate('/profile/sexuality')}
            />
            <ProfileItem 
              label="I'm interested in" 
              value={profileInfo.interestedIn} 
              visibility={visibility.interestedIn as any} 
              onClick={() => navigate('/profile/interested-in')}
            />
          </ProfileSection>
          
          <ProfileSection title="">
            <ProfileItem 
              label="Name" 
              value={profileInfo.name} 
              visibility="Always Visible" 
              alwaysVisible
              onClick={() => navigate('/profile/name')}
            />
            <ProfileItem 
              label="Age" 
              value={profileInfo.age.toString()} 
              visibility="Always Visible" 
              alwaysVisible
              onClick={() => navigate('/profile/age')}
            />
            <ProfileItem 
              label="Height" 
              value={profileInfo.height} 
              visibility="Always Visible" 
              alwaysVisible
              onClick={() => navigate('/profile/height')}
            />
            <ProfileItem 
              label="Location" 
              value={profileInfo.location} 
              visibility="Always Visible" 
              alwaysVisible
              onClick={() => navigate('/profile/location')}
            />
            <ProfileItem 
              label="Ethnicity" 
              value={profileInfo.ethnicity} 
              visibility={visibility.ethnicity as any} 
              onClick={() => navigate('/profile/ethnicity')}
            />
            <ProfileItem 
              label="Children" 
              value={profileInfo.children} 
              visibility={visibility.children as any} 
              onClick={() => navigate('/profile/children')}
            />
            <ProfileItem 
              label="Family Plans" 
              value={profileInfo.familyPlans} 
              visibility={visibility.familyPlans as any} 
              onClick={() => navigate('/profile/family-plans')}
            />
            <ProfileItem 
              label="Pets" 
              value={profileInfo.pets} 
              visibility={visibility.pets as any} 
              onClick={() => navigate('/profile/pets')}
            />
            <ProfileItem 
              label="Zodiac Sign" 
              value={profileInfo.zodiacSign} 
              visibility={visibility.zodiacSign as any} 
              onClick={() => navigate('/profile/zodiac-sign')}
            />
          </ProfileSection>
          
          <ProfileSection title="">
            <ProfileItem 
              label="Drinking" 
              value={profileInfo.drinking} 
              visibility={visibility.drinking as any} 
              onClick={() => navigate('/profile/drinking')}
            />
            <ProfileItem 
              label="Smoking" 
              value={profileInfo.smoking} 
              visibility={visibility.smoking as any} 
              onClick={() => navigate('/profile/smoking')}
            />
            <ProfileItem 
              label="Marijuana" 
              value={profileInfo.marijuana} 
              visibility={visibility.marijuana as any} 
              onClick={() => navigate('/profile/marijuana')}
            />
            <ProfileItem 
              label="Drugs" 
              value={profileInfo.drugs} 
              visibility={visibility.drugs as any} 
              onClick={() => navigate('/profile/drugs')}
            />
          </ProfileSection>
          
          <ProfileSection title="">
            <ProfileItem 
              label="Work" 
              value={profileInfo.work} 
              visibility={visibility.work as any} 
              onClick={() => navigate('/profile/work')}
            />
            <ProfileItem 
              label="Job Title" 
              value={profileInfo.jobTitle} 
              visibility={visibility.jobTitle as any} 
              onClick={() => navigate('/profile/job-title')}
            />
            <ProfileItem 
              label="School" 
              value={profileInfo.school} 
              visibility={visibility.school as any} 
              onClick={() => navigate('/profile/school')}
            />
            <ProfileItem 
              label="Education Level" 
              value={profileInfo.educationLevel} 
              visibility={visibility.educationLevel as any} 
              onClick={() => navigate('/profile/education-level')}
            />
            <ProfileItem 
              label="Religious Beliefs" 
              value={profileInfo.religiousBeliefs} 
              visibility={visibility.religiousBeliefs as any} 
              onClick={() => navigate('/profile/religious-beliefs')}
            />
            <ProfileItem 
              label="Hometown" 
              value={profileInfo.hometown} 
              visibility={visibility.hometown as any} 
              onClick={() => navigate('/profile/hometown')}
            />
            <ProfileItem 
              label="Politics" 
              value={profileInfo.politics} 
              visibility={visibility.politics as any} 
              onClick={() => navigate('/profile/politics')}
            />
            <ProfileItem 
              label="Languages Spoken" 
              value={profileInfo.languagesSpoken} 
              visibility={visibility.languagesSpoken as any} 
              onClick={() => navigate('/profile/languages')}
            />
            <ProfileItem 
              label="Dating Intentions" 
              value={profileInfo.datingIntentions} 
              visibility={visibility.datingIntentions as any} 
              onClick={() => navigate('/profile/dating-intentions')}
            />
            <ProfileItem 
              label="Relationship Type" 
              value={profileInfo.relationshipType} 
              visibility={visibility.relationshipType as any} 
              onClick={() => navigate('/profile/relationship-type')}
            />
          </ProfileSection>
          
          <ProfileSection title="Written Prompts (3)">
            {writtenPrompts.map(prompt => (
              <WritePrompt 
                key={prompt.id}
                prompt={prompt.question}
                answer={prompt.answer}
                onRemove={() => handleRemovePrompt(prompt.id)}
              />
            ))}
            <p className="text-gray-500 text-center py-3">Drag to reorder</p>
          </ProfileSection>
          
          <ProfileSection title="Video Prompt (1)">
            <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-between m-4">
              <div>
                <p className="text-xl font-medium mb-1 text-gray-800">Select a Prompt</p>
                <p className="text-gray-500 italic">And record your answer</p>
              </div>
              <Button 
                size="icon" 
                className={`${neuPurpleElevated} rounded-full text-purple-800 h-12 w-12 ${neuTransition}`}
              >
                <Plus className="h-6 w-6" />
              </Button>
              </div>
          </ProfileSection>
          
          <ProfileSection title="Prompt Poll (1)">
            <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-between m-4">
              <div>
                <p className="text-xl font-medium mb-1 text-gray-800">Create a poll</p>
                <p className="text-gray-500 italic">And add your options</p>
              </div>
              <Button 
                size="icon" 
                className={`${neuPurpleElevated} rounded-full text-purple-800 h-12 w-12 ${neuTransition}`}
              >
                <Plus className="h-6 w-6" />
              </Button>
            </div>
          </ProfileSection>
          
          <ProfileSection title="Voice Prompt (1)">
            <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-between m-4">
              <div>
                <p className="text-xl font-medium mb-1 text-gray-800">Select a Prompt</p>
                <p className="text-gray-500 italic">And record your answer</p>
              </div>
              <Button 
                size="icon" 
                className={`${neuPurpleElevated} rounded-full text-purple-800 h-12 w-12 ${neuTransition}`}
              >
                <Plus className="h-6 w-6" />
              </Button>
            </div>
          </ProfileSection>
        </TabsContent>
        
        <TabsContent value="view" className="mt-0">
          <div className={`flex justify-center items-center h-60 text-gray-500 ${neuInset} mx-5 my-8 ${neuRounded}`}>
            <p className="text-xl">Preview mode content</p>
        </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
