'use client';

import { Linkedin, Instagram, Heart, Mail } from 'lucide-react';

export default function Footer() {
    const socialLinks = [
        { icon: Linkedin, href: 'https://www.linkedin.com/in/tech-trade-enterprises-103189381/', label: 'LinkedIn' },
        { icon: Instagram, href: 'https://www.instagram.com/techtradeenterprises/', label: 'Instagram' },
        { icon: Mail, href: 'mailto:hr@techtradeenterprises.site', label: 'Email' },
    ];

    return (
        <footer className="fixed bottom-0 w-full p-4 z-50 pointer-events-none">
            <div className="container mx-auto flex flex-col items-center justify-center gap-2 pointer-events-auto">
                <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-white/90 backdrop-blur-sm bg-black/40 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(255,0,0,0.2)] border border-red-500/30 hover:bg-black/60 transition-colors">
                    <span>Made By</span>
                    <a
                        href="https://www.techtradeenterprises.site/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-red-500 hover:text-red-400 font-pacifico text-lg transition-colors drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]"
                    >
                        Tech Trade Enterprises
                    </a>
                    <span className="flex items-center gap-1">
                        With <Heart className="w-4 h-4 text-red-600 fill-red-600 animate-pulse-heart filter drop-shadow-[0_0_5px_rgba(255,0,0,1)]" />
                    </span>
                </div>

                <div className="flex gap-4 backdrop-blur-sm bg-black/40 px-6 py-2 rounded-full shadow-[0_0_15px_rgba(255,0,0,0.2)] border border-red-500/30">
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500/80 hover:text-red-500 hover:scale-125 transition-all duration-300 filter hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]"
                            aria-label={social.label}
                        >
                            <social.icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
