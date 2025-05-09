import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Sunita Maharjan',
    role: 'Tea Enthusiast',
    content: "This is the best masala tea I've ever had. It gives me the perfect energy boost in the morning with its authentic Nepali spice blend.",
    rating: 5
  },
  {
    id: 2,
    name: 'Rajesh Thapa',
    role: 'Food Blogger',
    content: "Having tried many masala teas abroad, this one truly reminds me of home. The flavors are authentic and perfectly balanced.",
    rating: 5
  },
  {
    id: 3,
    name: 'Anjali Shrestha',
    role: 'Health Coach',
    content: "I recommend this tea to all my clients. The natural spices provide both incredible flavor and numerous health benefits.",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-heading">What Our <span>Customers Say</span></h2>
          <div className="divider-line"></div>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div 
              className="testimonial-card" 
              key={testimonial.id}
              style={{ '--order': index }}

            >
              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <h3>{testimonial.name}</h3>
                <p className="author-role">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;