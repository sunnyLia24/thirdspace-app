import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Settings, Edit2, Eye, Plus, Save, ArrowLeft, X, ChevronRight, Sparkles, MapPin, QrCode } from 'lucide-react';
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
      <span className="text-base font-medium text-darkgray">{label}</span>
      <span className="text-coolgray mt-1 text-base">{value}</span>
    </div>
    <div className="flex items-center">
      <span className={`mr-3 px-3 py-1 rounded-lg text-sm ${
        visibility === 'Visible' 
          ? 'text-azure bg-[#e5f4fa]' 
          : visibility === 'Hidden' 
            ? 'text-coolgray bg-gray-100' 
            : 'text-azure bg-[#e5f4fa]'
      }`}>
        {alwaysVisible ? 'Always Visible' : visibility}
      </span>
      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
        <ChevronRight className="h-5 w-5 text-coolgray" />
      </div>
    </div>
  </div>
);

const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    {title && <h2 className="text-xl leading-7 text-gray-600 mb-3 px-2 font-semibold">{title}</h2>}
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
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
  <div className="bg-white rounded-xl p-5 mb-4 relative shadow-md">
    <div className="pb-4">
      <h3 className="text-lg leading-6 font-semibold text-darkgray">{prompt}</h3>
      <p className="text-base text-coolgray mt-2">{answer}</p>
    </div>
    <div className="border-t border-gray-100 pt-4">
      <Button 
        variant="secondary" 
        className="w-full bg-[#e5f4fa] text-azure border-0 rounded-xl transition-all duration-300"
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
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showEditView, setShowEditView] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  
  // Reset rotation when leaving dragging mode
  const resetCardRotation = () => {
    // If rotated more than halfway (90 degrees), flip it completely
    if (Math.abs(rotationDegrees) > 90) {
      setIsCardFlipped(!isCardFlipped);
    }
    
    // Reset rotation to 0 or 180 depending on flipped state
    setRotationDegrees(0);
  };
  
  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggingRef.current = true;
    
    // Get starting X position for either mouse or touch event
    if ('clientX' in e) {
      startXRef.current = e.clientX;
    } else if (e.touches && e.touches.length > 0) {
      startXRef.current = e.touches[0].clientX;
    }
  };
  
  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDraggingRef.current) return;
    
    // Get current X position for either mouse or touch event
    let currentX = 0;
    if ('clientX' in e) {
      currentX = e.clientX;
    } else if (e.touches && e.touches.length > 0) {
      currentX = e.touches[0].clientX;
    }
    
    // Calculate drag distance and convert to rotation degrees
    const dragDistance = currentX - startXRef.current;
    const screenWidth = window.innerWidth;
    const dragPercent = dragDistance / (screenWidth / 2); // Half screen = 180 degrees
    
    // Calculate new rotation (limit to -180 to 180 range)
    let newRotation = dragPercent * 180;
    
    // If already flipped, start from 180 degrees
    if (isCardFlipped) {
      newRotation = 180 + newRotation;
      
      // Keep within 0 to 180 range when already flipped
      if (newRotation < 0) newRotation = 0;
      if (newRotation > 180) newRotation = 180;
    } else {
      // Keep within 0 to 180 range when not flipped
      if (newRotation < 0) newRotation = 0;
      if (newRotation > 180) newRotation = 180;
    }
    
    setRotationDegrees(newRotation);
  };
  
  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    
    isDraggingRef.current = false;
    resetCardRotation();
  };
  
  // Add event listeners for drag movement and end
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleDragMove(e);
    const handleTouchMove = (e: TouchEvent) => handleDragMove(e);
    
    const handleMouseUp = () => handleDragEnd();
    const handleTouchEnd = () => handleDragEnd();
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isCardFlipped, rotationDegrees]);

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
  
  // Save changes and return to profile view
  const saveChangesAndNavigate = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    // Return to profile card view instead of navigating to map
    setShowEditView(false);
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
  
  // Handles showing the edit view (original profile page)
  const handleEditProfile = () => {
    setShowEditView(true);
  };
  
  // Renders the card view of the profile
  const renderCardView = () => {
    return (
      <div className="flex flex-col items-center px-4 pt-16 pb-16">
        <div 
          ref={cardRef}
          className="w-full max-w-[320px] perspective-1000 cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div 
            className="w-full relative transition-transform duration-300 transform-style-3d"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotationDegrees}deg)`,
              transition: isDraggingRef.current ? 'none' : 'transform 0.3s ease-out'
            }}
          >
            {/* Front of card */}
            <div 
              className="w-full backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900/95 text-white shadow-xl transform rotate-1 hover:rotate-0 transition-all duration-300">
                {/* Extra top spacing where header used to be - increased to move profile picture down */}
                <div className="h-24"></div>
                
                {/* Profile Image */}
                <div className="flex justify-center p-4">
                  <div className="w-44 h-44 rounded-full overflow-hidden">
                    <img 
                      src={photos[0]?.content} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Additional spacing to make card longer - adjusted for better centering */}
                <div className="h-20"></div>
                
                {/* Bottom Bar with Name and QR Code */}
                <div className="p-5 flex justify-between items-end">
                  {/* Name and age in bottom left */}
                  <div className="flex flex-col">
                    <div className="text-lg font-bold lowercase">
                      {profileInfo.name}
                    </div>
                    <div className="text-sm text-gray-300 mt-0.5">
                      {profileInfo.age} years
                    </div>
                  </div>
                  
                  {/* QR Code in bottom right */}
                  <QrCode className="w-14 h-14 text-white" />
                </div>
                
                {/* Additional spacing to make card longer */}
                <div className="h-10"></div>
              </div>
            </div>

            {/* Back of card */}
            <div 
              className="w-full absolute inset-0 backface-hidden"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-800 to-blue-900/95 text-white shadow-xl p-8 flex flex-col justify-between">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold">About {profileInfo.name.split(' ')[0]}</h3>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-base opacity-90">
                      <span className="font-semibold">Hometown:</span> {profileInfo.hometown}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-base opacity-90">
                      <span className="font-semibold">School:</span> {profileInfo.school}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-base opacity-90">
                      <span className="font-semibold">Dating intentions:</span> {profileInfo.datingIntentions}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 flex space-x-4 w-full max-w-[320px]">
          <Button 
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
            onClick={handleEditProfile}
          >
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </Button>
          <Button 
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
          >
            <Eye className="h-4 w-4" />
            View Profile
          </Button>
        </div>
      </div>
    );
  };

  // Renders the original edit view
  const renderEditView = () => {
    return (
      <div className="bg-white min-h-screen">
        {/* Header with Cancel and Done buttons */}
        <div className="px-4 py-4 flex justify-between items-center border-b border-gray-100">
          <Button 
            variant="ghost" 
            className="text-gray-600 hover:text-gray-800 font-medium"
            onClick={() => setShowEditView(false)}
          >
            Cancel
          </Button>
          
          <h1 className="text-lg font-semibold">Edit Profile</h1>
          
          <Button 
            variant="ghost" 
            className="text-blue-500 hover:text-blue-600 font-medium"
            onClick={saveChangesAndNavigate}
          >
            Done
          </Button>
        </div>
      
        {/* Profile Picture Section with Name underneath */}
        <div className="mb-4 flex flex-col items-center">
          <img
            src={photos[0]?.content}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover shadow-md"
          />
          <h1 className="text-2xl font-bold text-darkgray mt-4">Lia</h1>
        </div>

        <div className="w-full px-4">
          <div className="px-5 pt-6 space-y-8 mt-0 h-full">
            <ProfileSection title="">
              <div className="p-5">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {photos.map(photo => (
                    <div key={photo.id} className="aspect-square relative bg-white rounded-xl overflow-hidden shadow-md">
                      <img 
                        src={photo.content} 
                        alt="Profile photo" 
                        className="w-full h-full object-cover"
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
                
                <p className="text-sm text-coolgray text-center mb-5">Tap to edit, drag to reorder</p>
                
                <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl">
                  <div>
                    <p className="font-medium text-darkgray text-base">Top Photo</p>
                    <p className="text-sm text-coolgray mt-1">We'll continuously test your profile pics and put the most popular one first.</p>
                  </div>
                  <Switch 
                    checked={topPhotoEnabled} 
                    onCheckedChange={setTopPhotoEnabled}
                    className="data-[state=checked]:bg-azure"
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
            
            <ProfileSection title="Written Prompts">
              {writtenPrompts.map(prompt => (
                <WritePrompt 
                  key={prompt.id}
                  prompt={prompt.question}
                  answer={prompt.answer}
                  onRemove={() => handleRemovePrompt(prompt.id)}
                />
              ))}
              <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-between m-4">
                <div>
                  <p className="text-xl font-medium mb-1 text-darkgray">Select a Prompt</p>
                  <p className="text-base text-coolgray italic">And record your answer</p>
                </div>
                <Button 
                  size="icon" 
                  className="bg-[#e5f4fa] rounded-full text-azure h-12 w-12 transition-all duration-300"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
            </ProfileSection>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${!showEditView ? "pb-20 bg-black" : "bg-white"}`}>
      {/* Show the Profile title only in card view */}
      {!showEditView && (
        <h1 className="text-xl text-blue-400 font-light tracking-wide pt-6 pb-2 text-center">
          Profile
        </h1>
      )}
      
      {/* Conditionally render either the card view or edit view */}
      {showEditView ? renderEditView() : renderCardView()}
    </div>
  );
};

export default Profile;
