'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Stars } from 'lucide-react';
import FloatingHearts from '@/components/floating-hearts';

interface ValentineSetupProps {
  onStartGame?: (from: string, to: string) => void;
}

export default function ValentineSetup({ onStartGame }: ValentineSetupProps) {
  const [myName, setMyName] = useState('');
  const [theirName, setTheirName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    if (!myName || !theirName) return;

    // Create query params
    const params = new URLSearchParams();
    params.append('from', myName);
    params.append('to', theirName);

    // Update local state for immediate preview if handler provided
    if (onStartGame) {
      // We don't necessarily want to switch view immediately if the goal is to share key
      // But for testing transparency we can just generate link
    }

    const link = `${window.location.origin}?${params.toString()}`;
    setGeneratedLink(link);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
  };

  return (
    <div className="relative w-full max-w-lg z-10 animate-bounce-in">
      <FloatingHearts count={25} />

      <div className="bg-black/40 backdrop-blur-xl rounded-[2.5rem] shadow-[0_0_40px_rgba(180,0,0,0.5)] border border-red-500/30 p-8 md:p-10 text-center relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent pointer-events-none"></div>
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-600/30 blur-[60px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-600/30 blur-[60px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <span className="text-7xl animate-pulse-heart filter drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">❤️</span>
              <Stars className="absolute -top-2 -right-4 text-yellow-400 w-8 h-8 animate-pulse" />
            </div>
          </div>

          {!generatedLink ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 font-pacifico animate-glow">
                Love Game ❤️
              </h1>
              <p className="text-xl text-red-200 font-medium mb-8 font-pacifico opacity-90">
                Someone has a special message for you...
              </p>

              <div className="space-y-5">
                <div className="bg-black/30 p-1 rounded-2xl border border-red-500/20 shadow-inner">
                  <Input
                    placeholder="Your Name"
                    value={myName}
                    onChange={(e) => setMyName(e.target.value)}
                    className="h-12 bg-transparent border-none text-white placeholder:text-red-200/50 text-center text-lg focus-visible:ring-0 focus-visible:ring-offset-0 font-pacifico"
                  />
                </div>

                <div className="bg-black/30 p-1 rounded-2xl border border-red-500/20 shadow-inner">
                  <Input
                    placeholder="Lover's Name"
                    value={theirName}
                    onChange={(e) => setTheirName(e.target.value)}
                    className="h-12 bg-transparent border-none text-white placeholder:text-red-200/50 text-center text-lg focus-visible:ring-0 focus-visible:ring-offset-0 font-pacifico"
                  />
                </div>

                <Button
                  onClick={generateLink}
                  disabled={!myName || !theirName}
                  className="w-full h-14 rounded-2xl text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] transition-all transform hover:scale-[1.02] border border-red-400/30 font-pacifico animate-heartbeat disabled:opacity-50 disabled:animate-none"
                >
                  Generate Love Link 🚀
                </Button>
              </div>
            </>
          ) : (
            <div className="animate-in fade-in zoom-in duration-500">
              <h2 className="text-3xl font-bold text-white mb-6 font-pacifico">
                Link Generated! 💘
              </h2>
              <div className="bg-black/50 p-4 rounded-xl border border-red-500/30 mb-6 break-all shadow-inner">
                <p className="text-red-200 text-sm font-mono">{generatedLink}</p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={copyLink}
                  className="w-full h-12 rounded-xl bg-white text-red-600 hover:bg-red-50 font-bold font-pacifico transition-colors"
                >
                  Copy Link 📋
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent('I made a special game for you! Play here: ' + generatedLink)}`, '_blank')}
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold"
                  >
                    WhatsApp 💬
                  </Button>
                  <Button
                    onClick={() => window.open('https://instagram.com', '_blank')}
                    className="bg-[#E1306C] hover:bg-[#c1275b] text-white rounded-xl font-bold"
                  >
                    Instagram 📸
                  </Button>
                </div>

                {onStartGame && (
                  <Button
                    onClick={() => onStartGame(myName, theirName)}
                    variant="ghost"
                    className="text-red-300 hover:text-white hover:bg-red-900/50 mt-2"
                  >
                    Preview Game ▶️
                  </Button>
                )}

                <p className="text-red-300/60 text-sm mt-4">
                  Share this link with {theirName} and wait for the magic! ✨
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
