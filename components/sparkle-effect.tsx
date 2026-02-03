'use client';

import { useEffect, useState } from 'react';

interface Sparkle {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
}

export default function SparkleEffect() {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        const newSparkles: Sparkle[] = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 4 + Math.random() * 8,
            delay: Math.random() * 3,
        }));
        setSparkles(newSparkles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {sparkles.map((sparkle) => (
                <div
                    key={sparkle.id}
                    className="absolute rounded-full bg-white animate-sparkle"
                    style={{
                        left: `${sparkle.x}%`,
                        top: `${sparkle.y}%`,
                        width: `${sparkle.size}px`,
                        height: `${sparkle.size}px`,
                        animationDelay: `${sparkle.delay}s`,
                        boxShadow: '0 0 10px #fff, 0 0 20px #ff69b4, 0 0 30px #ff1493',
                    }}
                />
            ))}
        </div>
    );
}
