import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
    return (
        <div className="bg-brand-secondary/30 backdrop-blur-lg border border-brand-border rounded-lg p-5 flex items-center space-x-4">
            <div className="p-3 bg-brand-primary/50 rounded-lg border border-brand-border">
                <div className="text-brand-accent">
                    {icon}
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-brand-text-secondary">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
    );
};