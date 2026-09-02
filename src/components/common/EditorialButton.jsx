import React from 'react';
import './EditorialButton.css';

export const EditorialButton = ({
  children,
  variant = 'outline', // 'outline' | 'solid' | 'text'
  size = 'md',        // 'sm' | 'md' | 'lg'
  onClick,
  href,
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) => {
  const classNames = `editorial-btn btn-${variant} btn-${size} ${className}`;

  if (href) {
    return (
      <a href={href} className={classNames} {...props}>
        <span className="btn-content">{children}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="btn-content">{children}</span>
    </button>
  );
};
