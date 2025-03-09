
import React from 'react';

const MapTitle: React.FC = () => {
  return (
    <div className="absolute top-8 left-0 right-0 flex justify-center z-10">
      <h1 className="text-xl font-extrabold text-dating-dark bg-clip-text text-transparent bg-gradient-to-r from-dating-primary to-dating-accent relative">
        Third Spaces
        <span className="absolute -inset-1 bg-gradient-to-r from-dating-primary via-dating-accent to-dating-secondary rounded-lg blur opacity-75 animate-left-to-right -z-10"></span>
      </h1>
    </div>
  );
};

export default MapTitle;
