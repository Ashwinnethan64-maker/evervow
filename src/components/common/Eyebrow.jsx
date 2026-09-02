import React from 'react';
import './Eyebrow.css';

export const Eyebrow = ({ children, className = '' }) => {
  if (!children) return null;
  return (
    <span className={`editorial-eyebrow ${className}`}>
      {children}
    </span>
  );
};
