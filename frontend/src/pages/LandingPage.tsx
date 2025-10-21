import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
        No Hate AI Agent
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 text-center max-w-2xl mb-8">
        Detect, fact-check, and counter hate speech and misinformation online.
        Our mission is to create a safer and more informed digital world.
      </p>
      <div className="flex space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
          Report Misinformation
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
