import React from 'react';
import { Eyebrow } from './Eyebrow';
import { Divider } from './Divider';
import './SectionHeading.css';

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  centered = true,
  withDivider = true,
  className = ''
}) => {
  return (
    <header className={`section-heading ${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && <h2 className="section-title">{title}</h2>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      {withDivider && <Divider symbol="flourish" />}
    </header>
  );
};
