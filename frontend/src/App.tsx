import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import './App.css';

function App() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setShowAuth(!showAuth)} className="absolute top-4 left-4 bg-gray-300 dark:bg-gray-700 p-2 rounded-md">
        Toggle Auth Page
      </button>
      {showAuth ? <AuthPage /> : <LandingPage />}
    </div>
  );
}

export default App;
