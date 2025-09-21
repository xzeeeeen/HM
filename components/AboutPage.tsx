import React from 'react';
import { Logo } from './icons/Logo';
import { Button } from './Button';
import { QualityIcon } from './icons/QualityIcon';
import { GroupIcon } from './icons/GroupIcon';
import { AccessibilityIcon } from './icons/AccessibilityIcon';
import { CalculatorIcon } from './icons/CalculatorIcon';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';
import { WebinarIcon } from './icons/WebinarIcon';
import { InnovationIcon } from './icons/InnovationIcon';

interface AboutPageProps {
  onBackToLanding: () => void;
}

const AboutHeader: React.FC<{onBack: () => void;}> = ({ onBack }) => (
    <header className="container mx-auto px-6 py-6 flex justify-between items-center sticky top-0 z-50 bg-brand-primary/80 backdrop-blur-sm">
        <Logo />
        <Button onClick={onBack} variant="secondary" className="!w-auto px-6 !py-2">
          &larr; Kembali
        </Button>
    </header>
);

const MissionCard: React.FC<{icon: React.ReactNode; title: string; children: React.ReactNode}> = ({icon, title, children}) => (
    <div className="bg-brand-secondary border border-brand-border rounded-lg p-6 flex items-start space-x-4">
        <div className="text-brand-accent flex-shrink-0 mt-1">{icon}</div>
        <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-brand-text-secondary mt-1">{children}</p>
        </div>
    </div>
);


export const AboutPage: React.FC<AboutPageProps> = ({ onBackToLanding }) => {
    const missions = [
        { 
            icon: <QualityIcon />, 
            title: "Edukasi Berkualitas", 
            description: "Menyediakan materi edukasi yang mendalam dan relevan tentang trading forex, crypto, bisnis, dan pengembangan personal dengan pendekatan praktis dan mudah dipahami." 
        },
        { 
            icon: <GroupIcon />, 
            title: "Membangun Komunitas Inspiratif", 
            description: "Mengumpulkan individu-individu dengan mimpi besar dan pemikiran di atas rata-rata, menciptakan ruang untuk kolaborasi, diskusi, dan pertumbuhan bersama." 
        },
        { 
            icon: <AccessibilityIcon />, 
            title: "Akses Gratis untuk Semua", 
            description: "Memberikan akses gratis untuk materi dasar dan tools penting agar setiap orang punya kesempatan yang sama untuk belajar." 
        },
        { 
            icon: <CalculatorIcon />, 
            title: "Pengembangan Tools Profesional", 
            description: "Menyediakan kalender ekonomi, tools trading, indikator analisis, dan fitur lain yang mendukung kegiatan belajar dan praktik anggota." 
        },
        { 
            icon: <BrainCircuitIcon />, 
            title: "Mendorong Mindset Positif", 
            description: "Membentuk mindset realistis, konsisten, dan profesional agar trading atau bisnis tidak diperlakukan sebagai perjudian melainkan sebagai ilmu dan skill yang bisa diandalkan." 
        },
        { 
            icon: <WebinarIcon />, 
            title: "Mengadakan Event Berkala", 
            description: "Menyelenggarakan webinar, workshop, dan sesi offline/online dengan mentor berpengalaman untuk memperluas wawasan anggota." 
        },
        { 
            icon: <InnovationIcon />, 
            title: "Inovasi Berkelanjutan", 
            description: "Terus memperbarui fitur, materi, dan metode edukasi sesuai perkembangan dunia finansial, teknologi, dan tren bisnis global." 
        },
    ];

    return (
        <div className="bg-brand-primary min-h-screen text-brand-text-primary animate-fade-in-up">
            <AboutHeader onBack={onBackToLanding} />
            <main className="container mx-auto px-6 py-16">
                {/* Visi Section */}
                <section className="text-center">
                    <h1 className="text-2xl font-semibold text-brand-accent tracking-widest uppercase">Visi Kami</h1>
                    <p className="mt-4 text-4xl md:text-5xl font-bold text-white max-w-4xl mx-auto leading-tight">
                        Menjadi platform edukasi dan komunitas eksklusif yang menginspirasi, mendidik, dan memberdayakan individu untuk berkembang.
                    </p>
                    <p className="mt-6 text-xl text-brand-text-secondary">
                        Dengan semangat <span className="text-white font-semibold">“Chase your dreams, exceed expectations”</span>.
                    </p>
                </section>

                {/* Misi Section */}
                <section className="mt-24">
                     <h2 className="text-2xl font-semibold text-brand-accent tracking-widest uppercase text-center">Misi Kami</h2>
                     <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {missions.map(mission => (
                            <MissionCard key={mission.title} icon={mission.icon} title={mission.title}>
                                {mission.description}
                            </MissionCard>
                        ))}
                     </div>
                </section>
            </main>
        </div>
    );
};