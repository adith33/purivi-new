import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, RotateCcw, Check, Image, Music, MapPin, User } from 'lucide-react';
import { BirthdayConfig, initialBirthdayConfig } from '../config';

interface CustomizerModalProps {
  config: BirthdayConfig;
  onUpdateConfig: (newConfig: BirthdayConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  config,
  onUpdateConfig,
  isOpen,
  onClose,
}) => {
  const [form, setForm] = useState<BirthdayConfig>(config);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    onUpdateConfig(form);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    setForm(initialBirthdayConfig);
    onUpdateConfig(initialBirthdayConfig);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg max-h-[85vh] rounded-3xl glass-panel-elevated border border-rose-500/40 shadow-2xl flex flex-col overflow-hidden text-rose-100"
          >
            <div className="p-5 border-b border-rose-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-rose-400" />
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  Customize Surprise Details
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-rose-300 hover:bg-rose-500/20 active:scale-95 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5 font-semibold">
                  <User className="w-3.5 h-3.5" /> Recipient & Sender
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-rose-300/80 mb-1 block">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      value={form.recipient.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          recipient: { ...form.recipient, name: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-rose-500/30 text-xs text-white focus:outline-none focus:border-rose-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-rose-300/80 mb-1 block">
                      Nickname / Pet Name
                    </label>
                    <input
                      type="text"
                      value={form.recipient.nickname}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          recipient: { ...form.recipient, nickname: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-rose-500/30 text-xs text-white focus:outline-none focus:border-rose-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-rose-300/80 mb-1 block">
                      Sender Name
                    </label>
                    <input
                      type="text"
                      value={form.sender.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          sender: { ...form.sender, name: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-rose-500/30 text-xs text-white focus:outline-none focus:border-rose-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-rose-300/80 mb-1 block">
                      Favorite Flower
                    </label>
                    <input
                      type="text"
                      value={form.recipient.flowerName}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          recipient: { ...form.recipient, flowerName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-rose-500/30 text-xs text-white focus:outline-none focus:border-rose-400"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-3.5 h-3.5" /> Distance & Locations
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-rose-300/80 mb-1 block">
                      Sender Location
                    </label>
                    <input
                      type="text"
                      value={form.sender.location}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          sender: { ...form.sender, location: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-rose-500/30 text-xs text-white focus:outline-none focus:border-rose-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-rose-300/80 mb-1 block">
                      Recipient Location
                    </label>
                    <input
                      type="text"
                      value={form.recipient.location}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          recipient: { ...form.recipient, location: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-rose-500/30 text-xs text-white focus:outline-none focus:border-rose-400"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5 font-semibold">
                  <Image className="w-3.5 h-3.5" /> Photos & Visuals
                </h4>
                <div>
                  <label className="text-[11px] text-rose-300/80 mb-1 block">
                    Photo 1 URL (Portrait Reveal)
                  </label>
                  <input
                    type="url"
                    value={form.media.photo1.url}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        media: {
                          ...form.media,
                          photo1: { ...form.media.photo1, url: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-rose-500/30 text-xs text-white focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-rose-300/80 mb-1 block">
                    Photo 2 URL (Polaroid Scrapbook)
                  </label>
                  <input
                    type="url"
                    value={form.media.photo2.url}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        media: {
                          ...form.media,
                          photo2: { ...form.media.photo2, url: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-rose-500/30 text-xs text-white focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-rose-300/80 mb-1 block">
                    Photo 3 URL (Floral Framed Grace)
                  </label>
                  <input
                    type="url"
                    value={form.media.photo3.url}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        media: {
                          ...form.media,
                          photo3: { ...form.media.photo3, url: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-rose-500/30 text-xs text-white focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5 font-semibold">
                  <Music className="w-3.5 h-3.5" /> Media & Music
                </h4>
                <div>
                  <label className="text-[11px] text-rose-300/80 mb-1 block">
                    Intro Video MP4 URL
                  </label>
                  <input
                    type="url"
                    value={form.media.introVideoUrl}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        media: { ...form.media, introVideoUrl: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-rose-500/30 text-xs text-white focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-rose-300/80 mb-1 block">
                    Song 1 MP3 URL
                  </label>
                  <input
                    type="url"
                    value={form.media.song1.url}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        media: {
                          ...form.media,
                          song1: { ...form.media.song1, url: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-rose-500/30 text-xs text-white focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-rose-500/20 flex items-center justify-between gap-3 bg-black/40">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs text-rose-300 hover:bg-rose-500/20 active:scale-95 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                {savedToast ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Apply Changes</span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
