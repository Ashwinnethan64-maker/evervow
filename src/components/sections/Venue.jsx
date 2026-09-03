import React, { useState } from 'react';
import { weddingData } from '../../config/weddingData';
import { Eyebrow } from '../common/Eyebrow';
import { Divider } from '../common/Divider';
import { RevealAnimation } from '../common/RevealAnimation';
import './Venue.css';

export const Venue = () => {
  const { venue, travelConcierge } = weddingData;
  const [activeTab, setActiveTab] = useState('transit'); // 'transit' | 'stays'

  const activeAdditionalInfo = Object.entries(venue.additionalInfo || {}).filter(
    ([_, value]) => value && typeof value === 'string' && value.trim().length > 0
  );

  return (
    <section id="venue" className="editorial-section venue-section" aria-label="Venue and Location">
      {/* Background radial glow */}
      <div className="venue-paper-backdrop" aria-hidden="true" />

      <div className="section-container venue-inner-container">
        
        {/* Header */}
        <header className="venue-header text-center">
          <RevealAnimation animation="fade-up">
            <Eyebrow>{venue.eyebrow}</Eyebrow>
            <h2 className="venue-main-heading">{venue.title}</h2>
            <Divider symbol="star" className="venue-divider" />
          </RevealAnimation>
        </header>

        {/* Full-Width Luxury Venue Image Artwork with 1100ms image-reveal */}
        <div className="venue-cinematic-image-wrapper">
          <RevealAnimation animation="image-reveal" duration={1100} delay={100}>
            <figure className="venue-figure">
              <div className="venue-image-frame">
                <img
                  src={venue.image}
                  alt={venue.imageAlt}
                  className="venue-image-element"
                  loading="lazy"
                />
              </div>
            </figure>
          </RevealAnimation>
        </div>

        {/* 2 Equal-Height Balanced Columns: Left = Details Card (200ms), Right = Google Maps (320ms) */}
        <div className="venue-editorial-grid">
          
          {/* Left Column: Venue Information Card */}
          <RevealAnimation animation="card-reveal" delay={200} duration={850} className="venue-grid-col">
            <div className="venue-info-card">
              <div className="venue-info-card-inner">
                
                {/* Address Group */}
                <div className="venue-detail-group">
                  <span className="venue-sublabel">ADDRESS</span>
                  <h3 className="venue-name-heading">{venue.name}</h3>
                  <p className="venue-city-text">{venue.city}, {venue.state}</p>
                </div>

                <div className="venue-card-divider" aria-hidden="true" />

                {/* Event Timing Group */}
                <div className="venue-detail-group">
                  <span className="venue-sublabel">EVENT TIMING</span>
                  <p className="timing-value">{venue.timingDisplay}</p>
                </div>

                {/* Get Directions Button */}
                <div className="venue-action-wrapper">
                  <a
                    href={venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="venue-directions-btn"
                    aria-label={`Get directions to ${venue.name} ${venue.city}`}
                  >
                    GET DIRECTIONS
                  </a>
                </div>

              </div>
            </div>
          </RevealAnimation>

          {/* Right Column: Google Maps Interactive Embed Card */}
          <RevealAnimation animation="card-reveal" delay={320} duration={850} className="venue-grid-col">
            <div className="venue-map-card">
              <div className="venue-map-card-inner">
                
                {/* Top-Left 'Open in Maps' floating button */}
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="open-in-maps-overlay-btn"
                  aria-label={`Open ${venue.name} in Google Maps`}
                >
                  <span>OPEN IN MAPS</span>
                  <span className="arrow-icon">↗</span>
                </a>

                {/* Google Maps Embed iframe */}
                <iframe
                  title="Google Maps Location for Woodrose Belgaum"
                  src={venue.embedMapUrl}
                  className="venue-map-iframe"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

              </div>
            </div>
          </RevealAnimation>

        </div>

        {/* 5. Out-of-Town Guest Concierge (Belgaum Travel & Stays) */}
        {travelConcierge && (
          <div className="travel-concierge-wrapper">
            <RevealAnimation animation="fade-up" delay={380} duration={850}>
              <div className="travel-concierge-card">
                <div className="concierge-header">
                  <span className="concierge-eyebrow">OUT-OF-TOWN GUESTS</span>
                  <h3 className="concierge-title">Belgaum Travel &amp; Stay Concierge</h3>
                  
                  {/* Tabs */}
                  <div className="concierge-tabs-row" role="tablist">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'transit'}
                      className={`concierge-tab-btn ${activeTab === 'transit' ? 'active-tab' : ''}`}
                      onClick={() => setActiveTab('transit')}
                    >
                      ✈️ Transit &amp; Airports
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'stays'}
                      className={`concierge-tab-btn ${activeTab === 'stays' ? 'active-tab' : ''}`}
                      onClick={() => setActiveTab('stays')}
                    >
                      🏨 Recommended Stays
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="concierge-tab-content">
                  {activeTab === 'transit' ? (
                    <div className="concierge-grid transit-grid">
                      {travelConcierge.transit.map((item) => (
                        <div key={item.title} className="concierge-item-card">
                          <h4 className="item-title">{item.title}</h4>
                          <p className="item-detail">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="concierge-grid stays-grid">
                      {travelConcierge.stays.map((hotel) => (
                        <div key={hotel.name} className="concierge-item-card hotel-card">
                          <h4 className="item-title">{hotel.name}</h4>
                          <span className="hotel-rating">{hotel.rating}</span>
                          <p className="item-detail">{hotel.distance}</p>
                          <a href={`tel:${hotel.phone}`} className="hotel-phone-link">{hotel.phone}</a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </RevealAnimation>
          </div>
        )}

        {/* Supporting Travel Information */}
        {activeAdditionalInfo.length > 0 && (
          <div className="venue-additional-info-wrapper">
            <div className="venue-additional-grid">
              {activeAdditionalInfo.map(([key, text], iIdx) => (
                <RevealAnimation
                  key={key}
                  animation="fade-up"
                  delay={420 + iIdx * 100}
                  duration={750}
                  className="additional-info-col"
                >
                  <span className="additional-info-label">{key.toUpperCase()}</span>
                  <p className="additional-info-text">{text}</p>
                </RevealAnimation>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
