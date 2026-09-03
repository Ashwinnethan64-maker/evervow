import React from 'react';
import './AmbientBackground.css';

/**
 * Ambient Background Atmosphere
 * - 18–22s Slow organic background gradients
 * - 18 Falling petals/particles (22–39s randomized drift & rotation)
 * - Subtle golden shimmer particles (5–9s glow)
 * All pointer-events: none and fully accessible.
 */
export const AmbientBackground = () => {
  // 18 Petals with randomized parameters for natural organic flow
  const petals = [
    { id: 1, left: '6%', size: '13px', duration: '28s', delay: '0s', sway: '45px', rot: '360deg' },
    { id: 2, left: '16%', size: '11px', duration: '34s', delay: '4s', sway: '-35px', rot: '480deg' },
    { id: 3, left: '26%', size: '15px', duration: '24s', delay: '8s', sway: '55px', rot: '280deg' },
    { id: 4, left: '38%', size: '10px', duration: '38s', delay: '2s', sway: '-40px', rot: '520deg' },
    { id: 5, left: '48%', size: '14px', duration: '30s', delay: '12s', sway: '38px', rot: '390deg' },
    { id: 6, left: '58%', size: '12px', duration: '26s', delay: '6s', sway: '-50px', rot: '420deg' },
    { id: 7, left: '68%', size: '16px', duration: '36s', delay: '15s', sway: '42px', rot: '340deg' },
    { id: 8, left: '78%', size: '11px', duration: '29s', delay: '1s', sway: '-48px', rot: '460deg' },
    { id: 9, left: '88%', size: '13px', duration: '33s', delay: '10s', sway: '35px', rot: '380deg' },
    { id: 10, left: '94%', size: '10px', duration: '31s', delay: '18s', sway: '-30px', rot: '500deg' },
    { id: 11, left: '12%', size: '12px', duration: '35s', delay: '14s', sway: '50px', rot: '310deg' },
    { id: 12, left: '22%', size: '14px', duration: '27s', delay: '20s', sway: '-42px', rot: '430deg' },
    { id: 13, left: '34%', size: '11px', duration: '39s', delay: '9s', sway: '36px', rot: '370deg' },
    { id: 14, left: '52%', size: '15px', duration: '32s', delay: '23s', sway: '-55px', rot: '490deg' },
    { id: 15, left: '64%', size: '13px', duration: '25s', delay: '17s', sway: '44px', rot: '350deg' },
    { id: 16, left: '74%', size: '10px', duration: '37s', delay: '25s', sway: '-38px', rot: '440deg' },
    { id: 17, left: '84%', size: '14px', duration: '28s', delay: '22s', sway: '48px', rot: '380deg' },
    { id: 18, left: '44%', size: '12px', duration: '33s', delay: '27s', sway: '-45px', rot: '410deg' }
  ];

  // Golden Shimmer Dust Particles
  const shimmers = [
    { id: 1, top: '15%', left: '18%', duration: '6.5s', delay: '0.5s', size: '4px' },
    { id: 2, top: '28%', left: '82%', duration: '7.8s', delay: '2.2s', size: '5px' },
    { id: 3, top: '45%', left: '12%', duration: '8.4s', delay: '1.4s', size: '3.5px' },
    { id: 4, top: '62%', left: '88%', duration: '5.9s', delay: '3.1s', size: '4.5px' },
    { id: 5, top: '78%', left: '22%', duration: '7.2s', delay: '4.5s', size: '5px' },
    { id: 6, top: '90%', left: '75%', duration: '6.8s', delay: '1.8s', size: '4px' }
  ];

  return (
    <div className="ambient-motion-container" aria-hidden="true">
      {/* 1. Subtle Slow Organic Background Glows */}
      <div className="ambient-glow ambient-glow-top" />
      <div className="ambient-glow ambient-glow-bottom" />

      {/* 2. Falling Petals */}
      <div className="ambient-petals-layer">
        {petals.map(p => (
          <div
            key={p.id}
            className="ambient-petal"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              '--sway-amount': p.sway,
              '--rotation-amount': p.rot
            }}
          >
            <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="petal-svg">
              <path
                d="M15 0 C22 8, 28 15, 24 23 C20 30, 10 30, 6 23 C2 15, 8 8, 15 0 Z"
                fill="rgba(238, 192, 185, 0.45)"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* 3. Golden Shimmer Particles */}
      <div className="ambient-shimmer-layer">
        {shimmers.map(s => (
          <div
            key={s.id}
            className="golden-shimmer-particle"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              animationDuration: s.duration,
              animationDelay: s.delay
            }}
          />
        ))}
      </div>
    </div>
  );
};
