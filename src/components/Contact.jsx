import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Contact = () => {
  const addElement = useScrollAnimation();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you shortly.");
    e.target.reset();
  }

  return (
    <section id="contact" className="content-section light-bg">
      <div className="container contact-container reveal-on-scroll" ref={addElement}>
        <div className="contact-text">
          <h2>Have a Question?</h2>
          <p>We're here to help you prepare for your journey. Reach out to us anytime.</p>
          <div className="contact-info">
            <p><strong>Email:</strong> <a href="mailto:info@highwaytohill.com">info@highwaytohill.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+919876543210">+91 98765 43210</a></p>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <textarea placeholder="Your Message" rows="5" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;