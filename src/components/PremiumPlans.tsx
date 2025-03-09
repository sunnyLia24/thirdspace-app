
import React, { useState, useRef, useEffect } from 'react';
import { Check, Star, Shield, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface PremiumPlansProps {
  onClose?: () => void;
}

const PremiumPlans: React.FC<PremiumPlansProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const plans = [
    {
      id: 'plus',
      title: 'Plus',
      description: 'For active daters',
      price: '$19.99',
      originalPrice: '$29.99',
      icon: <Star className="h-5 w-5 text-dating-dark" fill="black" />,
      features: [
        'All Basic features',
        'Priority in discovery',
        'Five boosts per month',
        'Message before matching'
      ],
      highlight: true,
      callToAction: 'Get Plus'
    },
    {
      id: 'premium',
      title: 'Premium',
      description: 'For serious relationship seekers',
      price: '$29.99',
      icon: <Zap className="h-5 w-5 text-dating-primary" />,
      features: [
        'All Plus features',
        'See who viewed you',
        'Unlimited boosts',
        'Advanced matching algorithm'
      ],
      highlight: false,
      callToAction: 'Go Premium'
    }
  ];
  
  const handleSelectPlan = (plan: string) => {
    toast({
      title: "Subscription Selected",
      description: `You've chosen the ${plan} plan. This would initiate payment in the live app.`,
      duration: 3000,
    });
    if (onClose) onClose();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const difference = startX - currentX;
    
    if (Math.abs(difference) > 50) {
      if (difference > 0 && currentIndex < plans.length - 1) {
        setCurrentIndex(1);
      } else if (difference < 0 && currentIndex > 0) {
        setCurrentIndex(0);
      }
      setIsDragging(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const difference = startX - currentX;
    
    if (Math.abs(difference) > 50) {
      if (difference > 0 && currentIndex < plans.length - 1) {
        setCurrentIndex(1);
      } else if (difference < 0 && currentIndex > 0) {
        setCurrentIndex(0);
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (containerRef.current) {
      const scrollAmount = currentIndex * (containerRef.current.clientWidth * 0.85);
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
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

      {/* Navigation indicators */}
      <div className="flex justify-center items-center gap-2 mb-4">
        <button 
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={() => setCurrentIndex(0)}
          aria-label="View Plus plan"
        >
          <div className={`w-2 h-2 rounded-full ${currentIndex === 0 ? 'bg-dating-primary' : 'bg-gray-300'}`}></div>
        </button>
        <button 
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={() => setCurrentIndex(1)}
          aria-label="View Premium plan"
        >
          <div className={`w-2 h-2 rounded-full ${currentIndex === 1 ? 'bg-dating-primary' : 'bg-gray-300'}`}></div>
        </button>
      </div>
      
      {/* Swipeable cards container */}
      <div 
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className="flex-shrink-0 w-[85%] snap-center pr-4 mx-auto"
              style={{ scrollSnapAlign: 'center' }}
            >
              <Card 
                className={`relative h-full ${plan.highlight 
                  ? 'border-dating-primary shadow-lg transform md:scale-105 z-10' 
                  : 'border-dating-primary/30 hover:border-dating-primary/80 transition-all'}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-max px-3 py-1 bg-dating-primary text-dating-dark rounded-full text-xs font-bold uppercase">
                    Most Popular
                  </div>
                )}
                <CardHeader className={`pb-2 ${plan.highlight ? 'pt-5 bg-gradient-to-r from-dating-primary to-dating-secondary rounded-t-lg' : ''}`}>
                  <div className="flex items-center justify-between">
                    <CardTitle className={plan.highlight ? "text-dating-dark" : "text-dating-dark"}>
                      {plan.title}
                    </CardTitle>
                    {plan.icon}
                  </div>
                  <CardDescription className={`${plan.highlight ? "text-dating-dark/80" : ""} line-clamp-2`}>
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`text-3xl font-bold ${plan.highlight ? "text-dating-dark" : ""}`}>
                        {plan.price}
                      </div>
                      {plan.originalPrice && (
                        <div className="text-sm line-through text-dating-dark/70">
                          {plan.originalPrice}
                        </div>
                      )}
                    </div>
                    <div className={`text-sm ${plan.highlight ? "text-dating-dark/80" : "text-muted-foreground"}`}>
                      per month
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 pt-4">
                  {plan.id === 'plus' && (
                    <div className="bg-amber-50 -mx-6 px-6 py-2 border-y border-amber-100 mb-2">
                      <div className="flex items-center font-medium text-amber-800">
                        <Zap className="h-4 w-4 mr-2 text-amber-500" />
                        <span className="text-sm">3x more matches guaranteed</span>
                      </div>
                    </div>
                  )}
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-dating-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSelectPlan(plan.title)}
                    className={`w-full bg-dating-primary hover:bg-dating-accent text-dating-dark ${plan.highlight ? 'font-semibold' : ''}`}
                  >
                    {plan.callToAction}
                  </Button>
                </CardFooter>
                {plan.highlight && (
                  <div className="absolute -bottom-3 left-0 right-0 mx-auto w-max px-3 py-1 bg-dating-primary/10 text-dating-primary rounded-full text-xs">
                    30-day money back guarantee
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>

        {/* Navigation arrows - centered vertically and pushed to edges */}
        <div className="absolute inset-0 flex justify-between items-center pointer-events-none px-2">
          <button 
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            className={`flex items-center justify-center bg-white/80 rounded-full p-2 shadow-md pointer-events-auto ${currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
            disabled={currentIndex === 0}
            aria-label="Previous plan"
          >
            <ChevronLeft className="h-5 w-5 text-dating-dark" />
          </button>
          <button 
            onClick={() => setCurrentIndex(Math.min(plans.length - 1, currentIndex + 1))}
            className={`flex items-center justify-center bg-white/80 rounded-full p-2 shadow-md pointer-events-auto ${currentIndex === plans.length - 1 ? 'opacity-40 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
            disabled={currentIndex === plans.length - 1}
            aria-label="Next plan"
          >
            <ChevronRight className="h-5 w-5 text-dating-dark" />
          </button>
        </div>
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
