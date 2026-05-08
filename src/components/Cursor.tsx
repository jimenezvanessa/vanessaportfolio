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
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lastPos.current = { x: e.clientX, y: e.clientY };
      setTrail({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-75"
        style={{
          left: trail.x,
          top: trail.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div 
          className="grid gap-px"
          style={{ 
            gridTemplateColumns: 'repeat(8, 2px)',
          }}
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
}