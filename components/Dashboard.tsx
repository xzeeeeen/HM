import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DashboardHome } from './DashboardHome';
import { CoursesView } from './member/CoursesView';
import { CalendarView } from './member/CalendarView';
import { ToolsView } from './member/ToolsView';
import { MarketWatch } from './MarketWatch';
import { ForumView } from './member/ForumView';
import { EventsView } from './member/EventsView';
import { SettingsView } from './member/SettingsView';

export const Dashboard: React.FC = () => {
    const [activeView, setActiveView] = useState('home');

    const renderView = () => {
        switch (activeView) {
            case 'home':
                return <DashboardHome setActiveView={setActiveView} />;
            case 'courses':
                return <CoursesView />;
            case 'calendar':
                return <CalendarView />;
            case 'tools':
                return <ToolsView />;
            case 'market':
                return <MarketWatch />;
            case 'forum':
                return <ForumView />;
            case 'events':
                return <EventsView />;
            case 'settings':
                return <SettingsView />;
            default:
                return <DashboardHome setActiveView={setActiveView} />;
        }
    };

    return (
        <div className="flex h-screen bg-brand-primary text-brand-text-primary dark:bg-brand-primary bg-brand-primary-light transition-colors duration-300">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
                    <Header />
                    <div className="mt-8">
                        {renderView()}
                    </div>
                </main>
            </div>
        </div>
    );
};
