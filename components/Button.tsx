import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "w-full font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-[1.02]";
  
  const variantClasses = {
    primary: "bg-brand-accent text-brand-primary font-bold shadow-md shadow-brand-accent/30 hover:bg-brand-accent-hover focus:ring-offset-brand-primary focus:ring-brand-accent hover:shadow-lg hover:shadow-brand-accent/40",
    secondary: "bg-transparent border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-primary focus:ring-offset-brand-primary focus:ring-brand-accent hover:shadow-md hover:shadow-brand-accent/30"
  };

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${props.className || ''}`}
    >
      {children}
    </button>
  );
};