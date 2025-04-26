import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout from "./components/MainLayout";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import Messages from "./pages/Messages";
import Standouts from "./pages/Standouts";
import RewindPage from "./pages/Rewind";
import Settings from "./pages/Settings";
import Verification from "./pages/Verification";
import BlockedUsers from "./pages/BlockedUsers";
import PauseAccount from "./pages/PauseAccount";
import Subscription from "./pages/Subscription";
import EditPhone from "./pages/EditPhone";
import EditEmail from "./pages/EditEmail";
import ConnectedAccounts from "./pages/ConnectedAccounts";
import Hotspots from "./pages/Hotspots";
import Friends from "./pages/Friends";
import QrCode from "./pages/QrCode";
import BackButton from "./components/BackButton";
import SplashScreen from "./components/SplashScreen";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import PrivacyChoices from "./pages/PrivacyChoices";
import SafetyTips from "./pages/SafetyTips";
import ProfilePronouns from "./pages/ProfilePronouns";
import ProfileGender from "./pages/ProfileGender";
import ProfileSexuality from "./pages/ProfileSexuality";
import ProfileInterestedIn from "./pages/ProfileInterestedIn";
import ProfileName from "./pages/ProfileName";
import ProfileAge from "./pages/ProfileAge";
import ProfileHeight from "./pages/ProfileHeight";
import ProfileLocation from "./pages/ProfileLocation";
import ProfileEthnicity from "./pages/ProfileEthnicity";
import ProfileChildren from "./pages/ProfileChildren";
import ProfileFamilyPlans from "./pages/ProfileFamilyPlans";
import ProfilePets from "./pages/ProfilePets";
import ProfileZodiacSign from "./pages/ProfileZodiacSign";
import ProfileDrinking from "./pages/ProfileDrinking";
import ProfileSmoking from "./pages/ProfileSmoking";
import ProfileMarijuana from "./pages/ProfileMarijuana";
import ProfileDrugs from "./pages/ProfileDrugs";
import ProfileWork from "./pages/ProfileWork";
import ProfileJobTitle from "./pages/ProfileJobTitle";
import ProfileSchool from "./pages/ProfileSchool";
import ProfileEducationLevel from "./pages/ProfileEducationLevel";
import ProfileReligiousBeliefs from "./pages/ProfileReligiousBeliefs";
import ProfileHometown from "./pages/ProfileHometown";
import ProfilePolitics from "./pages/ProfilePolitics";
import ProfileLanguages from "./pages/ProfileLanguages";
import ProfileDatingIntentions from "./pages/ProfileDatingIntentions";
import ProfileRelationshipType from "./pages/ProfileRelationshipType";
import Lumalee3DTest from "./components/Lumalee3DTest";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  // Get app session from local storage
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    const hasVisited = localStorage.getItem('thirdspace_visited');
    return !hasVisited;
  });
  
  useEffect(() => {
    // Mark as visited in local storage
    if (isFirstVisit) {
      localStorage.setItem('thirdspace_visited', 'true');
    }
  }, [isFirstVisit]);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {/* Show splash screen only on first visit or when refreshed */}
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={null} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/:userId" element={<UserProfile />} />
              <Route path="profile/pronouns" element={<ProfilePronouns />} />
              <Route path="profile/gender" element={<ProfileGender />} />
              <Route path="profile/sexuality" element={<ProfileSexuality />} />
              <Route path="profile/interested-in" element={<ProfileInterestedIn />} />
              <Route path="profile/name" element={<ProfileName />} />
              <Route path="profile/age" element={<ProfileAge />} />
              <Route path="profile/height" element={<ProfileHeight />} />
              <Route path="profile/location" element={<ProfileLocation />} />
              <Route path="profile/ethnicity" element={<ProfileEthnicity />} />
              <Route path="profile/children" element={<ProfileChildren />} />
              <Route path="profile/family-plans" element={<ProfileFamilyPlans />} />
              <Route path="profile/pets" element={<ProfilePets />} />
              <Route path="profile/zodiac-sign" element={<ProfileZodiacSign />} />
              <Route path="profile/drinking" element={<ProfileDrinking />} />
              <Route path="profile/smoking" element={<ProfileSmoking />} />
              <Route path="profile/marijuana" element={<ProfileMarijuana />} />
              <Route path="profile/drugs" element={<ProfileDrugs />} />
              <Route path="profile/work" element={<ProfileWork />} />
              <Route path="profile/job-title" element={<ProfileJobTitle />} />
              <Route path="profile/school" element={<ProfileSchool />} />
              <Route path="profile/education-level" element={<ProfileEducationLevel />} />
              <Route path="profile/religious-beliefs" element={<ProfileReligiousBeliefs />} />
              <Route path="profile/hometown" element={<ProfileHometown />} />
              <Route path="profile/politics" element={<ProfilePolitics />} />
              <Route path="profile/languages" element={<ProfileLanguages />} />
              <Route path="profile/dating-intentions" element={<ProfileDatingIntentions />} />
              <Route path="profile/relationship-type" element={<ProfileRelationshipType />} />
              <Route path="messages" element={<Messages />} />
              <Route path="standouts" element={<Standouts />} />
              <Route path="rewind" element={<RewindPage />} />
              <Route path="settings" element={<Settings />} />
              <Route path="verification" element={<Verification />} />
              <Route path="blocked-users" element={<BlockedUsers />} />
              <Route path="pause-account" element={<PauseAccount />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="edit-phone" element={<EditPhone />} />
              <Route path="edit-email" element={<EditEmail />} />
              <Route path="connected-accounts" element={<ConnectedAccounts />} />
              <Route path="hotspots" element={<Hotspots />} />
              <Route path="friends" element={<Friends />} />
              <Route path="qrcode" element={<QrCode />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="privacy-choices" element={<PrivacyChoices />} />
              <Route path="safety-tips" element={<SafetyTips />} />
              <Route path="lumalee3dtest" element={<Lumalee3DTest />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
