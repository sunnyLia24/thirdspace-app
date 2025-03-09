
import React from 'react';
import { Check, Star, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface PremiumPlansProps {
  onClose?: () => void;
}

const PremiumPlans: React.FC<PremiumPlansProps> = ({ onClose }) => {
  const { toast } = useToast();
  
  const handleSelectPlan = (plan: string) => {
    toast({
      title: "Subscription Selected",
      description: `You've chosen the ${plan} plan. This would initiate payment in the live app.`,
      duration: 3000,
    });
    if (onClose) onClose();
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-dating-dark mb-2">Choose Your Premium Plan</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Join thousands of members who are finding meaningful connections with our premium features
        </p>
      </div>
      
      {/* Comparison Hero - Social Proof */}
      <div className="bg-muted py-3 px-4 rounded-lg mb-6 flex items-center justify-center text-sm text-center">
        <Star className="h-4 w-4 text-yellow-500 mr-2" />
        <span className="font-medium">95% of premium members find a match within 30 days</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Basic Plan */}
        <Card className="relative border-dating-primary/30 hover:border-dating-primary/80 transition-all">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-dating-dark">Basic</CardTitle>
              <Shield className="h-5 w-5 text-dating-primary" />
            </div>
            <CardDescription>For casual users</CardDescription>
            <div className="mt-4 mb-2">
              <div className="text-3xl font-bold">$9.99</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-dating-primary" />
              <span className="text-sm">Unlimited likes</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-dating-primary" />
              <span className="text-sm">See who likes you</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-dating-primary" />
              <span className="text-sm">One boost per month</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => handleSelectPlan('Basic')}
              className="w-full bg-dating-primary hover:bg-dating-accent text-dating-dark"
            >
              Start Basic
            </Button>
          </CardFooter>
        </Card>
        
        {/* Plus Plan - Most Popular */}
        <Card className="relative border-dating-primary shadow-lg transform md:scale-105 z-10">
          <div className="absolute -top-3 left-0 right-0 mx-auto w-max px-3 py-1 bg-dating-primary text-dating-dark rounded-full text-xs font-bold uppercase">
            Most Popular
          </div>
          <CardHeader className="pb-2 pt-5 bg-gradient-to-r from-dating-primary to-dating-secondary rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-dating-dark">Plus</CardTitle>
              <Star className="h-5 w-5 text-dating-dark" fill="black" />
            </div>
            <CardDescription className="text-dating-dark/80">For active daters</CardDescription>
            <div className="mt-4 mb-2">
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-dating-dark">$19.99</div>
                <div className="text-sm line-through text-dating-dark/70">$29.99</div>
              </div>
              <div className="text-sm text-dating-dark/80">per month</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 pt-4">
            <div className="bg-amber-50 -mx-6 px-6 py-2 border-y border-amber-100 mb-2">
              <div className="flex items-center font-medium text-amber-800">
                <Zap className="h-4 w-4 mr-2 text-amber-500" />
                <span className="text-sm">3x more matches guaranteed</span>
              </div>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-dating-primary" />
              <span className="text-sm">All Basic features</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-dating-primary" />
              <span className="text-sm">Priority in discovery</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-dating-primary" />
              <span className="text-sm">Five boosts per month</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-dating-primary" />
              <span className="text-sm">Message before matching</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => handleSelectPlan('Plus')}
              className="w-full bg-dating-primary hover:bg-dating-accent text-dating-dark font-semibold"
            >
              Get Plus
            </Button>
          </CardFooter>
          <div className="absolute -bottom-3 left-0 right-0 mx-auto w-max px-3 py-1 bg-dating-primary/10 text-dating-primary rounded-full text-xs">
            30-day money back guarantee
          </div>
        </Card>
        
        {/* Premium Plan */}
        <Card className="relative border-dating-primary/30 hover:border-dating-primary/80 transition-all">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-dating-dark">Premium</CardTitle>
              <Zap className="h-5 w-5 text-dating-primary" />
            </div>
            <CardDescription>For serious relationship seekers</CardDescription>
            <div className="mt-4 mb-2">
              <div className="text-3xl font-bold">$29.99</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-dating-primary" />
              <span className="text-sm">All Plus features</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-dating-primary" />
              <span className="text-sm">See who viewed you</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-dating-primary" />
              <span className="text-sm">Unlimited boosts</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-dating-primary" />
              <span className="text-sm">Advanced matching algorithm</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => handleSelectPlan('Premium')}
              className="w-full bg-dating-primary hover:bg-dating-accent text-dating-dark"
            >
              Go Premium
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Social Proof */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Join 2M+ members who have found meaningful connections</p>
        <div className="flex justify-center items-center mt-2 space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-4 w-4 text-yellow-500" fill="currentColor" />
          ))}
          <span className="ml-1 font-medium">4.8/5 from 10,000+ reviews</span>
        </div>
      </div>
      
      {/* Money Back Guarantee */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          All plans include our 30-day satisfaction guarantee
        </p>
      </div>
    </div>
  );
};

export default PremiumPlans;
