import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { BirthdayConfig } from '../../config';
import { audioController } from '../../utils/audio';

interface BloomingRoseTransitionProps {
  config: BirthdayConfig;
  lang: 'en' | 'hi';
  onComplete: () => void;
}

export const BloomingRoseTransition: React.FC<BloomingRoseTransitionProps> = ({
  config,
  lang,
  onComplete
}) => {
  const t = config.translations[lang].bloom;

  useEffect(() => {
    audioController.playRoseBloomSound();

    const timer = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const innerPetals = [0, 72, 144, 216, 288];
  const midPetals = [36, 108, 180, 252, 324];
  const outerPetals = [18, 90, 162, 234, 306, 378];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-rose-100 select-none overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 0.8, scale: 1.8 }}
        transition={{ duration: 2.8, ease: 'easeOut' }}
        className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-rose-700/25 via-pink-600/20 to-amber-500/15 blur-[120px] pointer-events-none"
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 22 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: '50vw',
              y: '45vh',
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: `${50 + (Math.cos((i * 16.3 * Math.PI) / 180) * (30 + (i % 5) * 8))}%`,
              y: `${45 + (Math.sin((i * 16.3 * Math.PI) / 180) * (25 + (i % 4) * 8))}%`,
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0.4],
            }}
            transition={{
              duration: 2.6,
              delay: 0.4 + (i % 6) * 0.1,
              ease: 'easeOut',
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_12px_#fbbf24]"
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center justify-center text-center px-6">
        
        <div className="relative w-56 h-56 flex items-center justify-center mb-8">
          
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.6, 1.2, 1], opacity: [0, 0.9, 0.7] }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-rose-600/30 blur-2xl"
          />

          <svg className="w-48 h-48 drop-shadow-[0_0_35px_rgba(244,63,94,0.7)]" viewBox="-120 -120 240 240">
            <defs>
              <linearGradient id="roseOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#881337" />
                <stop offset="50%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#fb7185" />
              </linearGradient>
              <linearGradient id="roseMidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9f1239" />
                <stop offset="50%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#fda4af" />
              </linearGradient>
              <linearGradient id="roseCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e11d48" />
                <stop offset="60%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#fff1f2" />
              </linearGradient>
            </defs>

            {outerPetals.map((angle, i) => (
              <motion.path
                key={`outer-${i}`}
                d="M 0,-15 C -45,-55 -65,-10 0,65 C 65,-10 45,-55 0,-15 Z"
                fill="url(#roseOuterGrad)"
                opacity={0.88}
                transform={`rotate(${angle})`}
                initial={{ scale: 0.1, rotate: angle - 45, opacity: 0 }}
                animate={{ scale: 1, rotate: angle, opacity: 0.88 }}
                transition={{
                  duration: 2.2,
                  delay: 0.2 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
              />
            ))}

            {midPetals.map((angle, i) => (
              <motion.path
                key={`mid-${i}`}
                d="M 0,-10 C -35,-42 -45,-8 0,48 C 45,-8 35,-42 0,-10 Z"
                fill="url(#roseMidGrad)"
                opacity={0.94}
                transform={`rotate(${angle})`}
                initial={{ scale: 0.1, rotate: angle - 30, opacity: 0 }}
                animate={{ scale: 0.9, rotate: angle, opacity: 0.94 }}
                transition={{
                  duration: 2.0,
                  delay: 0.5 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1]
                }}
              />
            ))}

            {innerPetals.map((angle, i) => (
              <motion.path
                key={`inner-${i}`}
                d="M 0,-6 C -22,-28 -28,-5 0,32 C 28,-5 22,-28 0,-6 Z"
                fill="url(#roseCoreGrad)"
                transform={`rotate(${angle})`}
                initial={{ scale: 0.05, rotate: angle - 20, opacity: 0 }}
                animate={{ scale: 0.78, rotate: angle, opacity: 1 }}
                transition={{
                  duration: 1.8,
                  delay: 0.8 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1]
                }}
              />
            ))}

            <motion.circle
              cx="0"
              cy="0"
              r="12"
              fill="#ffe4e6"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
              filter="drop-shadow(0 0 10px #fb7185)"
            />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-amber-300 drop-shadow-[0_0_25px_rgba(251,191,36,0.55)] mb-3">
            {t.greeting}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.0 }}
            className="text-rose-200/80 text-sm sm:text-base font-light italic max-w-xs"
          >
            {t.sub}
          </motion.p>
        </motion.div>

      </div>
    </div>
  );
};
