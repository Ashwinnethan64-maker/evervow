import React, { useState, useEffect } from 'react';
import { weddingData } from '../../config/weddingData';
import './Navigation.css';

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled past the Hero section
      const heroEl = document.getElementById('hero');
      const heroHeight = heroEl ? heroEl.offsetHeight - 90 : 400;

      if (window.scrollY > heroHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll
      const sections = weddingData.navigation.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to establish initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`site-navigation ${scrolled ? 'nav-scrolled' : 'nav-at-top'}`}>
      <div className="nav-container">
        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
        >
          <span className={`menu-icon-line ${mobileMenuOpen ? 'open' : ''}`} />
          <span className={`menu-icon-line ${mobileMenuOpen ? 'open' : ''}`} />
        </button>

        {/* Intentionally Centered Navigation Links (Desktop & Mobile) */}
        <nav className={`nav-links-wrapper ${mobileMenuOpen ? 'mobile-open' : ''}`} aria-label="Main Navigation">
          <ul className="nav-list">
            {weddingData.navigation.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <li key={item.label} className="nav-item">
                  <a
                    href={item.href}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};
