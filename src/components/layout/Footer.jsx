import React from 'react';
import { weddingData } from '../../config/weddingData';
import { BrandLogo } from '../common/BrandLogo';
import { Divider } from '../common/Divider';
import { RevealAnimation } from '../common/RevealAnimation';
import { PrintableItinerary } from '../common/PrintableItinerary';
import './Footer.css';

export const Footer = () => {
  const { couple, hero } = weddingData;

  return (
    <footer className="editorial-footer" aria-label="Wedding Closing Invitation">
      {/* Background radial stationery illumination */}
      <div className="footer-paper-backdrop" aria-hidden="true" />

      <div className="footer-centered-container text-center">
        
        {/* 1. Large Wedding Illustration Artwork (1200ms image-reveal, 100ms delay) */}
        <RevealAnimation animation="image-reveal" duration={1200} delay={100} className="footer-anim-block">
          <div className="footer-closing-image-wrapper">
            <figure className="footer-closing-figure">
              <div className="footer-image-frame">
                <img
                  src={hero.heroImage || "/assets/wedding/couple.jpg"}
                  alt="Ash & Sakshi wedding ceremony illustration"
                  className="footer-image-element"
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src.indexOf('couple.jpg') !== -1) {
                      e.currentTarget.src = '/assets/wedding/hero-couple.jpg';
                    }
                  }}
                />
              </div>
            </figure>
          </div>
        </RevealAnimation>

        {/* 2. Elegant Refined Script Thank-You Heading (900ms fade-up, 240ms delay) */}
        <RevealAnimation animation="fade-up" duration={900} delay={240} className="footer-anim-block">
          <h2 className="footer-thank-you-heading">
            Thank You for Celebrating Our Beginning
          </h2>
        </RevealAnimation>

        {/* 3. Small Subtle Decorative Star Divider (340ms delay) */}
        <RevealAnimation animation="fade-up" delay={340} className="footer-anim-block">
          <div className="footer-divider-wrapper">
            <Divider symbol="star" className="footer-star-divider" />
          </div>
        </RevealAnimation>

        {/* 4. Wedding Logo Emblem (700ms scale-up, 420ms delay) */}
        <RevealAnimation animation="scale-up" duration={750} delay={420} className="footer-anim-block">
          <div className="footer-monogram-block">
            <BrandLogo size="lg" />
          </div>
        </RevealAnimation>

        {/* 5. Couple Names, Date, and Venue (520ms delay) */}
        <RevealAnimation animation="fade-up" delay={520} className="footer-anim-block">
          <div className="footer-details-block">
            <p className="footer-couple-names">
              {couple.groom.firstName.toUpperCase()} &amp; {couple.bride.firstName.toUpperCase()}
            </p>
            <p className="footer-date-line">{couple.dateDisplay.toUpperCase()}</p>
            <p className="footer-venue-line">{couple.venueSummary ? couple.venueSummary.toUpperCase() : "WOODROSE, BELGAUM"}</p>
          </div>
        </RevealAnimation>

        {/* 8. Downloadable Keepsake / Printable PDF Itinerary */}
        <RevealAnimation animation="fade-up" delay={580} className="footer-anim-block">
          <PrintableItinerary />
        </RevealAnimation>

        {/* 6. Delicate Final Brand Signature (620ms delay) */}
        <RevealAnimation animation="fade-in" delay={640} className="footer-anim-block">
          <p className="footer-brand-tag">EverVow • Fine Art Wedding Invitations</p>
        </RevealAnimation>

      </div>
    </footer>
  );
};
