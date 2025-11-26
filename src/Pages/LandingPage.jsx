import React, { useState, useEffect } from 'react';
// import '../Component/Landing.css';
import "../Styles/Landing.css"
import { useNavigate } from 'react-router-dom';

const GradePredictionLanding = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/home');
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: '📊',
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze your performance patterns to predict future grades with high accuracy.'
    },
    {
      icon: '🎯',
      title: 'Personalized Insights',
      description: 'Get customized recommendations and study plans based on your unique learning style and academic history.'
    },
    {
      icon: '📈',
      title: 'Track Progress',
      description: 'Monitor your academic journey with detailed analytics and see how your predictions improve over time.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Computer Science Student',
      text: 'This tool helped me identify my weak areas early. My GPA improved by 0.5 points in just one semester!',
      avatar: '👩‍🎓'
    },
    {
      name: 'Michael Chen',
      role: 'Engineering Student',
      text: 'The predictions were surprisingly accurate. It motivated me to work harder and achieve better results.',
      avatar: '👨‍🎓'
    },
    {
      name: 'Emma Davis',
      role: 'Business Major',
      text: 'I love how it breaks down each subject. Now I know exactly where to focus my study time.',
      avatar: '👩‍💼'
    }
  ];

  return (
    <div className="landing-page">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Predict Your Academic Success
                <span className="gradient-text"> Before It Happens</span>
              </h1>
              <p className="hero-subtitle">
                Harness the power of AI to forecast your grades, identify improvement areas, 
                and achieve your academic goals with confidence.
              </p>
              <div className="hero-buttons">
                <button className="primary-button" onClick={handleButtonClick}>
                  Start Predicting
                  <span className="button-arrow">→</span>
                </button>
                
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-number">95%</div>
                  <div className="stat-label">Accuracy</div>
                </div>
                <div className="stat">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Students</div>
                </div>
                <div className="stat">
                  <div className="stat-number">4.9/5</div>
                  <div className="stat-label">Rating</div>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="dashboard-mockup">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="mockup-content">
                  <div className="prediction-card">
                    <div className="card-header">Predicted Grade</div>
                    <div className="grade-display">A-</div>
                    <div className="confidence">92% Confidence</div>
                  </div>
                  <div className="chart-area">
                    <div className="chart-bar" style={{height: '60%'}}></div>
                    <div className="chart-bar" style={{height: '80%'}}></div>
                    <div className="chart-bar" style={{height: '70%'}}></div>
                    <div className="chart-bar" style={{height: '90%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">Everything you need to succeed academically</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card ${activeFeature === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Simple steps to predict your success</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3 className="step-title">Enter Your Data</h3>
              <p className="step-description">Input your current grades, attendance, and study habits</p>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">2</div>
              <h3 className="step-title">AI Analysis</h3>
              <p className="step-description">Our algorithm processes your data and identifies patterns</p>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">3</div>
              <h3 className="step-title">Get Predictions</h3>
              <p className="step-description">Receive accurate grade predictions and improvement tips</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Students Say</h2>
            <p className="section-subtitle">Real results from real students</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Academic Journey?</h2>
            <p className="cta-text">Join thousands of students who are already predicting and improving their grades</p>
            <button onClick={handleButtonClick} className="cta-large-button">
              Get Started Free
              <span className="button-arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-icon">🎓</span>
                <span className="logo-text">GradePredict</span>
              </div>
              <p className="footer-description">Empowering students with AI-driven grade predictions</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <ul>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#demo">Demo</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <ul>
                  <li><a href="#about">About</a></li>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#careers">Careers</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <ul>
                  <li><a href="#help">Help Center</a></li>
                  <li><a href="#contact">Contact</a></li>
                  <li><a href="#privacy">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 GradePredict. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default GradePredictionLanding;