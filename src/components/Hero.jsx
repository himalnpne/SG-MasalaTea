import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    try {
      // Import all images from the Products folder
      const imageContext = require.context('./Hero', false, /\.(png|jpe?g|svg|webp)$/);
      
      // Get all image imports
      const importedImages = imageContext.keys().map(imageContext);
      
      setProductImages(importedImages);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load product images:", err);
      setError("Failed to load product images. Please try again later.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (productImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [productImages.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="message-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (productImages.length === 0) {
    return (
      <div className="message-container">
        <p className="empty-message">No product images found.</p>
      </div>
    );
  }

  return (
    <section className="hero-section" id="home">
      <div className="hero-bg-element"></div>
      
      <div className="hero-container">
        <div className="hero-content-wrapper">
          {/* Content Section */}
          <div className="hero-text-content animate-fade-in">
            <h1 className="hero-heading">
              <span>Authentic Nepalese</span>
              Spicy Masala Tea
            </h1>
            
            <div className="brand-divider">
              <div className="divider-line"></div>
              <div className="brand-name">ABC MASALA TEA</div>
              <div className="divider-line"></div>
            </div>
            
            <div className="company-tagline">
              Crafted with passion by XYZ Industries Pvt. Ltd.
            </div>
            
            <button className="cta-button">
              Shop Now
            </button>
          </div>
          
          {/* Slider Section */}
          <div className="slider-container animate-fade-in">
            <div className="image-slider">
              <div className="decorative-blob blob-1"></div>
              <div className="decorative-blob blob-2"></div>
              
              {productImages.map((img, index) => (
                <div 
                  key={index} 
                  className="slider-slide"
                  style={{ opacity: index === currentSlide ? 1 : 0 }}
                >
                  <img 
                    src={img.default || img} // Handle both ES modules and CJS
                    alt={`ABC Masala Tea Product ${index + 1}`}
                  />
                  <div className="image-overlay"></div>
                </div>
              ))}
            </div>
            
            {/* Slider dots */}
            <div className="slider-dots">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative wave */}
      <div className="wave-divider">
        <svg className="wave-svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            className="wave-path"
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;