import React from 'react';
import { StatCard } from './StatCard';
import { UsersIcon } from '../icons/UsersIcon';
import { EyeIcon } from '../icons/EyeIcon';
import { ClockIcon } from '../icons/ClockIcon';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';

// FIX: Removed local placeholder icon declarations that were conflicting with imports.
const ChartPlaceholder: React.FC<{ title: string }> = ({ title }) => (
    <div className="bg-brand-secondary border border-brand-border rounded-lg p-6 h-80">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="h-full bg-brand-primary rounded-md flex items-center justify-center">
            <p className="text-brand-text-secondary">[Placeholder for Chart]</p>
        </div>
    </div>
);


export const AdminAnalytics: React.FC = () => {
    return (
         <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Views (30d)" value="1,254,832" icon={<EyeIcon />} />
                <StatCard title="Avg. Engagement Rate" value="68.4%" icon={<CheckCircleIcon />} />
                <StatCard title="Avg. Time on Site" value="8m 15s" icon={<ClockIcon />} />
                <StatCard title="New Members (30d)" value="78" icon={<UsersIcon />} />
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartPlaceholder title="Member Growth vs. Churn Rate" />
                <ChartPlaceholder title="Content Engagement (Views vs. Completion)" />
                <ChartPlaceholder title="Top Performing Courses" />
                <ChartPlaceholder title="User Demographics by Region" />
            </div>
        </div>
    );
};