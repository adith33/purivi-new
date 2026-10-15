import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Wind, Scissors, CheckCircle, Unlock } from 'lucide-react';
import { BirthdayConfig } from '../config';
import { audioController } from '../utils/audio';
import { Realistic3DCake } from './Realistic3DCake';

interface InteractiveCakeProps {
  config: BirthdayConfig;
  lang: 'en' | 'hi';
  isCakeCut: boolean;
  onCakeCutSuccess: () => void;
}

export const InteractiveCake: React.FC<InteractiveCakeProps> = ({
  config,
  lang,
  isCakeCut,
  onCakeCutSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(isCakeCut ? 4 : 1);
  const [isWishing, setIsWishing] = useState<boolean>(false);
  const [areCandlesBlown, setAreCandlesBlown] = useState<boolean>(isCakeCut);
  const [knifeCutting, setKnifeCutting] = useState<boolean>(false);
  const [isSliced, setIsSliced] = useState<boolean>(isCakeCut);

  const t = config.translations[lang].cake;

  const handleMakeWish = () => {
    setIsWishing(true);
    audioController.playWishChimeSound();
    setTimeout(() => {
      setIsWishing(false);
      setStep(2);
    }, 2000);
  };

  const handleBlowCandles = () => {
    audioController.playCandleBlowSound();
    setAreCandlesBlown(true);
    setTimeout(() => {
      setStep(3);
    }, 1400);
  };

  const handleCutCake = () => {
    setKnifeCutting(true);
    audioController.playCakeSliceSound();

    setTimeout(() => {
      setKnifeCutting(false);
      setIsSliced(true);
      setStep(4);
      onCakeCutSuccess();

      audioController.playConfettiPopSound();

      // Dual confetti bursts
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#f43f5e', '#fb7185', '#fbbf24', '#ffffff', '#e11d48']
      });

      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#f43f5e', '#fb7185', '#fbbf24', '#ffffff', '#e11d48']
      });

      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { x: 0.5, y: 0.5 },
          shapes: ['circle', 'square'],
          colors: ['#fbbf24', '#f43f5e', '#fda4af', '#f59e0b', '#ffffff']
        });
      }, 400);
    }, 1200);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto py-8 px-4 flex flex-col items-center text-center">
      
      {/* Teaser Header */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs uppercase tracking-widest text-rose-400 font-semibold mb-2"
      >
        {t.teaser}
      </motion.p>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-3 text-glow-rose"
      >
        {t.title}
      </motion.h2>

      <p className="text-sm text-rose-200/70 font-light max-w-sm mb-6">
        {t.subtitle}
      </p>

      {/* REALISTIC 3D BIRTHDAY CAKE CONTAINER (INSTRUCTION 12) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-sm rounded-3xl glass-panel-elevated border border-rose-500/30 p-2 shadow-2xl overflow-hidden flex flex-col items-center"
      >
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-rose-600/15 blur-3xl pointer-events-none" />

        {/* 3D Realistic Canvas Component */}
        <Realistic3DCake
          areCandlesBlown={areCandlesBlown}
          knifeCutting={knifeCutting}
          isSliced={isSliced}
          recipientName={config.recipient.name}
        />

        {/* Stage Status Pill */}
        <div className="mb-3 px-4 py-1.5 rounded-full bg-black/60 border border-rose-400/30 text-xs text-rose-200 font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>
            {step === 1 && 'Step 1: Make your birthday wish'}
            {step === 2 && 'Step 2: Blow out your candles'}
            {step === 3 && 'Step 3: Slice your cake'}
            {step === 4 && '🎂 Ritual Complete! Love Letters Unlocked'}
          </span>
        </div>
      </motion.div>

      {/* INTERACTIVE ACTION BUTTONS */}
      <div className="mt-6 w-full max-w-sm">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl glass-panel border border-amber-500/30"
          >
            <p className="text-xs text-amber-200 font-medium leading-relaxed">
              {t.wishStepPrompt}
            </p>
            <button
              onClick={handleMakeWish}
              disabled={isWishing}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-stone-900" />
              <span>{isWishing ? 'Holding your wish in the stars... ✨' : t.wishStepButton}</span>
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl glass-panel border border-rose-500/30"
          >
            <p className="text-xs text-rose-200 font-medium leading-relaxed">
              {t.blowStepPrompt}
            </p>
            <button
              onClick={handleBlowCandles}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Wind className="w-4 h-4 text-white" />
              <span>{t.blowStepButton}</span>
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl glass-panel border border-rose-500/40"
          >
            <p className="text-xs text-rose-200 font-medium leading-relaxed">
              {t.cutStepPrompt}
            </p>
            <button
              onClick={handleCutCake}
              disabled={knifeCutting}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white font-bold text-xs tracking-wider uppercase shadow-[0_0_30px_rgba(225,29,72,0.6)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Scissors className="w-4 h-4 text-white" />
              <span>{knifeCutting ? 'Slicing with love... 🍰' : t.cutStepButton}</span>
            </button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/90 to-pink-950/90 border border-rose-400/50 shadow-2xl flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs tracking-wide">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{t.unlockedMessage}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-mono">
              <Unlock className="w-3.5 h-3.5 text-amber-300" />
              <span>Personal Letter & Memory Capsules UNLOCKED ↓</span>
            </div>
          </motion.div>
        )}

      </div>

    </div>
  );
};
