import React, { useState } from 'react';
import './PrintableItinerary.css';

/**
 * 8. Downloadable PDF Keepsake / Formal Itinerary Button
 * Triggers window.print() while ensuring the browser document title
 * sets the downloaded/printed PDF filename cleanly to "EverVow-Ash-Sakshi-Wedding-Invitation".
 */
export const PrintableItinerary = ({ className = '' }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = () => {
    setIsGenerating(true);
    const originalTitle = document.title;
    document.title = "EverVow-Ash-Sakshi-Wedding-Invitation";

    setTimeout(() => {
      window.print();
      setIsGenerating(false);
      // Restore title after dialog closes
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    }, 150);
  };

  return (
    <div className={`printable-itinerary-container ${className}`}>
      <button
        type="button"
        className="itinerary-download-btn"
        onClick={handlePrint}
        disabled={isGenerating}
        aria-label="Download keepsake formal invitation as PDF"
      >
        <span className="btn-icon">📜</span>
        <span>{isGenerating ? "PREPARING INVITATION..." : "DOWNLOAD KEEPSAKE INVITATION (PDF)"}</span>
      </button>
    </div>
  );
};
