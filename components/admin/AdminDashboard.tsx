import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminOverview } from './AdminOverview';
import { AdminContentManagement } from './AdminContentManagement';
import { AdminMemberManagement } from './AdminMemberManagement';
import { AdminToolsManagement } from './AdminToolsManagement';
import { AdminEventsManagement } from './AdminEventsManagement';
import { AdminForumManagement } from './AdminForumManagement';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminSettings } from './AdminSettings';
import { AdminSecurity } from './AdminSecurity';
import { AdminCalendarManagement } from './AdminCalendarManagement';


export const AdminDashboard: React.FC = () => {
    const [activeView, setActiveView] = useState('overview');

    const renderContent = () => {
        switch (activeView) {
            case 'overview':
                return <AdminOverview />;
            case 'members':
                return <AdminMemberManagement />;
            case 'content':
                return <AdminContentManagement />;
            case 'calendar':
                return <AdminCalendarManagement />;
            case 'tools':
                return <AdminToolsManagement />;
            case 'events':
                return <AdminEventsManagement />;
            case 'forum':
                return <AdminForumManagement />;
            case 'analytics':
                return <AdminAnalytics />;
            case 'settings':
                return <AdminSettings />;
            case 'security':
                return <AdminSecurity />;
            default:
                return <AdminOverview />;
        }
    }

    return (
        <div className="flex h-screen bg-brand-primary text-brand-text-primary">
            <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
            <main className="flex-1 p-8 overflow-y-auto">
                <AdminHeader />
                <div className="mt-8">
                   {renderContent()}
                </div>
            </main>
        </div>
    );
};