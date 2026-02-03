'use client';

import { Linkedin, Instagram, Heart, Mail } from 'lucide-react';

export default function Footer() {
    const socialLinks = [
        { icon: Linkedin, href: 'https://www.linkedin.com/in/tech-trade-enterprises-103189381/', label: 'LinkedIn' },
        { icon: Instagram, href: 'https://www.instagram.com/techtradeenterprises/', label: 'Instagram' },
        { icon: Mail, href: 'mailto:hr@techtradeenterprises.site', label: 'Email' },
    ];

    return (
        <footer className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className="flex flex-col items-center justify-center gap-1 pointer-events-auto">
                <div className="flex items-center justify-center gap-1.5 text-[10px] md:text-xs font-medium text-white/80 backdrop-blur-md bg-black/50 px-2.5 py-1 rounded-full border border-red-500/20">
                    <span>Made By</span>
                    <a
                        href="https://www.techtradeenterprises.site/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-red-400 hover:text-red-300 font-pacifico text-xs md:text-sm transition-colors"
                    >
                        Tech Trade Enterprises
                    </a>
                    <span className="flex items-center gap-0.5">
                        With <Heart className="w-2.5 h-2.5 text-red-500 fill-red-500" />
                    </span>
                </div>

                <div className="flex gap-2 backdrop-blur-md bg-black/50 px-3 py-1 rounded-full border border-red-500/20">
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400/70 hover:text-red-400 hover:scale-110 transition-all duration-300"
                            aria-label={social.label}
                        >
                            <social.icon className="w-3.5 h-3.5" />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
