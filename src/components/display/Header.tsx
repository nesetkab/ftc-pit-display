import React from 'react';

type HeaderProps = {
  teamNumber: string;
};

export const Header: React.FC<HeaderProps> = ({ teamNumber }) => {
  return (
    <header className="w-full py-4  shadow-md">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center">
          Team {teamNumber} Dashboard
        </h1>
      </div>
    </header>
  );
};