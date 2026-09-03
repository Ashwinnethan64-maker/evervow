import React from 'react';
import { weddingData } from '../../config/weddingData';
import { Eyebrow } from '../common/Eyebrow';
import { Divider } from '../common/Divider';
import { RevealAnimation } from '../common/RevealAnimation';
import './AttireGuide.css';

/**
 * 4. Dress Code & Attire Palette Visual Guide
 * Refined editorial swatch strip showing color swatches & attire suggestions.
 */
export const AttireGuide = () => {
  const { attire } = weddingData;
  if (!attire) return null;

  return (
    <div className="attire-guide-section">
      <RevealAnimation animation="fade-up" duration={850}>
        <div className="attire-guide-card">
          <Eyebrow>{attire.eyebrow}</Eyebrow>
          <h3 className="attire-guide-title">{attire.title}</h3>
          <Divider symbol="star" className="attire-divider" />
          <p className="attire-guide-desc">{attire.description}</p>

          {/* Color Palette Swatches */}
          <div className="attire-palette-row">
            {attire.palette.map((swatch) => (
              <div key={swatch.name} className="attire-swatch-item">
                <div
                  className="attire-swatch-circle"
                  style={{ backgroundColor: swatch.hex }}
                >
                  <span className="swatch-shimmer" />
                </div>
                <span className="swatch-name">{swatch.name}</span>
                <span className="swatch-note">{swatch.note}</span>
              </div>
            ))}
          </div>
        </div>
      </RevealAnimation>
    </div>
  );
};
