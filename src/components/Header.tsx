import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Playground', href: '#playground' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // For Phase 1, these sections don't exist yet except maybe hero
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const targetScroll = element.offsetTop - 72; // Header height
        window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="header-nav">
      <div className="header-container">
        <a href="#hero" className="header-logo-link" onClick={(e) => handleScroll(e, '#hero')}>
          <span className="logo-icon-sys">~</span>
          SYED<span>_</span>IMADULLA
        </a>

        <nav className="desktop-nav">
          <ul className="desktop-nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="desktop-nav-link"
                  onClick={(e) => handleScroll(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="menu-toggle-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <span className="menu-bracket">[</span> ≡ <span className="menu-bracket">]</span>
          </button>
        </nav>
      </div>

      <div className={`dropdown-menu-overlay ${isOpen ? 'show' : ''}`}>
        <div className="dropdown-menu-header">
          <a href="#hero" className="header-logo-link" onClick={(e) => handleScroll(e, '#hero')}>
            <span className="logo-icon-sys">~</span>
            SYED<span>_</span>IMADULLA
          </a>
          <button
            className="dropdown-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close Menu"
          >
            <span className="menu-bracket">[</span> &times; <span className="menu-bracket">]</span>
          </button>
        </div>

        <div className="dropdown-menu-content">
          <div className="dropdown-menu-label">01 / MENU</div>
          <nav className="dropdown-nav">
            <ul className="dropdown-nav-list">
              {NAV_ITEMS.map((item, index) => (
                <li
                  key={item.label}
                  className="dropdown-nav-item"
                  style={{ animationDelay: `${index * 0.04}s` }}
                >
                  <a
                    href={item.href}
                    className="dropdown-nav-link"
                    onClick={(e) => handleScroll(e, item.href)}
                  >
                    <span className="dropdown-nav-num">0{index + 1}</span>
                    <span className="dropdown-nav-text">{item.label}</span>
                    <span className="dropdown-nav-marker">●</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="dropdown-menu-footer">SYS // IMADULLA</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
