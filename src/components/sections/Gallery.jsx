import React, { useState, useRef } from 'react';
import { weddingData } from '../../config/weddingData';
import { Eyebrow } from '../common/Eyebrow';
import { Divider } from '../common/Divider';
import { RevealAnimation } from '../common/RevealAnimation';
import { Lightbox } from '../common/Lightbox';
import './Gallery.css';

export const Gallery = () => {
  const { gallery } = weddingData;
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const triggerElementsRef = useRef({});

  const images = gallery.images || [];

  const openLightbox = (index) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    const lastOpenedId = images[activeImageIndex]?.id;
    setActiveImageIndex(null);

    if (lastOpenedId && triggerElementsRef.current[lastOpenedId]) {
      setTimeout(() => {
        triggerElementsRef.current[lastOpenedId]?.focus();
      }, 50);
    }
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const img1 = images[0]; // story-1-BE3UnMDF.jpg (Left Tall Portrait)
  const img2 = images[1]; // couple.jpg (Top Right 1: Proposal)
  const img3 = images[2]; // story-2-A463YQLO.jpg (Top Right 2: Tea ceremony)
  const img4 = images[3]; // venue-nqUDGq52.jpg (Middle Right Wide: Woodrose)
  const img5 = images[4]; // thankyou-0fdsHCDC.jpg (Bottom Full-width Wide: Sunset couple)

  return (
    <section id="gallery" className="editorial-section gallery-section" aria-label="Moments, framed photo gallery">
      {/* Background radial glow */}
      <div className="gallery-paper-backdrop" aria-hidden="true" />

      <div className="section-container gallery-inner-container">
        
        {/* Section Heading & Eyebrow */}
        <header className="gallery-header text-center">
          <RevealAnimation animation="fade-up">
            <Eyebrow>{gallery.eyebrow || "EDITORIAL"}</Eyebrow>
            <h2 className="gallery-main-heading">{gallery.heading || "Moments, framed"}</h2>
            <Divider symbol="star" className="gallery-divider" />
            {gallery.subtitle && (
              <p className="gallery-subtitle">{gallery.subtitle}</p>
            )}
          </RevealAnimation>
        </header>

        {/* Editorial Photo Composition Spread matching Reference with Staggered Image Reveals */}
        <div className="gallery-editorial-composition">
          
          {/* Main Top Composition Block: Left Tall Feature + Right Multi-grid */}
          <div className="gallery-main-split-block">
            
            {/* 1. Left Tall Feature (0ms delay, 900ms image-reveal) */}
            {img1 && (
              <div className="gallery-left-feature-col">
                <RevealAnimation animation="image-reveal" duration={900} delay={0}>
                  <div className="gallery-card-frame gallery-tall-feature-frame">
                    <button
                      ref={(el) => (triggerElementsRef.current[img1.id] = el)}
                      type="button"
                      className="gallery-thumbnail-btn"
                      onClick={() => openLightbox(0)}
                      aria-label={`View photo: ${img1.alt}`}
                    >
                      <img
                        src={img1.src}
                        alt={img1.alt}
                        className="gallery-photo-img"
                        loading="eager"
                      />
                      <div className="thumbnail-hover-overlay" aria-hidden="true">
                        <span className="hover-expand-icon">⤢</span>
                        {img1.caption && (
                          <span className="hover-caption">{img1.caption}</span>
                        )}
                      </div>
                    </button>
                  </div>
                </RevealAnimation>
              </div>
            )}

            {/* Right Column: 2 Small Squares (120ms, 220ms) + 1 Wide Venue Card (340ms) */}
            <div className="gallery-right-multi-col">
              
              {/* Row of 2 Small Cards */}
              <div className="gallery-two-squares-row">
                {img2 && (
                  <div className="gallery-square-item">
                    <RevealAnimation animation="image-reveal" duration={850} delay={120}>
                      <div className="gallery-card-frame gallery-square-frame">
                        <button
                          ref={(el) => (triggerElementsRef.current[img2.id] = el)}
                          type="button"
                          className="gallery-thumbnail-btn"
                          onClick={() => openLightbox(1)}
                          aria-label={`View photo: ${img2.alt}`}
                        >
                          <img
                            src={img2.src}
                            alt={img2.alt}
                            className="gallery-photo-img"
                            loading="lazy"
                          />
                          <div className="thumbnail-hover-overlay" aria-hidden="true">
                            <span className="hover-expand-icon">⤢</span>
                            {img2.caption && (
                              <span className="hover-caption">{img2.caption}</span>
                            )}
                          </div>
                        </button>
                      </div>
                    </RevealAnimation>
                  </div>
                )}

                {img3 && (
                  <div className="gallery-square-item">
                    <RevealAnimation animation="image-reveal" duration={850} delay={220}>
                      <div className="gallery-card-frame gallery-square-frame">
                        <button
                          ref={(el) => (triggerElementsRef.current[img3.id] = el)}
                          type="button"
                          className="gallery-thumbnail-btn"
                          onClick={() => openLightbox(2)}
                          aria-label={`View photo: ${img3.alt}`}
                        >
                          <img
                            src={img3.src}
                            alt={img3.alt}
                            className="gallery-photo-img"
                            loading="lazy"
                          />
                          <div className="thumbnail-hover-overlay" aria-hidden="true">
                            <span className="hover-expand-icon">⤢</span>
                            {img3.caption && (
                              <span className="hover-caption">{img3.caption}</span>
                            )}
                          </div>
                        </button>
                      </div>
                    </RevealAnimation>
                  </div>
                )}
              </div>

              {/* Wide Venue Card (340ms) */}
              {img4 && (
                <div className="gallery-venue-wide-item">
                  <RevealAnimation animation="image-reveal" duration={850} delay={340}>
                    <div className="gallery-card-frame gallery-venue-wide-frame">
                      <button
                        ref={(el) => (triggerElementsRef.current[img4.id] = el)}
                        type="button"
                        className="gallery-thumbnail-btn"
                        onClick={() => openLightbox(3)}
                        aria-label={`View photo: ${img4.alt}`}
                      >
                        <img
                          src={img4.src}
                          alt={img4.alt}
                          className="gallery-photo-img"
                          loading="lazy"
                        />
                        <div className="thumbnail-hover-overlay" aria-hidden="true">
                          <span className="hover-expand-icon">⤢</span>
                          {img4.caption && (
                            <span className="hover-caption">{img4.caption}</span>
                          )}
                        </div>
                      </button>
                    </div>
                  </RevealAnimation>
                </div>
              )}

            </div>

          </div>

          {/* Bottom Full-Width Wide Artwork: Sunset Couple (460ms delay, 1050ms duration) */}
          {img5 && (
            <div className="gallery-bottom-wide-block">
              <RevealAnimation animation="image-reveal" duration={1050} delay={460}>
                <div className="gallery-card-frame gallery-bottom-panoramic-frame">
                  <button
                    ref={(el) => (triggerElementsRef.current[img5.id] = el)}
                    type="button"
                    className="gallery-thumbnail-btn"
                    onClick={() => openLightbox(4)}
                    aria-label={`View photo: ${img5.alt}`}
                  >
                    <img
                      src={img5.src}
                      alt={img5.alt}
                      className="gallery-photo-img"
                      loading="lazy"
                    />
                    <div className="thumbnail-hover-overlay" aria-hidden="true">
                      <span className="hover-expand-icon">⤢</span>
                      {img5.caption && (
                        <span className="hover-caption">{img5.caption}</span>
                      )}
                    </div>
                  </button>
                </div>
              </RevealAnimation>
            </div>
          )}

        </div>

      </div>

      {/* Accessible Full-Screen Lightbox Viewer */}
      <Lightbox
        images={images}
        currentIndex={activeImageIndex !== null ? activeImageIndex : 0}
        isOpen={activeImageIndex !== null}
        onClose={closeLightbox}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};
