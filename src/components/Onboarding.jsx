import { useState, useEffect } from 'react';
import FieldCard from './FieldCard';
import Button from './Button';
import './Onboarding.css';

const WordReveal = ({ text, baseDelay = 0 }) => {
  return text.split(' ').map((word, index) => (
    <span key={index}>
      <span className="word-wrapper">
        <span className="word-text" style={{ animationDelay: `${baseDelay + (index * 0.04)}s` }}>
          {word}
        </span>
      </span>
      {' '}
    </span>
  ));
};

export default function Onboarding({ onComplete }) {
  const [selectedField, setSelectedField] = useState(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Add small delay on load so the CSS width transition triggers from 0
    const t = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(t);
  }, []);

  const handleFieldClick = (id) => {
    if (isCompleting) return;
    // Toggle exactly as requested: selecting moves to 2, deselecting moves back to 1
    setSelectedField(prev => prev === id ? null : id);
  };

  const handleComplete = () => {
    setIsCompleting(true);
    // Wait for the final step bar transition and page fade before actually unmounting
    setTimeout(() => {
      onComplete(selectedField);
    }, 1200); 
  };

  const currentStep = !mounted ? 0 : (isCompleting ? 3 : (selectedField ? 2 : 1));
  const displayStep = isCompleting ? 3 : (selectedField ? 2 : 1);
  const fillWidth = `${(currentStep / 3) * 100}%`;

  // Note: These icons are now the EXACT Material Symbols names corresponding to your Stitch design!
  // No more emojis :)
  const fields = [
    { id: 'student', title: 'Student', icon: 'school' },
    { id: 'marketer', title: 'Marketer', icon: 'campaign' },
    { id: 'hr', title: 'HR/Ops', icon: 'account_tree' },
    { id: 'founder', title: 'Founder', icon: 'rocket_launch' },
    { id: 'freelancer', title: 'Freelancer', icon: 'work' },
    { id: 'developer', title: 'Developer', icon: 'terminal' }
  ];

  return (
    <div className={`onboarding-page ${isCompleting ? 'fade-out' : ''}`}>
      <div className="bg-layer">
        <img 
          className="bg-image" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9t42OMXqkBwOiarI0QmEZJi403N9vp6aoaEI8huCMKOZLJAhdvYL7RatgdrJcx92GgtqLOqoVEdHdlBo2meP51R6K4aMj4LWUlUTwIdJ3r16_FNY9KR8xaEpeaTBUjeI00xglrrrGz8yVRjV5F8X18LIrwXo7MZj2H9Cfq6BxDKgYHWC4DpI7mRm-lLJhL6o9j-OFjk2SKbCyjWpP4L39JWQ1Ug3yvAS1bwRUjZtQ5oaEc2kT2HILI6jat6ljfLuORt-o8OcguLPM" 
          alt="" 
        />
        <div className="bg-gradient"></div>
      </div>
      <div className="bg-decoration-1"></div>
      <div className="bg-decoration-2"></div>

      <main className="onboarding-main">
        <div className="onboarding-left">
          <div className="ai-badge">
            <span className="material-symbols-outlined icon-small" style={{ fontVariationSettings: "'FILL' 1" }}>colors_spark</span>
            AI-POWERED WORKSPACE
          </div>
          <h1 className="main-title">
            <span className="line-wrapper"><span className="line-text" style={{animationDelay: "0.2s"}}>Tailor your</span></span> <br />
            <span className="line-wrapper"><span className="line-text main-title-highlight" style={{animationDelay: "0.35s"}}>intelligence</span></span><br />
            <span className="line-wrapper"><span className="line-text" style={{animationDelay: "0.5s"}}>experience.</span></span>
          </h1>
          <p className="main-subtitle">
            <WordReveal 
              text="Select your professional archetype so we can curate the right AI insights and Kanban flows for your daily narrative." 
              baseDelay={0.6} 
            />
          </p>
          <div className="trust-section">
            <div className="avatar-group">
              <img className="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3SzNzGReXHQz56v-ziaRnrAr05sTDrvnFnsliZau3bv3JTm68A_a9AO8ldbtHO4gPCR3x3NCuJPkGEcZxCsSi5wn4cCkh2aOi7D0oVLXuWbvRY6iHsxfTWquOrGLMiSDb8AqtHAro6glb_TB3QBcW0sgjODs832os19_sMNzInWzWWmbtgMvX1BAhOWlLw2oBuqrM-syKmakBugan3Ckay2onO96MPmr8QlwDiZ4lAyAq3xrnocDlrEVJfo2ZcaTbAQWDWIHohX7c" alt="User" />
              <img className="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT6FKzBAlso1R8dg2KGP3k6nnKGgyWsQ2yH9l2yS-RjvCvEEtIs0VzYCPvliIjAjTFJf9GD0Kr4ADKD3GarMEhcLRwOkq6Krsap7tktB-FwaIA98UYc1EtzVfHrvzGu2oLUsfrFa5RIDygZPfda11QgriD5vq9IBYxoKehxlckYjWclVLk3anACFO0xmxslBzIwiw_glStcOBTbftA2BQbLw6KnL-A3wkaZUooui7gGzQsFmuQxQPAHoUif_Cc8Y4pmrhejpwTy7OZ" alt="User" />
              <div className="avatar avatar-count">+12k</div>
            </div>
            <span>Trusted by global editors</span>
          </div>
        </div>

        <div className="glass-panel">
          <div className="fields-grid">
            {fields.map((field) => (
              <FieldCard 
                key={field.id}
                title={field.title}
                icon={field.icon}
                isSelected={selectedField === field.id}
                onClick={() => handleFieldClick(field.id)}
              />
            ))}
          </div>

          <div className="panel-footer">
            <div className="step-indicator">
              <div className="step-bar-bg">
                <div className="step-bar-fill" style={{ width: fillWidth }}></div>
              </div>
              <span className="step-text">Step {displayStep} of 3</span>
            </div>
            <Button disabled={!selectedField || isCompleting} onClick={handleComplete}>
              {isCompleting ? 'Entering Board...' : 'Set up my board'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
