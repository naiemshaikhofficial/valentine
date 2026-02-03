'use client';

import { useEffect, useState } from 'react';

interface FloatingHeartsProps {
  count?: number;
}

interface Heart {
  id: string;
  left: number;
  delay: number;
  duration: number;
  size: string;
  blur: string;
  rotation: number;
}

export default function FloatingHearts({ count = 15 }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts: Heart[] = Array.from({ length: count }).map((_, i) => ({
      id: `heart-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      size: ['text-xl', 'text-2xl', 'text-4xl', 'text-6xl'][Math.floor(Math.random() * 4)],
      blur: ['blur-none', 'blur-sm', 'blur-[1px]'][Math.floor(Math.random() * 3)],
      rotation: Math.random() * 360,
    }));
    setHearts(newHearts);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute ${heart.size} ${heart.blur} animate-float opacity-60`}
          style={{
            left: `${heart.left}%`,
            top: '110%',
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            animationName: Math.random() > 0.5 ? 'float' : 'float-sway',
            transform: `rotate(${heart.rotation}deg)`,
          }}
        >
          {['💕', '💖', '💗', '💝', '💘', '🌸', '✨'][Math.floor(Math.random() * 7)]}
        </div>
      ))}
    </div>
  );
}
