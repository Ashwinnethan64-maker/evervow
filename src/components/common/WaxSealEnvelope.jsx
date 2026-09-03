import React, { useState, useEffect } from 'react';
import { weddingData } from '../../config/weddingData';
import './WaxSealEnvelope.css';

/**
 * 1. FIX THE INVITATION CARD / ENVELOPE HERO
 * - No overlapping text: cleanly structured layout with dedicated upper address, center wax seal, and lower wedding info.
 * - Perfectly centered 3D rose/terracotta wax seal with debossed A&S monogram.
 * - "TAP TO UNSEAL" clearly visible below the seal with proper spacing.
 * - Responsive on desktop, tablet, and mobile.
 */
export const WaxSealEnvelope = ({ onUnseal }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { couple } = weddingData;

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Lock background scrolling while envelope overlay is visible
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleOpen = () => {
    if (isOpening || isDismissed) return;
    setIsOpening(true);

    // Scroll to top immediately when opening
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname + window.location.search);
    }

    setTimeout(() => {
      setIsDismissed(true);
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (onUnseal) onUnseal();
    }, 950);
  };

  if (isDismissed) return null;

  return (
    <div
      className={`wax-seal-overlay ${isOpening ? 'is-opening' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding Invitation Envelope"
    >
      <div className="wax-envelope-card" onClick={handleOpen}>
        
        {/* Envelope Top Triangular Flap & Foil Trims */}
        <div className="envelope-top-flap" aria-hidden="true">
          <div className="envelope-flap-inner" />
        </div>

        {/* Top Header Information: SPECIALLY CRAFTED FOR & Our Cherished Guests */}
        <div className="envelope-top-content">
          <span className="envelope-for-label">SPECIAL INVITATION FOR</span>
          <h2 className="envelope-guest-name">Our Cherished Guests</h2>
        </div>

        {/* Center: 3D Embossed Terracotta/Rose Wax Seal & Tap Hint */}
        <div className="envelope-seal-wrapper">
          <button
            type="button"
            className="wax-seal-button"
            onClick={handleOpen}
            aria-label="Break wax seal and open wedding invitation"
          >
            <div className="wax-seal-ring">
              <div className="wax-seal-rim" />
              <div className="wax-seal-core">
                <span className="wax-monogram">
                  {couple.groom.firstName[0]}<span className="wax-flourish">❦</span>{couple.bride.firstName[0]}
                </span>
              </div>
            </div>
            <span className="wax-seal-tap-hint">TAP TO UNSEAL</span>
          </button>
        </div>

        {/* Bottom Details: Couple Names, Date & Location */}
        <div className="envelope-bottom-content">
          <span className="envelope-couple-names">
            {couple.groom.firstName} &amp; {couple.bride.firstName}
          </span>
          <span className="envelope-date-line">
            {couple.dateDisplay} · {couple.venueSummary ? "WOODROSE, BELGAUM" : "BELGAUM"}
          </span>
        </div>

      </div>

      {/* Direct Skip Button for Accessibility */}
      <button
        type="button"
        className="envelope-skip-btn"
        onClick={handleOpen}
        aria-label="Skip invitation envelope and view website directly"
      >
        Enter Directly →
      </button>
    </div>
  );
};
