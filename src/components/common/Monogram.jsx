import React from 'react';
import { BrandLogo } from './BrandLogo';

export const Monogram = ({ size = "md", className = "" }) => {
  return (
    <BrandLogo
      size={size}
      className={`wedding-monogram-mark ${className}`}
      alt="Ash & Sakshi EverVow Monogram"
    />
  );
};
