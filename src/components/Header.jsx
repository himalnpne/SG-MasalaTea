import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Toggle body class to prevent scrolling when menu is open
    document.body.classList.toggle('menu-open', !isMenuOpen);
  };

  // Navigation links
  const navLinks = ['Home', 'About', 'Products', 'Features', 'Contact'];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container">
          <a href="/" className="logo-link">
            <img 
              src="/logo.svg" 
              alt="ABC Tea Logo" 
              className="logo-image"
            />
            <span className="logo-text">
              ABC <span className="logo-highlight">MASALA</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <ul className="nav-list">
            {navLinks.map((item) => (
              <li key={item} className="nav-item">
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="nav-link"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="menu-toggle"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? (
            <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-container">
          <ul className="mobile-nav-list">
            {navLinks.map((item) => (
              <li key={item} className="mobile-nav-item">
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="mobile-nav-link"
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.body.classList.remove('menu-open');
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Gradient line */}
      <div className="gradient-line"></div>
    </header>
  );
};

export default Header;