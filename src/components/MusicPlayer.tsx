import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Globe, Music, Heart } from 'lucide-react';
import { audioController } from '../utils/audio';
import { BirthdayConfig } from '../config';

interface MusicPlayerProps {
  config: BirthdayConfig;
  currentLang: 'en' | 'hi';
  onToggleLang: () => void;
  isVisible: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  config,
  currentLang,
  onToggleLang,
  isVisible
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.65);
  const [showVolumePopup, setShowVolumePopup] = useState<boolean>(false);

  useEffect(() => {
    audioController.initBackgroundAudio(config.media.song1.url);
  }, [config.media.song1.url]);

  const handleTogglePlay = () => {
    const playing = audioController.togglePlay();
    setIsPlaying(playing);
  };

  const handleSwitchTrack = () => {
    const nextTrack = currentTrack === 1 ? 2 : 1;
    setCurrentTrack(nextTrack);
    const nextUrl = nextTrack === 1 ? config.media.song1.url : config.media.song2.url;
    audioController.switchTrack(nextUrl, nextTrack);
    setIsPlaying(true);
  };

  const handleToggleMute = () => {
    const muted = audioController.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioController.setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  if (!isVisible) return null;

  const activeTrackInfo = currentTrack === 1 ? config.media.song1 : config.media.song2;
  const playCtaText = config.translations[currentLang].musicBar.playOurSong;

  return (
    <aside 
      aria-label="Audio player and language controls"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-md pointer-events-auto select-none"
    >
      <div className="glass-pill px-3.5 py-2.5 rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.7)] border border-rose-500/30 flex items-center justify-between gap-2 text-rose-100">
        
        {/* Track Info & Visualizer */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 shrink-0">
            {isPlaying ? (
              <div className="flex items-end justify-center gap-0.5 h-3.5 w-3.5">
                <span className="w-0.5 bg-rose-400 animate-[bounce_0.8s_infinite_ease-in-out] h-3 rounded-full" />
                <span className="w-0.5 bg-rose-300 animate-[bounce_0.6s_infinite_ease-in-out_0.2s] h-2 rounded-full" />
                <span className="w-0.5 bg-rose-400 animate-[bounce_0.9s_infinite_ease-in-out_0.4s] h-3.5 rounded-full" />
              </div>
            ) : (
              <Music className="w-3.5 h-3.5 text-rose-300/90" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="text-xs font-semibold text-rose-100 truncate tracking-wide">
                {activeTrackInfo.title}
              </span>
              <span className="text-[9px] text-rose-300 shrink-0 font-medium px-1.5 py-0.2 rounded-full bg-rose-950/80 border border-rose-700/50">
                {activeTrackInfo.title === "Samjhawan" ? "Our Song ❤️" : `T${currentTrack}`}
              </span>
            </div>
            <p className="text-[10px] text-rose-300/70 truncate">
              {activeTrackInfo.artist}
            </p>
          </div>
        </div>

        {/* Media Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          
          {/* Switch Track */}
          <button
            onClick={handleSwitchTrack}
            aria-label="Switch song"
            className="w-8 h-8 rounded-full flex items-center justify-center text-rose-200/80 hover:text-rose-100 hover:bg-rose-500/20 active:scale-95 transition-all"
            title="Next song"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Primary Play / Pause Button with Heart Accent */}
          <button
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause music' : playCtaText}
            className={`min-h-[38px] px-3.5 rounded-full flex items-center justify-center gap-1.5 text-xs font-bold shadow-[0_0_20px_rgba(225,29,72,0.5)] active:scale-95 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white'
                : 'bg-gradient-to-r from-amber-400 via-rose-500 to-pink-600 text-white animate-pulse'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-white" />
                <span className="hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                <span className="font-semibold">{playCtaText}</span>
              </>
            )}
          </button>

          {/* Volume toggle & slider dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowVolumePopup(!showVolumePopup)}
              aria-label="Adjust volume"
              className="w-8 h-8 rounded-full flex items-center justify-center text-rose-200/80 hover:text-rose-100 hover:bg-rose-500/20 active:scale-95 transition-all"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {showVolumePopup && (
              <div className="absolute bottom-12 right-0 p-3 rounded-2xl glass-panel border border-rose-500/30 shadow-2xl flex flex-col items-center gap-2 w-32 z-50">
                <div className="flex items-center justify-between w-full text-[11px] text-rose-200">
                  <span>Vol</span>
                  <span>{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-rose-500 h-1.5 bg-rose-950/60 rounded-lg cursor-pointer"
                />
                <button
                  onClick={handleToggleMute}
                  className="text-[10px] text-rose-300 hover:underline pt-1"
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
              </div>
            )}
          </div>

          <div className="h-5 w-[1px] bg-rose-500/25 mx-0.5" />

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            aria-label={`Switch language. Current: ${currentLang.toUpperCase()}`}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/35 text-[11px] font-semibold text-rose-200 transition-all active:scale-95"
            title="Toggle English / Hindi"
          >
            <Globe className="w-3 h-3 text-rose-400" />
            <span>{currentLang === 'en' ? 'हिन्दी' : 'EN'}</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
