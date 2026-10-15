import React from 'react';
import { motion } from 'motion/react';
import { Heart, Headphones, Sparkles } from 'lucide-react';
import { BirthdayConfig } from '../../config';

interface GatewayScreenProps {
  config: BirthdayConfig;
  lang: 'en' | 'hi';
  onOpenSurprise: () => void;
}

export const GatewayScreen: React.FC<GatewayScreenProps> = ({ config, lang, onOpenSurprise }) => {
  const t = config.translations[lang].gateway;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    onOpenSurprise();
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-[#13060f] via-[#0d0309] to-[#080205] text-rose-100 px-6 overflow-hidden select-none">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-rose-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-pink-700/10 blur-[100px] pointer-events-none" />

      <div className="absolute top-6 left-6 text-rose-400/40 text-xs tracking-widest font-mono">
        EST. TODAY
      </div>
      <div className="absolute top-6 right-6 text-rose-400/40 text-xs tracking-widest font-mono">
        {config.recipient.location}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center max-w-sm w-full text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/70 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wider mb-6 shadow-[0_0_20px_rgba(244,63,94,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>{t.badge}</span>
        </motion.div>

        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mb-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-900/60 to-pink-900/40 border border-rose-400/30 flex items-center justify-center shadow-[0_0_40px_rgba(225,29,72,0.3)]">
            <span className="text-4xl">🌹</span>
          </div>
          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 animate-ping opacity-75" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-serif-luxury text-3xl sm:text-4xl text-white font-normal leading-tight mb-4 tracking-tight"
        >
          {t.teaser}
        </motion.h1>

        <div className="flex items-center gap-2 w-28 my-3 text-rose-500/40">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-rose-500/40" />
          <Heart className="w-3.5 h-3.5 text-rose-500/60 fill-rose-500/40" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-rose-500/40" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 w-full"
        >
          <button
            onClick={handleClick}
            className="group relative w-full py-4 px-8 rounded-full overflow-hidden transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 opacity-90 blur-[8px] group-hover:opacity-100 group-hover:blur-[12px] transition-all animate-pulse" />
            
            <div className="relative flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 border border-white/25 py-4 px-8 text-white font-semibold text-base tracking-wide shadow-2xl">
              <span>{t.openButton}</span>
              <Heart className="w-4 h-4 fill-white animate-bounce" />
            </div>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex items-center justify-center gap-1.5 text-xs text-rose-300/60 mt-6 font-light"
        >
          <Headphones className="w-3.5 h-3.5 text-rose-400/80" />
          <span>{t.subtext}</span>
        </motion.p>

      </motion.div>
    </div>
  );
};
