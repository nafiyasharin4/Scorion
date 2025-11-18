import React from "react";
import "../../Styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="logo">🎓 SCORION</div>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Courses</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </nav>
        <button className="logout-btn">Logout</button>
      </header>  

      {/* Hero Section */}
      <section className="hero">
        <center>
         <div class="logo-section">
        <img src="" alt="Scorion Logo" />
      </div></center>
        
        <div className="hero-text">
          <h1>Welcome to <span>SCORION</span></h1>
          <p>Your personalized student platform — Learn, Grow, and Connect with confidence.</p>
          <button className="explore-btn">Explore Now</button>
        </div>
        <div className="hero-image">
          <img src="/images/home-banner.png" alt="Student dashboard" />
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="features">
        <div className="feature">
          <h2>📚 Learn</h2>
          <p>Access curated study resources and interactive lessons.</p>
        </div>
        <div className="feature">
          <h2>💡 Grow</h2>
          <p>Track your progress and get personalized improvement tips.</p>
        </div>
        <div className="feature">
          <h2>🌐 Connect</h2>
          <p>Engage with other learners in the student community.</p>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 SCORION. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;