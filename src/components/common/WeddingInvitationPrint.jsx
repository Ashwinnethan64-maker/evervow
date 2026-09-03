import React from 'react';
import { weddingData } from '../../config/weddingData';
import { BrandLogo } from './BrandLogo';
import { Divider } from './Divider';
import './WeddingInvitationPrint.css';

/**
 * 5, 6, 7. DEDICATED ONE-PAGE WEDDING INVITATION PRINT/PDF LAYOUT
 * - Formatted strictly for exactly 1 page (A4 Portrait).
 * - Hidden in normal screen view; only visible during @media print or dedicated preview.
 * - Displays luxury invitation artwork, logo, couple names, date, venue, and fine floral dividers.
 * - Zero website clutter, zero navigation, zero audio controls, zero multi-page spills.
 */
export const WeddingInvitationPrint = () => {
  const { couple, events, hero } = weddingData;
  const primaryEvent = events[0];

  return (
    <div className="wedding-print-sheet" aria-hidden="true">
      <div className="print-page-boundary">
        
        {/* Fine Double Luxury Border with Corner Accents */}
        <div className="print-outer-border">
          <div className="print-inner-border">
            
            <span className="print-corner corner-tl">❧</span>
            <span className="print-corner corner-tr">❧</span>
            <span className="print-corner corner-bl">❧</span>
            <span className="print-corner corner-br">❧</span>

            <div className="print-content-stack">
              
              {/* Invocation */}
              <div className="print-invocation">
                <span className="print-invocation-text">Shree Ganeshaya Namaha</span>
              </div>

              {/* Logo Emblem */}
              <div className="print-logo-block">
                <BrandLogo size="lg" />
              </div>

              {/* Eyebrow */}
              <span className="print-eyebrow">TOGETHER WITH OUR FAMILIES</span>

              {/* Invitation Prompt */}
              <p className="print-prompt">
                cordially invite you to celebrate the engagement ceremony of
              </p>

              {/* Couple Names */}
              <div className="print-names-wrap">
                <h1 className="print-script-name print-groom">{couple.groom.firstName}</h1>
                <span className="print-joiner">WITH</span>
                <h1 className="print-script-name print-bride">{couple.bride.firstName}</h1>
              </div>

              {/* Gold Floral Divider */}
              <div className="print-divider-wrap">
                <Divider symbol="star" />
              </div>

              {/* Tagline */}
              <span className="print-tagline">SAVE THE DATE</span>

              {/* Date & Time */}
              <div className="print-datetime-block">
                <p className="print-date-display">{primaryEvent.dateFormatted || "Friday, 14 August 2026"}</p>
                <p className="print-time-display">{primaryEvent.timeFormatted || "7:15 PM onwards"}</p>
              </div>

              {/* Venue */}
              <div className="print-venue-block">
                <p className="print-venue-name">WOODROSE</p>
                <p className="print-venue-sub">Belgaum, Karnataka</p>
              </div>

              {/* Circular Ceremony Artwork */}
              <div className="print-artwork-frame">
                <img
                  src={hero.heroImage || "/assets/wedding/couple.jpg"}
                  alt="Ash & Sakshi wedding ceremony artwork"
                  className="print-artwork-img"
                  onError={(e) => {
                    if (e.currentTarget.src.indexOf('couple.jpg') !== -1) {
                      e.currentTarget.src = '/assets/wedding/hero-couple.jpg';
                    }
                  }}
                />
              </div>

              {/* Warm Closing Regards */}
              <div className="print-regards">
                <p className="print-regards-text">WITH WARM REGARDS FROM BOTH FAMILIES</p>
                <p className="print-brand-tag">EverVow • Ash &amp; Sakshi Forever</p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
