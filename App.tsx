// FIX: This file was created to replace placeholder content and fix module errors.
// It sets up the main application structure with authentication-based routing.
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Dashboard } from './components/Dashboard';
import { AuthPage } from './components/AuthPage';
import { LandingPage } from './components/LandingPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AboutPage } from './components/AboutPage';
import { PlatformProvider } from './contexts/PlatformContext';
import { ToastProvider, ToastContainer } from './contexts/ToastContext';

type View = 'landing' | 'login' | 'about';

const AppContent: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [currentView, setCurrentView] = useState<View>('landing');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-brand-primary">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    // Route to the appropriate dashboard based on user role
    return user.role === 'admin' ? <AdminDashboard /> : <Dashboard />;
  }
  
  switch (currentView) {
    case 'login':
      return <AuthPage onBackToLanding={() => setCurrentView('landing')} />;
    case 'about':
        return <AboutPage onBackToLanding={() => setCurrentView('landing')} />;
    case 'landing':
    default:
        return <LandingPage 
            onLoginClick={() => setCurrentView('login')} 
            onAboutClick={() => setCurrentView('about')} 
        />;
  }
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <PlatformProvider>
            <AppContent />
            <ToastContainer />
          </PlatformProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
