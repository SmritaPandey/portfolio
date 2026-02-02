import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer__content',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer__content">
        {/* Game-like minimal footer */}
        <div className="footer__bar">
          <div className="footer__left">
            <span className="footer__logo">SP</span>
            <span className="footer__separator">◆</span>
            <span className="footer__copyright">© 2026</span>
          </div>

          <div className="footer__center">
            <span className="footer__status">
              <span className="footer__status-dot" />
              <span>Online & Building</span>
            </span>
          </div>

          <div className="footer__right">
            <a href="https://github.com/smritapandey" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubLogo weight="fill" size={18} />
            </a>
            <a href="https://linkedin.com/in/smritapandey" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedinLogo weight="fill" size={18} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          position: relative;
          padding: var(--space-md) var(--space-xl);
          background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 15, 0.95) 100%);
        }

        .footer__content {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer__bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-sm) var(--space-md);
          background: rgba(20, 18, 30, 0.8);
          border: 1px solid rgba(255, 193, 87, 0.15);
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .footer__left {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }

        .footer__logo {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          color: #ffc157;
          padding: 4px 8px;
          background: rgba(255, 193, 87, 0.1);
          border: 1px solid rgba(255, 193, 87, 0.2);
          border-radius: 6px;
        }

        .footer__separator {
          font-size: 0.6rem;
          color: rgba(255, 193, 87, 0.4);
        }

        .footer__copyright {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .footer__center {
          display: flex;
          align-items: center;
        }

        .footer__status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .footer__status-dot {
          width: 6px;
          height: 6px;
          background: #4ade80;
          border-radius: 50%;
          box-shadow: 0 0 8px #4ade80;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .footer__right {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }

        .footer__right a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .footer__right a:hover {
          color: #ffc157;
          border-color: rgba(255, 193, 87, 0.3);
          background: rgba(255, 193, 87, 0.1);
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .footer__bar {
            flex-direction: column;
            gap: var(--space-sm);
            text-align: center;
          }

          .footer__center {
            order: -1;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
