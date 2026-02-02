import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FounderSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animateElements = contentRef.current?.querySelectorAll('.founder__animate');
      if (animateElements) {
        gsap.fromTo(
          animateElements,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="founder section">
      <div className="founder__bg">
        <div className="founder__grid" />
        <div className="founder__glow founder__glow--1" />
        <div className="founder__glow founder__glow--2" />
      </div>

      <div ref={contentRef} className="founder__content container">
        <div className="founder__label founder__animate">
          <span className="text-meta neon-cyan">Leadership</span>
        </div>

        <h2 className="founder__title text-title founder__animate">
          <span className="neon-gradient">FOUNDER & CEO</span>
        </h2>

        <div className="founder__companies founder__animate">
          <div className="founder__company glass-panel">
            <span className="founder__company-name">NeurQ AI Labs</span>
            <span className="founder__company-role text-meta">Founder & Chief Technologist</span>
          </div>
          <div className="founder__company glass-panel">
            <span className="founder__company-name">NBATech</span>
            <span className="founder__company-role text-meta">Co-Founder</span>
          </div>
        </div>

        <blockquote className="founder__quote founder__animate">
          <p className="text-subheading">
            "Building systems that serve millions requires more than technical skill —
            it demands the courage to take responsibility for decisions that ripple
            through organizations and lives."
          </p>
        </blockquote>

        <div className="founder__philosophy founder__animate">
          <h3 className="text-meta neon-cyan">Philosophy</h3>
          <p className="text-body">
            I believe in technology that augments human capability without replacing human judgment.
            Every system I build is designed with institutional responsibility at its core —
            because when you operate at scale, integrity isn't optional.
          </p>
        </div>

        <div className="founder__stats founder__animate">
          <div className="founder__stat">
            <span className="founder__stat-value neon-cyan">5+</span>
            <span className="founder__stat-label text-meta">Years Building</span>
          </div>
          <div className="founder__stat">
            <span className="founder__stat-value neon-violet">10+</span>
            <span className="founder__stat-label text-meta">Enterprise Projects</span>
          </div>
          <div className="founder__stat">
            <span className="founder__stat-value" style={{ color: 'var(--accent-gold)' }}>2</span>
            <span className="founder__stat-label text-meta">Companies Founded</span>
          </div>
        </div>
      </div>

      <style>{`
        .founder {
          position: relative;
          padding-block: var(--space-5xl);
          overflow: hidden;
        }

        .founder__bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .founder__grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(90deg, rgba(168, 85, 247, 0.02) 1px, transparent 1px),
            linear-gradient(rgba(168, 85, 247, 0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
        }

        .founder__glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
        }

        .founder__glow--1 {
          top: 10%;
          left: -10%;
          background: var(--accent-violet);
        }

        .founder__glow--2 {
          bottom: 10%;
          right: -10%;
          background: var(--accent-cyan);
        }

        .founder__content {
          position: relative;
          z-index: 1;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--space-2xl);
        }

        .founder__title {
          margin-top: var(--space-sm);
        }

        .founder__companies {
          display: flex;
          gap: var(--space-lg);
          flex-wrap: wrap;
          justify-content: center;
        }

        .founder__company {
          padding: var(--space-lg) var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .founder__company-name {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 500;
        }

        .founder__company-role {
          color: var(--text-muted);
        }

        .founder__quote {
          max-width: 700px;
          padding: var(--space-xl);
          border-left: 2px solid var(--accent-cyan);
          background: rgba(0, 255, 247, 0.02);
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
          text-align: left;
        }

        .founder__quote p {
          font-style: italic;
          color: var(--text-secondary);
        }

        .founder__philosophy {
          max-width: 600px;
        }

        .founder__philosophy h3 {
          margin-bottom: var(--space-md);
        }

        .founder__stats {
          display: flex;
          gap: var(--space-3xl);
          margin-top: var(--space-xl);
        }

        .founder__stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-xs);
        }

        .founder__stat-value {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.5rem);
        }

        @media (max-width: 768px) {
          .founder__companies {
            flex-direction: column;
          }

          .founder__stats {
            gap: var(--space-xl);
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default FounderSection;
