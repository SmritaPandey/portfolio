import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  variant?: 'dark' | 'light';
}

const Header = ({ variant = 'dark' }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''} header--${variant}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src="/img/logo.PNG" alt="Smrita" className="header__logo-img" />
        </Link>

        <nav className="header__nav">
          <Link to="/" className={`header__link ${isActive('/') ? 'header__link--active' : ''}`}>
            Home
          </Link>
          <Link to="/projects" className={`header__link ${isActive('/projects') ? 'header__link--active' : ''}`}>
            Projects
          </Link>
          <Link to="/gallery" className={`header__link ${isActive('/gallery') ? 'header__link--active' : ''}`}>
            Gallery
          </Link>
          <Link to="/blog" className={`header__link ${isActive('/blog') ? 'header__link--active' : ''}`}>
            Blog
          </Link>
        </nav>

        {location.pathname === '/' ? (
          <a
            href="#contact"
            className="header__cta"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Contact</span>
          </a>
        ) : (
          <Link to="/#contact" className="header__cta">
            <span>Contact</span>
          </Link>
        )}
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1rem 2rem;
          transition: all 0.3s ease;
        }

        .header--scrolled {
          background: rgba(10, 10, 15, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .header--light {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
        }

        .header--light.header--scrolled {
          background: rgba(255, 255, 255, 0.95);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .header__container {
          max-width: var(--container-max, 1400px);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .header__logo {
          display: flex;
          align-items: center;
        }

        .header__logo-img {
          height: 40px;
          width: auto;
          filter: brightness(0) invert(1);
          transition: all 0.3s ease;
        }

        .header--light .header__logo-img {
          filter: brightness(0.3);
        }

        .header__logo:hover .header__logo-img {
          filter: brightness(0) invert(1) drop-shadow(0 0 10px rgba(0, 255, 247, 0.5));
        }

        .header--light .header__logo:hover .header__logo-img {
          filter: brightness(0.2) drop-shadow(0 0 8px rgba(255, 143, 171, 0.5));
        }

        .header__nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .header__link {
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          padding: 0.5rem 0;
          position: relative;
          transition: color 0.3s ease;
        }

        .header--light .header__link {
          color: rgba(90, 74, 92, 0.7);
        }

        .header__link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent-cyan, #00fff7);
          transition: width 0.3s ease;
        }

        .header--light .header__link::after {
          background: #FFB7D5;
        }

        .header__link:hover {
          color: var(--accent-cyan, #00fff7);
        }

        .header--light .header__link:hover {
          color: #FF6B9D;
        }

        .header__link:hover::after,
        .header__link--active::after {
          width: 100%;
        }

        .header__link--active {
          color: var(--accent-cyan, #00fff7);
        }

        .header--light .header__link--active {
          color: #FF6B9D;
        }

        .header__cta {
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--bg-void, #050508);
          background: linear-gradient(135deg, var(--accent-cyan, #00fff7), var(--accent-violet, #a855f7));
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .header--light .header__cta {
          background: linear-gradient(135deg, #FFB7D5, #E8D5F2);
          color: #5A4A5C;
        }

        .header__cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(0, 255, 247, 0.4);
        }

        .header--light .header__cta:hover {
          box-shadow: 0 4px 15px rgba(255, 143, 171, 0.4);
        }

        @media (max-width: 768px) {
          .header {
            padding: 1rem;
          }

          .header__nav {
            gap: 1rem;
          }

          .header__link {
            font-size: 0.65rem;
          }

          .header__cta {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
