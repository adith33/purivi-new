import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TapSparkle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
  scale: number;
  rotate: number;
  targetY: number;
  targetX: number;
}

export const MagicTaps: React.FC = () => {
  const [sparkles, setSparkles] = useState<TapSparkle[]>([]);

  const symbols = ['🌹', '✨', '💖', '🌸', '⭐', '💫'];
  const colors = ['#f43f5e', '#fb7185', '#f59e0b', '#fda4af', '#e11d48'];

  const spawnParticles = useCallback((clientX: number, clientY: number) => {
    const burstCount = Math.floor(Math.random() * 2) + 2;
    const newItems: TapSparkle[] = [];

    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const dist = Math.random() * 45 + 25;
      newItems.push({
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: Math.random() * 0.5 + 0.8,
        rotate: Math.random() * 60 - 30,
        targetX: clientX + Math.cos(angle) * dist,
        targetY: clientY + Math.sin(angle) * dist - 35,
      });
    }

    setSparkles((prev) => [...prev.slice(-25), ...newItems]);
  }, []);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, input, textarea, a, select, [role="button"]')) {
        return;
      }
      spawnParticles(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [spawnParticles]);

  const handleAnimationComplete = (id: number) => {
    setSparkles((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{
              x: sparkle.x - 12,
              y: sparkle.y - 12,
              opacity: 1,
              scale: 0.2,
              rotate: 0,
            }}
            animate={{
              x: sparkle.targetX - 12,
              y: sparkle.targetY - 12,
              opacity: 0,
              scale: sparkle.scale,
              rotate: sparkle.rotate,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={() => handleAnimationComplete(sparkle.id)}
            className="absolute select-none text-base drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]"
            style={{ color: sparkle.color }}
          >
            {sparkle.symbol}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
