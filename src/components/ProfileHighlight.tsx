
import React from 'react';
import { MapPin, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface ProfileHighlightProps {
  profile: {
    id: number;
    name: string;
    age: number;
    image: string;
    location: string;
  };
  isActive: boolean;
}

const ProfileHighlight: React.FC<ProfileHighlightProps> = ({ profile, isActive }) => {
  return (
    <div className="relative w-full h-full">
      {/* Image element */}
      <img
        src={profile.image || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"}
        alt={`${profile.name}'s profile`}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback image if the original fails to load
          e.currentTarget.src = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";
        }}
      />
      
      {/* Darker glassmorphism overlay covering the entire photo */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/50 pointer-events-none" />
      
      {/* Premium access button in the center with neon trace animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative">
              <Button 
                variant="outline" 
                className="bg-black/60 text-white border-white/50 hover:bg-black/70 backdrop-blur-sm"
              >
                <Lock className="h-4 w-4 mr-2" />
                <span className="text-neon">Premium Access</span>
              </Button>
              {/* Animated neon border trace effect outside the button */}
              <span className="absolute -inset-1 rounded-md border border-transparent outline outline-1 outline-offset-2 outline-dating-primary animate-border-trace"></span>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center">Choose Your Premium Plan</DialogTitle>
              <DialogDescription className="text-center">
                Unlock exclusive features and enhance your experience
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Basic Plan */}
                <Card className="border-dating-primary/30 hover:border-dating-primary/80 transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-dating-dark">Basic</CardTitle>
                    <CardDescription>For casual users</CardDescription>
                    <div className="text-2xl font-bold mt-2">$9.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
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
                    <Button className="w-full bg-dating-primary hover:bg-dating-accent text-dating-dark">
                      Select Plan
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Plus Plan */}
                <Card className="border-dating-primary scale-105 shadow-lg">
                  <CardHeader className="pb-2 bg-gradient-to-r from-dating-primary to-dating-secondary rounded-t-lg">
                    <div className="text-center text-xs font-bold uppercase tracking-wider text-dating-dark mb-1">Most Popular</div>
                    <CardTitle className="text-dating-dark">Plus</CardTitle>
                    <CardDescription className="text-dating-dark/80">For active daters</CardDescription>
                    <div className="text-2xl font-bold mt-2 text-dating-dark">$19.99<span className="text-sm font-normal text-dating-dark/80">/month</span></div>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-4">
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
                    <Button className="w-full bg-dating-primary hover:bg-dating-accent text-dating-dark">
                      Select Plan
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Premium Plan */}
                <Card className="border-dating-primary/30 hover:border-dating-primary/80 transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-dating-dark">Premium</CardTitle>
                    <CardDescription>For serious relationship seekers</CardDescription>
                    <div className="text-2xl font-bold mt-2">$29.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
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
                    <Button className="w-full bg-dating-primary hover:bg-dating-accent text-dating-dark">
                      Select Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Content at bottom - name, age, location and upgrade now */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
        <h2 className="text-white text-4xl font-bold">{profile.name}</h2>
        <div className="flex items-center text-white text-2xl font-semibold">
          <span>{profile.age}</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-white/80">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{profile.location}</span>
          </div>
          
          {/* Upgrade Now text at bottom */}
          <Dialog>
            <DialogTrigger asChild>
              <span className="text-neon text-sm font-medium cursor-pointer">Upgrade Now</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              {/* Same content as above dialog */}
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-center">Choose Your Premium Plan</DialogTitle>
                <DialogDescription className="text-center">
                  Unlock exclusive features and enhance your experience
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Basic Plan */}
                  <Card className="border-dating-primary/30 hover:border-dating-primary/80 transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-dating-dark">Basic</CardTitle>
                      <CardDescription>For casual users</CardDescription>
                      <div className="text-2xl font-bold mt-2">$9.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
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
                      <Button className="w-full bg-dating-primary hover:bg-dating-accent text-dating-dark">
                        Select Plan
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Plus Plan */}
                  <Card className="border-dating-primary scale-105 shadow-lg">
                    <CardHeader className="pb-2 bg-gradient-to-r from-dating-primary to-dating-secondary rounded-t-lg">
                      <div className="text-center text-xs font-bold uppercase tracking-wider text-dating-dark mb-1">Most Popular</div>
                      <CardTitle className="text-dating-dark">Plus</CardTitle>
                      <CardDescription className="text-dating-dark/80">For active daters</CardDescription>
                      <div className="text-2xl font-bold mt-2 text-dating-dark">$19.99<span className="text-sm font-normal text-dating-dark/80">/month</span></div>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-4">
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
                      <Button className="w-full bg-dating-primary hover:bg-dating-accent text-dating-dark">
                        Select Plan
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Premium Plan */}
                  <Card className="border-dating-primary/30 hover:border-dating-primary/80 transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-dating-dark">Premium</CardTitle>
                      <CardDescription>For serious relationship seekers</CardDescription>
                      <div className="text-2xl font-bold mt-2">$29.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
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
                      <Button className="w-full bg-dating-primary hover:bg-dating-accent text-dating-dark">
                        Select Plan
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ProfileHighlight;
