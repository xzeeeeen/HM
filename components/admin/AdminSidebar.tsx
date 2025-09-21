import React from 'react';
import { Logo } from '../icons/Logo';
import { HomeIcon } from '../icons/HomeIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { FileTextIcon } from '../icons/FileTextIcon';
import { CalendarIcon } from '../icons/CalendarIcon';
import { CalculatorIcon } from '../icons/CalculatorIcon';
import { WebinarIcon } from '../icons/WebinarIcon';
import { ForumIcon } from '../icons/ForumIcon';
import { BarChartIcon } from '../icons/BarChartIcon';
import { SettingsIcon } from '../icons/SettingsIcon';
import { ShieldIcon } from '../icons/ShieldIcon';


interface AdminSidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`group flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-brand-accent text-brand-primary' : 'text-brand-text-secondary hover:bg-brand-primary hover:text-white'}`}>
        {icon}
        <span className="ml-4">{label}</span>
    </button>
);

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeView, setActiveView }) => {
    return (
        <aside className="w-64 bg-brand-secondary p-4 flex flex-col border-r border-brand-border">
            <div className="flex items-center mb-8 px-2 h-10">
                <Logo />
            </div>
            <nav className="flex-1 space-y-2">
                 <NavItem icon={<HomeIcon />} label="Dashboard" isActive={activeView === 'overview'} onClick={() => setActiveView('overview')} />
                 <NavItem icon={<UsersIcon />} label="Manajemen Member" isActive={activeView === 'members'} onClick={() => setActiveView('members')} />
                 <NavItem icon={<FileTextIcon />} label="Manajemen Konten" isActive={activeView === 'content'} onClick={() => setActiveView('content')} />
                 <NavItem icon={<CalendarIcon className="w-6 h-6"/>} label="Kalender Ekonomi" isActive={activeView === 'calendar'} onClick={() => setActiveView('calendar')} />
                 <NavItem icon={<CalculatorIcon />} label="Tools Trading" isActive={activeView === 'tools'} onClick={() => setActiveView('tools')} />
                 <NavItem icon={<WebinarIcon />} label="Event & Webinar" isActive={activeView === 'events'} onClick={() => setActiveView('events')} />
                 <NavItem icon={<ForumIcon />} label="Forum / Diskusi" isActive={activeView === 'forum'} onClick={() => setActiveView('forum')} />
                 <NavItem icon={<BarChartIcon />} label="Analitik & Laporan" isActive={activeView === 'analytics'} onClick={() => setActiveView('analytics')} />
            </nav>
            <div className="mt-auto space-y-2">
                 <NavItem icon={<SettingsIcon />} label="Pengaturan Website" isActive={activeView === 'settings'} onClick={() => setActiveView('settings')} />
                 <NavItem icon={<ShieldIcon />} label="Keamanan" isActive={activeView === 'security'} onClick={() => setActiveView('security')} />
            </div>
        </aside>
    );
};
