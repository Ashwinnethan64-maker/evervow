import React, { useEffect, useRef, useState } from 'react';
import './RevealAnimation.css';

/**
 * Editorial Motion Engine Component
 * Triggers smooth, cinematic scroll entrance animations when scrolled into viewport.
 * 
 * Presets:
 * - 'fade-up' (standard typography, labels, paragraphs, buttons)
 * - 'fade-in' (subtle ambient presence)
 * - 'card-reveal' (physical stationery cards, panels, countdown units)
 * - 'image-reveal' (photographs, venue banners, gallery cards)
 * - 'scale-up' (monograms, logos, emblems)
 * - 'text-reveal' (calligraphy / titles)
 */
export const RevealAnimation = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration,
  className = '',
  as: Component = 'div',
  threshold = 0.1,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const currentEl = elementRef.current;
    if (!currentEl) return;

    // Check if element is already inside the viewport on initial load
    const rect = currentEl.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.unobserve(currentEl);
    };
  }, [threshold]);

  const customStyle = {
    '--reveal-delay': `${delay}ms`,
    ...(duration ? { '--reveal-duration': `${duration}ms` } : {}),
    ...props.style
  };

  return (
    <Component
      ref={elementRef}
      className={`reveal-wrapper anim-${animation} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={customStyle}
      {...props}
    >
      {children}
    </Component>
  );
};
