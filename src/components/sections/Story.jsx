import React from 'react';
import { weddingData } from '../../config/weddingData';
import { Eyebrow } from '../common/Eyebrow';
import { Divider } from '../common/Divider';
import { RevealAnimation } from '../common/RevealAnimation';
import './Story.css';

export const Story = () => {
  const { story } = weddingData;
  const [blockOne, blockTwo] = story.blocks;

  return (
    <section id="story" className="editorial-section story-section" aria-label="Our Engagement Story">
      {/* Soft luxury stationery background glow */}
      <div className="story-paper-backdrop" aria-hidden="true" />

      <div className="section-container story-inner-container">
        
        {/* Section Intro */}
        <header className="story-intro-header">
          <RevealAnimation animation="fade-up">
            <Eyebrow>{story.eyebrow || "OUR CHAPTERS"}</Eyebrow>
            <h2 className="story-main-heading">{story.title}</h2>
            <Divider symbol="star" className="story-divider" />
          </RevealAnimation>
        </header>

        {/* Story Block 01: Image Card (100ms) → Text Card (220ms) */}
        <div className="story-block story-block-01">
          <RevealAnimation animation="image-reveal" duration={950} delay={100} className="story-image-col">
            <figure className="story-image-figure">
              <div className="story-photo-card">
                <div className="story-photo-inner">
                  <img
                    src={blockOne.image}
                    alt={blockOne.imageAlt}
                    className="story-photo-element"
                    loading="lazy"
                  />
                </div>
              </div>
              {blockOne.imageCaption && (
                <figcaption className="story-photo-caption">{blockOne.imageCaption}</figcaption>
              )}
            </figure>
          </RevealAnimation>

          <RevealAnimation animation="card-reveal" duration={850} delay={220} className="story-text-col">
            <article className="editorial-text-panel">
              <span className="story-roman-numeral">{blockOne.numeral}</span>
              <h3 className="story-subheading">{blockOne.heading}</h3>
              <blockquote className="story-calligraphy-quote">
                {blockOne.quote}
              </blockquote>
              <p className="story-narrative-paragraph">
                {blockOne.paragraph}
              </p>
            </article>
          </RevealAnimation>
        </div>

        {/* Story Block 02: Text Card (150ms) → Image Card (280ms) */}
        <div className="story-block story-block-02">
          <RevealAnimation animation="card-reveal" duration={850} delay={150} className="story-text-col">
            <article className="editorial-text-panel">
              <span className="story-roman-numeral">{blockTwo.numeral}</span>
              <h3 className="story-subheading">{blockTwo.heading}</h3>
              <blockquote className="story-calligraphy-quote">
                {blockTwo.quote}
              </blockquote>
              <p className="story-narrative-paragraph">
                {blockTwo.paragraph}
              </p>
            </article>
          </RevealAnimation>

          <RevealAnimation animation="image-reveal" duration={950} delay={280} className="story-image-col">
            <figure className="story-image-figure">
              <div className="story-photo-card">
                <div className="story-photo-inner">
                  <img
                    src={blockTwo.image}
                    alt={blockTwo.imageAlt}
                    className="story-photo-element"
                    loading="lazy"
                  />
                </div>
              </div>
              {blockTwo.imageCaption && (
                <figcaption className="story-photo-caption">{blockTwo.imageCaption}</figcaption>
              )}
            </figure>
          </RevealAnimation>
        </div>

      </div>
    </section>
  );
};
