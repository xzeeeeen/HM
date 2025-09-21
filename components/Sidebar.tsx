import React from 'react';
import { CalculatorIcon } from './icons/CalculatorIcon';
import { CourseIcon } from './icons/CourseIcon';
import { ForumIcon } from './icons/ForumIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { HomeIcon } from './icons/HomeIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { WebinarIcon } from './icons/WebinarIcon';
import { Logo } from './icons/Logo';
import { MarketIcon } from './icons/MarketIcon';


interface SidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`group relative flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${isActive ? 'bg-brand-accent/10 text-brand-accent-hover shadow-[0_0_15px_rgba(0,255,255,0.2)]' : 'text-brand-text-secondary hover:bg-brand-secondary/60 hover:text-white'}`}>
        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent rounded-r-full"></div>}
        {icon}
        <span className="ml-4">{label}</span>
    </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
    return (
        <aside className="w-64 bg-black/30 backdrop-blur-sm p-4 flex flex-col border-r border-brand-border">
            <div className="flex items-center mb-8 px-2 h-10">
                <Logo />
            </div>
            <nav className="flex-1 space-y-2">
                 <NavItem
                    icon={<HomeIcon />}
                    label="Home"
                    isActive={activeView === 'home'}
                    onClick={() => setActiveView('home')}
                />
                <NavItem
                    icon={<CourseIcon />}
                    label="Materi Edukasi"
                    isActive={activeView === 'courses'}
                    onClick={() => setActiveView('courses')}
                />
                 <NavItem
                    icon={<CalendarIcon className="w-6 h-6" />}
                    label="Kalender Ekonomi"
                    isActive={activeView === 'calendar'}
                    onClick={() => setActiveView('calendar')}
                />
                <NavItem
                    icon={<CalculatorIcon />}
                    label="Alat / Tools"
                    isActive={activeView === 'tools'}
                    onClick={() => setActiveView('tools')}
                />
                 <NavItem
                    icon={<MarketIcon />}
                    label="Market Watch"
                    isActive={activeView === 'market'}
                    onClick={() => setActiveView('market')}
                />
                 <NavItem
                    icon={<ForumIcon />}
                    label="Forum"
                    isActive={activeView === 'forum'}
                    onClick={() => setActiveView('forum')}
                />
                 <NavItem
                    icon={<WebinarIcon />}
                    label="Event & Webinar"
                    isActive={activeView === 'events'}
                    onClick={() => setActiveView('events')}
                />
            </nav>
            <div className="mt-auto">
                 <NavItem
                    icon={<SettingsIcon />}
                    label="Pengaturan Akun"
                    isActive={activeView === 'settings'}
                    onClick={() => setActiveView('settings')}
                />
            </div>
        </aside>
    );
};