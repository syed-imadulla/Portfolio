const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Playground', href: '#playground' },
  { label: 'Contact', href: '#contact' },
];

const GITHUB  = 'https://github.com/syed-imadulla';
const LINKEDIN = 'https://www.linkedin.com/in/syed-imadulla'; // ← update if needed

export function Footer() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) {
      window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* Top row: logo + tagline */}
        <div className="footer-top">
          <a href="#hero" className="footer-logo" onClick={scrollToTop}>
            <span className="footer-logo-tilde">~</span> SYED<span className="footer-logo-sep">_</span>IMADULLA
          </a>
          <p className="footer-tagline">BUILD / LEARN / EXPERIMENT / SHIP</p>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Middle row: nav */}
        <nav className="footer-nav" aria-label="Footer navigation">
          <ul className="footer-nav-list">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="footer-nav-link"
                  onClick={(e) => handleScroll(e, item.href)}
                >
                  {item.label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom row: copyright + social */}
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 SYED IMADULLA</span>
          <div className="footer-social-links">
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              GITHUB ↗
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              LINKEDIN ↗
            </a>
            <a
              href="/Syed_Imadulla_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Resume"
            >
              RESUME ↗
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
