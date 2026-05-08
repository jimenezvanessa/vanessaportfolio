'use client';

import { useState, useEffect, useRef } from 'react';

interface TrailHeart {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

export default function Cursor() {
  const [trails, setTrails] = useState<TrailHeart[]>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      idCounter.current += 1;
      const newTrail: TrailHeart = {
        id: idCounter.current,
        x: e.clientX,
        y: e.clientY,
        createdAt: Date.now(),
      };
      setTrails(prev => [...prev, newTrail].slice(-20));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (trails.length === 0) return;
    
    const timer = setTimeout(() => {
      setTrails(prev => prev.slice(1));
    }, 16);
    return () => clearTimeout(timer);
  }, [trails.length]);

  return (
    <>
      {trails.map((trail) => {
        const age = Date.now() - trail.createdAt;
        const progress = Math.min(age / 600, 1);
        const opacity = 1 - progress;
        const scale = 1 - progress * 0.8;
        
        return (
          <div
            key={trail.id}
            className="fixed pointer-events-none z-[9999] heart-trail"
            style={{
              left: trail.x,
              top: trail.y,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              style={{ filter: 'drop-shadow(0 0 3px #ff69b4)' }}
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="#ff69b4"
              />
            </svg>
          </div>
        );
      })}
    </>
  );
}