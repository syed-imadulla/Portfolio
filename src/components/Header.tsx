import { useState } from 'react';
import { Menu, X } from 'lucide-react';

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
            <Menu color="#ffffff" size={24} />
          </button>
        </nav>
      </div>

      <div className={`dropdown-menu-overlay ${isOpen ? 'show' : ''}`}>
        <button
          className="dropdown-close-btn"
          onClick={() => setIsOpen(false)}
          aria-label="Close Menu"
        >
          <X size={32} />
        </button>

        <nav className="dropdown-nav">
          <ul className="dropdown-nav-list">
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.label}
                className="dropdown-nav-item"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <a
                  href={item.href}
                  className="dropdown-nav-link"
                  onClick={(e) => handleScroll(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
