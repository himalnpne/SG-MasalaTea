import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    message: '' 
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Please enter a valid email';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    // Validate form
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    try {
      // Create a form data object
      const formData = new FormData();

      // Replace these with the actual entry IDs from your Google Form
      // You need to inspect your Google Form HTML to get these IDs
      formData.append('entry.123456789', form.name);     // Update with real ID
      formData.append('entry.987654321', form.email);    // Update with real ID
      formData.append('entry.112233445', form.phone);    // Update with real ID
      formData.append('entry.566778899', form.message);  // Update with real ID

      // Google Form submission URL - update with your actual form ID
      const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScIAumJrAM2MeOigkea2y1rpekiK02NU9dXw0sABx4cw5HORA/formResponse';
      
      // Using an iframe for submission to avoid CORS issues
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden_iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Create a form element
      const formElement = document.createElement('form');
      formElement.method = 'POST';
      formElement.action = googleFormUrl;
      formElement.target = 'hidden_iframe';
      
      // Append form data to the form
      for (const [key, value] of formData.entries()) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        formElement.appendChild(input);
      }
      
      // Append form to body
      document.body.appendChild(formElement);
      
      // Set up a listener to detect iframe load
      iframe.onload = () => {
        // Clean up
        document.body.removeChild(formElement);
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 100);
        
        // Success
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', message: '' });
        setSubmitting(false);
      };
      
      // Submit the form
      formElement.submit();
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('There was a problem submitting the form. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="form-container">
        <div className="form-header">
          <h2>Tea Form</h2>
          <p>Form description</p>
        </div>
        
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="required">Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                className={`form-control ${errors.name ? 'error' : ''}`}
                value={form.name} 
                onChange={handleChange} 
                placeholder="Short answer text" 
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                className={`form-control ${errors.email ? 'error' : ''}`}
                value={form.email} 
                onChange={handleChange} 
                placeholder="Short answer text" 
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                className="form-control" 
                value={form.phone} 
                onChange={handleChange} 
                placeholder="Short answer text" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="required">Message *</label>
              <textarea 
                id="message" 
                name="message"
                className={`form-control ${errors.message ? 'error' : ''}`}
                value={form.message} 
                onChange={handleChange} 
                placeholder="Long answer text"
                rows="5"
              ></textarea>
              {errors.message && <div className="error-message">{errors.message}</div>}
            </div>

            <button 
              type="submit" 
              className="submit-btn" 
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
            
            {submitError && (
              <div className="error-message submission-error">
                {submitError}
              </div>
            )}
          </form>
        ) : (
          <div className="success-message">
            <i className="fas fa-check-circle"></i> Thank you! Your form has been submitted.
            <button 
              onClick={() => setSubmitted(false)} 
              className="new-submission-btn"
            >
              Submit another response
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;