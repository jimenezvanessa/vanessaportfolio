'use client';

import { useState, useEffect, useRef } from 'react';

interface TrailHeart {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

const PIXEL_HEART = [
  [0,0,0,0,0,0,0,0],
  [0,1,1,0,0,1,1,0],
  [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,0,0],
  [0,0,0,1,1,0,0,0],
];

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
      setTrails(prev => [...prev, newTrail].slice(-15));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (trails.length === 0) return;
    
    const timer = setTimeout(() => {
      setTrails(prev => prev.slice(1));
    }, 80);
    return () => clearTimeout(timer);
  }, [trails.length]);

  return (
    <>
      {trails.map((trail) => {
        const age = Date.now() - trail.createdAt;
        const progress = Math.min(age / 1200, 1);
        
        return (
          <div
            key={trail.id}
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: trail.x,
              top: trail.y,
              transform: `translate(-50%, -50%) scale(${1 - progress * 0.8})`,
              opacity: 1 - progress,
              transition: 'none',
            }}
          >
            <div 
              className="grid gap-px"
              style={{ gridTemplateColumns: 'repeat(8, 2px)' }}
            >
              {PIXEL_HEART.flat().map((pixel, i) => (
                <div
                  key={i}
                  style={{
                    width: '2px',
                    height: '2px',
                    backgroundColor: pixel ? '#ff69b4' : 'transparent',
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}