import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Plane, Train, Car, Navigation, Sparkles, MapPin, Compass, ShieldCheck } from 'lucide-react';
import { BirthdayConfig } from '../config';

interface LongDistanceMapProps {
  config: BirthdayConfig;
  lang: 'en' | 'hi';
}

export const LongDistanceMap: React.FC<LongDistanceMapProps> = ({ config, lang }) => {
  const [activeTab, setActiveTab] = useState<'flight' | 'rail' | 'road'>('flight');
  const t = config.translations[lang].distanceSection;

  return (
    <div className="relative w-full max-w-xl mx-auto py-8">
      
      {/* Top Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/70 border border-rose-500/30 text-rose-300 text-xs font-mono uppercase tracking-widest mb-3 font-semibold shadow-sm"
        >
          <Compass className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
          <span>{t.tag}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white mb-2 text-glow-rose"
        >
          {t.title}
        </motion.h2>

        <p className="text-xs sm:text-sm text-rose-200/80 max-w-md mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Main Glass Card containing the interactive map visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl glass-panel-elevated border border-rose-500/30 p-5 sm:p-7 shadow-2xl overflow-hidden"
      >
        {/* Ambient background glows */}
        <div className="absolute top-1/4 right-1/4 w-44 h-44 rounded-full bg-rose-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-44 h-44 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        {/* Map Visualization Container */}
        <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-[#12050e]/90 border border-rose-500/20 overflow-hidden flex flex-col justify-between p-4 select-none">
          
          {/* Subtle Grid and India Landmass Contour SVG */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="distance-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(244,63,94,0.3)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#distance-grid)" />
            {/* Soft India Silhouette Impression */}
            <path
              d="M 120 40 Q 180 30 260 50 Q 340 70 320 130 Q 300 200 280 260 Q 230 330 210 380 Q 180 340 160 280 Q 120 220 100 160 Q 90 90 120 40 Z"
              fill="rgba(225,29,72,0.04)"
              stroke="rgba(244,63,94,0.15)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Animated Connecting Flight Curve with Traveling Heart */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 400 360"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fb7185" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8" />
              </linearGradient>

              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing background arc */}
            <path
              d="M 130 300 Q 190 170 270 70"
              fill="none"
              stroke="rgba(244,63,94,0.25)"
              strokeWidth="6"
              filter="url(#glow)"
            />

            {/* Animated dashed trajectory arc */}
            <path
              d="M 130 300 Q 190 170 270 70"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="animate-dash"
            />

            {/* Traveling Heart along the route */}
            <motion.g
              animate={{
                offsetDistance: ['0%', '100%'],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                offsetPath: "path('M 130 300 Q 190 170 270 70')",
              }}
            >
              <circle r="7" fill="#fb7185" filter="url(#glow)" />
              <circle r="3.5" fill="#ffffff" />
            </motion.g>
          </svg>

          {/* NORTH MARKER: PURVI ❤️ UTTAR PRADESH */}
          <div className="absolute top-6 right-6 sm:right-12 z-20 flex flex-col items-end">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative group cursor-pointer"
            >
              {/* Radar pulse rings */}
              <span className="absolute -inset-2 rounded-full bg-rose-500/30 animate-ping opacity-75" />
              <span className="absolute -inset-3.5 rounded-full bg-rose-600/20 animate-pulse" />

              {/* Marker Badge */}
              <div className="relative px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-900 to-pink-900 border border-rose-400/70 shadow-[0_0_20px_rgba(244,63,94,0.6)] flex items-center gap-2">
                <span className="text-sm">🌹</span>
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  {t.recipientLabel}
                </span>
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              </div>
            </motion.div>

            <span className="mt-1 text-[11px] font-mono text-rose-300/80 tracking-wider bg-black/60 px-2 py-0.5 rounded-md border border-rose-500/20">
              {t.recipientRegion}
            </span>
          </div>

          {/* SOUTH MARKER: RAHUL ❤️ KERALA */}
          <div className="absolute bottom-6 left-5 sm:left-10 z-20 flex flex-col items-start">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative group cursor-pointer"
            >
              {/* Radar pulse rings */}
              <span className="absolute -inset-2 rounded-full bg-amber-500/30 animate-ping opacity-75" />
              <span className="absolute -inset-3.5 rounded-full bg-amber-600/20 animate-pulse" />

              {/* Marker Badge */}
              <div className="relative px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-950 to-rose-950 border border-amber-400/70 shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  {t.senderLabel}
                </span>
                <span className="text-sm">🌴</span>
              </div>
            </motion.div>

            <span className="mt-1 text-[11px] font-mono text-amber-300/80 tracking-wider bg-black/60 px-2 py-0.5 rounded-md border border-amber-500/20">
              {t.senderRegion}
            </span>
          </div>

          {/* Center Floating Distance Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-center">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-rose-400/40 shadow-xl flex items-center gap-1.5 text-xs text-rose-200"
            >
              <Navigation className="w-3.5 h-3.5 text-rose-400 rotate-45" />
              <span className="font-bold text-white tracking-wide">~1,980 km</span>
              <span className="text-[10px] text-rose-300/70 font-mono">(Straight-line)</span>
            </motion.div>
          </div>

          {/* Little floating hearts */}
          <motion.div
            animate={{ y: [-10, -40], opacity: [0, 0.9, 0], scale: [0.7, 1.1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-28 left-36 text-xs text-pink-400 pointer-events-none"
          >
            ❤️
          </motion.div>
          <motion.div
            animate={{ y: [-10, -35], opacity: [0, 0.8, 0], scale: [0.6, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 1.8 }}
            className="absolute top-36 right-32 text-xs text-rose-300 pointer-events-none"
          >
            💖
          </motion.div>

        </div>

        {/* Transport Mode Switcher Tabs */}
        <div className="mt-6 flex items-center justify-center gap-2 p-1 rounded-2xl bg-black/50 border border-rose-500/20">
          <button
            onClick={() => setActiveTab('flight')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'flight'
                ? 'bg-rose-950 border border-rose-400/60 text-white shadow-md'
                : 'text-rose-300/70 hover:text-white'
            }`}
          >
            <Plane className="w-3.5 h-3.5 text-rose-400" />
            <span>Flight</span>
          </button>
          <button
            onClick={() => setActiveTab('rail')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'rail'
                ? 'bg-rose-950 border border-rose-400/60 text-white shadow-md'
                : 'text-rose-300/70 hover:text-white'
            }`}
          >
            <Train className="w-3.5 h-3.5 text-amber-400" />
            <span>Express Rail</span>
          </button>
          <button
            onClick={() => setActiveTab('road')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'road'
                ? 'bg-rose-950 border border-rose-400/60 text-white shadow-md'
                : 'text-rose-300/70 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5 text-pink-400" />
            <span>Highway Road</span>
          </button>
        </div>

        {/* Detailed Stats Breakdown for the selected transport mode */}
        <div className="mt-4 p-4 rounded-2xl bg-black/40 border border-rose-500/20">
          {activeTab === 'flight' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400/80 block">
                  Straight-Line Aerial Distance
                </span>
                <span className="text-base sm:text-lg font-bold text-white">
                  {t.stats.aerial}
                </span>
              </div>
              <div className="sm:border-l sm:border-rose-500/20 sm:pl-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400/80 block">
                  Estimated Air Duration
                </span>
                <span className="text-sm font-semibold text-amber-300">
                  {t.stats.flight}
                </span>
              </div>
            </div>
          )}

          {activeTab === 'rail' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/80 block">
                  Indian Railways Route Distance
                </span>
                <span className="text-base sm:text-lg font-bold text-white">
                  {t.stats.rail}
                </span>
              </div>
              <div className="sm:border-l sm:border-rose-500/20 sm:pl-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/80 block">
                  Express Rail Duration
                </span>
                <span className="text-sm font-semibold text-rose-300">
                  ~40 - 44 hours (Raptisagar / Kerala Express route)
                </span>
              </div>
            </div>
          )}

          {activeTab === 'road' && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-pink-400/80 block">
                  National Highway Driving Distance
                </span>
                <span className="text-base sm:text-lg font-bold text-white">
                  {t.stats.road}
                </span>
              </div>
              <div className="sm:border-l sm:border-rose-500/20 sm:pl-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-pink-400/80 block">
                  Continuous Road Travel
                </span>
                <span className="text-sm font-semibold text-amber-200">
                  ~45+ hours (Via NH 44 / NH 27 corridors)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Transparent Disclaimer & Representative Hub Note */}
        <p className="mt-3 text-[11px] text-rose-300/60 text-center font-mono italic">
          {t.approxNote}
        </p>

        {/* ROMANTIC CAPTION (Requirement from prompt) */}
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-tr from-rose-950/80 via-pink-950/50 to-rose-950/80 border border-rose-400/40 shadow-inner text-center relative overflow-hidden">
          <div className="absolute top-2 left-3 text-2xl text-rose-500/20 font-serif">“</div>
          <p className="font-serif-luxury text-base sm:text-lg text-rose-100 font-medium italic leading-relaxed px-2">
            "{t.caption}"
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-rose-300/80 font-mono">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
            <span>Rahul & Purvi • Forever Dreaming Together</span>
          </div>
        </div>

      </motion.div>

    </div>
  );
};
