import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, FastForward } from 'lucide-react';
import { BirthdayConfig } from '../../config';
import { audioController } from '../../utils/audio';

interface IntroVideoProps {
  config: BirthdayConfig;
  lang: 'en' | 'hi';
  onComplete: () => void;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ config, lang, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [, setIsPlaying] = useState<boolean>(false);
  const [showTapHint, setShowTapHint] = useState<boolean>(true);
  const t = config.translations[lang].video;

  useEffect(() => {
    audioController.pauseMusic();

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }

    const hintTimer = setTimeout(() => {
      setShowTapHint(false);
    }, 3500);

    return () => {
      clearTimeout(hintTimer);
      if (video) {
        video.pause();
      }
    };
  }, []);

  const handleScreenTap = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
    } else {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
    setShowTapHint(false);
  };

  const handleSkipOrComplete = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onComplete();
  };

  return (
    <div
      onClick={handleScreenTap}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden cursor-pointer select-none"
    >
      <div className="relative w-full h-full max-w-[450px] max-h-[850px] aspect-[9/16] bg-black flex items-center justify-center shadow-2xl overflow-hidden">
        
        <video
          ref={videoRef}
          src={config.media.introVideoUrl}
          poster={config.media.introVideoPoster}
          playsInline
          autoPlay
          onEnded={handleSkipOrComplete}
          onError={() => {
            // Error fallback
          }}
          className="w-full h-full object-cover pointer-events-none"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkipOrComplete();
          }}
          className="absolute top-6 right-6 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-rose-200 text-xs hover:bg-black/80 hover:text-white transition-all active:scale-95"
        >
          <span>{t.skipButton}</span>
          <FastForward className="w-3.5 h-3.5 text-rose-400" />
        </button>

        {showTapHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-rose-500/30 text-rose-200 text-xs shadow-xl pointer-events-none"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400 animate-pulse" />
            ) : (
              <Volume2 className="w-4 h-4 text-rose-400" />
            )}
            <span>{t.tapToPlay}</span>
          </motion.div>
        )}

      </div>
    </div>
  );
};
