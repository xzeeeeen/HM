import React, { useEffect, useState } from 'react';
// FIX: Removed local icon declarations that conflicted with these imports.
import { CheckCircleIcon, ErrorIcon, InfoIcon } from './icons';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const toastConfig = {
  success: {
    icon: <CheckCircleIcon className="w-6 h-6 text-brand-green" />,
    style: 'bg-brand-green/10 backdrop-blur-md border-brand-green/30',
  },
  error: {
    icon: <ErrorIcon className="w-6 h-6 text-brand-red" />,
    style: 'bg-brand-red/10 backdrop-blur-md border-brand-red/30',
  },
  info: {
    icon: <InfoIcon className="w-6 h-6 text-brand-accent" />,
    style: 'bg-brand-accent/10 backdrop-blur-md border-brand-accent/30',
  },
};

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(onClose, 300); // Wait for fade-out animation
  };

  const config = toastConfig[type];

  return (
    <div
      className={`flex items-start p-4 rounded-lg shadow-lg text-white border transition-all duration-300 ${config.style} ${isFadingOut ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}
      role="alert"
    >
      <div className="flex-shrink-0">{config.icon}</div>
      <div className="ml-3">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button onClick={handleClose} className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg inline-flex h-8 w-8 hover:bg-white/10 focus:outline-none">
        <span className="sr-only">Dismiss</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
    </div>
  );
};