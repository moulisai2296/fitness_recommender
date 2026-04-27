import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Activity, LayoutDashboard, Target, Dumbbell, User as UserIcon, LogOut } from 'lucide-react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import OnboardingPage from './pages/OnboardingPage';
import LogWorkoutPage from './pages/LogWorkoutPage';
import ProgressPage from './pages/ProgressPage';
import AICoachPage from './pages/AICoachPage';
import ProfilePage from './pages/ProfilePage';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">FITCOACH AI</div>
      <div className="sidebar-nav">
        <Link to="/dashboard" className="nav-item"><LayoutDashboard size={20} /> Dashboard</Link>
        <Link to="/log-workout" className="nav-item"><Activity size={20} /> Log Workout</Link>
        <Link to="/progress" className="nav-item"><Target size={20} /> Progress</Link>
        <Link to="/ai-coach" className="nav-item"><Dumbbell size={20} /> AI Coach</Link>
      </div>
    </div>
  );
};

const Topbar = ({ user, logout }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '32px', gap: '16px' }}>
      {user?.api_key && (
        <span style={{ background: 'var(--accent-green-glow)', color: 'var(--accent-green)', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--accent-green)', borderRadius: '50%', marginRight: '8px' }}></span>
          API Configured
        </span>
      )}
      <Link to="/profile" className="btn btn-ghost" style={{ height: '36px', padding: '0 16px', fontSize: '14px' }}>
        <UserIcon size={16} style={{ marginRight: '8px' }} /> My Profile
      </Link>
      <button onClick={logout} className="btn btn-danger" style={{ height: '36px', padding: '0 16px', fontSize: '14px' }}>
        <LogOut size={16} style={{ marginRight: '8px' }} /> Logout
      </button>
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const { user, loading, logout } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Topbar user={user} logout={logout} />
        {children}
      </div>
    </div>
  );
};

const AppRoutes = () => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
      <Route path="/onboarding" element={user ? <OnboardingPage /> : <Navigate to="/login" />} />
      
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/log-workout" element={<PrivateRoute><LogWorkoutPage /></PrivateRoute>} />
      <Route path="/progress" element={<PrivateRoute><ProgressPage /></PrivateRoute>} />
      <Route path="/ai-coach" element={<PrivateRoute><AICoachPage /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" toastOptions={{ style: { background: 'var(--bg-secondary)', color: 'var(--text-primary)' } }} />
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
