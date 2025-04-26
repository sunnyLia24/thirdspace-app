import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Moon,
  Volume2,
  Bell,
  Mail,
  Phone,
  Instagram,
  UserCheck,
  Shield,
  Globe,
  Map,
  BookOpen,
  Lock,
  ChevronRight,
  AlertTriangle,
  LogOut,
  BadgeCheck,
  Pause
} from 'lucide-react';

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

const SettingsSection = ({ title, children }: SettingsSectionProps) => (
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {children}
    </div>
  </div>
);

type SettingsRowProps = {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
  endElement?: React.ReactNode;
};

const SettingsRow = ({ icon, label, value, onClick, endElement }: SettingsRowProps) => (
  <div 
    className={`py-4 px-4 flex items-center justify-between border-b border-gray-100 ${onClick ? 'hover:bg-gray-50 cursor-pointer' : ''}`}
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className="w-8 h-8 flex items-center justify-center text-gray-600 mr-3">
        {icon}
      </div>
      <div>
        <p className="font-medium text-gray-800">{label}</p>
        {value && <p className="text-sm text-gray-500">{value}</p>}
      </div>
    </div>
    {endElement || (onClick && <ChevronRight className="h-5 w-5 text-gray-400" />)}
  </div>
);

type SwitchSettingProps = {
  icon: React.ReactNode;
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const SwitchSetting = ({ icon, label, description, checked, onCheckedChange }: SwitchSettingProps) => (
  <div className="py-4 px-4 flex items-center justify-between border-b border-gray-100">
    <div className="flex items-center">
      <div className="w-8 h-8 flex items-center justify-center text-gray-600 mr-3">
        {icon}
      </div>
      <div>
        <p className="font-medium text-gray-800">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  </div>
);

const Settings = () => {
  const navigate = useNavigate();
  
  // Settings state
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [mapSoundEffects, setMapSoundEffects] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('english');
  
  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };
  
  const handlePauseAccount = () => {
    // Handle pause account logic here
    navigate('/pause-account');
  };
  
  const handleDeleteAccount = () => {
    // Handle delete account logic here
    navigate('/pause-account');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-6">
        <SettingsSection title="Account">
          <SwitchSetting
            icon={<Bell className="h-5 w-5" />}
            label="Do Not Disturb"
            description="Turn off all notifications temporarily"
            checked={doNotDisturb}
            onCheckedChange={setDoNotDisturb}
          />
          
          <SettingsRow
            icon={<BadgeCheck className="h-5 w-5" />}
            label="Verification"
            value="Verify your account to earn a badge"
            onClick={() => navigate('/verification')}
          />
          
          <SettingsRow
            icon={<UserCheck className="h-5 w-5" />}
            label="Subscription Status"
            value="Free Plan"
            onClick={() => navigate('/subscription')}
          />
        </SettingsSection>
        
        <SettingsSection title="Contact Information">
          <SettingsRow
            icon={<Phone className="h-5 w-5" />}
            label="Phone Number"
            value="+1 (555) 123-4567"
            onClick={() => navigate('/edit-phone')}
          />
          
          <SettingsRow
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            value="user@example.com"
            onClick={() => navigate('/edit-email')}
          />
          
          <SettingsRow
            icon={<Instagram className="h-5 w-5" />}
            label="Connected Accounts"
            value="Instagram, Google, Apple"
            onClick={() => navigate('/connected-accounts')}
          />
        </SettingsSection>
        
        <SettingsSection title="Notifications">
          <SwitchSetting
            icon={<Bell className="h-5 w-5" />}
            label="Push Notifications"
            description="Receive alerts on your device"
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
          
          <SwitchSetting
            icon={<Mail className="h-5 w-5" />}
            label="Email Notifications"
            description="Receive updates via email"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </SettingsSection>
        
        <SettingsSection title="App Settings">
          <SettingsRow
            icon={<Globe className="h-5 w-5" />}
            label="App Language"
            value={language === 'english' ? 'English' : language}
            onClick={() => {}}
            endElement={
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-28 h-8 border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                </SelectContent>
              </Select>
            }
          />
          
          <SettingsRow
            icon={<Shield className="h-5 w-5" />}
            label="Block List"
            value="Manage blocked users"
            onClick={() => navigate('/blocked-users')}
          />
        </SettingsSection>
        
        <SettingsSection title="Map Settings">
          <SwitchSetting
            icon={<Volume2 className="h-5 w-5" />}
            label="Sound Effects"
            description="Play sounds when interacting with the map"
            checked={mapSoundEffects}
            onCheckedChange={setMapSoundEffects}
          />
          
          <SwitchSetting
            icon={<Moon className="h-5 w-5" />}
            label="Dark Mode"
            description="Switch to dark theme"
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
        </SettingsSection>
        
        <SettingsSection title="Legal">
          <SettingsRow
            icon={<Lock className="h-5 w-5" />}
            label="Privacy Policy"
            onClick={() => navigate('/privacy-policy')}
          />
          
          <SettingsRow
            icon={<BookOpen className="h-5 w-5" />}
            label="Terms of Service"
            onClick={() => navigate('/terms-of-service')}
          />
          
          <SettingsRow
            icon={<Lock className="h-5 w-5" />}
            label="Privacy Choices"
            onClick={() => navigate('/privacy-choices')}
          />
        </SettingsSection>
        
        <SettingsSection title="Safety">
          <SettingsRow
            icon={<AlertTriangle className="h-5 w-5" />}
            label="Safety Tips"
            value="Important guidelines for meeting in person"
            onClick={() => navigate('/safety-tips')}
          />
        </SettingsSection>
        
        <Button 
          variant="outline" 
          className="w-full mt-6"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Log Out
        </Button>
        
        <Button 
          variant="secondary" 
          className="w-full mt-4 mb-24"
          onClick={handleDeleteAccount}
        >
          <Pause className="h-5 w-5 mr-2" />
          Pause or Delete Account
        </Button>
      </div>
    </div>
  );
};

export default Settings; 