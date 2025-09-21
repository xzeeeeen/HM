import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label }) => {
  return (
    <label htmlFor={label || "toggle-switch"} className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          id={label || "toggle-switch"}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`block w-14 h-8 rounded-full transition-colors ${checked ? 'bg-brand-accent' : 'bg-brand-secondary'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${checked ? 'transform translate-x-6' : ''}`}></div>
      </div>
      {label && <span className="ml-3 text-brand-text-primary font-medium">{label}</span>}
    </label>
  );
};