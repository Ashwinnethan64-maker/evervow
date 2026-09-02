import React from 'react';
import { weddingData } from '../../config/weddingData';
import { BrandLogo } from '../common/BrandLogo';
import { Divider } from '../common/Divider';
import { RevealAnimation } from '../common/RevealAnimation';
import './Invitation.css';

export const Invitation = () => {
  const { invitation, couple, events } = weddingData;
  const primaryEvent = events.find(e => e.id === invitation.primaryEventId) || events[0];

  if (!primaryEvent) return null;

  return (
    <section id="invitation" className="editorial-section invitation-section" aria-label="Formal Wedding Invitation">
      {/* Soft luxury stationery background glow */}
      <div className="invitation-paper-backdrop" aria-hidden="true" />

      <div className="section-container invitation-inner-container">
        {/* Physical Stationery Sheet with 950ms card-reveal entrance */}
        <RevealAnimation animation="card-reveal" duration={950}>
          <div className="physical-stationery-sheet">
            
            {/* Subtle Botanical Corner Embellishments */}
            <div className="corner-flourish corner-top-left" aria-hidden="true">❧</div>
            <div className="corner-flourish corner-top-right" aria-hidden="true">❧</div>
            <div className="corner-flourish corner-bottom-left" aria-hidden="true">❧</div>
            <div className="corner-flourish corner-bottom-right" aria-hidden="true">❧</div>

            <div className="stationery-inner-border">
              
              {/* 1. Shree Ganeshaya Namaha (100ms) */}
              <RevealAnimation animation="fade-up" delay={100}>
                <div className="invitation-invocation-block">
                  <span className="invocation-text">{invitation.ceremonialHeader || "Shree Ganeshaya Namaha"}</span>
                </div>
              </RevealAnimation>

              {/* 2. EverVow Brand Logo Emblem (200ms) */}
              <RevealAnimation animation="scale-up" delay={200}>
                <div className="invitation-monogram-block">
                  <BrandLogo size="md" />
                </div>
              </RevealAnimation>

              {/* 3. Invitation Prompt (300ms) */}
              <RevealAnimation animation="fade-up" delay={300}>
                <p className="invitation-prompt-text">
                  {primaryEvent.invitationPrompt}
                </p>
              </RevealAnimation>

              {/* 4. Dominant Couple Names: Ash WITH Sakshi (400ms) */}
              <RevealAnimation animation="fade-up" delay={400}>
                <div className="invitation-couple-names-wrapper">
                  <span className="invitation-name">{couple.groom.firstName}</span>
                  <span className="invitation-name-joiner">{weddingData.hero.scriptJoiner || "WITH"}</span>
                  <span className="invitation-name">{couple.bride.firstName}</span>
                </div>
              </RevealAnimation>

              {/* 5. Fine Stationery Champagne-Gold Divider (500ms) */}
              <RevealAnimation animation="fade-up" delay={500}>
                <Divider symbol="star" className="invitation-gold-divider" />
              </RevealAnimation>

              {/* 6. Event Information: DATE | TIME | VENUE (600ms) */}
              <RevealAnimation animation="fade-up" delay={600}>
                <div className="invitation-event-info-row">
                  <div className="event-info-col">
                    <span className="info-col-label">DATE</span>
                    <span className="info-col-value-primary">Friday, 14</span>
                    <span className="info-col-value-secondary">August 2026</span>
                  </div>

                  <div className="event-info-divider-vertical" aria-hidden="true" />

                  <div className="event-info-col">
                    <span className="info-col-label">TIME</span>
                    <span className="info-col-value-primary">7:15 PM</span>
                    <span className="info-col-value-secondary">onwards</span>
                  </div>

                  <div className="event-info-divider-vertical" aria-hidden="true" />

                  <div className="event-info-col">
                    <span className="info-col-label">VENUE</span>
                    <span className="info-col-value-primary">Woodrose, Belgaum</span>
                    <span className="info-col-value-secondary">Karnataka</span>
                  </div>
                </div>
              </RevealAnimation>

              {/* 7. Understated Regards (700ms) */}
              <RevealAnimation animation="fade-up" delay={700}>
                <div className="invitation-regards-block">
                  <span className="regards-label">{primaryEvent.regards}</span>
                </div>
              </RevealAnimation>

            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};
