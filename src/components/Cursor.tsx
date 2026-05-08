'use client';

import { useState, useEffect, useRef } from 'react';

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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState([{ x: 0, y: 0 }]);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      setTrails(prev => {
        const newTrails = [{ ...targetRef.current }, ...prev.slice(0, 5)];
        return newTrails;
      });
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <>
      {trails.map((pos, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: pos.x,
            top: pos.y,
            transform: 'translate(-50%, -50%)',
            opacity: 1 - index * 0.15,
            scale: 1 - index * 0.08,
            transition: 'opacity 0.1s, transform 0.1s',
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
      ))}
    </>
  );
}