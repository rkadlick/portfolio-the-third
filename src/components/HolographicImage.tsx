'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface HolographicImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function HolographicImage({ src, alt, className }: HolographicImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cursorLightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    const cursorLight = cursorLightRef.current;
    if (!container || !card || !cursorLight) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      
      // Calculate rotation
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      const rotateY = (mouseX / (rect.width / 2)) * 10;
      const rotateX = -(mouseY / (rect.height / 2)) * 10;

      // Calculate cursor position relative to the container
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--rotateY', `${rotateY}deg`);
      card.style.setProperty('--rotateX', `${rotateX}deg`);
      cursorLight.style.setProperty('--cursor-x', `${x}%`);
      cursorLight.style.setProperty('--cursor-y', `${y}%`);
    };

    const handleMouseLeave = () => {
      card.style.setProperty('--rotateY', '0deg');
      card.style.setProperty('--rotateX', '0deg');
      cursorLight.style.setProperty('--cursor-x', '50%');
      cursorLight.style.setProperty('--cursor-y', '50%');
    };

    container.addEventListener('mousemove', handleMouseMove as EventListener);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove as EventListener);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="holo-container relative aspect-[3/4] w-full">
      <div ref={cardRef} className="holo-card absolute inset-0">
        <div className="holo-shine absolute inset-0"></div>
        <Image
          src={src}
          alt={alt}
          className={`object-contain rounded-2xl ${className || ''}`}
          fill
          priority
          sizes="40vw"
        />
        <div ref={cursorLightRef} className="holo-cursor-light"></div>
        <div className="holo-border"></div>
      </div>
    </div>
  );
} 