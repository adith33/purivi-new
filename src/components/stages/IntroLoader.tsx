import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { BirthdayConfig } from '../../config';

interface IntroLoaderProps {
  config: BirthdayConfig;
  lang: 'en' | 'hi';
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ config, lang, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const t = config.translations[lang].loader;

  const messages = [t.status1, t.status2, t.status3];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        const increment = Math.max(1, Math.floor((100 - prev) * 0.12));
        return Math.min(100, prev + increment);
      });
    }, 110);

    return () => clearInterval(timer);
  }, [onComplete]);

  const activeMessageIndex = Math.min(
    messages.length - 1,
    Math.floor((progress / 100) * messages.length)
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0409] text-rose-100 px-6 select-none overflow-hidden">
      <div className="absolute w-80 h-80 rounded-full bg-rose-600/10 blur-[100px] pointer-events-none" />

      <div className="relative flex flex-col items-center max-w-xs w-full text-center">
        
        <motion.div
          animate={{
            scale: [1, 1.14, 1],
            rotate: [0, 4, -4, 0],
            filter: [
              'drop-shadow(0 0 20px rgba(244,63,94,0.5))',
              'drop-shadow(0 0 40px rgba(225,29,72,0.85))',
              'drop-shadow(0 0 20px rgba(244,63,94,0.5))',
            ]
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-24 h-24 mb-8 flex items-center justify-center rounded-full bg-gradient-to-tr from-rose-950/80 to-rose-900/40 border border-rose-500/30"
        >
          <span className="text-5xl select-none" role="img" aria-label="Blooming Rose">
            🌹
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-semibold tracking-[0.25em] text-rose-300/80 uppercase mb-3"
        >
          {config.recipient.name}
        </motion.h2>

        <div className="h-10 mb-8 flex items-center justify-center px-4">
          <motion.p
            key={activeMessageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-sm text-rose-200/90 font-light italic"
          >
            {messages[activeMessageIndex]}
          </motion.p>
        </div>

        <div className="w-full bg-rose-950/70 h-1.5 rounded-full overflow-hidden border border-rose-500/20 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-600 via-pink-500 to-rose-400 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
          />
        </div>

        <div className="flex items-center justify-between w-full mt-3 text-[11px] text-rose-400/70 font-mono">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-rose-400" />
            Loading Magic
          </span>
          <span>{progress}%</span>
        </div>

      </div>
    </div>
  );
};
