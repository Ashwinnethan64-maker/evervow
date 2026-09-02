import React from 'react';
import './Quote.css';

export const Quote = ({ text, author, className = '' }) => {
  if (!text) return null;
  return (
    <blockquote className={`editorial-quote ${className}`}>
      <p className="quote-text">{text}</p>
      {author && <cite className="quote-author">— {author}</cite>}
    </blockquote>
  );
};
