import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronDown,
  Plane,
  Compass,
  MessageCircleHeart,
  ShieldCheck,
  Gift,
  Star,
  RotateCcw,
  SlidersHorizontal,
  CheckCircle2,
  Play,
  Heart,
  Landmark,
  HeartHandshake,
  UtensilsCrossed,
  Coffee,
  Infinity as InfinityIcon,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BirthdayConfig } from '../../config';
import { InteractiveCake } from '../InteractiveCake';
import { SecretLetterAndEnvelope } from '../SecretLetterAndEnvelope';
import { LongDistanceMap } from '../LongDistanceMap';
import { audioController } from '../../utils/audio';

interface MainStoryProps {
  config: BirthdayConfig;
  lang: 'en' | 'hi';
  onReplay: () => void;
  onOpenCustomizer: () => void;
}

export const MainStory: React.FC<MainStoryProps> = ({
  config,
  lang,
  onReplay,
  onOpenCustomizer
}) => {
  const [selectedLearnedCard, setSelectedLearnedCard] = useState<number | null>(null);
  const [isCakeCut, setIsCakeCut] = useState<boolean>(false);
  const [shootingStarsActive, setShootingStarsActive] = useState<boolean>(false);
  const [wishToast, setWishToast] = useState<string | null>(null);
  const [isSongPlaying, setIsSongPlaying] = useState<boolean>(false);

  const t = config.translations[lang];

  const handlePlayOurSong = () => {
    audioController.playMusic();
    setIsSongPlaying(true);
  };

  const handleMakeAnotherWish = () => {
    audioController.playWishChimeSound();
    setShootingStarsActive(true);
    setWishToast(t.finale.wishToast);

    confetti({
      particleCount: 50,
      spread: 90,
      origin: { x: 0.5, y: 0.8 },
      colors: ['#fef08a', '#fde047', '#fb7185', '#ffffff'],
      shapes: ['star']
    });

    setTimeout(() => {
      setShootingStarsActive(false);
    }, 2800);

    setTimeout(() => {
      setWishToast(null);
    }, 3800);
  };

  const getDreamIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-amber-300" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-300" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-yellow-300" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-pink-300" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-200" />;
      case 'Infinity':
        return <InfinityIcon className="w-5 h-5 text-rose-400" />;
      default:
        return <Heart className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#090206] text-rose-100 overflow-x-hidden selection:bg-rose-500/30 selection:text-white pb-36">
      
      {/* Background ambient lighting orbs */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-rose-600/10 blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-[60vh] right-0 w-[400px] h-[400px] rounded-full bg-pink-600/8 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-0 w-[450px] h-[450px] rounded-full bg-rose-900/15 blur-[130px] pointer-events-none -z-10" />

      {/* Floating Customizer Button */}
      <button
        onClick={onOpenCustomizer}
        className="fixed top-5 right-5 z-40 p-2.5 rounded-full glass-pill border border-rose-500/30 text-rose-300 hover:text-white hover:border-rose-400 transition-all active:scale-95 shadow-lg flex items-center gap-1.5 text-xs cursor-pointer"
        title="Customize details"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Customize</span>
      </button>

      {/* Shooting Star Animation Overlay */}
      <AnimatePresence>
        {shootingStarsActive && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            <motion.div
              initial={{ x: '100vw', y: '10vh', opacity: 1, scale: 0.8 }}
              animate={{ x: '-20vw', y: '75vh', opacity: [1, 1, 0], scale: 1.5 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="absolute w-28 h-0.5 bg-gradient-to-r from-transparent via-amber-200 to-white shadow-[0_0_20px_#fde047] rotate-[28deg]"
            />
            <motion.div
              initial={{ x: '90vw', y: '30vh', opacity: 1, scale: 0.6 }}
              animate={{ x: '-10vw', y: '85vh', opacity: [1, 1, 0], scale: 1.2 }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-rose-200 to-white shadow-[0_0_15px_#fb7185] rotate-[28deg]"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Wish Toast Notification */}
      <AnimatePresence>
        {wishToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full glass-panel-elevated border border-amber-400/40 text-amber-200 text-xs font-medium shadow-2xl flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{wishToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          SECTION 1 & 2: WELCOME HERO (WITH RECTANGULAR PORTRAIT PHOTO - INSTRUCTION 4)
          ========================================================================= */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 pt-16 pb-12">
        
        {/* Girlfriend Greeting Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/35 text-rose-300 text-xs font-semibold tracking-wider mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>{t.welcome.greetingBadge}</span>
        </motion.div>

        {/* RECTANGULAR PORTRAIT PHOTOGRAPH (3:4 aspect ratio, non-circular frame) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mb-8 group"
        >
          {/* Ambient Glow Halo behind rectangular portrait */}
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 opacity-55 blur-xl group-hover:opacity-80 transition-opacity duration-700 animate-pulse" />

          {/* Rectangular Portrait Container (3:4 ratio, non-circular) */}
          <div className="relative w-56 h-[298px] sm:w-64 sm:h-[340px] aspect-[3/4] rounded-2xl p-1.5 bg-gradient-to-tr from-rose-500/40 via-pink-400/30 to-amber-300/30 border border-white/25 shadow-2xl overflow-hidden">
            <img
              src={config.media.photo1.url}
              alt={config.recipient.name}
              className="w-full h-full object-cover rounded-xl shadow-inner"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
              }}
            />
            {/* Subtle bottom gradient overlay for romantic atmosphere */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none rounded-b-xl flex items-end justify-center pb-2.5">
              <span className="text-xs font-serif-luxury italic text-amber-200">
                Forever My Purvi 🌹
              </span>
            </div>
          </div>

          {/* Floating Rose Badge Accent */}
          <div className="absolute -bottom-2 -right-2 flex items-center justify-center w-10 h-10 rounded-full bg-rose-950 border border-rose-400/60 shadow-lg text-lg select-none">
            🌹
          </div>
        </motion.div>

        {/* Romantic Boyfriend Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white max-w-md sm:max-w-xl leading-tight mb-4 text-glow-rose"
        >
          {t.welcome.headline}
        </motion.h1>

        {/* Subheadline with playful scolding & affection */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm sm:text-base text-rose-200/85 font-light max-w-md leading-relaxed mb-6"
        >
          {t.welcome.subheadline}
        </motion.p>

        {/* Clear "Play Our Song ❤️" Call-to-Action (Instruction 6) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-10"
        >
          <button
            onClick={handlePlayOurSong}
            className="group px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white font-bold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(225,29,72,0.6)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{t.welcome.playSongCta}</span>
            <Heart className="w-3.5 h-3.5 fill-white text-white group-hover:scale-125 transition-transform" />
          </button>
        </motion.div>

        {/* Bouncing Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 text-xs text-rose-400/70 font-mono tracking-widest uppercase cursor-pointer"
          onClick={() => {
            const nextEl = document.getElementById('story-timeline');
            nextEl?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>{t.welcome.scrollHint}</span>
          <ChevronDown className="w-4 h-4 text-rose-400" />
        </motion.div>
      </section>

      {/* =========================================================================
          SECTION 3: OUR LITTLE LOVE STORY (DISTANCE TIMELINE)
          ========================================================================= */}
      <section id="story-timeline" className="relative max-w-xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-widest mb-2 font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>How We Met</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-3">
            {t.timeline.title}
          </h2>
          <p className="text-xs sm:text-sm text-rose-200/75 max-w-sm mx-auto">
            {t.timeline.subtitle}
          </p>
        </div>

        {/* Visual Connection Line between Rahul (Kerala) and Purvi (Uttar Pradesh) */}
        <div className="glass-panel p-5 rounded-2xl border border-rose-500/25 mb-10 shadow-lg flex items-center justify-between">
          <div className="flex flex-col items-start">
            <span className="text-[10px] text-rose-400/80 font-mono uppercase">Rahul</span>
            <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1">
              {config.sender.locationFlag} {config.sender.location}
            </span>
          </div>

          <div className="flex-1 mx-3 flex flex-col items-center">
            <div className="flex items-center gap-1 text-[10px] text-amber-300/80 font-mono">
              <Plane className="w-3 h-3 text-amber-300 animate-pulse" />
              <span>{config.distance.flightDuration}</span>
            </div>
            <div className="w-full h-0.5 bg-gradient-to-r from-rose-500/30 via-rose-400 to-rose-500/30 my-1 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_#fb7185]" />
            </div>
            <span className="text-[10px] text-rose-300/60 font-mono">
              {config.distance.kilometers} km
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] text-rose-400/80 font-mono uppercase">Purvi</span>
            <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1">
              {config.recipient.locationFlag} {config.recipient.location}
            </span>
          </div>
        </div>

        {/* Step-by-Step Relationship Timeline */}
        <div className="relative border-l-2 border-rose-500/20 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
          {t.timeline.steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-rose-950 border-2 border-rose-500 shadow-[0_0_10px_#fb7185] flex items-center justify-center" />

              <div className="glass-panel p-5 rounded-2xl border border-rose-500/20 hover:border-rose-400/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-rose-400 font-semibold tracking-wider uppercase">
                    {step.tag}
                  </span>
                  {idx === 0 && <MessageCircleHeart className="w-4 h-4 text-rose-400" />}
                  {idx === 1 && <Sparkles className="w-4 h-4 text-amber-300" />}
                  {idx === 2 && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                  {idx === 3 && <Gift className="w-4 h-4 text-pink-400" />}
                </div>

                <h3 className="font-serif-luxury text-lg font-bold text-white mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FIRST PHOTO CINEMATIC REVEAL
          ========================================================================= */}
      <section className="relative max-w-lg mx-auto px-6 py-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden glass-panel-elevated p-4 sm:p-5 border border-rose-500/30"
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5">
            <img
              src={config.media.photo1.url}
              alt="Purvi"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
            
            <div className="absolute bottom-4 inset-x-4 text-left">
              <span className="text-[10px] font-mono tracking-widest uppercase text-rose-300/80 px-2 py-0.5 rounded-full bg-black/60 border border-white/20">
                {t.photo1Section.tag}
              </span>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-1.5">
                {t.photo1Section.title}
              </h3>
            </div>
          </div>

          <p className="font-serif-luxury text-base sm:text-lg text-rose-100/90 italic leading-relaxed px-3">
            "{lang === 'en' ? config.media.photo1.captionEn : config.media.photo1.captionHi}"
          </p>

          <p className="text-xs text-rose-300/60 mt-2 font-light">
            {lang === 'en' ? config.media.photo1.subCaptionEn : config.media.photo1.subCaptionHi}
          </p>
        </motion.div>
      </section>

      {/* =========================================================================
          SECTION 5: THINGS I'VE LEARNED ABOUT MY GIRLFRIEND (CUTE JEALOUSY & ANGER)
          ========================================================================= */}
      <section className="relative max-w-xl mx-auto px-6 py-14">
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold">
            {t.learned.tag}
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold text-white mt-1 mb-2">
            {t.learned.title}
          </h2>
          <p className="text-xs text-rose-200/70">
            {t.learned.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.learned.items.map((item, idx) => {
            const isSelected = selectedLearnedCard === idx;
            return (
              <motion.div
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedLearnedCard(isSelected ? null : idx)}
                className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'bg-rose-950/80 border-rose-400/60 shadow-[0_0_25px_rgba(244,63,94,0.3)]'
                    : 'glass-panel border-rose-500/20 hover:border-rose-400/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-rose-400/90 uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <span className="text-xs">{isSelected ? '🌹' : '✨'}</span>
                </div>

                <h3 className="font-serif-luxury text-base font-bold text-white mb-1.5">
                  {item.title}
                </h3>

                <p className="text-xs text-rose-200/80 leading-relaxed font-light">
                  {item.detail}
                </p>

                <div className="mt-3 text-[10px] text-rose-400/60 font-mono">
                  {isSelected ? 'Tap to close' : 'Tap to expand'}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: APPRECIATION SECTION
          ========================================================================= */}
      <section className="relative max-w-xl mx-auto px-6 py-14">
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold">
            {t.appreciation.tag}
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold text-white mt-1 mb-2">
            {t.appreciation.title}
          </h2>
          <p className="text-xs text-rose-200/70">
            {t.appreciation.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.appreciation.qualities.map((q, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-5 rounded-2xl border border-rose-500/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-2 text-rose-400">
                <CheckCircle2 className="w-4 h-4 text-rose-400" />
                <h3 className="font-serif-luxury text-base font-bold text-white">
                  {q.title}
                </h3>
              </div>
              <p className="text-xs text-rose-200/80 leading-relaxed font-light">
                {q.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: LONG-DISTANCE RELATIONSHIP: RAHUL IN KERALA & PURVI IN UTTAR PRADESH
          ========================================================================= */}
      <section className="relative max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <LongDistanceMap config={config} lang={lang} />
      </section>

      {/* =========================================================================
          NEW SECTION (INSTRUCTION 5): OUR FUTURE TOGETHER ❤️
          (Uses beautiful text cards, icons, and gradients - strictly NO new images!)
          ========================================================================= */}
      <section id="our-future" className="relative max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/70 border border-rose-500/30 text-rose-300 text-xs font-mono uppercase tracking-widest mb-3 font-semibold shadow-sm">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>{t.futureDreams.tag}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-3 text-glow-rose">
            {t.futureDreams.title}
          </h2>
          <p className="text-xs sm:text-sm text-rose-200/75 max-w-md mx-auto">
            {t.futureDreams.subtitle}
          </p>
        </div>

        {/* 6 Elegant Romantic Dream Cards */}
        <div className="space-y-6">
          {t.futureDreams.dreams.map((dream, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="relative rounded-3xl p-6 sm:p-7 glass-panel-elevated border border-rose-500/25 hover:border-rose-400/50 transition-all duration-300 group overflow-hidden"
            >
              {/* Subtle ambient gradient aura in card corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-500/15 via-pink-600/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              {/* Card Header: Badge & Location/Proposal Highlight */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-rose-950/80 border border-rose-500/30 flex items-center justify-center shadow-md">
                    {getDreamIcon(dream.icon)}
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-semibold">
                    {dream.badge}
                  </span>
                </div>

                {dream.locationTag && (
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-400/40 text-[11px] font-semibold text-amber-200 shadow-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-300" />
                    {dream.locationTag}
                  </span>
                )}
              </div>

              {/* Dream Title */}
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-3">
                {dream.title}
              </h3>

              {/* Dream Heartfelt Quote */}
              <blockquote className="font-serif-luxury text-sm sm:text-base text-rose-100/90 leading-relaxed italic border-l-2 border-rose-500/40 pl-4 py-1">
                "{dream.quote}"
              </blockquote>

              {/* Small sign-off whisper */}
              <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-rose-300/60 font-script-love text-base">
                <span>With you, my Purvi ❤️</span>
                <span className="font-sans text-[10px] text-rose-400 font-mono">— Rahul</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: SECOND PHOTO - SCRAPBOOK POLAROID MOMENT
          ========================================================================= */}
      <section className="relative max-w-md mx-auto px-6 py-14 flex flex-col items-center">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold">
            {t.scrapbook.tag}
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            {t.scrapbook.title}
          </h2>
        </div>

        <motion.div
          initial={{ rotate: -2, opacity: 0 }}
          whileInView={{ rotate: 2, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-stone-100 text-stone-900 p-4 pb-8 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.85)] max-w-xs w-full select-none"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-rose-200/80 backdrop-blur-sm -rotate-2 border-y border-rose-300/40 shadow-sm" />

          <div className="aspect-square w-full overflow-hidden bg-stone-300 mb-4 rounded-sm">
            <img
              src={config.media.photo2.url}
              alt="Memory"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="font-script-love text-center text-xl sm:text-2xl text-stone-900 leading-snug px-2">
            "{lang === 'en' ? config.media.photo2.captionEn : config.media.photo2.captionHi}"
          </p>
          <span className="block text-center text-[10px] font-mono text-stone-500 uppercase tracking-widest mt-2">
            {config.media.photo2.polaroidDate}
          </span>
        </motion.div>
      </section>

      {/* =========================================================================
          SECTION 9: EVEN WITHOUT MEETING
          ========================================================================= */}
      <section className="relative max-w-lg mx-auto px-6 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/25"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold">
            {t.evenWithoutMeeting.tag}
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1 mb-4">
            {t.evenWithoutMeeting.title}
          </h2>

          <blockquote className="font-serif-luxury italic text-lg sm:text-xl text-amber-200 mb-4 leading-relaxed">
            "{t.evenWithoutMeeting.quote}"
          </blockquote>

          <p className="text-xs sm:text-sm text-rose-100/85 leading-relaxed font-light">
            {t.evenWithoutMeeting.reflection}
          </p>
        </motion.div>
      </section>

      {/* =========================================================================
          SECTION 10: THIRD PHOTO - ROSE GRACE FRAME
          ========================================================================= */}
      <section className="relative max-w-md mx-auto px-6 py-14 flex flex-col items-center text-center">
        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold">
            {t.photo3Section.tag}
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            {t.photo3Section.title}
          </h2>
        </div>

        <div className="relative p-3 rounded-3xl bg-gradient-to-tr from-rose-950 via-rose-900 to-pink-900 border border-rose-400/40 shadow-2xl w-full">
          <span className="absolute -top-3 -left-3 text-2xl">🌹</span>
          <span className="absolute -top-3 -right-3 text-2xl">🌹</span>
          <span className="absolute -bottom-3 -left-3 text-2xl">🌹</span>
          <span className="absolute -bottom-3 -right-3 text-2xl">🌹</span>

          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-black">
            <img
              src={config.media.photo3.url}
              alt="Purvi Elegance"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="font-serif-luxury text-base text-rose-100/90 italic mt-4 px-2">
            "{lang === 'en' ? config.media.photo3.captionEn : config.media.photo3.captionHi}"
          </p>
          <p className="text-xs text-amber-300 font-script-love text-lg mt-1">
            {lang === 'en' ? config.media.photo3.quoteEn : config.media.photo3.quoteHi}
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: THINGS I PROBABLY DON'T SAY ENOUGH (THANK YOU SECTION)
          ========================================================================= */}
      <section className="relative max-w-xl mx-auto px-6 py-14">
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold">
            {t.thankYou.tag}
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold text-white mt-1 mb-2">
            {t.thankYou.title}
          </h2>
          <p className="text-xs text-rose-200/70">
            {t.thankYou.subtitle}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {t.thankYou.cards.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-5 rounded-2xl border border-rose-500/20"
            >
              <h3 className="font-serif-luxury text-base font-bold text-white mb-1">
                {c.title}
              </h3>
              <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed font-light">
                {c.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl bg-gradient-to-r from-rose-900/80 via-pink-900/60 to-rose-900/80 border border-rose-400/50 shadow-xl text-center"
        >
          <p className="font-serif-luxury text-xl sm:text-2xl font-bold text-white text-glow-rose">
            {t.thankYou.highlightCard}
          </p>
        </motion.div>
      </section>

      {/* =========================================================================
          SECTION 12: THE INTERACTIVE BIRTHDAY CAKE EXPERIENCE
          ========================================================================= */}
      <section id="interactive-cake" className="relative w-full py-10">
        <InteractiveCake
          config={config}
          lang={lang}
          isCakeCut={isCakeCut}
          onCakeCutSuccess={() => setIsCakeCut(true)}
        />
      </section>

      {/* =========================================================================
          SECTION 13, 14, 15, 16: SECRET POST-CAKE REVEALS (LETTER, KEEPSAKE, ENVELOPE)
          ========================================================================= */}
      <section className="relative w-full">
        <SecretLetterAndEnvelope
          config={config}
          lang={lang}
          isUnlocked={isCakeCut}
        />
      </section>

      {/* =========================================================================
          SECTION 17: DREAMY FINALE & REPLAY
          ========================================================================= */}
      <section className="relative max-w-lg mx-auto px-6 pt-12 pb-24 text-center">
        <div className="flex items-center justify-center gap-1.5 text-amber-300 mb-3">
          <Star className="w-4 h-4 fill-amber-300" />
          <Star className="w-5 h-5 fill-amber-300" />
          <Star className="w-4 h-4 fill-amber-300" />
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-2 text-glow-rose">
          {t.finale.title}
        </h2>

        <p className="text-xs sm:text-sm text-rose-200/80 font-light max-w-xs mx-auto mb-8">
          {t.finale.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm mx-auto">
          <button
            onClick={handleMakeAnotherWish}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-stone-900" />
            <span>{t.finale.wishButton}</span>
          </button>

          <button
            onClick={onReplay}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-panel border border-rose-500/40 text-rose-200 hover:text-white hover:bg-rose-950/60 text-xs font-semibold tracking-wider uppercase active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-rose-300" />
            <span>{t.finale.replayButton}</span>
          </button>
        </div>

        <div className="mt-14 text-[11px] text-rose-400/60 font-mono">
          Forever yours, Rahul ❤️ For Purvi 🌹 • {new Date().getFullYear()}
        </div>
      </section>

    </div>
  );
};
