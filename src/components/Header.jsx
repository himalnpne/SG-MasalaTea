import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const mobileNavRef = useRef(null);
  const menuToggleRef = useRef(null);

  // Section configuration - ensure these match your component IDs exactly
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' } // Make sure this matches Contact component's ID
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Get all sections that exist in the DOM
      const visibleSections = sections.map(section => {
        const element = document.getElementById(section.id);
        return element ? {
          id: section.id,
          element,
          top: element.offsetTop,
          bottom: element.offsetTop + element.offsetHeight
        } : null;
      }).filter(Boolean);

      const scrollPosition = window.scrollY + 100; // Adjusted for header height

      // Find which section is currently in view
      const currentSection = visibleSections.find(section => 
        scrollPosition >= section.top && scrollPosition < section.bottom
      );

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Set initial active section
    handleScroll();
    
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menu-open', !isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  // Improved scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
      const targetPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update active section immediately
      setActiveSection(sectionId);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container">
          <a 
            href="#home" 
            className="logo-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
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
            {sections.map((section) => (
              <li key={section.id} className="nav-item">
                <a 
                  href={`#${section.id}`}
                  className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section.id);
                  }}
                >
                  {section.label}
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
            {sections.map((section) => (
              <li key={section.id} className="mobile-nav-item">
                <a 
                  href={`#${section.id}`}
                  className={`mobile-nav-link ${activeSection === section.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section.id);
                    closeMobileMenu();
                  }}
                >
                  {section.label}
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