import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="header">
        <div className="logo">📘 Shuleni</div>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Contact</a>
          <a href="#" className="get-started">Get Started</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to Shuleni</h1>
          <p>Transforming education for a digital world.</p>
          <button className="cta">Create a School</button>
        </div>
        <div className="hero-image"></div>
      </section>
    </div>
  );
};

export default LandingPage;
