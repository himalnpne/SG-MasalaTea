import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name';
    if (!form.email.trim()) newErrors.email = 'Please enter your email';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Please enter a valid email';
    if (!form.phone.trim()) newErrors.phone = 'Please enter your phone number';
    if (!form.message.trim()) newErrors.message = 'Please enter your message';
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
      // Create an iframe for the form submission to avoid CORS issues
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden_iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // Create a form element to submit programmatically
      const formEl = document.createElement('form');
      formEl.action = 'https://docs.google.com/forms/d/e/1FAIpQLScIAumJrAM2MeOigkea2y1rpekiK02NU9dXw0sABx4cw5HORA/formResponse';
      formEl.method = 'POST';
      formEl.target = 'hidden_iframe';

      // Add the form fields with correct entry IDs
      const appendField = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        formEl.appendChild(input);
      };

      appendField('entry.1878272153', form.name); // Name
      appendField('entry.87108696', form.email); // E-mail
      appendField('entry.605239760', form.phone); // Phone Number
      appendField('entry.1822003995', form.message); // Message

      // Append form to body and submit
      document.body.appendChild(formEl);
      formEl.submit();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(formEl);
        document.body.removeChild(iframe);
      }, 1000);

      setSubmitted(true);
      setSubmittedData({ ...form });
      // Reset form after successful submission
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleNewResponse = () => {
    setSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <main className="form-container">
      <div className="form-header">
        <h1>Connect With Us</h1>
        <p>Got a question? Send us a message!</p>
      </div>

      {submitted ? (
        <div className="submitted-state">
          <div className="success-message">
            <i className="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.
          </div>

          {submittedData && (
            <div className="submitted-data">
              <h3>Your Submission</h3>
              <div className="submitted-data-item">
                <strong>Name:</strong> <span>{submittedData.name}</span>
              </div>
              <div className="submitted-data-item">
                <strong>Email:</strong> <span>{submittedData.email}</span>
              </div>
              <div className="submitted-data-item">
                <strong>Phone:</strong> <span>{submittedData.phone}</span>
              </div>
              <div className="submitted-data-item">
                <strong>Message:</strong> <span>{submittedData.message}</span>
              </div>
              <button className="new-response-btn" onClick={handleNewResponse}>
                Submit Another Response
              </button>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="required">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="required">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="required">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="message" className="required">Your Message</label>
            <textarea
              id="message"
              className="form-control"
              value={form.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <div className="error-message">{errors.message}</div>}
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      )}

      <div className="privacy-note">
        By submitting, you agree to our <a href="#" target="_blank">Privacy Policy</a>.
      </div>
    </main>
  );
};

export default Contact;