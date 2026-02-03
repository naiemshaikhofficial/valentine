'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import FloatingHearts from '@/components/floating-hearts';
import CelebrationEffects from '@/components/celebration-effects';
import { Heart } from 'lucide-react';

interface ValentineGameProps {
  myName: string;
  theirName: string;
  shareUrl: string;
}

type GameStep = 'intro' | 'compatibility' | 'question' | 'accepted';

export default function ValentineGame({ myName, theirName, shareUrl }: ValentineGameProps) {
  const [currentStep, setCurrentStep] = useState<GameStep>('intro');
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [compatibility, setCompatibility] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Compatibility Animation Effect
  useEffect(() => {
    if (currentStep === 'compatibility') {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 1;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => setCurrentStep('question'), 2000); // Wait 2s after 100%
        }
        setCompatibility(progress);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const handleNoHover = () => {
    if (!noButtonRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = noButtonRef.current.getBoundingClientRect();

    const maxX = containerRect.width - buttonRect.width - 40;
    const maxY = containerRect.height - buttonRect.height - 40;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    setNoButtonPos({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    setCurrentStep('accepted');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  // --- RENDER STEPS ---

  // 1. Intro Step
  if (currentStep === 'intro') {
    return (
      <div className="relative w-full max-w-xl z-10 animate-in fade-in zoom-in-50 duration-700">
        <FloatingHearts count={20} />
        <div className="bg-white/90 rounded-[2.5rem] shadow-2xl p-8 md:p-12 backdrop-blur-md border-4 border-pink-200 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-50/50 to-white/50 pointer-events-none"></div>

          <div className="mb-6 animate-float">
            <span className="text-8xl">💌</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-pacifico drop-shadow-sm">
            A Special Message
          </h1>
          <p className="text-2xl md:text-3xl text-accent font-medium mb-8 font-pacifico">
            For {theirName}
          </p>

          <Button
            onClick={() => setCurrentStep('compatibility')}
            className="w-full h-14 rounded-2xl text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg transition-transform hover:scale-105 font-pacifico"
          >
            Open Message 💝
          </Button>
        </div>
      </div>
    );
  }

  // 2. Compatibility Step
  if (currentStep === 'compatibility') {
    return (
      <div className="relative w-full max-w-xl z-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <FloatingHearts count={30} />
        <div className="bg-white/90 rounded-[2.5rem] shadow-2xl p-8 md:p-12 backdrop-blur-md border-4 border-pink-300 text-center relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 font-pacifico animate-pulse">
            Analyzing Love Compatibility...
          </h2>

          <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
            {/* Heart Outline/Background */}
            <Heart className="w-full h-full text-pink-100 fill-pink-100 absolute inset-0" />

            {/* Filling Heart */}
            <div className="absolute inset-0 overflow-hidden flex items-end justify-center" style={{ height: `${compatibility}%`, transition: 'height 0.1s ease-out' }}>
              <Heart className="w-48 h-48 text-red-500 fill-red-500 absolute bottom-0" />
            </div>

            {/* Percentage Text */}
            <span className="relative z-10 text-4xl font-bold text-white drop-shadow-md font-pacifico">
              {compatibility}%
            </span>
          </div>

          <p className="text-2xl text-accent font-medium min-h-[2rem] font-pacifico">
            {compatibility < 30 && "Measuring vibes..."}
            {compatibility >= 30 && compatibility < 70 && "Heartbeats syncing..."}
            {compatibility >= 70 && compatibility < 100 && "Calculating pure love..."}
            {compatibility === 100 && "It's a Perfect Match! 💘"}
          </p>
        </div>
      </div>
    );
  }

  // 4. Accepted (Celebration) Step
  if (currentStep === 'accepted') {
    return (
      <div className="relative w-full max-w-2xl z-10 animate-duration-1000 animate-in fade-in zoom-in-50">
        <FloatingHearts count={50} />
        <CelebrationEffects />

        <div className="bg-white/90 rounded-[2rem] shadow-2xl p-8 md:p-12 backdrop-blur-xl border-4 border-red-400 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-200/50 to-pink-200/50 pointer-events-none animate-pulse"></div>

          <div className="mb-8 animate-bounce-in relative">
            <span className="text-9xl inline-block animate-pulse-heart drop-shadow-lg text-red-600">❤️</span>
            <span className="absolute top-0 right-1/4 text-6xl animate-float opacity-80">🌹</span>
            <span className="absolute bottom-0 left-1/4 text-6xl animate-float opacity-80" style={{ animationDelay: '1s' }}>💋</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-6 font-pacifico drop-shadow-md pb-2 animate-bounce">
            I Love You! 💖
          </h1>

          <p className="text-3xl md:text-5xl text-rose-600 font-bold mb-6 font-pacifico drop-shadow-sm">
            {theirName}, you are my everything!
          </p>

          <div className="space-y-4 mb-10">
            <p className="text-xl md:text-2xl text-foreground/80 font-medium italic">
              "Every moment with you is a blessing."
            </p>
            <p className="text-xl md:text-2xl text-foreground/80 font-medium italic">
              "My heart beats only for you."
            </p>
            <p className="text-xl md:text-2xl text-foreground/80 font-medium italic">
              "Forever and always, I am yours."
            </p>
          </div>

          <div className="mb-8 space-y-4 bg-red-50/80 p-6 rounded-2xl border border-red-200">
            <p className="text-foreground font-semibold">Share our love story:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-3 rounded-xl bg-white border-2 border-red-200 text-sm text-foreground focus:outline-none focus:border-red-400 transition-colors"
                title="Share URL"
              />
              <Button
                onClick={handleCopy}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 transition-all hover:scale-105"
              >
                Copy Link 📋
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => {
                window.location.href = '/';
              }}
              className="w-full h-14 rounded-2xl text-xl font-bold bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white transition-all transform hover:scale-[1.02] shadow-lg font-pacifico"
            >
              Create Another 💝
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Question Step (Default)
  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-xl z-10 animate-in fade-in zoom-in-95 duration-500"
    >
      <FloatingHearts count={25} />

      <div className="bg-white/90 rounded-[2.5rem] shadow-2xl p-8 md:p-12 backdrop-blur-md border-2 border-white/50 relative overflow-hidden transition-all duration-500 hover:shadow-primary/20">
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-pink-50/60 pointer-events-none"></div>

        {/* Decorative hearts */}
        <div className="relative flex justify-center gap-4 mb-8">
          <span className="text-6xl animate-float drop-shadow-sm">💝</span>
          <span className="text-7xl animate-pulse-heart drop-shadow-md">💗</span>
          <span className="text-6xl animate-float drop-shadow-sm" style={{ animationDelay: '0.5s' }}>
            💝
          </span>
        </div>

        <h1 className="relative text-5xl md:text-6xl font-bold text-primary text-center mb-4 font-pacifico drop-shadow-sm pb-2">
          {myName} asks:
        </h1>

        <p className="relative text-3xl md:text-4xl font-bold text-accent text-center mb-16 font-pacifico drop-shadow-sm leading-relaxed">
          Will you be my Valentine, <br /> {theirName}?
        </p>

        {/* Buttons container */}
        <div className="relative h-40 flex items-center justify-center gap-6 md:gap-8">
          {/* Yes Button */}
          <Button
            onClick={handleYesClick}
            className="absolute left-1/2 -translate-x-1/2 px-10 h-16 md:h-20 text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-3xl transition-all transform hover:scale-110 active:scale-95 shadow-xl shadow-green-500/30 animate-heartbeat font-pacifico z-20 border-4 border-white/20"
          >
            Yes! 💕
          </Button>

          {/* No Button - Elusive */}
          <button
            ref={noButtonRef}
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            className="fixed px-6 h-12 md:h-14 text-base md:text-lg font-bold bg-slate-200 hover:bg-slate-300 text-slate-500 rounded-2xl transition-all duration-300 ease-out cursor-not-allowed opacity-80 z-10 font-pacifico"
            style={{
              left: noButtonPos.x === 0 ? 'auto' : `${noButtonPos.x}px`,
              top: noButtonPos.y === 0 ? 'auto' : `${noButtonPos.y}px`,
              pointerEvents: noButtonPos.x === 0 ? 'auto' : 'auto', // Keep clickable but moves
              transform: noButtonPos.x === 0 && noButtonPos.y === 0 ? 'translateX(120%)' : 'none', // Initial position to the right
            }}
          >
            No 😭
          </button>
        </div>

        <p className="relative text-center text-sm text-muted-foreground mt-8 italic">
          *The No button is playing hard to get... 😉
        </p>
      </div>
    </div>
  );
}
