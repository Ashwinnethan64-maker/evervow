import React, { useRef, useEffect, useState } from 'react';
import { weddingData } from '../../config/weddingData';
import { BrandLogo } from './BrandLogo';
import './ScratchCard.css';

export const ScratchCard = ({
  onRevealComplete = () => {},
  revealThreshold = 0.45
}) => {
  const { surprise, couple } = weddingData;
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const lastPointRef = useRef(null);

  // Initialize Canvas with Rich Metallic Gold Foil Surface
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const drawFoilSurface = () => {
      const w = rect.width;
      const h = rect.height;

      // Base Rich Champagne/Gold Metallic Gradient
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#E6D29E');
      grad.addColorStop(0.25, '#F7EDD2');
      grad.addColorStop(0.5, '#DFC788');
      grad.addColorStop(0.75, '#F9F1DC');
      grad.addColorStop(1, '#C9A348');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Subtle Foil Speckle/Noise Texture
      ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
      for (let i = 0; i < 90; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 2.2;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(180, 140, 70, 0.12)';
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 1.8;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Elegant Stationery Outer Inset Border
      ctx.strokeStyle = 'rgba(100, 75, 55, 0.28)';
      ctx.lineWidth = 1;
      ctx.strokeRect(20, 20, w - 40, h - 40);

      // Delicate Champagne Inner Accent Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1;
      ctx.strokeRect(26, 26, w - 52, h - 52);

      // Foil Typography
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 1. SAVE THE DATE
      ctx.fillStyle = '#4A3B32';
      ctx.font = '600 13px Montserrat, sans-serif';
      ctx.letterSpacing = '5px';
      ctx.fillText(surprise.foilCover?.tagline || "SAVE THE DATE", w / 2, h / 2 - 58);

      // 2. Decorative Symbol & SCRATCH TO REVEAL
      ctx.fillStyle = '#8F5B53';
      ctx.font = 'normal 20px "Cormorant Garamond", Georgia, serif';
      ctx.fillText('✦', w / 2, h / 2 - 16);

      ctx.fillStyle = '#2F241E';
      ctx.font = 'normal 28px "Cormorant Garamond", Georgia, serif';
      ctx.letterSpacing = '4px';
      ctx.fillText(surprise.foilCover?.instruction || "SCRATCH TO REVEAL", w / 2, h / 2 + 20);

      // 3. SCRATCH GENTLY
      ctx.fillStyle = 'rgba(74, 59, 50, 0.7)';
      ctx.font = '500 11px Montserrat, sans-serif';
      ctx.letterSpacing = '3px';
      ctx.fillText("SCRATCH GENTLY", w / 2, h / 2 + 62);
    };

    drawFoilSurface();
  }, [surprise]);

  // Scratch Action Handling
  const scratch = (clientX, clientY) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const currentX = (clientX - rect.left) * dpr;
    const currentY = (clientY - rect.top) * dpr;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 44 * dpr;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(currentX, currentY, 22 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPointRef.current = { x: currentX, y: currentY };
    checkRevealProgress();
  };

  const checkRevealProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const { width, height } = canvas;
    
    const step = 10;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    let transparentCount = 0;
    let totalSampled = 0;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4 + 3;
        if (data[index] === 0) {
          transparentCount++;
        }
        totalSampled++;
      }
    }

    const ratio = transparentCount / totalSampled;
    if (ratio >= revealThreshold) {
      triggerRevealComplete();
    }
  };

  const triggerRevealComplete = () => {
    setIsRevealed(true);
    onRevealComplete();
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.transition = 'opacity 0.7s var(--ease-luxury)';
      canvas.style.opacity = '0';
      canvas.style.pointerEvents = 'none';
    }
  };

  const handleMouseDown = (e) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
    lastPointRef.current = null;
  };

  const handleTouchStart = (e) => {
    setIsScratching(true);
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (!isScratching) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
    if (e.cancelable) e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
    lastPointRef.current = null;
  };

  return (
    <div className="scratch-card-outer">
      <div
        ref={containerRef}
        className={`scratch-card-container ${isRevealed ? 'revealed' : ''}`}
      >
        {/* Layer 1: Underneath Luxury Revealed Stationery Content */}
        <div className="scratch-revealed-layer" aria-hidden={!isRevealed}>
          <div className="revealed-inner-border">
            <BrandLogo size="md" className="revealed-brand-logo" />
            
            <span className="revealed-save-label">SAVE THE DATE</span>
            
            <div className="revealed-date-composition">
              <h3 className="revealed-date-day">14 August</h3>
              <span className="revealed-date-year">2026</span>
            </div>

            <p className="revealed-closing-phrase">with all our love</p>
          </div>
        </div>

        {/* Layer 2: Scratch Gold Foil Canvas */}
        <canvas
          ref={canvasRef}
          className="scratch-foil-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="img"
          aria-label="Interactive gold foil scratch card to reveal wedding date"
        />

        {/* Shimmer Light Reflection Overlay on unrevealed card */}
        {!isRevealed && (
          <div className="foil-shimmer-reflection" aria-hidden="true" />
        )}

        {/* Celebration Particles */}
        {isRevealed && (
          <div className="celebration-particles" aria-hidden="true">
            <span className="particle petal petal-1">🌸</span>
            <span className="particle sparkle sparkle-1">✦</span>
            <span className="particle petal petal-2">🌸</span>
            <span className="particle sparkle sparkle-2">✧</span>
            <span className="particle petal petal-3">🌸</span>
            <span className="particle sparkle sparkle-3">✦</span>
          </div>
        )}
      </div>

      {/* Accessible & Direct Reveal Link */}
      <div className="scratch-accessible-fallback">
        {!isRevealed ? (
          <button
            type="button"
            className="accessible-reveal-btn"
            onClick={triggerRevealComplete}
            aria-label="Directly reveal the wedding date"
          >
            <span className="fallback-prompt">Prefer not to scratch?</span>
            <span className="fallback-action">REVEAL THE DATE</span>
          </button>
        ) : (
          <p className="accessible-revealed-status" aria-live="polite">
            ✦ 14 August 2026 • Woodrose, Belgaum ✦
          </p>
        )}
      </div>
    </div>
  );
};
