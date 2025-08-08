import React from 'react';
import './Features.css';

function Features() {
  const features = [
    { title: 'Easy Filing', description: 'Simplified tax filing process.' },
    { title: 'Secure Data', description: 'Your information is safe with us.' },
    { title: '24/7 Support', description: 'We are here for you anytime.' },
  ];

  return (
    <section id="features" className="features">
      <h2>Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
