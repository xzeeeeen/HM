import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BellIcon } from './icons/BellIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { usePlatform } from '../contexts/PlatformContext';
import { CoinIcon } from './icons/CoinIcon';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { memberProfile } = usePlatform();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex justify-end items-center space-x-4">
        <div className="flex items-center space-x-2 bg-black/30 dark:backdrop-blur-sm px-4 py-2 rounded-lg border dark:border-brand-border bg-brand-secondary-light border-brand-border-light">
            <CoinIcon />
            <span className="font-bold text-brand-accent text-md">{memberProfile.points}</span>
        </div>
        <ThemeToggle />
        <button
          className="p-2 rounded-full text-brand-text-secondary-light dark:text-brand-text-secondary hover:bg-black/5 dark:hover:bg-brand-secondary/70 hover:text-brand-text-primary-light dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-brand-primary focus:ring-brand-accent"
          aria-label="Notifications"
        >
          <BellIcon />
        </button>
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2">
                 <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center font-bold text-brand-primary ring-2 ring-brand-accent/50">
                    {user?.name.charAt(0).toUpperCase()}
                </div>
            </button>
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-brand-secondary-light dark:bg-brand-secondary/80 dark:backdrop-blur-lg rounded-lg shadow-lg border border-brand-border-light dark:border-brand-border py-2 z-50">
                    <div className="px-4 py-2 border-b border-brand-border-light dark:border-brand-border">
                        <p className="font-semibold text-brand-text-primary-light dark:text-white">{user?.name}</p>
                        <p className="text-xs text-brand-text-secondary-light dark:text-brand-text-secondary truncate">{user?.email}</p>
                    </div>
                    <button onClick={logout} className="group flex items-center w-full px-4 py-3 text-sm text-brand-text-secondary-light dark:text-brand-text-secondary hover:bg-black/5 dark:hover:bg-brand-primary hover:text-brand-text-primary-light dark:hover:text-white">
                        <LogoutIcon />
                        <span className="ml-3">Logout</span>
                    </button>
                </div>
            )}
        </div>
    </header>
  );
};