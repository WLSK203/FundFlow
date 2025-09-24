import React from 'react';

const Team: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-trust-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-3xl">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">Team</h1>
        <p className="text-neutral-700">
          This was made by the team "VECTOR" — Members: ALOK SHARMA (24BCE10325), ASHISH KUMAR YADAV (24BCE10880), NAMAN CHOUDHARY (24BCE10586), SNEHA TIWARI (24BCE11287)
        </p>
      </div>
    </div>
  );
};

export default Team;
