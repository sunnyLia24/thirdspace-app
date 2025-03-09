
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const MapTitle: React.FC = () => {
  return (
    <div className="absolute top-8 left-0 right-0 flex justify-center z-10">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-dating-primary via-dating-accent to-dating-secondary rounded-lg blur opacity-75 animate-left-to-right"></div>
        <Card className="relative border-none">
          <CardContent className="flex flex-col items-center justify-center p-3">
            <h1 className="text-xl font-extrabold text-dating-dark bg-clip-text text-transparent bg-gradient-to-r from-dating-primary to-dating-accent">
              Third Spaces
            </h1>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapTitle;
