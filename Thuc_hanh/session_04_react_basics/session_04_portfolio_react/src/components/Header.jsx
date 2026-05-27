// src/components/Header.jsx
function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <a href="#home" className="logo">
          AnhDung<span className="dot">.</span>
        </a>
        <nav className="nav">
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </div>
          <a href="#contact" className="nav-cta">Hire Me</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
