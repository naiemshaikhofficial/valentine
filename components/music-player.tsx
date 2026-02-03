'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Royalty-free romantic music placeholder
    // Using a reliable sample URL or placeholder. 
    // For now using a common placeholder that would work in a demo context. 
    // User can replace with their specific file.
    // Romantic Piano Music from Pixabay (Free)
    const MUSIC_URL = "https://cdn.pixabay.com/audio/2022/02/22/audio_d1718ab41b.mp3";

    useEffect(() => {
        // Auto-play attempt on mount (often blocked by browser policy without interaction)
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.4;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(() => {
                    // Auto-play was prevented
                    setIsPlaying(false);
                });
            }
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50">
            <audio ref={audioRef} src={MUSIC_URL} loop />
            <Button
                onClick={togglePlay}
                variant="outline"
                className="rounded-full w-10 h-10 p-0 bg-white/10 backdrop-blur-md border-red-500/30 text-red-500 hover:bg-black/40 hover:text-red-400 transition-all shadow-[0_0_15px_rgba(255,0,0,0.3)]"
            >
                {isPlaying ? (
                    <Volume2 className="w-5 h-5 animate-pulse" />
                ) : (
                    <VolumeX className="w-5 h-5" />
                )}
            </Button>
        </div>
    );
}
