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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: '' });
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
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formData = new FormData();
      // Google Form field IDs extracted from your form
      formData.append('entry.2005620554', form.name); // Name field
      formData.append('entry.1045781291', form.email); // Email field
      formData.append('entry.1166974658', form.phone); // Phone field
      formData.append('entry.839337160', form.message); // Message field

      await fetch('https://docs.google.com/forms/d/e/1FAIpQLScIAumJrAM2MeOigkea2y1rpekiK02NU9dXw0sABx4cw5HORA/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <main className="form-container">
      <div className="form-header">
        <h1>Tea Form</h1>
        <p>Form description</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="required">Name</label>
          <input 
            type="text" 
            id="name" 
            className="form-control" 
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
            className="form-control" 
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
            className="form-control" 
            value={form.phone} 
            onChange={handleChange} 
            placeholder="Short answer text" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="required">Message</label>
          <textarea 
            id="message" 
            className="form-control" 
            value={form.message} 
            onChange={handleChange} 
            placeholder="Long answer text"
            rows="5"
          ></textarea>
          {errors.message && <div className="error-message">{errors.message}</div>}
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {submitted && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i> Thank you! Your form has been submitted successfully.
        </div>
      )}

      <div className="privacy-note">
        By submitting, you agree to our <a href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
      </div>
    </main>
  );
};

export default Contact;