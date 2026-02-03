'use client';

import { useEffect, useState } from 'react';

interface Confetti {
  id: string;
  left: number;
  top: number;
  delay: number;
  emoji: string;
}

export default function CelebrationEffects() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    const emojis = ['🎉', '✨', '🎊', '💕', '💖', '🌹', '💐', '⭐'];
    const newConfetti: Confetti[] = Array.from({ length: 30 }).map((_, i) => ({
      id: `confetti-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 0.5,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute text-3xl md:text-5xl animate-celebration"
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            animationDelay: `${c.delay}s`,
          }}
        >
          {c.emoji}
        </div>
      ))}
    </div>
  );
}
