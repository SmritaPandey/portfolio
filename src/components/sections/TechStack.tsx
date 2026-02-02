import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { techIcons } from '../../content';

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [_hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categories = ['all', ...new Set(techIcons.map(t => t.category))];

  const filteredItems = activeCategory === 'all'
    ? techIcons
    : techIcons.filter(t => t.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        '.tech__card',
        {
          opacity: 0,
          y: 60,
          rotateX: 45,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Title animation
      gsap.fromTo(
        '.tech__title-char',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredItems]);

  // Generate skillicons.dev URL for individual icon
  const getIconUrl = (iconName: string) =>
    `https://skillicons.dev/icons?i=${iconName}&theme=dark`;

  return (
    <section ref={sectionRef} className="tech section" id="skills">
      {/* Background elements */}
      <div className="tech__bg">
        <div className="tech__grid-pattern" />
        <div className="tech__glow-orb tech__glow-orb--1" />
        <div className="tech__glow-orb tech__glow-orb--2" />
      </div>

      <div className="container">
        {/* Header */}
        <div className="tech__header">
          <p className="text-meta neon-cyan">Engineering Arsenal</p>
          <h2 className="tech__title">
            {'TECH STACK'.split('').map((char, i) => (
              <span key={i} className="tech__title-char">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <p className="text-subheading tech__intro">
            Full-stack expertise from frontend to infrastructure
          </p>
        </div>

        {/* Category Filter */}
        <div className="tech__filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tech__filter ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* 3D Cards Grid - Bento Style */}
        <div className="tech__bento">
          {filteredItems.map((tech, index) => (
            <div
              key={tech.name}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`tech__card tech__card--${tech.size}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                '--delay': `${index * 0.05}s`,
              } as React.CSSProperties}
            >
              {/* Glass card background */}
              <div className="tech__card-glass" />

              {/* 3D Icon from skillicons.dev CDN */}
              <div className="tech__icon-wrapper">
                <img
                  src={getIconUrl(tech.icon)}
                  alt={tech.name}
                  className="tech__icon"
                  loading="lazy"
                />
              </div>

              {/* Label */}
              <div className="tech__card-content">
                <span className="tech__name">{tech.name}</span>
                <span className="tech__category">{tech.category}</span>
              </div>

              {/* Hover glow */}
              <div className="tech__card-glow" />

              {/* Reflection */}
              <div className="tech__card-shine" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .tech {
          position: relative;
          padding-block: var(--space-5xl, 120px);
          overflow: hidden;
          background: #0a0a12;
        }

        .tech__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .tech__grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 255, 247, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 247, 0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(circle at 50% 50%, black, transparent 70%);
        }

        .tech__glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
        }

        .tech__glow-orb--1 {
          width: 500px;
          height: 500px;
          background: #22d3ee;
          top: -20%;
          left: -10%;
        }

        .tech__glow-orb--2 {
          width: 400px;
          height: 400px;
          background: #a855f7;
          bottom: -10%;
          right: -5%;
        }

        .tech > .container {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .tech__header {
          text-align: center;
          margin-bottom: 48px;
        }

        .text-meta {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 12px;
        }

        .neon-cyan {
          color: #22d3ee;
        }

        .tech__title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(135deg, #22d3ee, #a855f7, #ff6b9d);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
          overflow: hidden;
          margin: 0;
        }

        .tech__title-char {
          display: inline-block;
        }

        .tech__intro {
          max-width: 500px;
          margin-inline: auto;
          margin-top: 16px;
          color: #a1a1aa;
          font-size: 1rem;
        }

        .tech__filters {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .tech__filter {
          padding: 10px 20px;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          color: #71717a;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tech__filter:hover,
        .tech__filter.active {
          background: rgba(34, 211, 238, 0.1);
          border-color: #22d3ee;
          color: #22d3ee;
        }

        /* Bento Grid Layout */
        .tech__bento {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .tech__card {
          position: relative;
          border-radius: 20px;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          transform-style: preserve-3d;
          perspective: 1000px;
          min-height: 160px;
        }

        .tech__card--sm {
          min-height: 140px;
        }

        .tech__card--md {
          min-height: 160px;
        }

        .tech__card--lg {
          min-height: 180px;
        }

        .tech__card:hover {
          transform: translateY(-12px) rotateX(5deg);
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.4),
            0 0 50px rgba(34, 211, 238, 0.2);
        }

        .tech__card-glass {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.02) 100%
          );
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: inherit;
          z-index: 0;
        }

        .tech__card:hover .tech__card-glass {
          border-color: rgba(34, 211, 238, 0.4);
          background: linear-gradient(
            135deg,
            rgba(34, 211, 238, 0.1) 0%,
            rgba(168, 85, 247, 0.05) 100%
          );
        }

        .tech__icon-wrapper {
          position: relative;
          z-index: 2;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tech__icon {
          width: 48px;
          height: 48px;
          object-fit: contain;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
        }

        .tech__card:hover .tech__icon {
          transform: scale(1.2) translateY(-4px);
        }

        .tech__card-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .tech__name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .tech__category {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #22d3ee;
          opacity: 0.7;
        }

        .tech__card-glow {
          position: absolute;
          inset: -30px;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(34, 211, 238, 0.2) 0%,
            transparent 70%
          );
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .tech__card:hover .tech__card-glow {
          opacity: 1;
        }

        .tech__card-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
          );
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          pointer-events: none;
          border-radius: inherit;
        }

        .tech__card:hover .tech__card-shine {
          left: 150%;
        }

        @media (max-width: 768px) {
          .tech__bento {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          .tech__icon {
            width: 40px;
            height: 40px;
          }

          .tech__card {
            padding: 18px 12px;
            min-height: 130px;
          }

          .tech__name {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .tech__bento {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .tech__card {
            padding: 16px 10px;
            min-height: 120px;
          }
        }
      `}</style>
    </section>
  );
};

export default TechStack;
