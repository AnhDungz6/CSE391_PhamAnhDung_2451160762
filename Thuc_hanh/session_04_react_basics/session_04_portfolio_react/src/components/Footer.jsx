// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <a href="#home" className="logo">
            AnhDung<span className="dot">.</span>
          </a>
          <p>Building web experiences with focus, aesthetics, and clean code.</p>
        </div>
        
        <div className="footer-links">
          <h4>Navigate</h4>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-socials">
          <h4>Connect</h4>
          <div className="social-links-grid">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link" title="GitHub">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link" title="Twitter / X">
              Twitter
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="social-link" title="Discord">
              Discord
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Anh Dung. All rights reserved. Made for Session 04 React Basics.</p>
      </div>
    </footer>
  );
}

export default Footer;
