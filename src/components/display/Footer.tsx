import React from 'react';

type FooterProps = {
  onRefresh: () => void;
};

export const Footer: React.FC<FooterProps> = ({ onRefresh }) => {
  return (
    <footer className="fixed bottom-0 w-full py-4 shadow-md">
      <div className="container mx-auto flex justify-center">
        <button
          onClick={onRefresh}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Refresh Data
        </button>
      </div>
    </footer>
  );
};