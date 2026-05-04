'use client';

import { useState, useEffect } from 'react';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function Cursor() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const mainHeart: Heart = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: 25,
      };
      
      const miniHearts: Heart[] = [
        { id: Date.now() + 1, x: e.clientX - 20, y: e.clientY - 10, size: 12 },
        { id: Date.now() + 2, x: e.clientX + 20, y: e.clientY - 15, size: 10 },
        { id: Date.now() + 3, x: e.clientX - 10, y: e.clientY + 15, size: 8 },
      ];
      
      setHearts(prev => [...prev, mainHeart, ...miniHearts]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => prev.filter(h => Date.now() - h.id < 2500));
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
            animation: 'floatUp 2.5s ease-out forwards',
            filter: 'drop-shadow(0 0 6px #ff00ff) drop-shadow(0 0 12px #ff00ff)',
          }}
          width={heart.size}
          height={heart.size}
          viewBox="0 0 24 24"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#ff00ff"
          />
        </svg>
      ))}
    </>
  );
}