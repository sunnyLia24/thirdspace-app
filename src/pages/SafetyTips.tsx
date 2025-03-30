import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, AlertTriangle, MapPin, Users, Coffee, Phone, MessageCircle, Clock, Car } from 'lucide-react';

const SafetyTips = () => {
  const navigate = useNavigate();
  
  const safetyCategories = [
    {
      title: "Before Meeting",
      icon: <Clock className="h-6 w-6 text-orange-500" />,
      tips: [
        "Talk extensively on the app before agreeing to meet in person",
        "Consider a video call first to verify who you're meeting",
        "Research the person on social media or through mutual connections",
        "Share your plans and the person's details with a friend or family member",
        "Set expectations and boundaries for the meeting beforehand"
      ]
    },
    {
      title: "Choosing a Location",
      icon: <MapPin className="h-6 w-6 text-red-500" />,
      tips: [
        "Always meet in a public place with plenty of people around",
        "Choose well-lit areas, especially if meeting in the evening",
        "Select locations you're familiar with or research them beforehand",
        "Avoid secluded areas, private residences, or isolated spots for first meetings",
        "Consider meeting places where staff or security is present"
      ]
    },
    {
      title: "During the Meeting",
      icon: <Coffee className="h-6 w-6 text-brown-500" />,
      tips: [
        "Stay in public view throughout your entire meeting",
        "Keep your personal belongings secure and with you at all times",
        "Maintain awareness of your surroundings",
        "Trust your instincts—if something feels off, it probably is",
        "Avoid sharing too many personal details on a first meeting",
        "Limit alcohol consumption to stay alert and aware"
      ]
    },
    {
      title: "Transportation",
      icon: <Car className="h-6 w-6 text-blue-500" />,
      tips: [
        "Arrange your own transportation to and from the meeting",
        "Don't accept rides from someone you've just met",
        "Have a backup plan for getting home",
        "If using rideshare services, verify the driver and vehicle details",
        "Let someone know when you're leaving and when you've arrived safely"
      ]
    },
    {
      title: "Communication",
      icon: <MessageCircle className="h-6 w-6 text-green-500" />,
      tips: [
        "Keep your phone fully charged and with you at all times",
        "Set up a safety call or text check-in with a friend",
        "Have a code word with friends/family to signal if you need help",
        "Don't be afraid to end the meeting early if you feel uncomfortable",
        "Know how to contact emergency services in your location"
      ]
    },
    {
      title: "Group Meetups",
      icon: <Users className="h-6 w-6 text-purple-500" />,
      tips: [
        "Consider meeting in a group setting for added safety",
        "Bring a friend to your first meeting if possible",
        "Public events or group activities can be safer settings for first meetings",
        "Maintain the same safety precautions even in group settings",
        "Check in with each other if attending with friends"
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
          <h1 className="text-xl font-bold">Safety Tips</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <h2 className="font-semibold text-amber-800 mb-1">Your Safety is Our Priority</h2>
            <p className="text-sm text-amber-700">
              While we work to create a trusted community, please exercise caution when meeting someone in person.
              These tips can help you stay safe, but always trust your instincts and prioritize your personal safety.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-blue-500" />
            <h2 className="text-lg font-semibold">General Safety Rules</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex gap-2 items-start">
              <span className="text-blue-500 text-lg leading-6">•</span>
              <span className="text-gray-700">Never send money or share financial information</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-blue-500 text-lg leading-6">•</span>
              <span className="text-gray-700">Protect your personal information until you build trust</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-blue-500 text-lg leading-6">•</span>
              <span className="text-gray-700">Report suspicious or inappropriate behavior immediately</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-blue-500 text-lg leading-6">•</span>
              <span className="text-gray-700">If someone makes you uncomfortable, end communication</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-blue-500 text-lg leading-6">•</span>
              <span className="text-gray-700">Trust your instincts—they're usually right</span>
            </li>
          </ul>
        </div>
        
        {safetyCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              {category.icon}
              <h2 className="text-lg font-semibold">{category.title}</h2>
            </div>
            <ul className="space-y-3">
              {category.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-blue-500 text-lg leading-6">•</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-12 flex items-start gap-3">
          <Phone className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h2 className="font-semibold text-blue-800 mb-1">Emergency Contacts</h2>
            <p className="text-sm text-blue-700 mb-2">
              In case of emergency, always call your local emergency number:
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• United States: 911</li>
              <li>• Europe: 112</li>
              <li>• Australia: 000</li>
              <li>• UK: 999</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips; 