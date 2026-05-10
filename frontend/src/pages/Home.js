import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            🎃 Horror Content Creator Platform
          </h1>
          <p className="hero-subtitle">
            Discover trending topics, create compelling hooks, and optimize your horror content for YouTube
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary btn-large">
              Get Started
            </Link>
            <Link to="/login" className="btn-secondary btn-large">
              Login
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔥</div>
            <h3>Trending Topics</h3>
            <p>Stay updated with the latest horror trends and viral topics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Find Your Niche</h3>
            <p>Discover untapped niches in horror content creation</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Create Hooks</h3>
            <p>Generate compelling hooks that grab viewer attention</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Performance Analytics</h3>
            <p>Track and analyze your content performance</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Content Optimization</h3>
            <p>Get recommendations to improve engagement and views</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Content Management</h3>
            <p>Organize and manage all your horror content in one place</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Create Amazing Horror Content?</h2>
        <p>Join creators who are already using our platform to grow their channels</p>
        <Link to="/register" className="btn-primary btn-large">
          Start Creating Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
