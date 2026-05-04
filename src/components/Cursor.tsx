'use client';

import { useState, useEffect, useRef } from 'react';

interface HeartData {
  id: number;
  x: number;
  y: number;
}

interface CursorHeart {
  x: number;
  y: number;
}

export default function Cursor() {
  const [hearts, setHearts] = useState<HeartData[]>([]);
  const [cursorHeart, setCursorHeart] = useState<CursorHeart>({ x: 0, y: 0 });
  const idCounter = useRef(0);
  const mouseMoving = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      idCounter.current += 1;
      const newHeart: HeartData = {
        id: idCounter.current,
        x: e.clientX,
        y: e.clientY,
      };
      setHearts(prev => {
        const updated = [...prev, newHeart];
        return updated.slice(-10);
      });
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorHeart({ x: e.clientX, y: e.clientY });
      mouseMoving.current = true;
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        mouseMoving.current = false;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHearts(prev => prev.slice(1));
    }, 2500);
    return () => clearTimeout(timer);
  }, [hearts]);

  return (
    <>
      <svg
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: cursorHeart.x,
          top: cursorHeart.y,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.1s ease-out, top 0.1s ease-out',
          filter: 'drop-shadow(0 0 6px #ff00ff)',
        }}
        width="18"
        height="18"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="#ff00ff"
        />
      </svg>

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
          width="25"
          height="25"
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