import React, { useState } from "react";
import "./ContactUs.css";
import { database, ref, push } from "../firebase";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await push(ref(database, "contactMessages"), formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
      console.error("Firebase Error:", error);
    }
  };

  return (
    <section id="contact-us" className="contact-us">
      <div className="contact-us-container">
        <div className="contact-form">
          <h2>Get in Touch</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="send-message-btn">
              Send Message
            </button>
            {status && <p className="status-message">{status}</p>}
          </form>
        </div>

        <div className="contact-info">
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> support@itrplus.com</p>
          <p><strong>Phone:</strong> +91 1800-123-4567</p>
          <p><strong>Live Chat:</strong> Available 24/7</p>
          <div className="social-links">
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
