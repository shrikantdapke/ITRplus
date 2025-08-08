import React from 'react';
import './About.css';

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2>About Us</h2>
        <p>
          At ITRPLUS, we simplify tax filing for individuals and businesses. What began as a small initiative has grown into a trusted platform that helps thousands manage their taxes effortlessly.
        </p>

        <div className="about-details">
          <div className="about-item">
            <h3>Our Mission</h3>
            <p>
              To empower users with easy-to-use tools and reliable tax solutions, saving time and reducing stress.
            </p>
          </div>

          <div className="about-item">
            <h3>Our Vision</h3>
            <p>
              To be a leading platform revolutionizing tax management in India with transparency and efficiency.
            </p>
          </div>

          <div className="about-item">
            <h3>Our Expertise</h3>
            <p>
              Our team of experienced professionals, including Chartered Accountants and financial experts, ensures seamless tax filing and innovative solutions.
            </p>
          </div>
        </div>

       
      </div>
    </section>
  );
}

export default About;
