import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export const Select: React.FC<SelectProps> = ({ label, options, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-text-secondary mb-1">
        {label}
      </label>
      <select
        {...props}
        className="w-full bg-brand-primary/50 border border-brand-border rounded-md p-2 text-brand-text-primary focus:ring-2 focus:ring-brand-accent/80 focus:border-brand-accent transition appearance-none bg-no-repeat bg-right pr-8 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2300FFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-brand-secondary">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};