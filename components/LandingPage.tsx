import React, { useRef, useState } from 'react';
import { Logo } from './icons/Logo';
import { Button } from './Button';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { CalculatorIcon } from './icons/CalculatorIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { ForumIcon } from './icons/ForumIcon';
import { StarIcon } from './icons/StarIcon';
import { TelegramIcon } from './icons/TelegramIcon';
import { DiscordIcon } from './icons/DiscordIcon';
import { TwitterIcon } from './icons/TwitterIcon';

interface LandingPageProps {
  onLoginClick: () => void;
  onAboutClick: () => void;
}

// Helper components defined locally to avoid creating new files
const AnimatedSection: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });
    return (
        <div ref={ref} className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} ${isVisible ? 'animate-fade-in-up' : ''} ${className}`}>
            {children}
        </div>
    );
};

const PlusIcon = () => (
    <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
);
const MinusIcon = () => (
    <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" /></svg>
);

const FaqItem: React.FC<{ question: string; answer: string; idx: number; openIdx: number | null; setOpenIdx: (idx: number | null) => void; }> = ({ question, answer, idx, openIdx, setOpenIdx }) => {
    const isOpen = idx === openIdx;
    return (
        <div className="border-b border-brand-border/50 py-6">
            <button onClick={() => setOpenIdx(isOpen ? null : idx)} className="w-full flex justify-between items-center text-left text-lg font-semibold text-brand-text-primary hover:text-brand-accent transition-colors">
                <span>{question}</span>
                <div className={`${isOpen ? 'transform rotate-180 text-brand-accent' : ''}`}>
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                </div>
            </button>
            <div className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <p className="text-brand-text-secondary">{answer}</p>
                </div>
            </div>
        </div>
    );
};


export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, onAboutClick }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
      { icon: <BookOpenIcon />, title: "Edukasi Mendalam", desc: "Materi terstruktur dari dasar hingga advance di Forex, Crypto, dan Bisnis." },
      { icon: <CalculatorIcon />, title: "Tools Trading Canggih", desc: "Kalkulator esensial dan tools analitik untuk membantu keputusan trading Anda." },
      { icon: <ForumIcon />, title: "Komunitas Eksklusif", desc: "Berdiskusi, berbagi analisa, dan bangun jaringan dengan member lain." },
      { icon: <CalendarIcon className="w-8 h-8"/>, title: "Event & Kalender Ekonomi", desc: "Jangan lewatkan webinar dan berita penting yang menggerakkan pasar." },
  ];
  
  const faqs = [
      { q: "Apakah platform ini benar-benar gratis?", a: "Ya, pendaftaran dan akses ke semua materi edukasi dasar, tools trading, dan forum komunitas sepenuhnya gratis. Kami mungkin akan menawarkan konten atau layanan premium di masa depan." },
      { q: "Siapa saja yang cocok bergabung dengan Human Minority?", a: "Siapa saja yang memiliki kemauan kuat untuk belajar tentang dunia finansial, baik Anda seorang pemula, trader berpengalaman, maupun pebisnis yang ingin memperluas wawasan." },
      { q: "Apakah Human Minority memberikan sinyal atau saran investasi?", a: "Tidak. Kami adalah platform edukasi. Kami menyediakan pengetahuan, tools, dan komunitas untuk diskusi. Semua keputusan trading dan investasi adalah tanggung jawab pribadi Anda." },
      { q: "Bagaimana cara saya memulai?", a: "Sangat mudah! Cukup klik tombol 'Daftar Gratis Sekarang', isi data diri Anda, dan Anda akan langsung mendapatkan akses ke member area kami." },
  ];

  return (
    <div className="bg-brand-primary text-brand-text-primary min-h-screen">
      <header className="container mx-auto px-6 py-6 flex justify-between items-center sticky top-0 z-50 bg-brand-primary/80 backdrop-blur-sm border-b border-brand-border/20">
        <Logo />
        <nav className="hidden md:flex items-center space-x-8 text-brand-text-secondary">
          <a href="#features" className="hover:text-brand-accent transition-colors">Keunggulan</a>
          <a href="#philosophy" className="hover:text-brand-accent transition-colors">Filosofi</a>
          <a href="#faq" className="hover:text-brand-accent transition-colors">FAQ</a>
        </nav>
        <Button onClick={onLoginClick} variant="secondary" className="!w-auto px-6 !py-2">
          Masuk / Daftar
        </Button>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative container mx-auto px-6 pt-24 pb-20 text-center overflow-hidden">
             <div className="absolute inset-0 -top-24 opacity-30 pointer-events-none">
                <div className="w-[600px] h-[600px] bg-brand-accent rounded-full absolute -top-80 -left-80 blur-3xl animate-subtle-pulse"></div>
                <div className="w-[500px] h-[500px] bg-brand-accent-secondary rounded-full absolute -bottom-80 -right-40 blur-3xl animate-subtle-pulse [animation-delay:2s]"></div>
            </div>
            <div className="relative z-10">
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight animate-gradient-text">
                   Masa Depan Finansial Anda Dimulai di Sini
                </h1>
                <p className="mt-6 text-lg md:text-xl text-brand-text-secondary max-w-3xl mx-auto">
                    Platform Edukasi & Komunitas All-in-One untuk Trader, Investor, dan Pebisnis Generasi Berikutnya.
                </p>
                <div className="mt-10 flex justify-center items-center space-x-4">
                    <Button onClick={onLoginClick} className="!w-auto px-10 !text-lg !py-4">
                        Daftar Gratis Sekarang
                    </Button>
                     <Button onClick={() => document.getElementById('features')?.scrollIntoView()} variant="secondary" className="!w-auto px-10 !text-lg !py-4">
                        Jelajahi Fitur
                    </Button>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <AnimatedSection>
          <section id="features" className="container mx-auto px-6 py-20">
              <h2 className="text-4xl font-bold text-center text-white mb-4">Platform Terpadu untuk Kesuksesan Anda</h2>
              <p className="text-lg text-brand-text-secondary text-center max-w-2xl mx-auto mb-16">
                  Semua yang Anda butuhkan untuk belajar, menganalisa, dan bertumbuh—semua di satu tempat.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map(feature => (
                       <div key={feature.title} className="p-8 bg-brand-secondary/30 backdrop-blur-lg rounded-xl border border-brand-border hover:border-brand-accent hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-brand-accent/20">
                          <div className="text-brand-accent mb-4">{feature.icon}</div>
                          <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                          <p className="text-brand-text-secondary">{feature.desc}</p>
                      </div>
                  ))}
              </div>
          </section>
        </AnimatedSection>
        
        {/* Philosophy/Vision Section */}
        <AnimatedSection className="py-20">
          <section id="philosophy" className="container mx-auto px-6 text-center">
              <div className="max-w-4xl mx-auto">
                 <h2 className="text-base font-semibold tracking-wider text-brand-accent uppercase">Filosofi Kami</h2>
                 <p className="mt-4 text-3xl md:text-4xl font-bold text-white">
                   “Human Minority adalah gerakan untuk mereka yang berani berpikir berbeda, belajar tanpa henti, dan membangun masa depan di atas kemampuan diri sendiri.”
                 </p>
                 <Button onClick={onAboutClick} variant="secondary" className="!w-auto px-8 mt-8">
                    Pelajari Visi & Misi Kami
                </Button>
              </div>
          </section>
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-white mb-12">Apa Kata Mereka?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: 'Trader Pro', quote: 'Materi dan tools di sini sangat membantu mempertajam analisa saya. Komunitasnya juga aktif!' },
                        { name: 'Crypto Enthusiast', quote: 'Akhirnya ada platform lokal yang pembahasannya mendalam soal crypto. Keren!' },
                        { name: 'Pebisnis Muda', quote: 'Sesi networking-nya membuka banyak peluang baru untuk bisnis saya. Sangat direkomendasikan.' },
                    ].map(t => (
                        <div key={t.name} className="bg-brand-secondary/30 backdrop-blur-lg p-6 rounded-xl border border-brand-border">
                            <div className="flex mb-4">{Array(5).fill(0).map((_,i) => <StarIcon key={i} />)}</div>
                            <p className="text-brand-text-secondary italic mb-4">"{t.quote}"</p>
                            <p className="font-semibold text-white">- {t.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
        
        {/* FAQ Section */}
        <AnimatedSection className="py-20">
            <div id="faq" className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-4xl font-bold text-center text-white mb-12">Pertanyaan Umum</h2>
                {faqs.map((faq, i) => (
                    <FaqItem key={i} question={faq.q} answer={faq.a} idx={i} openIdx={openFaq} setOpenIdx={setOpenFaq} />
                ))}
            </div>
        </AnimatedSection>


        {/* Final CTA */}
         <AnimatedSection className="py-24 text-center">
             <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white">Siap Menjadi Bagian dari Minoritas?</h2>
                <p className="text-lg text-brand-text-secondary max-w-2xl mx-auto my-6">Jangan tunda lagi. Ambil langkah pertama menuju kebebasan finansial dan intelektual. Gratis selamanya.</p>
                <Button onClick={onLoginClick} className="!w-auto px-12 py-4 text-xl transform hover:scale-105">
                    Daftar Sekarang, Gratis!
                </Button>
            </div>
         </AnimatedSection>

      </main>

      <footer id="footer" className="bg-black/30 border-t border-brand-border py-12">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <div className="flex justify-center md:justify-start"> <Logo /> </div>
                    <p className="mt-4 text-brand-text-secondary">Chase your dreams, exceed expectations.</p>
                     <div className="flex justify-center md:justify-start space-x-4 mt-6">
                        <a href="#" className="text-brand-text-secondary hover:text-white transition-colors"><TelegramIcon /></a>
                        <a href="#" className="text-brand-text-secondary hover:text-white transition-colors"><DiscordIcon /></a>
                        <a href="#" className="text-brand-text-secondary hover:text-white transition-colors"><TwitterIcon /></a>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Navigasi</h4>
                    <ul className="space-y-2">
                        <li><a href="#features" className="text-brand-text-secondary hover:text-brand-accent">Keunggulan</a></li>
                        <li><a href="#philosophy" className="text-brand-text-secondary hover:text-brand-accent">Filosofi</a></li>
                        <li><a href="#faq" className="text-brand-text-secondary hover:text-brand-accent">FAQ</a></li>
                        <li><button onClick={onLoginClick} className="text-brand-text-secondary hover:text-brand-accent">Login/Register</button></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-white mb-4">Legal</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-brand-text-secondary hover:text-brand-accent">Privacy Policy</a></li>
                        <li><a href="#" className="text-brand-text-secondary hover:text-brand-accent">Terms & Conditions</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 border-t border-brand-border pt-8 text-center text-sm text-brand-text-secondary">
                <p>&copy; {new Date().getFullYear()} Human Minority. All Rights Reserved.</p>
                <p className="mt-2">Disclaimer: Trading mengandung risiko tinggi. Keputusan trading adalah tanggung jawab pribadi. Human Minority hanya menyediakan edukasi dan tools, bukan saran finansial.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};