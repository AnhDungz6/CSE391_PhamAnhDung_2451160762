// src/components/About.jsx
function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Who I Am</span>
          <h2 className="section-title">About Me</h2>
        </div>
        
        <div className="about-grid">
          <div className="about-image-wrapper">
            <div className="about-image-placeholder">
              <span className="placeholder-icon">&lt;/&gt;</span>
              <h3>Anh Dung</h3>
              <p>Developer &amp; Creator</p>
            </div>
          </div>
          
          <div className="about-info">
            <h3>I build robust web apps that bridge the gap between design and code.</h3>
            <p>
              I am a student passionate about building clean, efficient, and user-centric web applications. Currently focusing on modern JavaScript frameworks like React, Node.js, and Express, I enjoy solving complex structural challenges and styling responsive layouts.
            </p>
            
            <div className="about-features">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h4>Performance First</h4>
                <p>Ensuring fast load times and optimized assets for the best UX.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h4>Responsive layouts</h4>
                <p>Crafting responsive systems that adapt to desktop, tablet, and mobile.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🧠</div>
                <h4>Clean Code</h4>
                <p>Writing semantic, readable, and maintainable markup and logic.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
