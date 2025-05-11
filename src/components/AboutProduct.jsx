import React, { useState, useEffect } from 'react';
import './AboutProduct.css';

const AboutProduct = () => {
  const [aboutImages, setAboutImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    try {
      // Import all images from the AboutProduct folder
      const imageContext = require.context('./AboutProduct', false, /\.(png|jpe?g|svg|webp)$/);
      
      // Get all image imports
      const importedImages = imageContext.keys().map(imageContext);
      
      setAboutImages(importedImages);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load about images:", err);
      setError("Failed to load about images. Please try again later.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (aboutImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev === aboutImages.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [aboutImages.length]);

  if (loading) {
    return (
      <section className="about-product" id="about">
        <div className="container">
          <div className="loading-spinner"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="about-product" id="about">
        <div className="container">
          <p className="error-message">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="about-product" id="about">
      {/* Decorative Elements */}
      <div className="about-bg-element"></div>
      <div className="about-decorative-blob about-blob-1"></div>
      <div className="about-decorative-blob about-blob-2"></div>
      
      <div className="container">
        <div className="about-image">
          {aboutImages.length > 0 ? (
            <div className="about-image-slider">
              <div 
                className="about-slide" 
                style={{ opacity: 1 }}
              >
                <img
                  src={aboutImages[currentImageIndex].default || aboutImages[currentImageIndex]}
                  alt="Spicy Masala Tea"
                />
                <div className="about-image-overlay"></div>
              </div>
            </div>
          ) : (
            <div className="no-image">No images available</div>
          )}
        </div>
        
        <div className="about-content">
          <h2>About Our <span>Spicy Masala Tea</span></h2>
          <p>
            Our Spicy Masala Tea is a traditional Nepalese blend made from the finest organic 
            tea leaves harvested from the Himalayan foothills, combined with a secret mix of 
            aromatic spices that creates an unforgettable sensory experience.
          </p>
          
          <ul className="features-list">
            <li className="feature-item">
              <h3>100% Organic</h3>
              <p>Grown without synthetic pesticides or fertilizers in the pristine environment of the Himalayas</p>
            </li>
            <li className="feature-item">
              <h3>Handpicked</h3>
              <p>Carefully selected by experienced tea farmers ensuring only the finest quality leaves</p>
            </li>
            <li className="feature-item">
              <h3>Traditional Recipe</h3>
              <p>Authentic Nepalese masala blend passed down through generations of tea artisans</p>
            </li>
            <li className="feature-item">
              <h3>Rich Flavor Profile</h3>
              <p>Perfect balance of spices, offering a bold taste with warming aromatic notes</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutProduct;