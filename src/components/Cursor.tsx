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
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastPos.current.x === 0 && lastPos.current.y === 0) return;
      
      idCounter.current += 1;
      const newTrail: TrailHeart = {
        id: idCounter.current,
        x: lastPos.current.x,
        y: lastPos.current.y,
        createdAt: Date.now(),
      };
      setTrails(prev => [...prev, newTrail].slice(-20));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (trails.length === 0) return;
    
    const timer = setTimeout(() => {
      setTrails(prev => prev.slice(1));
    }, 50);
    return () => clearTimeout(timer);
  }, [trails.length]);

  return (
    <>
      {trails.map((trail) => {
        const age = Date.now() - trail.createdAt;
        const progress = Math.min(age / 1000, 1);
        
        return (
          <div
            key={trail.id}
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: trail.x,
              top: trail.y,
              transform: `translate(-50%, -50%) scale(${1 - progress * 0.7})`,
              opacity: 1 - progress,
            }}
          >
            <div 
              className="grid gap-px"
              style={{ 
                gridTemplateColumns: 'repeat(8, 2px)',
                imageRendering: 'pixelated',
              }}
            >
              {PIXEL_HEART.flat().map((pixel, i) => (
                <div
                  key={i}
                  style={{
                    width: '2px',
                    height: '2px',
                    backgroundColor: pixel ? '#ff69b4' : 'transparent',
                    boxShadow: pixel ? '0 0 1px #ff69b4' : 'none',
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