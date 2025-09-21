import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Input } from './Input';
import { Button } from './Button';
import { Logo } from './icons/Logo';
import { GoogleIcon } from './icons/GoogleIcon';
import { FacebookIcon } from './icons/FacebookIcon';

interface AuthPageProps {
  onBackToLanding: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onBackToLanding }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register, loading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginView) {
      login(email, password);
    } else {
      register(name, email, password);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    // Clear form fields on view toggle
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen dark:bg-brand-primary bg-brand-primary-light flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <button onClick={onBackToLanding} aria-label="Back to landing page">
            <Logo />
          </button>
        </div>
        <div className="dark:bg-brand-secondary/30 bg-brand-secondary-light dark:backdrop-blur-lg border border-brand-border-light dark:border-brand-border rounded-lg shadow-2xl dark:shadow-brand-accent/10 p-8">
          <h2 className="text-2xl font-bold text-center dark:text-white text-brand-text-primary-light mb-2">
            {isLoginView ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-center text-brand-text-secondary-light dark:text-brand-text-secondary mb-8">
            {isLoginView ? 'Sign in to continue to your dashboard.' : 'Join the minority to start your journey.'}
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {!isLoginView && (
                 <Input
                  label="Full Name"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              )}
              <Input
                label="Email Address"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
              <Input
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            {isLoginView && (
                <div className="flex items-center justify-between mt-4">
                    <div/> 
                    <a href="#" className="text-sm font-medium text-brand-accent hover:text-brand-accent-hover">
                        Forgot password?
                    </a>
                </div>
            )}
            
            {isLoginView && (
              <p className="mt-4 text-center text-xs text-brand-text-secondary-light dark:text-brand-text-secondary">
                Use <code className="bg-brand-primary-light dark:bg-brand-primary px-1 rounded text-brand-accent-hover">admin@humanminority.pro</code> to access the Admin Panel.
              </p>
            )}

            <div className="mt-6">
              <Button type="submit" disabled={loading}>
                {loading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Create Account')}
              </Button>
            </div>
          </form>

           <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-border-light dark:border-brand-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-brand-secondary-light dark:bg-brand-secondary/0 dark:backdrop-blur-lg text-brand-text-secondary-light dark:text-brand-text-secondary">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="w-full inline-flex justify-center items-center py-3 px-4 border border-brand-border-light dark:border-brand-border rounded-md shadow-sm bg-brand-secondary-light dark:bg-brand-primary/50 text-sm font-medium text-brand-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-brand-secondary/80 transition-colors">
                <GoogleIcon />
                <span className="ml-2">Google</span>
            </button>
            <button className="w-full inline-flex justify-center items-center py-3 px-4 border border-brand-border-light dark:border-brand-border rounded-md shadow-sm bg-brand-secondary-light dark:bg-brand-primary/50 text-sm font-medium text-brand-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-brand-secondary/80 transition-colors">
                <FacebookIcon />
                <span className="ml-2">Facebook</span>
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-sm text-brand-text-secondary-light dark:text-brand-text-secondary">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button onClick={toggleView} className="font-medium text-brand-accent hover:text-brand-accent-hover ml-1">
            {isLoginView ? 'Sign up' : 'Sign in'}
          </button>
        </p>

      </div>
    </div>
  );
};