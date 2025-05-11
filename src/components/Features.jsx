import React from 'react';
import './Features.css';
import { FiCoffee, FiHeart, FiAward } from 'react-icons/fi';

const Features = () => {
  return (
    <section className="features-section" id="features">
      {/* Decorative elements */}
      <div className="features-bg-element"></div>
      <div className="features-decorative-blob features-blob-1"></div>
      <div className="features-decorative-blob features-blob-2"></div>
      
      {/* Wave divider */}
      <div className="features-wave-divider">
        <svg className="features-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path className="features-wave-path" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
      
      <div className="features-container">
        <h2 className="features-heading">
          Why Choose Our <span>Masala Tea</span>
        </h2>
        
        <div className="features-grid">
          <div className="feature-card animate-fade-in-up" style={{"--animation-order": 1}}>
            <div className="feature-icon">
              <FiCoffee />
            </div>
            <h3 className="feature-title">Rich Flavor</h3>
            <p className="feature-description">Perfect balance of spices and tea leaves for a robust yet smooth taste</p>
          </div>
          
          <div className="feature-card animate-fade-in-up" style={{"--animation-order": 2}}>
            <div className="feature-icon">
              <FiHeart />
            </div>
            <h3 className="feature-title">Health Benefits</h3>
            <p className="feature-description">Boosts immunity, aids digestion, and provides natural energy</p>
          </div>
          
          <div className="feature-card animate-fade-in-up" style={{"--animation-order": 3}}>
            <div className="feature-icon">
              <FiAward />
            </div>
            <h3 className="feature-title">Premium Quality</h3>
            <p className="feature-description">Recognized as one of the finest masala teas from Nepal</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;