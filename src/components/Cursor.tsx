'use client';

import { useState, useEffect, useRef } from 'react';

interface HeartData {
  id: number;
  x: number;
  y: number;
}

export default function Cursor() {
  const [hearts, setHearts] = useState<HeartData[]>([]);
  const idCounter = useRef(0);
  const lastHeartTime = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastHeartTime.current < 80) return;
      lastHeartTime.current = now;

      idCounter.current += 1;
      const newHeart: HeartData = {
        id: idCounter.current,
        x: e.clientX,
        y: e.clientY,
      };
      setHearts(prev => {
        const updated = [...prev, newHeart];
        return updated.slice(-15);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (hearts.length === 0) return;
    
    const timer = setTimeout(() => {
      setHearts(prev => prev.slice(1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [hearts.length]);

  return (
    <>
      {hearts.map(heart => (
        <svg
          key={heart.id}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: heart.x,
            top: heart.y,
            transform: 'translate(-50%, -50%)',
            animation: 'fadeTrail 2s ease-out forwards',
            filter: 'drop-shadow(0 0 4px #ff69b4)',
          }}
          width="12"
          height="12"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#ff69b4"
          />
        </svg>
      ))}
    </>
  );
}