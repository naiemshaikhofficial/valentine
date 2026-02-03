'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import FloatingHearts from '@/components/floating-hearts';
import CelebrationEffects from '@/components/celebration-effects';
import TypingText from '@/components/typing-text';
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
  const [shake, setShake] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intro Typing complete state
  const [introTyped, setIntroTyped] = useState(false);

  // Compatibility Animation Effect
  useEffect(() => {
    if (currentStep === 'compatibility') {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 1;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => setCurrentStep('question'), 2000);
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

  const handleNoClick = () => {
    // Alert popup as requested
    alert("Are you sure? Think again 😉");
    handleNoHover(); // Move it again
  };

  const handleYesClick = () => {
    setShake(true);
    setTimeout(() => {
      setCurrentStep('accepted');
    }, 500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  // --- RENDER STEPS ---

  // 1. Intro Step
  if (currentStep === 'intro') {
    return (
      <div className="relative w-full max-w-xl z-10 animate-in fade-in zoom-in-50 duration-700">
        <FloatingHearts count={25} />
        <div className="bg-black/60 rounded-[2.5rem] shadow-[0_0_50px_rgba(255,0,0,0.5)] p-8 md:p-12 backdrop-blur-xl border border-red-500/40 text-center relative overflow-hidden">
          {/* Dark Red Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 to-transparent pointer-events-none"></div>

          <div className="mb-6 animate-bounce">
            <span className="text-6xl md:text-8xl filter drop-shadow-[0_0_20px_rgba(255,0,0,0.8)] inline-block animate-pulse-heart">💌</span>
          </div>

          <h2 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6 font-pacifico drop-shadow-lg leading-relaxed min-h-[80px] md:min-h-[120px] animate-text-glow">
            <TypingText
              text={`${theirName}, someone very special has a question for you...`}
              speed={50}
              onComplete={() => setIntroTyped(true)}
            />
          </h2>

          <div className={`transition-opacity duration-1000 ${introTyped ? 'opacity-100' : 'opacity-0'}`}>
            <Button
              onClick={() => setCurrentStep('compatibility')}
              className="w-full h-12 md:h-14 rounded-2xl text-lg md:text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(255,0,0,0.5)] transition-all transform hover:scale-105 active:scale-95 font-pacifico animate-pulse"
            >
              Open Message 💝
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Compatibility Step
  if (currentStep === 'compatibility') {
    return (
      <div className="relative w-full max-w-xl z-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <FloatingHearts count={30} />
        <div className="bg-black/60 rounded-[2.5rem] shadow-[0_0_50px_rgba(255,0,0,0.5)] p-8 md:p-12 backdrop-blur-xl border border-red-500/40 text-center relative overflow-hidden">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8 font-pacifico animate-text-glow">
            Calculating Love Compatibility...
          </h2>

          <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 md:mb-8 flex items-center justify-center">
            {/* Heart Outline */}
            <Heart className="w-full h-full text-red-900/30 fill-red-900/20 absolute inset-0" />

            {/* Filling Heart */}
            <div className="absolute inset-0 overflow-hidden flex items-end justify-center" style={{ height: `${compatibility}%`, transition: 'height 0.1s ease-out' }}>
              <Heart className="w-32 h-32 md:w-48 md:h-48 text-red-600 fill-red-600 absolute bottom-0 filter drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]" />
            </div>

            {/* Percentage Text */}
            <span className="relative z-10 text-3xl md:text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-pacifico">
              {compatibility}%
            </span>
          </div>

          <p className="text-lg md:text-2xl text-red-200 font-medium min-h-[2rem] font-pacifico animate-pulse">
            {compatibility < 30 && "Measuring vibes..."}
            {compatibility >= 30 && compatibility < 70 && "Heartbeats syncing..."}
            {compatibility >= 70 && compatibility < 100 && "Detecting True Love..."}
            {compatibility === 100 && "100% Match Found! ❤️"}
          </p>
        </div>
      </div>
    );
  }

  // 4. Accepted (Celebration) Step
  if (currentStep === 'accepted') {
    return (
      <div className="relative w-full max-w-2xl z-10 animate-duration-1000 animate-in fade-in zoom-in-50">
        <FloatingHearts count={60} />
        <CelebrationEffects />

        <div className="bg-black/70 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_0_60px_rgba(255,0,0,0.6)] p-5 md:p-10 pb-10 md:pb-14 backdrop-blur-xl border-2 border-red-500/50 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-pink-600/20 pointer-events-none animate-pulse"></div>

          <div className="mb-6 animate-bounce-in relative">
            <span className="text-6xl md:text-8xl inline-block animate-pulse-heart drop-shadow-[0_0_25px_rgba(255,0,0,1)] text-red-500">❤️</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-red-500 mb-4 md:mb-6 font-pacifico drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] pb-2 animate-bounce">
            I LOVE YOU! 💖
          </h1>

          <div className="space-y-4 mb-8 min-h-[150px]">
            <p className="text-xl md:text-2xl text-white/90 font-medium italic font-serif">
              <TypingText
                text={`From the moment I met you... My world changed forever. You are my heart, my peace, my everything. ❤️`}
                speed={50}
                delay={500}
              />
            </p>
          </div>

          <div className="mb-8">
            <span className="inline-block px-6 py-2 rounded-full border border-red-400 bg-red-900/30 text-red-200 font-pacifico text-xl animate-pulse">
              ❤️ Forever Together ❤️
            </span>
          </div>

          {/* Share Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <Button
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent('She said YES! ❤️ ' + shareUrl)}`, '_blank')}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold h-12 shadow-[0_0_15px_rgba(37,211,102,0.4)]"
            >
              Share on WhatsApp 💬
            </Button>
            <Button
              onClick={() => window.open('https://instagram.com', '_blank')}
              className="bg-[#E1306C] hover:bg-[#c1275b] text-white rounded-xl font-bold h-12 shadow-[0_0_15px_rgba(225,48,108,0.4)]"
            >
              Share on Instagram 📸
            </Button>
          </div>

          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full border-red-500/50 text-red-300 hover:bg-red-950 hover:text-white"
          >
            Create Another Game
          </Button>

        </div>
      </div>
    );
  }

  // 3. Question Step (Default)
  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-xl z-10 animate-in fade-in zoom-in-95 duration-500 ${shake ? 'animate-shake' : ''}`}
    >
      <FloatingHearts count={50} />

      <div className="bg-black/60 rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_0_40px_rgba(255,0,0,0.4)] p-5 md:p-12 backdrop-blur-md border border-red-500/30 relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,0,0,0.6)]">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-red-900/20 pointer-events-none"></div>

        <h1 className="relative text-3xl md:text-6xl font-bold text-white text-center mb-8 md:mb-12 font-pacifico drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] leading-tight">
          Will you be my Valentine, <br /> {theirName}? 🌹
        </h1>

        {/* Buttons container */}
        <div className="relative h-36 md:h-48 flex items-center justify-center gap-4 md:gap-8">
          {/* Yes Button */}
          <Button
            onClick={handleYesClick}
            className="absolute left-1/2 -translate-x-1/2 px-8 md:px-12 h-16 md:h-24 text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-[1.5rem] md:rounded-[2rem] transition-all transform hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(34,197,94,0.6)] animate-heartbeat font-pacifico z-20 border-4 border-white/20 hover:rotate-3"
          >
            YES 😍
          </Button>

          {/* No Button - Elusive */}
          <button
            ref={noButtonRef}
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            onClick={handleNoClick}
            className="fixed px-6 h-12 md:h-14 text-base md:text-lg font-bold bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-2xl transition-all duration-200 ease-out z-50 font-pacifico border border-slate-600 hover:rotate-12 hover:scale-75"
            style={{
              left: noButtonPos.x === 0 ? 'auto' : `${noButtonPos.x}px`,
              top: noButtonPos.y === 0 ? 'auto' : `${noButtonPos.y}px`,
              pointerEvents: 'auto',
              transform: noButtonPos.x === 0 && noButtonPos.y === 0 ? 'translateX(120%)' : `rotate(${Math.random() * 360}deg)`,
            }}
          >
            NO 😏
          </button>
        </div>
      </div>
    </div>
  );
}
