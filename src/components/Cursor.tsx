'use client';

import { useState, useEffect } from 'react';

interface Heart {
  id: number;
  x: number;
  y: number;
  delay: number;
}

export default function Cursor() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setIsVisible(true);
    };

    const handleClick = (e: MouseEvent) => {
      const newHearts: Heart[] = [
        { id: Date.now(), x: e.clientX, y: e.clientY, delay: 0 },
        { id: Date.now() + 1, x: e.clientX - 15, y: e.clientY - 10, delay: 0.1 },
        { id: Date.now() + 2, x: e.clientX + 15, y: e.clientY - 10, delay: 0.2 },
      ];
      setHearts(prev => [...prev, ...newHearts]);
      
      setTimeout(() => {
        setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
      }, 1200);
    };

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
    };
  }, []);

  return (
    <>
      {!isVisible && <div className="hidden" />}
      {hearts.map(heart => (
        <svg
          key={heart.id}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: heart.x,
            top: heart.y,
            transform: 'translate(-50%, -50%)',
            animation: `floatUpMulti 1.2s ease-out forwards`,
            animationDelay: `${heart.delay}s`,
          }}
          width="27"
          height="27"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#f472b6"
          />
        </svg>
      ))}
    </>
  );
}