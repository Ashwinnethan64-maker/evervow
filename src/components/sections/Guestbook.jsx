import React, { useState, useEffect } from 'react';
import { weddingData } from '../../config/weddingData';
import { Eyebrow } from '../common/Eyebrow';
import { Divider } from '../common/Divider';
import { RevealAnimation } from '../common/RevealAnimation';
import { VoiceNoteRecorder } from '../common/VoiceNoteRecorder';
import { guestbookService } from '../../services/guestbookService';
import './Guestbook.css';

export const Guestbook = () => {
  const { guestbook } = weddingData;
  const [wishes, setWishes] = useState([]);
  const [authorName, setAuthorName] = useState('');
  const [wishText, setWishText] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationMsg, setConfirmationMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    guestbookService.getWishes().then(data => {
      setWishes(data);
    });
  }, []);

  const handleAudioComplete = (blob, url) => {
    setAudioBlob(blob);
    setAudioUrl(url);
    if (!wishText.trim()) {
      setWishText("🎙️ [Spoken Voice Blessing]");
    }
  };

  const handleAudioDiscard = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    if (wishText === "🎙️ [Spoken Voice Blessing]") {
      setWishText("");
    }
  };

  const handleAddWish = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setConfirmationMsg('');

    if (!authorName.trim() || (!wishText.trim() && !audioBlob)) return;

    setIsSubmitting(true);
    try {
      const created = await guestbookService.addWish({
        name: authorName,
        wish: wishText || "🎙️ [Spoken Voice Blessing]",
        audioUrl: audioUrl || null
      });

      setWishes(prev => [created, ...prev]);
      setAuthorName('');
      setWishText('');
      setAudioBlob(null);
      setAudioUrl(null);
      setConfirmationMsg(guestbook.successMessage || "Thank you! Your wish has been recorded with love.");

      setTimeout(() => {
        setConfirmationMsg('');
      }, 5000);
    } catch (err) {
      setErrorMsg(guestbook.errorMessage || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="editorial-section guestbook-section" aria-label="Wedding Guestbook">
      {/* Background radial glow */}
      <div className="guestbook-paper-backdrop" aria-hidden="true" />

      <div className="section-container guestbook-inner-container">
        
        {/* Section Header */}
        <header className="guestbook-header text-center">
          <RevealAnimation animation="fade-up">
            <Eyebrow>{guestbook.eyebrow || "GUESTBOOK"}</Eyebrow>
            <h2 className="guestbook-main-heading">{guestbook.heading || "Leave a wish"}</h2>
            <Divider symbol="star" className="guestbook-divider" />
            <p className="guestbook-subtitle">{guestbook.subtitle || "A few words or spoken blessing we will keep forever."}</p>
          </RevealAnimation>
        </header>

        {/* Compact Centered Form Card with card-reveal */}
        <div className="guestbook-form-wrapper">
          <RevealAnimation animation="card-reveal" delay={150} duration={850}>
            <div className="guestbook-floating-card">
              <form className="guestbook-editorial-form" onSubmit={handleAddWish}>
                
                {/* 1. Author Name Underline Field */}
                <div className="guestbook-field-group">
                  <label htmlFor="guestbook-author-name" className="guestbook-field-label">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="guestbook-author-name"
                    required
                    maxLength={60}
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Enter your name"
                    className="guestbook-underline-input"
                  />
                </div>

                {/* 2. Wish Text Underline Field */}
                <div className="guestbook-field-group">
                  <label htmlFor="guestbook-wish-text" className="guestbook-field-label">
                    YOUR WISH FOR THE COUPLE
                  </label>
                  <textarea
                    id="guestbook-wish-text"
                    rows="2"
                    maxLength={600}
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="Write a sweet message, blessing, or memory..."
                    className="guestbook-underline-textarea"
                  />
                </div>

                {/* 7. Audio Voice Blessing in Guestbook */}
                <VoiceNoteRecorder
                  onRecordingComplete={handleAudioComplete}
                  onDiscard={handleAudioDiscard}
                />

                {confirmationMsg && (
                  <div className="guestbook-confirmation-banner" role="status">
                    {confirmationMsg}
                  </div>
                )}

                {errorMsg && (
                  <div className="guestbook-error-banner" role="alert">
                    {errorMsg}
                  </div>
                )}

                {/* Luxury Champagne Pill Button */}
                <div className="guestbook-submit-container">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="champagne-pill-btn"
                  >
                    {isSubmitting ? "ADDING WISH..." : "ADD MY WISH"}
                  </button>
                </div>

              </form>
            </div>
          </RevealAnimation>
        </div>

        {/* 2-Column Responsive Collection of Refined Handwritten Paper Notes (Staggered 120ms) */}
        <div className="guestbook-wishes-wrapper">
          <div className="wishes-two-col-grid">
            {wishes.map((item, wIdx) => (
              <RevealAnimation
                key={item.id}
                animation="card-reveal"
                delay={200 + wIdx * 120}
                duration={800}
                className="handwritten-paper-card"
                as="article"
              >
                <span className="note-mini-flourish">❦</span>
                <blockquote className="note-script-quote">
                  “{item.wish}”
                </blockquote>
                {item.audioUrl && (
                  <audio controls src={item.audioUrl} className="wish-audio-playback" />
                )}
                <cite className="note-author-label">— {item.name.toUpperCase()}</cite>
              </RevealAnimation>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
