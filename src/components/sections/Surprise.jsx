import React from 'react';
import { weddingData } from '../../config/weddingData';
import { Eyebrow } from '../common/Eyebrow';
import { Divider } from '../common/Divider';
import { ScratchCard } from '../common/ScratchCard';
import { RevealAnimation } from '../common/RevealAnimation';
import './Surprise.css';

export const Surprise = () => {
  const { surprise } = weddingData;

  return (
    <section id="surprise" className="editorial-section surprise-section" aria-label="Interactive Wedding Surprise">
      {/* Soft atmospheric background glow */}
      <div className="surprise-paper-backdrop" aria-hidden="true" />

      <div className="section-container surprise-inner-container text-center">
        
        {/* Section Heading */}
        <header className="surprise-intro-header">
          <RevealAnimation animation="fade-up">
            <Eyebrow>{surprise.eyebrow || "FOR YOU"}</Eyebrow>
            <h2 className="surprise-main-heading">{surprise.heading}</h2>
            <Divider symbol="star" className="surprise-divider" />
            <p className="surprise-subtitle">{surprise.subtitle}</p>
          </RevealAnimation>
        </header>

        {/* Real HTML5 Canvas Gold Foil Large Centerpiece Scratch Card with scale-up reveal */}
        <div className="surprise-interactive-wrapper">
          <RevealAnimation animation="scale-up" delay={200} duration={900}>
            <ScratchCard />
          </RevealAnimation>
        </div>

      </div>
    </section>
  );
};
