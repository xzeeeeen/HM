

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePlatform } from '../contexts/PlatformContext';
import { Card } from './Card';
import { Button } from './Button';
import { CoinIcon } from './icons/CoinIcon';
import { BadgeIcon } from './icons/BadgeIcon';
import { TrophyIcon } from './icons/TrophyIcon';
import { CourseIcon } from './icons/CourseIcon';
import { WebinarIcon } from './icons/WebinarIcon';
import { MarketIcon } from './icons/MarketIcon';

interface DashboardHomeProps {
    setActiveView: (view: string) => void;
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number; }> = ({ icon, title, value }) => (
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

const QuickAccessCard: React.FC<{icon: React.ReactNode, title: string, description: string, buttonText: string, onClick: () => void}> = ({ icon, title, description, buttonText, onClick }) => (
    <div className="bg-brand-secondary/30 backdrop-blur-lg border border-brand-border rounded-lg p-6 flex flex-col">
        <div className="flex items-start space-x-4">
            <div className="text-brand-accent flex-shrink-0 mt-1">{icon}</div>
            <div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="text-brand-text-secondary mt-1 text-sm">{description}</p>
            </div>
        </div>
        <div className="mt-auto pt-4">
            <Button onClick={onClick} variant="secondary">{buttonText}</Button>
        </div>
    </div>
);


export const DashboardHome: React.FC<DashboardHomeProps> = ({ setActiveView }) => {
    const { user } = useAuth();
    const { memberProfile, upcomingEvents, courses } = usePlatform();

    // FIX: Calculate total lessons by iterating through modules in each course.
    const totalLessons = courses.reduce((acc, course) => acc + course.modules.reduce((moduleAcc, module) => moduleAcc + module.lessons.length, 0), 0);
    // FIX: Use .size for Set objects instead of .length.
    const completedLessons = Object.values(memberProfile.courseProgress).reduce((acc, progress) => acc + progress.completedLessonIds.size, 0);
    const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Selamat Datang, {user?.name.split(' ')[0]}!</h1>
                <p className="mt-1 text-md text-brand-text-secondary">
                    Lanjutkan perjalanan Anda untuk menjadi bagian dari minoritas yang sukses.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard icon={<CoinIcon />} title="Poin Anda" value={memberProfile.points} />
                <StatCard icon={<BadgeIcon />} title="Level" value={memberProfile.level} />
                <StatCard icon={<TrophyIcon />} title="Progres Kursus" value={`${overallProgress}%`} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card title="Lanjutkan Belajar" description="Pilih materi untuk melanjutkan progres Anda.">
                        {courses.slice(0, 2).map(course => {
                             const progress = memberProfile.courseProgress[course.id];
                             // FIX: Use .size to get the number of items in a Set.
                             const completedCount = progress ? progress.completedLessonIds.size : 0;
                             // FIX: A course contains modules, and modules contain lessons. Sum up lessons from all modules.
                             const total = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
                             const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
                            return (
                                <div key={course.id} className="p-4 rounded-lg bg-brand-primary/50 border border-brand-border mb-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-white">{course.title}</h4>
                                        <button onClick={() => setActiveView('courses')} className="text-sm text-brand-accent hover:underline">Lihat Kursus</button>
                                    </div>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <div className="w-full bg-brand-secondary rounded-full h-2.5 border border-brand-border">
                                            <div className="bg-brand-accent h-full rounded-full" style={{width: `${percentage}%`}}></div>
                                        </div>
                                        <span className="text-sm font-medium text-brand-text-secondary">{percentage}%</span>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="mt-6">
                            <Button onClick={() => setActiveView('courses')}>Lihat Semua Kursus</Button>
                        </div>
                    </Card>
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white">Akses Cepat</h2>
                     <QuickAccessCard 
                        icon={<WebinarIcon />} 
                        title="Event Berikutnya" 
                        description={upcomingEvents.length > 0 ? upcomingEvents[0].title : "Tidak ada acara terdekat."}
                        buttonText="Lihat Semua Event"
                        onClick={() => setActiveView('events')}
                    />
                     <QuickAccessCard 
                        icon={<MarketIcon />} 
                        title="Market Watch" 
                        description="Pantau pergerakan harga pasar secara real-time."
                        buttonText="Buka Market Watch"
                        onClick={() => setActiveView('market')}
                    />
                </div>
            </div>
        </div>
    );
};