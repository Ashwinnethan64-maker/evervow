import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { weddingData, SHARED_ALBUM_URL } from '../../config/weddingData';
import './PhotoDropModal.css';

/**
 * 3 & 4. FIX THE QR CODE / SHARED ALBUM & OPEN SHARED ALBUM
 * - Generates a 100% REAL, high-contrast, scannable QR code using QRCode.toDataURL.
 * - Single source of truth: SHARED_ALBUM_URL.
 * - Graceful fallback if URL is unconfigured.
 * - Both QR code and "OPEN SHARED ALBUM ↗" button target the identical destination.
 */
export const PhotoDropModal = ({ isOpen, onClose }) => {
  const { photoDrop } = weddingData;
  const targetAlbumUrl = SHARED_ALBUM_URL || photoDrop?.albumUrl;
  const isUrlValid = Boolean(targetAlbumUrl && targetAlbumUrl.trim().length > 0 && !targetAlbumUrl.includes('EverVowAshSakshi'));

  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [qrError, setQrError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (isUrlValid) {
      QRCode.toDataURL(targetAlbumUrl, {
        width: 240,
        margin: 2,
        color: {
          dark: '#2F241E', // Warm luxury dark brown for high contrast scanning
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      })
        .then((url) => {
          setQrCodeDataUrl(url);
          setQrError(false);
        })
        .catch((err) => {
          console.error("QR Code Generation failed:", err);
          setQrError(true);
        });
    } else {
      setQrCodeDataUrl('');
    }
  }, [isOpen, targetAlbumUrl, isUrlValid]);

  if (!isOpen || !photoDrop) return null;

  return (
    <div className="photo-drop-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="photo-drop-modal-card" onClick={(e) => e.stopPropagation()}>
        
        <button
          type="button"
          className="photo-drop-close-btn"
          onClick={onClose}
          aria-label="Close photo drop modal"
        >
          ✕
        </button>

        <span className="photo-drop-flourish">❦</span>
        <h3 className="photo-drop-title">{photoDrop.title}</h3>
        <p className="photo-drop-desc">{photoDrop.subtitle}</p>

        {/* Real High-Resolution QR Code */}
        <div className="photo-drop-qr-wrapper">
          <div className="photo-drop-qr-box">
            {isUrlValid && qrCodeDataUrl ? (
              <img
                src={qrCodeDataUrl}
                alt="Scan QR code with phone camera to open shared wedding album"
                className="qr-image-graphic"
              />
            ) : qrError || !isUrlValid ? (
              <div className="qr-fallback-box">
                <span className="qr-pending-icon">📷</span>
                <span className="qr-pending-text">The shared album link is being prepared for the wedding day.</span>
              </div>
            ) : (
              <div className="qr-loading-spinner" aria-label="Generating QR code..." />
            )}
          </div>
          <span className="photo-drop-qr-hint">
            {isUrlValid ? photoDrop.qrHint : "Check back closer to the wedding celebration"}
          </span>
        </div>

        {/* Direct Upload Link Button / Fallback Notice */}
        {isUrlValid ? (
          <a
            href={targetAlbumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="photo-drop-upload-btn"
          >
            <span>OPEN SHARED ALBUM</span>
            <span className="btn-arrow">↗</span>
          </a>
        ) : (
          <div className="photo-drop-pending-notice">
            <span>Album will open on Friday, 14 August 2026</span>
          </div>
        )}

      </div>
    </div>
  );
};
