import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const mobileNavRef = useRef(null);
  const menuToggleRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Determine active section
      const sections = ['home', 'about', 'products', 'features', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          mobileNavRef.current && 
          !mobileNavRef.current.contains(event.target) &&
          !menuToggleRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menu-open', !isMenuOpen);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  // Navigation links
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'features', label: 'Features' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container">
          <a href="#home" className="logo-link">
            <img 
              src={process.env.PUBLIC_URL + "/logo.svg"} 
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
              <li key={item.id} className="nav-item">
                <a 
                  href={`#${item.id}`} 
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button 
          ref={menuToggleRef}
          className="menu-toggle"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`} 
        onClick={closeMobileMenu}
      />

      {/* Mobile Navigation - Side Panel */}
      <nav 
        className={`nav-mobile ${isMenuOpen ? 'open' : ''}`} 
        ref={mobileNavRef}
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-nav-content">
          <ul className="mobile-nav-list">
            {navLinks.map((item) => (
              <li key={item.id} className="mobile-nav-item">
                <a 
                  href={`#${item.id}`} 
                  className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Gradient accent line */}
      <div className="gradient-accent"></div>
    </header>
  );
};

export default Header;