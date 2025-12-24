import React from 'react';

const Team: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-trust-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-3xl">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Team</h1>
        <p className="text-neutral-700">
          This was made by: <a href="https://www.linkedin.com/in/alok-sharma-b17550321" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">ALOK SHARMA</a>
        </p>
      </div>
    </div>
  );
};

export default Team;
