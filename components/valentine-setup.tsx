'use client';

import React from "react"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FloatingHearts from '@/components/floating-hearts';

interface ValentineSetupProps {
  onStartGame: (myName: string, theirName: string) => void;
}

export default function ValentineSetup({ onStartGame }: ValentineSetupProps) {
  const [myName, setMyName] = useState('');
  const [theirName, setTheirName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (myName.trim() && theirName.trim()) {
      onStartGame(myName, theirName);
    }
  };

  return (
    <div className="relative w-full max-w-md animate-bounce-in z-10">
      <FloatingHearts count={20} />

      <div className="bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-md border-2 border-white/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-pink-50/50 pointer-events-none"></div>

        {/* Decorative hearts at top */}
        <div className="relative flex justify-center gap-4 mb-2">
          <span className="text-4xl animate-float opacity-80">💝</span>
          <span className="text-5xl animate-pulse-heart">💕</span>
          <span className="text-4xl animate-float opacity-80" style={{ animationDelay: '0.5s' }}>
            💝
          </span>
        </div>

        <h1 className="relative text-center text-4xl md:text-5xl font-bold text-primary mb-2 font-pacifico drop-shadow-sm">
          Will You Be
        </h1>
        <p className="relative text-center text-3xl md:text-4xl font-bold text-accent mb-8 font-pacifico drop-shadow-sm">
          My Valentine?
        </p>

        <form onSubmit={handleSubmit} className="relative space-y-6">
          <div className="space-y-2 group">
            <label className="block text-sm font-semibold text-foreground/80 pl-1">Your Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={myName}
              onChange={(e) => setMyName(e.target.value)}
              className="rounded-2xl h-14 text-lg border-2 border-pink-200 bg-white/50 focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all text-center placeholder:text-muted-foreground/50 shadow-sm"
            />
          </div>

          <div className="space-y-2 group">
            <label className="block text-sm font-semibold text-foreground/80 pl-1">Their Name</label>
            <Input
              type="text"
              placeholder="Enter their name"
              value={theirName}
              onChange={(e) => setTheirName(e.target.value)}
              className="rounded-2xl h-14 text-lg border-2 border-pink-200 bg-white/50 focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all text-center placeholder:text-muted-foreground/50 shadow-sm"
            />
          </div>

          <Button
            type="submit"
            disabled={!myName.trim() || !theirName.trim()}
            className="w-full h-14 rounded-2xl text-xl font-bold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg shadow-primary/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 font-pacifico tracking-wide mt-4"
          >
            Create My Game 💕
          </Button>
        </form>

        <p className="relative text-center text-sm text-muted-foreground mt-8 font-medium">
          Create a fun interactive game and share it with your special someone!
        </p>
      </div>
    </div>
  );
}
