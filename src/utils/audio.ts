/**
 * Audio Engine & Sound Synthesizer.
 * Provides resilient background music control, track switching,
 * and Web Audio synthesized sound effects for interactive gestures.
 */

class AudioController {
  private bgAudio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private currentTrackIndex: number = 1;
  private isMuted: boolean = false;
  private volume: number = 0.65;
  private isPlaying: boolean = false;
  private synthLoopTimer: number | null = null;
  private isUsingSynthFallback: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.cleanup());
      window.addEventListener('pagehide', () => this.cleanup());
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public initBackgroundAudio(trackUrl: string) {
    if (typeof window === 'undefined') return;
    if (this.bgAudio) {
      this.bgAudio.pause();
      this.bgAudio.src = '';
    }

    this.bgAudio = new Audio();
    this.bgAudio.crossOrigin = 'anonymous';
    this.bgAudio.loop = true;
    this.bgAudio.volume = this.volume;
    this.bgAudio.src = trackUrl;

    this.bgAudio.addEventListener('error', () => {
      if (this.isPlaying && !this.isUsingSynthFallback) {
        this.startProceduralAmbientMelody();
      }
    });
  }

  public async playMusic(): Promise<boolean> {
    this.isPlaying = true;
    if (this.isUsingSynthFallback) {
      this.startProceduralAmbientMelody();
      return true;
    }

    if (!this.bgAudio) return false;
    try {
      this.bgAudio.volume = this.volume;
      this.bgAudio.muted = this.isMuted;
      await this.bgAudio.play();
      return true;
    } catch {
      this.startProceduralAmbientMelody();
      return true;
    }
  }

  public pauseMusic() {
    this.isPlaying = false;
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    this.stopProceduralAmbientMelody();
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pauseMusic();
      return false;
    } else {
      this.playMusic();
      return true;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.bgAudio) {
      this.bgAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgAudio) {
      this.bgAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public switchTrack(trackUrl: string, trackIndex: number) {
    this.currentTrackIndex = trackIndex;
    const wasPlaying = this.isPlaying;
    this.stopProceduralAmbientMelody();
    this.isUsingSynthFallback = false;
    this.initBackgroundAudio(trackUrl);
    if (wasPlaying) {
      this.playMusic();
    }
  }

  public getCurrentTrack(): number {
    return this.currentTrackIndex;
  }

  public isAudioPlaying(): boolean {
    return this.isPlaying;
  }

  public cleanup() {
    this.pauseMusic();
    if (this.bgAudio) {
      this.bgAudio.src = '';
      this.bgAudio = null;
    }
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      try {
        this.audioCtx.close();
      } catch {
        // ignore
      }
      this.audioCtx = null;
    }
  }

  // --- Web Audio Procedural Fallback Ambient Music ---
  private startProceduralAmbientMelody() {
    this.isUsingSynthFallback = true;
    this.stopProceduralAmbientMelody();
    const ctx = this.getAudioContext();
    if (!ctx) return;

    // Romantic Samjhawan-inspired progression (Key of C: C -> G -> Am -> F -> Dm -> G)
    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C Major
      [246.94, 293.66, 392.00, 493.88], // G Major
      [220.00, 261.63, 329.63, 440.00], // A Minor
      [174.61, 261.63, 349.23, 440.00], // F Major
      [146.83, 220.00, 293.66, 349.23], // D Minor
      [196.00, 246.94, 293.66, 392.00]  // G Major
    ];
    // Gentle melodic notes of "Samjhawan"
    const leadNotes = [
      [523.25, 659.25], // C5, E5
      [493.88, 392.00], // B4, G4
      [440.00, 523.25], // A4, C5
      [349.23, 392.00], // F4, G4
      [293.66, 349.23], // D4, F4
      [392.00, 493.88]  // G4, B4
    ];
    let step = 0;

    const playChord = () => {
      if (!this.isPlaying || !this.isUsingSynthFallback) return;
      const currentChord = chords[step % chords.length];
      const currentLead = leadNotes[step % leadNotes.length];
      step++;

      // Play soft background warm piano pad
      currentChord.forEach((freq, idx) => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const baseVol = 0.035 * this.volume;
          gain.gain.setValueAtTime(0.0001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(baseVol, ctx.currentTime + 0.6 + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + idx * 0.05);
          osc.stop(ctx.currentTime + 4.0);
        } catch {
          // ignore
        }
      });

      // Play sweet bell/guitar lead notes of Samjhawan melody
      currentLead.forEach((freq, lIdx) => {
        try {
          const leadOsc = ctx.createOscillator();
          const leadGain = ctx.createGain();
          leadOsc.type = 'sine';
          leadOsc.frequency.setValueAtTime(freq, ctx.currentTime + 0.4 + lIdx * 1.0);

          const leadVol = 0.045 * this.volume;
          leadGain.gain.setValueAtTime(0.0001, ctx.currentTime + 0.4 + lIdx * 1.0);
          leadGain.gain.exponentialRampToValueAtTime(leadVol, ctx.currentTime + 0.5 + lIdx * 1.0);
          leadGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8 + lIdx * 1.0);

          leadOsc.connect(leadGain);
          leadGain.connect(ctx.destination);

          leadOsc.start(ctx.currentTime + 0.4 + lIdx * 1.0);
          leadOsc.stop(ctx.currentTime + 2.0 + lIdx * 1.0);
        } catch {
          // ignore
        }
      });
    };

    playChord();
    this.synthLoopTimer = window.setInterval(playChord, 3800);
  }

  private stopProceduralAmbientMelody() {
    if (this.synthLoopTimer) {
      clearInterval(this.synthLoopTimer);
      this.synthLoopTimer = null;
    }
  }

  // --- Interactive Sound Effects (Instant Web Audio) ---

  public playCandleBlowSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const bufferSize = ctx.sampleRate * 0.7;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.25));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.6);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // ignore
    }
  }

  public playConfettiPopSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);

      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        noteOsc.type = 'sine';
        noteOsc.frequency.setValueAtTime(freq, ctx.currentTime + 0.1 + idx * 0.08);

        noteGain.gain.setValueAtTime(0.0001, ctx.currentTime + 0.1 + idx * 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.12 + idx * 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8 + idx * 0.08);

        noteOsc.connect(noteGain);
        noteGain.connect(ctx.destination);

        noteOsc.start(ctx.currentTime + 0.1 + idx * 0.08);
        noteOsc.stop(ctx.currentTime + 0.9 + idx * 0.08);
      });
    } catch {
      // ignore
    }
  }

  public playCakeSliceSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.38);
    } catch {
      // ignore
    }
  }

  public playWishChimeSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const freqs = [880, 1174.66, 1318.51, 1760];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);

        gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + i * 0.07 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.07 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.07);
        osc.stop(ctx.currentTime + i * 0.07 + 1.3);
      });
    } catch {
      // ignore
    }
  }

  public playRoseBloomSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const notes = [392, 523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + i * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.12 + 1.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 1.5);
      });
    } catch {
      // ignore
    }
  }
}

export const audioController = new AudioController();
