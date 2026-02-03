'use client';

import { useState, useEffect } from 'react';
import ValentineSetup from '@/components/valentine-setup';
import ValentineGame from '@/components/valentine-game';

export default function Home() {
  const [gameState, setGameState] = useState<'setup' | 'game'>('setup');
  const [myName, setMyName] = useState('');
  const [theirName, setTheirName] = useState('');
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');
    const to = params.get('to');

    if (from && to) {
      setMyName(decodeURIComponent(from));
      setTheirName(decodeURIComponent(to));
      setGameState('game');
    }
  }, []);

  const handleStartGame = (from: string, to: string) => {
    setMyName(from);
    setTheirName(to);
    setShareUrl(
      `${typeof window !== 'undefined' ? window.location.origin : ''}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
    );
    setGameState('game');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-200 to-red-100 animate-gradient-bg bg-size-200 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none"></div>
      {gameState === 'setup' ? (
        <ValentineSetup onStartGame={handleStartGame} />
      ) : (
        <ValentineGame myName={myName} theirName={theirName} shareUrl={shareUrl} />
      )}
    </main>
  );
}
