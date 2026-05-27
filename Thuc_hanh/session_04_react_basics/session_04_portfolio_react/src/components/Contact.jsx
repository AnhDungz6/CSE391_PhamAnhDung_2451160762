// src/components/Contact.jsx
import { useState } from 'react';

function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Submit success state
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
      return;
    }

    // Submit logic here
    console.log('Form submitted:', formData);

    // Reset form and show success
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setSuccess(true);
    alert('Message sent successfully!');
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Contact Me</h2>
        </div>

        <div className="contact-container">
          <div className="contact-info-card">
            <h3>Let's collaborate!</h3>
            <p>
              I am open to new ideas, opportunities, and feedback. Feel free to leave a message using the form, or reach out to me directly on my socials.
            </p>
            
            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="icon">📍</span>
                <div>
                  <h4>Location</h4>
                  <p>Hanoi, Vietnam</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="icon">✉️</span>
                <div>
                  <h4>Email</h4>
                  <p>anhdung.dev@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            {success && (
              <div className="success-banner">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : formData.name.trim().length >= 2 ? 'valid' : ''}
                placeholder="John Doe"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : (formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) ? 'valid' : ''}
                placeholder="john@example.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Message Field */}
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : formData.message.trim().length >= 10 ? 'valid' : ''}
                placeholder="Hi, I would like to discuss a project..."
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
