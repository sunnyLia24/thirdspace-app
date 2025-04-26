import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "We collect information you provide when you create an account, including your name, email address, phone number, and date of birth.",
        "Profile information such as photos, bio, interests, and preferences is stored to help match you with others.",
        "Location data is collected when you use the app to help you find nearby users and events.",
        "If you choose to connect social accounts, we may receive information from those services.",
        "Usage data including how you interact with the app, features you use, and time spent on the platform."
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "To personalize your experience and provide our core matchmaking services.",
        "To improve and optimize our platform and develop new features.",
        "To communicate with you about updates, security alerts, and support messages.",
        "To enforce our terms, prevent fraud, and ensure safety on our platform.",
        "For marketing purposes if you've consented to receive such communications."
      ]
    },
    {
      title: "Information Sharing",
      content: [
        "Your profile information is visible to other users based on your privacy settings.",
        "We may share data with third-party service providers who help us deliver our services.",
        "We may disclose information in response to legal requests when required by law.",
        "If the ownership of our business changes, your information may be transferred to the new owner.",
        "We don't sell your personal information to advertisers or other third parties."
      ]
    },
    {
      title: "Data Security",
      content: [
        "We implement technical and organizational measures to protect your personal information.",
        "We regularly review our security practices and update them as needed.",
        "We use encryption to protect sensitive data transmitted to and from our app.",
        "While we work hard to protect your information, no method of transmission over the Internet is 100% secure."
      ]
    },
    {
      title: "Your Rights",
      content: [
        "You can access, update, or delete your personal information through your account settings.",
        "You can control the visibility of your profile and what information is shown to others.",
        "You can opt out of marketing communications while still receiving essential service messages.",
        "Depending on your location, you may have additional rights under applicable privacy laws."
      ]
    },
    {
      title: "Changes to This Policy",
      content: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices.",
        "We will notify you of any significant changes via email or through the app.",
        "Your continued use of our services after such modifications constitutes your acceptance of the updated policy."
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
          <h1 className="text-xl font-bold">Privacy Policy</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="mb-6 flex items-center">
          <Shield className="text-blue-500 h-6 w-6 mr-2" />
          <p className="text-gray-600 text-sm">
            Last Updated: April 1, 2024
          </p>
        </div>
        
        <p className="text-gray-700 mb-6">
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. 
          Please read this policy carefully to understand our practices regarding your personal data.
        </p>
        
        {sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
            <ul className="space-y-3">
              {section.content.map((item, i) => (
                <li key={i} className="flex">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions or concerns about this Privacy Policy, please contact us at: <br />
            <span className="text-blue-600">privacy@thirdspace.app</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 