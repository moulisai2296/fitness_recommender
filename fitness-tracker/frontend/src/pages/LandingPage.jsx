import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundImage: 'radial-gradient(circle at top right, #1A1D23, #111318)', padding: '24px' }}>
      <h1 style={{ fontSize: '64px', marginBottom: '16px', textAlign: 'center', color: 'var(--accent-green)' }}>FITCOACH AI</h1>
      <h2 style={{ fontSize: '32px', marginBottom: '48px', textAlign: 'center', fontWeight: 'normal', color: 'var(--text-secondary)' }}>Your AI-Powered Personal Coach — Finally Honest About Fitness.</h2>
      <div style={{ display: 'flex', gap: '24px' }}>
        <Link to="/register" className="btn btn-primary" style={{ padding: '0 48px', fontSize: '18px' }}>Get Started Free</Link>
        <Link to="/login" className="btn btn-ghost" style={{ padding: '0 48px', fontSize: '18px' }}>Login</Link>
      </div>
    </div>
  );
};

export default LandingPage;
