// src/components/Hero.jsx
function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-glow"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-tagline">Welcome to my space</span>
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Anh Dung</span>
          </h1>
          <p className="hero-subtitle">
            Full-Stack Developer &amp; UI Designer crafting high-performance, visually stunning web experiences.
          </p>
          <div className="hero-actions">
            <a href="#portfolio" className="btn btn-primary">
              View My Work <span className="arrow">→</span>
            </a>
            <a href="#contact" className="btn btn-secondary">
              Let's Talk
            </a>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">2+</span>
              <span className="stat-label">Years Learning</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Projects Built</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99%</span>
              <span className="stat-label">Dedication</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
