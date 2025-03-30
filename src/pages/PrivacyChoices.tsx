import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Info } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PrivacyChoices = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Privacy preferences state
  const [preferences, setPreferences] = useState({
    dataCollection: {
      locationTracking: true,
      usageAnalytics: true,
      crashReports: true,
      personalization: true
    },
    advertising: {
      personalizedAds: false,
      adTracking: false,
      thirdPartyAds: false
    },
    communication: {
      emailMarketing: true,
      pushNotifications: true,
      surveyRequests: false
    }
  });
  
  const handleTogglePreference = (category: string, preference: string, enabled: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [preference]: enabled
      }
    }));
    
    toast({
      title: `${enabled ? 'Enabled' : 'Disabled'} ${formatPreferenceName(preference)}`,
      duration: 2000,
    });
  };
  
  const formatPreferenceName = (name: string) => {
    // Convert camelCase to sentence case with spaces
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };
  
  const privacyItems = [
    {
      category: "dataCollection",
      title: "Data Collection & Usage",
      description: "Control what data we can collect and how we use it",
      items: [
        {
          key: "locationTracking",
          title: "Location Tracking",
          description: "Allow us to collect your location data to improve location-based features"
        },
        {
          key: "usageAnalytics",
          title: "Usage Analytics",
          description: "Allow us to collect information about how you use the app to improve our services"
        },
        {
          key: "crashReports",
          title: "Crash Reports",
          description: "Send anonymous crash reports to help us improve app stability"
        },
        {
          key: "personalization",
          title: "Personalization",
          description: "Allow us to personalize your experience based on your activity"
        }
      ]
    },
    {
      category: "advertising",
      title: "Advertising Preferences",
      description: "Manage how ads are shown to you",
      items: [
        {
          key: "personalizedAds",
          title: "Personalized Ads",
          description: "Receive ads based on your interests and app activity"
        },
        {
          key: "adTracking",
          title: "Ad Tracking",
          description: "Allow advertisers to track your interactions with ads"
        },
        {
          key: "thirdPartyAds",
          title: "Third-Party Ads",
          description: "Allow third-party ad networks to display ads"
        }
      ]
    },
    {
      category: "communication",
      title: "Communication Preferences",
      description: "Control how we communicate with you",
      items: [
        {
          key: "emailMarketing",
          title: "Email Marketing",
          description: "Receive promotional emails and newsletters"
        },
        {
          key: "pushNotifications",
          title: "Push Notifications",
          description: "Receive push notifications about promotions and updates"
        },
        {
          key: "surveyRequests",
          title: "Survey Requests",
          description: "Receive requests to participate in user surveys"
        }
      ]
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-xl font-bold">Privacy Choices</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-700">
              Your privacy matters to us. Use these settings to control how your data is used and how we communicate with you.
              Changes to these settings take effect immediately.
            </p>
          </div>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {privacyItems.map((section, index) => (
            <AccordionItem 
              key={index} 
              value={section.category}
              className="bg-white rounded-lg shadow-sm overflow-hidden border-none"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
                <div className="text-left">
                  <h2 className="font-medium">{section.title}</h2>
                  <p className="text-xs text-gray-500">{section.description}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <div className="space-y-4 pt-2">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">{item.title}</h3>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                      <Switch 
                        checked={preferences[section.category as keyof typeof preferences][item.key as any]} 
                        onCheckedChange={(checked) => 
                          handleTogglePreference(section.category, item.key, checked)
                        }
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-700 mb-2">
              Want to learn more about how we handle your data?
            </p>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/privacy-policy')}
              >
                Privacy Policy
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/terms-of-service')}
              >
                Terms of Service
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyChoices; 