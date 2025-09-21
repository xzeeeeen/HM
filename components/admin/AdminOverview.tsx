import React from 'react';
import { StatCard } from './StatCard';
import { UsersIcon } from '../icons/UsersIcon';
import { FileTextIcon } from '../icons/FileTextIcon';
import { WebinarIcon } from '../icons/WebinarIcon';
import { BarChartIcon } from '../icons/BarChartIcon';

const MemberGrowthChart: React.FC = () => (
    <div className="bg-brand-secondary border border-brand-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Pertumbuhan Member</h3>
        <div className="h-64 bg-brand-primary rounded-md flex items-center justify-center">
            <p className="text-brand-text-secondary">[Placeholder for Member Growth Chart]</p>
        </div>
    </div>
);

const RecentActivity: React.FC = () => (
    <div className="bg-brand-secondary border border-brand-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Aktivitas Terbaru</h3>
        <ul className="space-y-4">
            <li className="flex items-center space-x-3">
                <div className="p-2 bg-green-900/50 rounded-full"><UsersIcon /></div>
                <p className="text-sm text-brand-text-secondary"><span className="font-semibold text-white">John Doe</span> baru saja mendaftar.</p>
            </li>
             <li className="flex items-center space-x-3">
                <div className="p-2 bg-blue-900/50 rounded-full"><FileTextIcon /></div>
                <p className="text-sm text-brand-text-secondary">Materi baru ditambahkan: <span className="font-semibold text-white">"Advanced Chart Patterns"</span>.</p>
            </li>
             <li className="flex items-center space-x-3">
                <div className="p-2 bg-purple-900/50 rounded-full"><WebinarIcon /></div>
                <p className="text-sm text-brand-text-secondary">Event baru dijadwalkan: <span className="font-semibold text-white">"Live Trading Session"</span>.</p>
            </li>
        </ul>
    </div>
);

export const AdminOverview: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Member" value="1,254" icon={<UsersIcon />} />
                <StatCard title="Materi Edukasi" value="86" icon={<FileTextIcon />} />
                <StatCard title="Event Aktif" value="3" icon={<WebinarIcon />} />
                <StatCard title="Member Baru (30 Hari)" value="78" icon={<BarChartIcon />} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <MemberGrowthChart />
                </div>
                <div className="lg:col-span-1">
                    <RecentActivity />
                </div>
            </div>
        </div>
    )
};
