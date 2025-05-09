import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>
              <span style={{ color: 'var(--dark-brown)' }}>Spicy</span>
              <span style={{ color: 'var(--accent-orange)' }}>Masala</span>
              <span style={{ color: 'var(--dark-green)' }}>Tea</span>
            </h3>
            <p>Authentic Nepalese Masala Tea crafted with Himalayan herbs and spices.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>info@spicymasalatea.com</p>
            <p>+977 1234567890</p>
            <div className="social-icons">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Spicy Masala Tea. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;