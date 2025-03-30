import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Star, Zap, Crown, Sparkles, Clock, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

type PlanFeature = {
  feature: string;
  included: boolean;
  highlight?: boolean;
};

type SubscriptionPlan = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PlanFeature[];
  popular?: boolean;
  color: string;
  gradient: string;
};

const plans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    icon: <Star className="h-6 w-6" />,
    description: 'Basic access to the community',
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: 'bg-gray-100',
    gradient: 'from-gray-50 to-gray-100',
    features: [
      { feature: '5 likes per day', included: true },
      { feature: 'Basic profile', included: true },
      { feature: 'Limited matchmaking', included: true },
      { feature: 'Standard visibility', included: true },
      { feature: 'Ads in feed', included: true },
      { feature: 'See who likes you', included: false },
      { feature: 'Advanced filters', included: false },
      { feature: 'Priority in search results', included: false },
      { feature: 'Read receipts', included: false },
      { feature: 'Verified badge', included: false },
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    icon: <Zap className="h-6 w-6" />,
    description: 'Enhanced matching and visibility',
    monthlyPrice: 14.99,
    yearlyPrice: 119.99,
    color: 'bg-blue-100',
    gradient: 'from-blue-50 to-blue-100',
    features: [
      { feature: 'Unlimited likes', included: true, highlight: true },
      { feature: 'Enhanced profile', included: true },
      { feature: 'Advanced matchmaking', included: true },
      { feature: 'Boosted visibility', included: true },
      { feature: 'No ads', included: true },
      { feature: 'See who likes you', included: true, highlight: true },
      { feature: 'Advanced filters', included: true },
      { feature: 'Priority in search results', included: false },
      { feature: 'Read receipts', included: false },
      { feature: 'Verified badge', included: false },
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: <Crown className="h-6 w-6" />,
    description: 'Ultimate experience with all features',
    monthlyPrice: 29.99,
    yearlyPrice: 239.99,
    color: 'bg-purple-100',
    gradient: 'from-purple-50 to-purple-100',
    features: [
      { feature: 'Unlimited likes', included: true },
      { feature: 'Premium profile', included: true, highlight: true },
      { feature: 'Premium matchmaking', included: true, highlight: true },
      { feature: 'Maximum visibility', included: true, highlight: true },
      { feature: 'No ads', included: true },
      { feature: 'See who likes you', included: true },
      { feature: 'Advanced filters', included: true },
      { feature: 'Priority in search results', included: true, highlight: true },
      { feature: 'Read receipts', included: true, highlight: true },
      { feature: 'Verified badge', included: true, highlight: true },
    ],
  },
];

const SubscriptionPlanCard = ({ 
  plan, 
  billingCycle,
  selectedPlan,
  onSelectPlan 
}: { 
  plan: SubscriptionPlan; 
  billingCycle: 'monthly' | 'yearly';
  selectedPlan: string;
  onSelectPlan: (planId: string) => void;
}) => {
  const isSelected = selectedPlan === plan.id;
  const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const yearlyDiscount = Math.round(100 - (plan.yearlyPrice / (plan.monthlyPrice * 12)) * 100);
  
  return (
    <Card className={`flex flex-col border overflow-hidden transition-all ${
      isSelected ? 'border-2 border-primary shadow-lg' : 'shadow-sm'
    }`}>
      <CardHeader className={`bg-gradient-to-br ${plan.gradient} p-6`}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              {plan.icon}
              {plan.name}
            </CardTitle>
            <CardDescription className="mt-1 text-gray-700">{plan.description}</CardDescription>
          </div>
          {plan.popular && (
            <Badge variant="default" className="bg-primary hover:bg-primary">
              Popular
            </Badge>
          )}
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold text-gray-900">${price}</span>
          <span className="text-gray-500">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
          {billingCycle === 'yearly' && plan.id !== 'free' && (
            <Badge variant="outline" className="ml-2 bg-white">
              Save {yearlyDiscount}%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <Check className={`h-5 w-5 mr-2 flex-shrink-0 ${
                  feature.highlight ? 'text-primary' : 'text-gray-500'
                }`} />
              ) : (
                <X className="h-5 w-5 mr-2 flex-shrink-0 text-gray-300" />
              )}
              <span className={`text-sm ${
                feature.highlight ? 'text-primary font-medium' : 'text-gray-700'
              }`}>
                {feature.feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          variant={plan.id === 'free' ? 'outline' : 'default'}
          className="w-full"
          onClick={() => onSelectPlan(plan.id)}
        >
          {plan.id === 'free' ? 'Current Plan' : isSelected ? 'Selected' : 'Select Plan'}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Subscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState('free');
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };
  
  const handleSubscribe = () => {
    if (selectedPlan === 'free') {
      toast({
        title: "You're already on the Free plan",
        description: "Upgrade to Plus or Premium to unlock more features.",
      });
      return;
    }
    
    // In a real app, this would integrate with a payment processor
    toast({
      title: "Subscription activated",
      description: `You have successfully subscribed to the ${
        plans.find(p => p.id === selectedPlan)?.name
      } plan.`,
    });
    
    setTimeout(() => navigate('/settings'), 1500);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
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
          <h1 className="text-xl font-bold">Subscription Plans</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
          <div className="flex gap-3 items-start">
            <Sparkles className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Unlock Premium Features</h2>
              <p className="text-gray-700 mb-3">
                Upgrade your experience with our subscription plans and get more matches, 
                enhanced visibility, and exclusive features.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mb-8">
          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger 
                value="monthly" 
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger 
                value="yearly" 
                onClick={() => setBillingCycle('yearly')}
              >
                <div className="flex items-center gap-1">
                  Yearly
                  <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                    <Clock className="h-3 w-3 mr-1" />
                    Save 20%
                  </Badge>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map(plan => (
            <SubscriptionPlanCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              selectedPlan={selectedPlan}
              onSelectPlan={handleSelectPlan}
            />
          ))}
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Subscription FAQs</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">How do I cancel my subscription?</h4>
              <p className="text-gray-600 text-sm">
                You can cancel your subscription at any time from the settings page. Your premium benefits will
                continue until the end of your billing period.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Will I be charged automatically?</h4>
              <p className="text-gray-600 text-sm">
                Yes, your subscription will automatically renew at the end of each billing cycle unless you cancel.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Can I switch plans?</h4>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while 
                downgrades will take effect at the end of your current billing cycle.
              </p>
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full"
          size="lg"
          onClick={handleSubscribe}
        >
          {selectedPlan === 'free' ? 'Continue with Free Plan' : `Subscribe to ${
            plans.find(p => p.id === selectedPlan)?.name
          }`}
        </Button>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
          You can cancel your subscription at any time.
        </p>
      </div>
    </div>
  );
};

export default Subscription; 