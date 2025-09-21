import React from 'react';

export const HeroGraphIcon: React.FC = () => (
    <svg width="100%" height="100%" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#6B46C1', stopOpacity: 0.5}} />
                <stop offset="100%" style={{stopColor: '#D92546', stopOpacity: 0.5}} />
            </linearGradient>
        </defs>
        <path d="M0,250 C150,150 250,150 400,250 C550,350 650,350 800,250 C950,150 1050,150 1200,250 C1350,350 1440,350 1440,350" stroke="url(#grad1)" fill="none" strokeWidth="2" />
        <path d="M0,300 C200,400 300,400 450,300 C600,200 700,200 850,300 C1000,400 1100,400 1250,300 C1400,200 1440,200 1440,200" stroke="url(#grad1)" fill="none" strokeWidth="1" strokeDasharray="5" />
    </svg>
);