import React, { useEffect, useRef, useCallback } from 'react';
import './Lightbox.css';

export const Lightbox = ({
  images = [],
  currentIndex = 0,
  isOpen = false,
  onClose,
  onPrev,
  onNext
}) => {
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const currentImage = images[currentIndex] || images[0];

  // Handle Keyboard Navigation (Escape, Left Arrow, Right Arrow)
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      }
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Focus close button on open
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // Touch Swipe Handling for Mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 45; // Minimum swipe distance in px

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped Left -> Next Image
        onNext();
      } else {
        // Swiped Right -> Previous Image
        onPrev();
      }
    }
    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
  };

  if (!isOpen || !currentImage) return null;

  const totalCount = images.length;
  const formattedIndex = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalCount).padStart(2, '0');

  return (
    <div
      ref={overlayRef}
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery viewer"
      onClick={(e) => {
        // Close if clicking outside the image container
        if (e.target === overlayRef.current) {
          onClose();
        }
      }}
    >
      {/* Top Bar: Counter & Close Action */}
      <div className="lightbox-top-bar">
        <span className="lightbox-counter" aria-live="polite">
          {formattedIndex} / {formattedTotal}
        </span>

        <button
          ref={closeBtnRef}
          type="button"
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Close gallery viewer (Escape)"
        >
          ✕
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="lightbox-stage"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Button */}
        {totalCount > 1 && (
          <button
            type="button"
            className="lightbox-nav-btn nav-prev"
            onClick={onPrev}
            aria-label="Previous photograph (Left arrow)"
          >
            ‹
          </button>
        )}

        <figure className="lightbox-figure">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="lightbox-image"
          />
          {currentImage.caption && (
            <figcaption className="lightbox-caption">
              {currentImage.caption}
            </figcaption>
          )}
        </figure>

        {/* Next Button */}
        {totalCount > 1 && (
          <button
            type="button"
            className="lightbox-nav-btn nav-next"
            onClick={onNext}
            aria-label="Next photograph (Right arrow)"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
};
