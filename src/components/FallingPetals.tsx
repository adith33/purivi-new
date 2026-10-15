import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  shadowColor: string;
  opacity: number;
}

export const FallingPetals: React.FC<{ count?: number; active?: boolean }> = ({
  count = 24,
  active = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      { fill: '#e11d48', shadow: '#9f1239', alpha: 0.75 },
      { fill: '#f43f5e', shadow: '#be123c', alpha: 0.8 },
      { fill: '#fb7185', shadow: '#e11d48', alpha: 0.7 },
      { fill: '#fda4af', shadow: '#f43f5e', alpha: 0.65 },
      { fill: '#881337', shadow: '#4c0519', alpha: 0.85 }
    ];

    const petals: Petal[] = [];
    for (let i = 0; i < count; i++) {
      const col = colors[Math.floor(Math.random() * colors.length)];
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 12 + 10,
        speedY: Math.random() * 1.2 + 0.8,
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.02 - 0.01),
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.01,
        color: col.fill,
        shadowColor: col.shadow,
        opacity: col.alpha
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.size) * 0.7;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        const scaleX = Math.cos(p.flip);
        ctx.scale(scaleX, 1);
        ctx.globalAlpha = p.opacity;

        const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
        grad.addColorStop(0, p.shadowColor);
        grad.addColorStop(0.5, p.color);
        grad.addColorStop(1, '#ffe4e6');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, p.size);
        ctx.bezierCurveTo(
          -p.size * 0.9, p.size * 0.3,
          -p.size * 0.8, -p.size * 0.7,
          0, -p.size
        );
        ctx.bezierCurveTo(
          p.size * 0.8, -p.size * 0.7,
          p.size * 0.9, p.size * 0.3,
          0, p.size
        );
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(0, p.size * 0.7);
        ctx.lineTo(0, -p.size * 0.5);
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, count]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 h-full w-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};
