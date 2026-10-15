import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mail, Heart, Sparkles, ChevronDown, Bookmark } from 'lucide-react';
import { BirthdayConfig } from '../config';

interface SecretLetterAndEnvelopeProps {
  config: BirthdayConfig;
  lang: 'en' | 'hi';
  isUnlocked: boolean;
}

export const SecretLetterAndEnvelope: React.FC<SecretLetterAndEnvelopeProps> = ({
  config,
  lang,
  isUnlocked
}) => {
  const [isCapsuleOpen, setIsCapsuleOpen] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const tLetter = config.translations[lang].letter;
  const tCapsule = config.translations[lang].keepsake;
  const tEnvelope = config.translations[lang].secretEnvelope;
  const tGift = config.translations[lang].giftPhilosophy;

  if (!isUnlocked) {
    return (
      <div className="w-full max-w-lg mx-auto py-12 px-4 text-center">
        <div className="glass-panel p-8 rounded-3xl border border-rose-500/20 flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-rose-950/70 border border-rose-500/40 flex items-center justify-center text-rose-300">
            <Lock className="w-5 h-5 text-rose-400" />
          </div>
          <h3 className="font-serif-luxury text-xl text-rose-100">
            {lang === 'en' ? 'Secret Letters & Memories Locked' : 'गोपनीय खत और यादें लॉक हैं'}
          </h3>
          <p className="text-xs text-rose-300/70 max-w-xs">
            {lang === 'en'
              ? 'Complete the 3 cake ritual steps above (Make a wish, blow the candles, and slice the cake) to unseal this section!'
              : 'ऊपर केक की 3 रस्मों को पूरा करें (दुआ मांगें, मोमबत्ती बुझाएं और केक काटें) ताकि ये खास खत खुल सके!'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto py-8 px-4 flex flex-col gap-14">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-amber-300/30"
        style={{
          background: 'linear-gradient(135deg, #1c1014 0%, #29121d 50%, #1a0b12 100%)',
        }}
      >
        <div className="absolute inset-1.5 rounded-[22px] border border-amber-400/25 pointer-events-none" />
        <div className="absolute inset-3 rounded-[18px] border border-dashed border-amber-400/15 pointer-events-none" />

        <div className="relative p-7 sm:p-9 text-rose-100">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-rose-500/20">
            <div className="flex items-center gap-2">
              <span className="text-xs tracking-widest uppercase font-mono text-amber-300/90 font-semibold">
                {tLetter.tag}
              </span>
            </div>
            
            <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-rose-800 to-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.6)] border border-amber-400/50">
              <span className="text-white font-serif font-bold text-sm">🌹</span>
            </div>
          </div>

          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-100 mb-6 text-glow-gold">
            {tLetter.title}
          </h3>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-rose-100/90 font-light font-serif-luxury">
            <p className="font-semibold text-amber-200 text-lg">
              {tLetter.salutation}
            </p>
            {tLetter.paragraphs.map((p, idx) => (
              <p key={idx} className="indent-4 leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-rose-500/20 flex flex-col items-end text-right">
            <p className="text-xs text-rose-300/70 italic font-serif-luxury">
              {tLetter.signOff}
            </p>
            <p className="font-script-love text-2xl sm:text-3xl text-amber-200 mt-1">
              {config.sender.name}
            </p>
            <span className="text-[10px] text-rose-400/60 font-mono tracking-wider mt-0.5">
              {config.sender.location}
            </span>
          </div>

        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel-elevated rounded-3xl p-6 sm:p-7 border border-rose-500/25"
      >
        <div className="flex items-center gap-2 mb-2 text-rose-400 text-xs font-mono uppercase tracking-wider">
          <Bookmark className="w-3.5 h-3.5 text-rose-400" />
          <span>{tCapsule.tag}</span>
        </div>

        <h3 className="font-serif-luxury text-2xl font-bold text-white mb-2">
          {tCapsule.title}
        </h3>

        <button
          onClick={() => setIsCapsuleOpen(!isCapsuleOpen)}
          className="w-full mt-3 py-3 px-4 rounded-2xl bg-rose-950/60 hover:bg-rose-900/40 border border-rose-500/30 flex items-center justify-between text-xs text-rose-200 font-medium transition-all cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            {tCapsule.clickToOpen}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-rose-300 transition-transform duration-300 ${isCapsuleOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {isCapsuleOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-5 rounded-2xl bg-black/40 border border-rose-400/20 text-sm text-rose-100/90 leading-relaxed font-light italic">
                "{tCapsule.memoryText}"
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center"
      >
        <div className="flex items-center gap-2 mb-2 text-rose-400 text-xs font-mono uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5 text-rose-400" />
          <span>{tEnvelope.tag}</span>
        </div>

        <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-3">
          {tEnvelope.title}
        </h3>

        <p className="text-xs text-rose-300/70 mb-6">
          {tEnvelope.tapToReveal}
        </p>

        <div
          onClick={() => setIsEnvelopeOpen(!isEnvelopeOpen)}
          className="relative w-72 sm:w-80 h-44 rounded-2xl bg-gradient-to-tr from-rose-950 via-rose-900 to-pink-950 border border-rose-500/40 shadow-2xl flex items-center justify-center cursor-pointer transition-transform hover:scale-[1.02] active:scale-98 overflow-hidden select-none"
        >
          <div
            className={`absolute top-0 inset-x-0 h-20 origin-top transition-all duration-500 z-20 ${
              isEnvelopeOpen
                ? '-scale-y-100 bg-rose-950/90 border-b border-rose-500/40'
                : 'bg-gradient-to-b from-rose-900 to-rose-950 border-b border-rose-500/30'
            }`}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />

          {!isEnvelopeOpen ? (
            <div className="absolute top-14 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-rose-700 to-pink-600 border border-amber-300/60 shadow-lg text-white text-xs">
              ❤️
            </div>
          ) : null}

          <AnimatePresence>
            {isEnvelopeOpen ? (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 p-5 mx-4 my-2 rounded-xl bg-amber-50/95 text-stone-900 shadow-2xl border border-amber-200"
              >
                <p className="font-script-love text-base sm:text-lg leading-snug text-stone-900">
                  {tEnvelope.innerNote}
                </p>
                <p className="font-script-love text-right text-lg text-rose-800 font-bold mt-2">
                  {tEnvelope.signature}
                </p>
              </motion.div>
            ) : (
              <span className="text-xs text-rose-200/80 font-medium">
                Tap to unseal 💌
              </span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/20 text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2 text-rose-400 text-xs font-mono uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>{tGift.tag}</span>
        </div>

        <h3 className="font-serif-luxury text-2xl font-bold text-white mb-3">
          {tGift.title}
        </h3>

        <p className="text-sm text-rose-100/80 leading-relaxed font-light">
          {tGift.text}
        </p>

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-rose-300 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Crafted with love for Purvi 🌹</span>
        </div>
      </motion.div>

    </div>
  );
};
