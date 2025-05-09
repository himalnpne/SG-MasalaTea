import React from 'react';
import './Features.css';
import { FiCoffee, FiHeart, FiAward } from 'react-icons/fi';

const Features = () => {
  return (
    <section className="features" id="features">
      <div className="container">
        <h2>Why Choose Our <span>Masala Tea</span></h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FiCoffee />
            </div>
            <h3>Rich Flavor</h3>
            <p>Perfect balance of spices and tea leaves for a robust yet smooth taste</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FiHeart />
            </div>
            <h3>Health Benefits</h3>
            <p>Boosts immunity, aids digestion, and provides natural energy</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FiAward />
            </div>
            <h3>Premium Quality</h3>
            <p>Recognized as one of the finest masala teas from Nepal</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;