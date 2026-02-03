'use client';

import { useState, useEffect } from 'react';

export default function CursorTrail() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Check if hovering over a clickable element
            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'A'
            );
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, input {
          cursor: none;
        }
      `}</style>
            <div
                className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out flex items-center justify-center will-change-transform"
                style={{
                    left: 0,
                    top: 0,
                    transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
                }}
            >
                <div className="text-3xl filter drop-shadow-lg animate-pulse-heart">
                    ❤️
                </div>
            </div>
        </>
    );
}
