import React from 'react';
import './BrandLogo.css';

export const BrandLogo = ({
  size = 'md',
  showText = false,
  className = ''
}) => {
  return (
    <div className={`brand-logo-container logo-size-${size} ${className}`} aria-label="EverVow Ash and Sakshi Monogram">
      <div className="brand-logo-emblem-frame">
        <img
          src="/Logos/couple_logo_transparent.png"
          alt="EverVow — Ash & Sakshi"
          className="brand-logo-image"
          loading="eager"
        />
      </div>

      {showText && (
        <div className="brand-logo-lockup-text">
          <span className="brand-title">EVERVOW</span>
          <span className="brand-couple-subtitle">Ash &amp; Sakshi</span>
        </div>
      )}
    </div>
  );
};
