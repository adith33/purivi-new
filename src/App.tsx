/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { initialBirthdayConfig, BirthdayConfig } from './config';
import { MainStory } from './components/stages/MainStory';
import { FallingPetals } from './components/FallingPetals';
import { MagicTaps } from './components/MagicTaps';
import { MusicPlayer } from './components/MusicPlayer';
import { CustomizerModal } from './components/CustomizerModal';

export default function App() {
  const [config, setConfig] = useState<BirthdayConfig>(initialBirthdayConfig);
  const [currentLang, setCurrentLang] = useState<'en' | 'hi'>('en');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Sync document title and html attributes
  useEffect(() => {
    document.title = `Happy Birthday ${config.recipient.name} 🌹 | From Rahul With Love`;
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = currentLang;
  }, [config.recipient.name, currentLang]);

  // Handle replay - smooth scroll to top of birthday celebration and throw gentle confetti
  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fda4af', '#fbbf24', '#ffffff']
    });
  };

  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  return (
    <div className="relative min-h-screen bg-[#080205] text-rose-100 overflow-x-hidden font-sans-clean">
      
      {/* Interactive Magic Sparkles & Heart Taps on any touch/click */}
      <MagicTaps />

      {/* Physics-based Falling Rose Petals Canvas */}
      <FallingPetals count={24} active={true} />

      {/* Main Homepage / Birthday Welcome & Love Story Section (Instruction 15) */}
      <main className="relative z-10">
        <MainStory
          config={config}
          lang={currentLang}
          onReplay={handleReplay}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />
      </main>

      {/* Floating Glassmorphism Music Bar with Track Controls & Language Toggle */}
      <MusicPlayer
        config={config}
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        isVisible={true}
      />

      {/* Configuration Customizer Modal for Personal Details */}
      <CustomizerModal
        config={config}
        onUpdateConfig={(newConf) => setConfig(newConf)}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />

    </div>
  );
}
