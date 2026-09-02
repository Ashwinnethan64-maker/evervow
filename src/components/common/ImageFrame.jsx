import React from 'react';
import './ImageFrame.css';

export const ImageFrame = ({
  src,
  alt = '',
  aspectRatio = '3/4', // '3/4' | '4/5' | '1/1' | '16/9'
  caption,
  className = '',
  withBorder = true,
  children
}) => {
  return (
    <figure className={`image-frame-wrapper ${className}`}>
      <div 
        className={`image-frame ${withBorder ? 'with-luxury-border' : ''}`}
        style={{ aspectRatio }}
      >
        {src ? (
          <img src={src} alt={alt} loading="lazy" className="image-frame-img" />
        ) : (
          <div className="image-frame-placeholder" aria-label={alt}>
            <div className="placeholder-inner">
              <span className="placeholder-monogram">❦</span>
              <span className="placeholder-caption">{caption || alt}</span>
            </div>
          </div>
        )}
        {children}
      </div>
      {caption && <figcaption className="image-frame-caption">{caption}</figcaption>}
    </figure>
  );
};
