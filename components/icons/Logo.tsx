import React from 'react';

export const Logo: React.FC = () => (
    <div className="flex items-center space-x-2 text-brand-text-primary hover:text-brand-accent transition-colors duration-300">
        <svg
            className="w-10 h-10"
            viewBox="0 0 60 64"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Human Minority Logo"
        >
            <g>
                <path d="M30 13L35 8L40 13L35 18L30 13Z"/>
                <path d="M20 13L25 8L30 13L25 18L20 13Z"/>
                <path d="M25 5L30 0L35 5L30 10L25 5Z"/>
                <path d="M17 18L22 13L22 21L17 26Z"/>
                <path d="M43 18L38 13L38 21L43 26Z"/>
                <path d="M20 23H28V53L24 60L20 53V23Z"/>
                <path d="M40 23H32V53L36 60L40 53V23Z"/>
                <path d="M10 25L20 25L30 45L40 25L50 25L50 55C50 64 46 64 42 57L30 48L18 57C14 64 10 64 10 55V25Z"/>
            </g>
        </svg>
        <span className="font-bold text-xl tracking-wider">
            HUMAN MINORITY
        </span>
    </div>
);