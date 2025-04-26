import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Scale } from 'lucide-react';

const TermsOfService = () => {
  const navigate = useNavigate();
  
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing or using our application, you agree to be bound by these Terms of Service.",
        "If you disagree with any part of the terms, you do not have permission to access the service.",
        "We reserve the right to modify these terms at any time, with changes effective upon posting to the application.",
        "Your continued use of the application after changes constitutes acceptance of those changes."
      ]
    },
    {
      title: "Eligibility",
      content: [
        "You must be at least 18 years old to use our services.",
        "By using our application, you represent and warrant that you have the right, authority, and capacity to enter into these Terms.",
        "You may not access our services if you have been previously banned from our platform.",
        "We reserve the right to refuse service to anyone for any reason at any time."
      ]
    },
    {
      title: "User Accounts",
      content: [
        "You are responsible for safeguarding the password you use to access our services.",
        "You agree not to disclose your password to any third party.",
        "You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.",
        "You may not use another user's account without permission.",
        "We cannot and will not be liable for any loss or damage arising from your failure to comply with the above."
      ]
    },
    {
      title: "User Content",
      content: [
        "You are solely responsible for the content you post on or through our services.",
        "You grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use any content you post.",
        "We reserve the right to remove any content that violates these Terms or is otherwise objectionable.",
        "We do not endorse, support, represent, or guarantee the completeness, truthfulness, accuracy, or reliability of any content."
      ]
    },
    {
      title: "Prohibited Activities",
      content: [
        "You may not engage in any activity that interferes with or disrupts our services.",
        "You may not use our services for any illegal or unauthorized purpose.",
        "You may not post violent, nude, partially nude, discriminatory, unlawful, infringing, hateful, or sexually suggestive content.",
        "You may not create or submit unwanted email, comments, or other forms of harassment.",
        "You may not impersonate others or provide inaccurate information."
      ]
    },
    {
      title: "Intellectual Property",
      content: [
        "Our application and its original content, features, and functionality are owned by us and are protected by copyright, trademark, and other laws.",
        "Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.",
        "Third-party links on our application may direct you to third-party websites that are not affiliated with us."
      ]
    },
    {
      title: "Limitation of Liability",
      content: [
        "We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.",
        "In no event shall our liability exceed the amount you paid to us during the 12 months prior to the claim or $100, whichever is greater.",
        "We do not warrant that our services will be uninterrupted or error-free."
      ]
    },
    {
      title: "Termination",
      content: [
        "We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason.",
        "Upon termination, your right to use our services will immediately cease.",
        "All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability."
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
          <h1 className="text-xl font-bold">Terms of Service</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="mb-6 flex items-center">
          <Scale className="text-blue-500 h-6 w-6 mr-2" />
          <p className="text-gray-600 text-sm">
            Last Updated: April 1, 2024
          </p>
        </div>
        
        <p className="text-gray-700 mb-6">
          Please read these Terms of Service carefully before using our application. By accessing or using our service, 
          you agree to be bound by these Terms.
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
            Questions about the Terms of Service should be sent to us at: <br />
            <span className="text-blue-600">legal@thirdspace.app</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 