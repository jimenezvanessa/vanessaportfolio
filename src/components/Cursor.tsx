'use client';

import { useState, useEffect } from 'react';

interface Heart {
  id: number;
  x: number;
  y: number;
}

export default function Cursor() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setIsVisible(true);
    };

    const handleClick = (e: MouseEvent) => {
      const newHeart: Heart = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setHearts(prev => [...prev, newHeart]);
    };

    const cleanup = () => {
      setHearts(prev => {
        const now = Date.now();
        return prev.filter(h => now - (h.id % 1000000000) < 1000);
      });
    };

    const interval = setInterval(cleanup, 500);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('click', handleClick);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(interval);
    };
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
            animation: 'floatUpSingle 1s ease-out forwards',
            filter: 'drop-shadow(0 0 8px #ff00ff) drop-shadow(0 0 15px #ff00ff) drop-shadow(0 0 25px #ff00ff)',
          }}
          width="27"
          height="27"
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