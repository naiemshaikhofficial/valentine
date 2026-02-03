'use client';

import { Facebook, Twitter, Linkedin, Instagram, Heart } from 'lucide-react';

export default function Footer() {
    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Instagram, href: '#', label: 'Instagram' },
    ];

    return (
        <footer className="fixed bottom-0 w-full p-4 z-50 pointer-events-none">
            <div className="container mx-auto flex flex-col items-center justify-center gap-2 pointer-events-auto">
                <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-foreground/80 backdrop-blur-sm bg-white/30 px-4 py-2 rounded-full shadow-sm border border-white/20 hover:bg-white/50 transition-colors">
                    <span>Made By</span>
                    <a
                        href="https://www.techtradeenterprises.site/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-primary hover:text-accent font-pacifico text-lg transition-colors drop-shadow-sm"
                    >
                        Tech Trade Enterprises
                    </a>
                    <span className="flex items-center gap-1">
                        With <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse-heart" />
                    </span>
                </div>

                <div className="flex gap-4 backdrop-blur-sm bg-white/30 px-6 py-2 rounded-full shadow-sm border border-white/20">
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            className="text-foreground/60 hover:text-primary hover:scale-110 transition-all duration-300"
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
