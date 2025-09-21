import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-text-secondary mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-brand-primary/50 border border-brand-border rounded-md p-2 text-brand-text-primary focus:ring-2 focus:ring-brand-accent/80 focus:border-brand-accent transition focus:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
      />
    </div>
  );
};