import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSignal = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const email = 'smrita@neurqai.com';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animateElements = contentRef.current?.querySelectorAll('.contact__animate');
      if (animateElements) {
        gsap.fromTo(
          animateElements,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      // Pulsing signal animation
      gsap.to('.contact__signal-ring', {
        scale: 2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: 'power1.out',
        stagger: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="contact section section--full">
      {/* Background Video */}
      <div className="contact__video-bg">
        <video autoPlay muted loop playsInline>
          <source src="/videos/hero-1.mp4" type="video/mp4" />
        </video>
        <div className="contact__video-overlay" />
      </div>

      <div className="contact__bg">
        <div className="contact__signal">
          <div className="contact__signal-core" />
          <div className="contact__signal-ring" />
          <div className="contact__signal-ring" />
          <div className="contact__signal-ring" />
        </div>
      </div>

      <div ref={contentRef} className="contact__content container">
        <p className="contact__label text-meta neon-cyan contact__animate">
          Ready to Connect?
        </p>

        <h2 className="contact__title text-hero contact__animate">
          <span className="neon-gradient">OPEN FOR</span>
          <span className="contact__title-line">SIGNALS</span>
        </h2>

        <p className="contact__description text-subheading contact__animate">
          Building something ambitious? Let's talk about systems, scale, and impact.
        </p>

        <div className="contact__actions contact__animate">
          <button
            className="contact__email-btn btn btn--primary"
            onClick={handleCopyEmail}
          >
            <span>{copied ? 'Copied!' : email}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              {copied ? (
                <path d="M13 4L6 12L3 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M5 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1h-2M5 2v2h6V2M5 2a1 1 0 011-1h4a1 1 0 011 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>

        <div className="contact__links contact__animate">
          <a
            href="https://linkedin.com/in/smritapandey"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link"
          >
            <span>LinkedIn</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="https://github.com/smritapandey"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link"
          >
            <span>GitHub</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <footer className="contact__footer contact__animate">
          <p className="text-small">
            © 2026 Smrita Pandey. Built with purpose.
          </p>
        </footer>
      </div>

      <style>{`
        .contact {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Video Background */
        .contact__video-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .contact__video-bg video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.25;
        }

        .contact__video-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            rgba(10, 10, 18, 0.6) 0%,
            rgba(10, 10, 18, 0.9) 70%,
            rgba(10, 10, 18, 0.95) 100%
          );
        }

        .contact__bg {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 1;
        }

        .contact__signal {
          position: relative;
          width: 600px;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact__signal-core {
          position: absolute;
          width: 20px;
          height: 20px;
          background: var(--accent-cyan);
          border-radius: 50%;
          box-shadow: var(--glow-cyan-intense);
        }

        .contact__signal-ring {
          position: absolute;
          width: 200px;
          height: 200px;
          border: 1px solid var(--accent-cyan);
          border-radius: 50%;
          opacity: 0.5;
        }

        .contact__content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--space-xl);
        }

        .contact__title {
          display: flex;
          flex-direction: column;
          line-height: 0.95;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
        }

        .contact__title-line {
          color: var(--text-primary);
        }

        .contact__description {
          max-width: 500px;
        }

        .contact__actions {
          margin-top: var(--space-lg);
        }

        .contact__email-btn {
          font-size: 0.875rem;
          padding: var(--space-lg) var(--space-2xl);
        }

        .contact__links {
          display: flex;
          gap: var(--space-xl);
          margin-top: var(--space-lg);
        }

        .contact__link {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          transition: all 0.3s ease;
        }

        .contact__link:hover {
          color: var(--accent-cyan);
        }

        .contact__footer {
          margin-top: var(--space-4xl);
        }

        .contact__footer p {
          color: var(--text-subtle);
        }

        @media (max-width: 768px) {
          .contact__signal {
            width: 300px;
            height: 300px;
          }

          .contact__signal-ring {
            width: 100px;
            height: 100px;
          }

          .contact__links {
            flex-direction: column;
            gap: var(--space-md);
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSignal;
