import React from 'react';
import { weddingData } from '../../config/weddingData';
import { BrandLogo } from '../common/BrandLogo';
import { Divider } from '../common/Divider';
import { RevealAnimation } from '../common/RevealAnimation';
import './Hero.css';

export const Hero = () => {
  const { couple, hero } = weddingData;

  const renderAnimatedLetters = (text, startDelay = 320) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="hero-letter"
        style={{
          animationDelay: `${startDelay + index * 55}ms`
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section id="hero" className="hero-section" aria-label="Wedding Opening Invitation">
      <div className="section-container-narrow hero-inner-container">
        
        {/* Step 1: Couple Brand Logo Emblem (0.05s) */}
        <RevealAnimation animation="scale-up" duration={950} delay={50} className="hero-monogram-block">
          <BrandLogo size="lg" />
        </RevealAnimation>

        {/* Step 2: "TOGETHER WITH OUR FAMILIES" (0.18s) */}
        <RevealAnimation animation="fade-up" duration={800} delay={180} className="hero-eyebrow-block">
          <span className="hero-eyebrow-text">{hero.eyebrow}</span>
        </RevealAnimation>

        {/* Step 3: Ash WITH Sakshi (Letter-by-Letter Character Reveal) */}
        <div className="hero-names-architecture">
          <div className="hero-name-item">
            <h1 className="hero-script-name hero-name-groom" aria-label={couple.groom.firstName}>
              {renderAnimatedLetters(couple.groom.firstName, 300)}
            </h1>
          </div>

          <RevealAnimation animation="scale-up" duration={700} delay={460} className="hero-joiner-item">
            <span className="hero-joiner-text">{hero.scriptJoiner}</span>
          </RevealAnimation>

          <div className="hero-name-item">
            <h1 className="hero-script-name hero-name-bride" aria-label={couple.bride.firstName}>
              {renderAnimatedLetters(couple.bride.firstName, 560)}
            </h1>
          </div>
        </div>

        {/* Small delicate star divider beneath couple names */}
        <RevealAnimation animation="scale-up" duration={700} delay={660} className="hero-divider-block">
          <Divider symbol="star" className="hero-star-divider" />
        </RevealAnimation>

        {/* Step 4: Secondary Wedding Information */}
        <RevealAnimation animation="fade-up" duration={850} delay={760} className="hero-details-block">
          <span className="hero-save-date-label">{hero.tagline}</span>
          <p className="hero-date-line">{hero.date}</p>
          <p className="hero-location-line">{hero.location}</p>
        </RevealAnimation>

        {/* Step 5: Seamlessly Integrated Couple Wedding Photograph with 9s Breathing Animation */}
        <RevealAnimation animation="image-reveal" duration={1100} delay={880} className="hero-photograph-block">
          <div className="hero-integrated-photo-container">
            <div className="photo-blend-top-overlay" aria-hidden="true" />
            <img
              src="/assets/wedding/couple.jpg"
              alt="Ash & Sakshi couple wedding ceremony artwork"
              className="hero-integrated-photo-img hero-breathing-photo"
              loading="eager"
              onError={(e) => {
                if (e.currentTarget.src.indexOf('couple.jpg') !== -1) {
                  e.currentTarget.src = '/assets/wedding/hero-couple.jpg';
                }
              }}
            />
            <div className="photo-blend-bottom-overlay" aria-hidden="true" />
          </div>
        </RevealAnimation>

        {/* Step 6: Ceremonial Scroll Indicator */}
        <RevealAnimation animation="fade-up" duration={900} delay={1000} className="hero-scroll-block">
          <a href="#story" className="hero-scroll-link" aria-label="Scroll to continue exploring">
            <span className="hero-scroll-caption">{hero.scrollHint}</span>
            <div className="hero-scroll-line-wrapper" aria-hidden="true">
              <span className="hero-scroll-indicator-line" />
            </div>
          </a>
        </RevealAnimation>

      </div>
    </section>
  );
};
