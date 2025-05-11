import React from 'react';
import './Footer.css';
import { 
  FaFacebook, 
  FaInstagram, 
  FaTiktok, 
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Decorative Elements */}
      <div className="footer-bg-element"></div>
      <div className="footer-decorative-blob footer-blob-1"></div>
      <div className="footer-decorative-blob footer-blob-2"></div>
      
      <div className="container">
        <div className="footer-content">
          {/* Column 1: Company Info */}
          <div className="footer-company-section">
            <div className="footer-logo">
              <h3 className="footer-logo-text">
                <span className="footer-logo-spicy">Spicy</span>
                <span className="footer-logo-masala">Masala</span>
                <span className="footer-logo-tea">Tea</span>
              </h3>
            </div>
            <p className="footer-company-description">
              Authentic Nepalese Masala Tea crafted with premium Himalayan herbs and spices. 
              Our traditional recipe has been passed down through generations, bringing the 
              rich flavors of Nepal to your cup.
            </p>
          </div>
          
          {/* Column 2: Follow Us */}
          <div className="footer-follow-section">
            <h4 className="footer-heading">Follow Us</h4>
            <p className="footer-social-text">Share your Stories</p>
            <div className="social-icons">
              <a 
                href="https://www.facebook.com/himalnpne" 
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://www.instagram.com/himalnpne" 
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.tiktok.com/@himalnpne" 
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
              <a 
                href="https://www.youtube.com/c/himalnpne" 
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
          
          {/* Column 3: Contact Us */}
          <div className="footer-contact-section">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="contact-info">
              <li>
                <span className="contact-info-icon">
                  <FaEnvelope />
                </span>
                <span className="contact-info-text">
                  <a href="mailto:info@spicymasalatea.com">
                    info@spicymasalatea.com
                  </a>
                </span>
              </li>
              <li>
                <span className="contact-info-icon">
                  <FaPhone />
                </span>
                <span className="contact-info-text">
                  <a href="tel:+9771234567890">
                    +977 1234567890
                  </a>
                </span>
              </li>
              <li>
                <span className="contact-info-icon">
                  <FaMapMarkerAlt />
                </span>
                <span className="contact-info-text">
                  Kathmandu, Nepal
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Spicy Masala Tea. All rights reserved.
          </div>
          <div className="footer-developer">
            Developed by 
            <a 
              href="https://neupanehimal.com.np" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Himal Neupane
            </a> | 
            <a 
              href="mailto:info@neupanehimal.com.np"
            >
              info@neupanehimal.com.np
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;