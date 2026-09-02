import React from 'react';
import { weddingData } from '../../config/weddingData';
import { BrandLogo } from '../common/BrandLogo';
import { Divider } from '../common/Divider';
import './Hero.css';

export const Hero = () => {
  const { couple, hero } = weddingData;

  return (
    <section id="hero" className="hero-section" aria-label="Wedding Opening Invitation">
      <div className="section-container-narrow hero-inner-container">
        
        {/* Step 1: Couple Brand Logo Emblem (Prominent 120-150px desktop, 90-115px mobile) */}
        <div className="hero-anim-item hero-monogram-block">
          <BrandLogo size="lg" />
        </div>

        {/* Step 2: "TOGETHER WITH OUR FAMILIES" */}
        <div className="hero-anim-item hero-eyebrow-block">
          <span className="hero-eyebrow-text">{hero.eyebrow}</span>
        </div>

        {/* Step 3: Ash WITH Sakshi (Primary Focal Point) */}
        <div className="hero-names-architecture">
          <div className="hero-anim-item hero-name-item">
            <span className="hero-script-name">{couple.groom.firstName}</span>
          </div>

          <div className="hero-anim-item hero-joiner-item">
            <span className="hero-joiner-text">{hero.scriptJoiner}</span>
          </div>

          <div className="hero-anim-item hero-name-item">
            <span className="hero-script-name">{couple.bride.firstName}</span>
          </div>
        </div>

        {/* Small delicate star divider beneath couple names */}
        <div className="hero-anim-item hero-divider-block">
          <Divider symbol="star" className="hero-star-divider" />
        </div>

        {/* Step 4: Secondary Wedding Information */}
        <div className="hero-anim-item hero-details-block">
          <span className="hero-save-date-label">{hero.tagline}</span>
          <p className="hero-date-line">{hero.date}</p>
          <p className="hero-location-line">{hero.location}</p>
        </div>

        {/* Step 5: Seamlessly Integrated Couple Wedding Photograph (New couple.jpg) */}
        <div className="hero-anim-item hero-photograph-block">
          <div className="hero-integrated-photo-container">
            <div className="photo-blend-top-overlay" aria-hidden="true" />
            <img
              src="/assets/wedding/couple.jpg"
              alt="Ash & Sakshi couple wedding ceremony artwork"
              className="hero-integrated-photo-img"
              loading="eager"
              onError={(e) => {
                // Fallback to hero-couple.jpg if couple.jpg is not found
                if (e.currentTarget.src.indexOf('couple.jpg') !== -1) {
                  e.currentTarget.src = '/assets/wedding/hero-couple.jpg';
                }
              }}
            />
            <div className="photo-blend-bottom-overlay" aria-hidden="true" />
          </div>
        </div>

        {/* Step 6: Ceremonial Scroll Indicator */}
        <div className="hero-anim-item hero-scroll-block">
          <a href="#story" className="hero-scroll-link" aria-label="Scroll to continue exploring">
            <span className="hero-scroll-caption">{hero.scrollHint}</span>
            <div className="hero-scroll-line-wrapper" aria-hidden="true">
              <span className="hero-scroll-indicator-line" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};
