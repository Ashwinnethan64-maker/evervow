import React from 'react';

/**
 * Clean Non-Animated Pass-Through Component
 * Animations completely removed as requested.
 */
export const RevealAnimation = ({
  children,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};
