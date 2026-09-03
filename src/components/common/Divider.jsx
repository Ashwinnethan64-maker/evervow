import React from 'react';
import './Divider.css';

export const Divider = ({ symbol = 'flourish', className = '' }) => {
  return (
    <div className={`editorial-divider ${className}`} role="separator" aria-hidden="true">
      <span className="divider-line divider-line-left" />
      {symbol === 'flourish' && (
        <span className="divider-symbol">❦</span>
      )}
      {symbol === 'dot' && (
        <span className="divider-dot" />
      )}
      {symbol === 'star' && (
        <span className="divider-symbol">✦</span>
      )}
      <span className="divider-line divider-line-right" />
    </div>
  );
};
