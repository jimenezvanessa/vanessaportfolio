'use client';

import { useState, useEffect } from 'react';

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest('a') || target.closest('button') || target.closest('nav');
      setIsHovering(!!isLink);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed pointer-events-none z-[9999] transition-all duration-200 ${
        isHovering ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <span 
        className="text-xl"
        style={{
          animation: isHovering ? 'floatHeart 1s ease-in-out infinite' : 'none',
        }}
      >
        〈3
      </span>
    </div>
  );
}