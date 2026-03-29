import { useState } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  // We keep track of the selected field here in the main App
  const [currentField, setCurrentField] = useState(null);

  // This function is passed to Onboarding. When the user clicks "Set up my board",
  // it triggers this function and saves the field they picked.
  const handleCompleteOnboarding = (fieldId) => {
    setCurrentField(fieldId);
  };

  return (
    <>
      {!currentField ? (
        <Onboarding onComplete={handleCompleteOnboarding} />
      ) : (
        <Dashboard initialField={currentField} onLogout={() => setCurrentField(null)} />
      )}
    </>
  );
}

export default App;
