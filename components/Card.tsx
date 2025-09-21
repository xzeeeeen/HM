import React from 'react';

interface CardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-brand-secondary/30 backdrop-blur-lg border border-brand-border rounded-xl p-6 shadow-lg hover:border-brand-accent/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.1)]">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="mt-1 text-brand-text-secondary">{description}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
};