import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  House,
  Book,
  FolderOpen,
  Code,
  FileText,
  EnvelopeSimple,
  Lightning,
  Diamond,
  Star,
  Sparkle,
  RocketLaunch,
  ArrowRight,
  X,
} from '@phosphor-icons/react';
import { heroTechStack, softSkills, profile } from '../../content';

gsap.registerPlugin(ScrollTrigger);

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  expandable?: boolean;
  download?: boolean;
  href?: string;
}

const navItems: NavItem[] = [
  { id: 'home', icon: <House weight="duotone" size={18} />, label: 'Home' },
  { id: 'story', icon: <Book weight="duotone" size={18} />, label: 'My Story', expandable: true },
  { id: 'projects', icon: <FolderOpen weight="duotone" size={18} />, label: 'Projects', href: '/projects' },
  { id: 'skills', icon: <Code weight="duotone" size={18} />, label: 'Skills', expandable: true },
  { id: 'resume', icon: <FileText weight="duotone" size={18} />, label: 'Resume', download: true },
  { id: 'contact', icon: <EnvelopeSimple weight="duotone" size={18} />, label: 'Contact' },
];

// Use profile story content from CMS
const storyContent = profile.story;

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const storyPanelRef = useRef<HTMLDivElement>(null);
  const skillsPanelRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [activePopup, setActivePopup] = useState<'story' | 'skills' | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intentional entrance animation timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        delay: 0.2
      });

      // Title reveal - clean slide up
      tl.fromTo('.hero-title-line',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15 }
      )
        // Subtitle fade in
        .fromTo('.hero-subtitle',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        // Stats reveal with stagger
        .fromTo('.stat-card',
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
          '-=0.4'
        )
        // Character image scale in
        .fromTo('.hero-character',
          { opacity: 0, scale: 0.9, x: 40 },
          { opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power3.out' },
          '-=0.8'
        )
        // Cyan popup box growing from bottom
        .fromTo('.character-popup-box',
          { scaleY: 0, transformOrigin: 'bottom center' },
          { scaleY: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        // CTA buttons
        .fromTo('.hero-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        // Navigation sidebar
        .fromTo('.sidebar-nav',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5 },
          '-=0.3'
        );

      // Scroll-triggered parallax for character
      gsap.to('.hero-character', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Track active section on scroll - only for sections that exist
      const sections = ['home', 'projects', 'contact'];
      sections.forEach(section => {
        const el = document.getElementById(section);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveSection(section),
            onEnterBack: () => setActiveSection(section),
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Panel animations for Story and Skills
  useEffect(() => {
    // Handle scroll locking for sidebar panels
    if (activePopup) {
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('lenis-stopped');
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.classList.remove('lenis-stopped');
    }

    // Story panel animation
    if (storyPanelRef.current) {
      if (activePopup === 'story') {
        gsap.to(storyPanelRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out'
        });
        gsap.fromTo('.story-content > *',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.2 }
        );
      } else {
        gsap.to(storyPanelRef.current, {
          x: -400,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.in'
        });
      }
    }
    // Skills panel animation
    if (skillsPanelRef.current) {
      if (activePopup === 'skills') {
        gsap.to(skillsPanelRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out'
        });
        gsap.fromTo('.skills-content > *',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, delay: 0.2 }
        );
      } else {
        gsap.to(skillsPanelRef.current, {
          x: -400,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.in'
        });
      }
    }
  }, [activePopup]);

  const handleNavClick = (item: NavItem) => {
    if (item.expandable) {
      // Toggle the popup for this item
      setActivePopup(activePopup === item.id ? null : item.id as 'story' | 'skills');
      return;
    }

    if (item.download) {
      // Resume download - handled by anchor tag
      return;
    }

    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="hero-section" id="home">
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-bg__gradient" />
      </div>

      {/* Sidebar Navigation - Enhanced */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item.id}
            className="nav-item-wrapper"
            onMouseEnter={() => {
              setHoveredNav(item.id);
              if (item.expandable && item.id === 'story') {
                setActivePopup('story');
              } else if (item.expandable && item.id === 'skills') {
                setActivePopup('skills');
              }
            }}
            onMouseLeave={() => {
              setHoveredNav(null);
              // Don't close popup on nav leave - let panel handle it
            }}
          >
            {item.download ? (
              <a
                href="/Smrita_Pandey_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`nav-btn ${activeSection === item.id ? 'nav-btn--active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
              </a>
            ) : item.href ? (
              <a
                href={item.href}
                className={`nav-btn ${activeSection === item.id ? 'nav-btn--active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
              </a>
            ) : (
              <button
                className={`nav-btn ${activeSection === item.id ? 'nav-btn--active' : ''} ${item.expandable && activePopup === item.id ? 'nav-btn--expanded' : ''}`}
                onClick={() => handleNavClick(item)}
              >
                <span className="nav-icon">{item.icon}</span>
              </button>
            )}

            {/* Hover Label - hide for expandable when popup is open */}
            <div className={`nav-label ${hoveredNav === item.id && !(item.expandable && activePopup) ? 'nav-label--visible' : ''}`}>
              <span>{item.label}</span>
              {item.download && <span className="download-hint">Click to preview</span>}
            </div>
          </div>
        ))}
      </nav>

      {/* Story Panel - Expandable Narrative */}
      <div
        ref={storyPanelRef}
        className={`story-panel ${activePopup === 'story' ? 'story-panel--open' : ''}`}
        data-lenis-prevent
        onMouseLeave={() => setActivePopup(null)}
      >
        <div className="story-content">
          <button className="story-close" onClick={() => setActivePopup(null)}>
            <X weight="bold" size={14} />
          </button>
          <h3 className="story-title">{storyContent.title}</h3>

          {/* Chapters */}
          <div className="story-chapters">
            {storyContent.chapters.map((chapter, i) => (
              <div key={i} className="story-chapter">
                <h4 className="chapter-title">{chapter.title}</h4>
                <p className="chapter-content">{chapter.content}</p>
              </div>
            ))}
          </div>

          {/* Skills Preview */}
          <div className="story-skills">
            {storyContent.skills.map((skill, i) => (
              <span key={i} className="story-skill-chip">{skill}</span>
            ))}
          </div>

          <div className="story-highlight">
            <Sparkle weight="fill" size={20} className="highlight-icon" />
            <span>{storyContent.highlight}</span>
          </div>
          <div className="story-cta">
            <a href="/Smrita_Pandey_Resume.pdf" target="_blank" rel="noopener noreferrer" className="story-download-btn">
              <FileText weight="duotone" size={18} />
              <span>View Resume</span>
              <ArrowRight weight="bold" size={16} className="download-arrow" /></a>
          </div>
        </div>
      </div>

      {/* Skills Panel - Tech Icons & RPG Stats */}
      <div
        ref={skillsPanelRef}
        className={`skills-panel ${activePopup === 'skills' ? 'skills-panel--open' : ''}`}
        data-lenis-prevent
        onMouseLeave={() => setActivePopup(null)}
      >
        <div className="skills-content">
          <button className="skills-close" onClick={() => setActivePopup(null)}>
            <X weight="bold" size={14} />
          </button>
          <h3 className="skills-title">⚔️ Skill Arsenal</h3>

          {/* Tech Icons Grid */}
          <div className="skills-section-label">Tech Stack</div>
          <div className="tech-icons-grid">
            {heroTechStack.map((skill, i) => (
              <div key={i} className="tech-icon-item" title={skill.name}>
                <img
                  src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
                  alt={skill.name}
                  loading="lazy"
                />
                <span className="tech-icon-name">{skill.name}</span>
              </div>
            ))}
          </div>

          {/* RPG Skill Radar Graph */}
          <div className="skills-section-label">Character Stats</div>
          <div className="rpg-skill-graph">
            <svg viewBox="0 0 200 200" className="skill-radar">
              {/* Background hexagons */}
              {[100, 80, 60, 40, 20].map((size, i) => {
                const points = softSkills.map((_, index) => {
                  const angle = (Math.PI * 2 * index) / softSkills.length - Math.PI / 2;
                  const x = 100 + (size * Math.cos(angle));
                  const y = 100 + (size * Math.sin(angle));
                  return `${x},${y}`;
                }).join(' ');
                return (
                  <polygon
                    key={i}
                    points={points}
                    className="radar-ring"
                    style={{ opacity: 0.15 - i * 0.02 }}
                  />
                );
              })}

              {/* Axis lines */}
              {softSkills.map((_, index) => {
                const angle = (Math.PI * 2 * index) / softSkills.length - Math.PI / 2;
                const x2 = 100 + (100 * Math.cos(angle));
                const y2 = 100 + (100 * Math.sin(angle));
                return (
                  <line
                    key={index}
                    x1="100"
                    y1="100"
                    x2={x2}
                    y2={y2}
                    className="radar-axis"
                  />
                );
              })}

              {/* Skill polygon - filled area */}
              <polygon
                points={softSkills.map((skill, index) => {
                  const angle = (Math.PI * 2 * index) / softSkills.length - Math.PI / 2;
                  const radius = (skill.level / 100) * 90;
                  const x = 100 + (radius * Math.cos(angle));
                  const y = 100 + (radius * Math.sin(angle));
                  return `${x},${y}`;
                }).join(' ')}
                className="radar-polygon"
              />

              {/* Skill points with glow */}
              {softSkills.map((skill, index) => {
                const angle = (Math.PI * 2 * index) / softSkills.length - Math.PI / 2;
                const radius = (skill.level / 100) * 90;
                const x = 100 + (radius * Math.cos(angle));
                const y = 100 + (radius * Math.sin(angle));
                return (
                  <g key={index}>
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      className="radar-point-glow"
                      style={{ fill: skill.color }}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="4"
                      className="radar-point"
                      style={{ fill: skill.color }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Skill labels around the graph */}
            <div className="skill-labels">
              {softSkills.map((skill, index) => {
                const angle = (Math.PI * 2 * index) / softSkills.length - Math.PI / 2;
                const labelRadius = 130;
                const x = 50 + (labelRadius * Math.cos(angle) / 2);
                const y = 50 + (labelRadius * Math.sin(angle) / 2);
                return (
                  <div
                    key={index}
                    className="skill-label"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      '--skill-color': skill.color
                    } as React.CSSProperties}
                  >
                    <span className="skill-label-name">{skill.name}</span>
                    <span className="skill-label-level" style={{ color: skill.color }}>{skill.level}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div ref={containerRef} className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>Available for work</span>
          </div>

          {/* Title */}
          <h1 className="hero-title">
            <span className="hero-title-line">SMRITA</span>
            <span className="hero-title-line hero-title-line--gradient">PANDEY</span>
          </h1>

          {/* Role & Stars */}
          <div className="hero-subtitle">
            <p className="hero-role">Founder & Fullstack Developer</p>
            <div className="hero-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} weight="fill" size={14} className="star" />
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div className="stats-row">
            <div className="stat-card">
              <Lightning weight="fill" size={20} className="stat-icon" />
              <div className="stat-info">
                <span className="stat-value">5+</span>
                <span className="stat-label">Years</span>
              </div>
            </div>
            <div className="stat-card stat-card--accent">
              <Diamond weight="fill" size={20} className="stat-icon" />
              <div className="stat-info">
                <span className="stat-value">50+</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>
            <div className="stat-card">
              <Sparkle weight="fill" size={20} className="stat-icon" />
              <div className="stat-info">
                <span className="stat-value">AI</span>
                <span className="stat-label">Focused</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="skills-section">
            <div className="skills-chips">
              {['React', 'TypeScript', 'Python', 'AI/ML', 'Node.js', 'GRC'].map((skill) => (
                <span key={skill} className="skill-chip">{skill}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="hero-cta">
            <button className="btn btn--primary" onClick={() => scrollToSection('projects')}>
              <span>View Projects</span>
              <ArrowRight weight="bold" size={16} className="btn-arrow" />
            </button>
            <a href="/Smrita_Pandey_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--download">
              <FileText weight="duotone" size={16} className="btn-download-icon" />
              <span>Resume</span>
              <ArrowRight weight="bold" size={14} className="btn-download-arrow" />
            </a>
          </div>
        </div>

        {/* Right - Character with Popup Effect */}
        <div className="hero-character-container">
          {/* Cyan Popup Box - Grows from bottom */}
          <div className="character-popup-box" />

          {/* Character Image - Transparent cutout */}
          <div className="hero-character">
            <img src="/images/hero-avatar copy Background Removed.png" alt="Smrita Pandey" />
          </div>

          {/* Info Badge */}
          <div className="character-badge character-badge--top">
            <RocketLaunch weight="duotone" size={16} />
            <span>NeurQ AI Labs</span>
          </div>

          <div className="character-badge character-badge--bottom">
            <Sparkle weight="fill" size={16} />
            <span>Creating Digital Magic</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span className="scroll-text">Scroll</span>
        <div className="scroll-line" />
      </div>

      <style>{`
        /* ===== VARIABLES ===== */
        .hero-section {
          --bg-dark: #0a0a12;
          --bg-card: rgba(18, 16, 26, 0.8);
          --primary: #ff6b9d;
          --secondary: #a855f7;
          --tertiary: #22d3ee;
          --accent: #d946ef;
          --text: #ffffff;
          --text-dim: #a1a1aa;
          --text-muted: #71717a;
        }

        /* ===== SECTION ===== */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 60px;
          background: var(--bg-dark);
          overflow: hidden;
        }

        /* ===== BACKGROUND ===== */
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-bg__gradient {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse 80% 60% at 10% 20%, rgba(255, 107, 157, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 90% 80%, rgba(168, 85, 247, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(34, 211, 238, 0.08) 0%, transparent 50%);
        }

        /* ===== SIDEBAR NAV - ENHANCED ===== */
        .sidebar-nav {
          position: fixed;
          left: 24px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 100;
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          padding: 16px 12px;
          border-radius: 28px;
          border: 1px solid rgba(168, 85, 247, 0.2);
        }

        .nav-item-wrapper {
          position: relative;
        }

        .nav-btn {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--text-dim);
          font-size: 0.9rem;
          text-decoration: none;
        }

        .nav-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          transform: scale(1.08);
        }

        .nav-btn--active {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-color: transparent;
          color: white;
        }

        .nav-btn--expanded {
          background: linear-gradient(135deg, var(--tertiary), var(--secondary));
          border-color: transparent;
          color: white;
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.4); }
          50% { box-shadow: 0 0 20px 4px rgba(34, 211, 238, 0.2); }
        }

        /* Nav Labels */
        .nav-label {
          position: absolute;
          left: 54px;
          top: 50%;
          transform: translateY(-50%) translateX(-10px);
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(168, 85, 247, 0.2);
          padding: 8px 14px;
          border-radius: 12px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav-label span:first-child {
          font-size: 0.85rem;
          color: var(--text);
          font-weight: 500;
        }

        .download-hint {
          font-size: 0.65rem;
          color: var(--tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .nav-label--visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(-50%) translateX(0);
        }

        /* ===== STORY PANEL ===== */
        .story-panel {
          position: fixed;
          left: 90px;
          top: 50%;
          transform: translateY(-50%) translateX(-400px);
          width: 360px;
          max-height: 70vh;
          background: rgba(18, 16, 26, 0.95);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 24px;
          padding: 28px;
          z-index: 99;
          opacity: 0;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .story-panel::-webkit-scrollbar {
          width: 4px;
        }

        .story-panel::-webkit-scrollbar-thumb {
          background: var(--secondary);
          border-radius: 4px;
        }

        .story-content {
          position: relative;
          padding-right: 4px;
        }
        
        .story-panel--open {
          overflow-y: auto;
          scrollbar-gutter: stable;
        }

        .story-close {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: var(--text-dim);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .story-close:hover {
          background: rgba(255, 107, 157, 0.2);
          border-color: var(--primary);
          color: var(--primary);
        }

        .story-title {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--primary), var(--tertiary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
        }

        .story-chapters {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 20px;
        }

        .story-chapter {
          padding: 12px 14px;
          background: rgba(255, 255, 255, 0.03);
          border-left: 2px solid var(--primary);
          border-radius: 0 12px 12px 0;
          transition: all 0.3s ease;
        }

        .story-chapter:hover {
          background: rgba(255, 255, 255, 0.06);
          border-left-color: var(--tertiary);
        }

        .chapter-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--primary);
          margin: 0 0 6px 0;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .chapter-content {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--text-dim);
          margin: 0;
        }

        .story-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .story-skill-chip {
          padding: 6px 12px;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(34, 211, 238, 0.15));
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 16px;
          font-size: 0.75rem;
          color: var(--tertiary);
          transition: all 0.3s ease;
        }

        .story-skill-chip:hover {
          border-color: var(--tertiary);
          background: rgba(34, 211, 238, 0.2);
          color: white;
        }

        .story-highlight {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px;
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.1), rgba(168, 85, 247, 0.1));
          border: 1px solid rgba(255, 107, 157, 0.2);
          border-radius: 16px;
          margin-top: 20px;
        }

        .highlight-icon {
          font-size: 1.2rem;
        }

        .story-highlight span:last-child {
          font-size: 0.85rem;
          color: var(--primary);
          font-weight: 500;
        }

        .story-cta {
          margin-top: 24px;
        }

        .story-download-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px 20px;
          background: linear-gradient(135deg, var(--tertiary), var(--secondary));
          border: none;
          border-radius: 14px;
          color: white;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .story-download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(34, 211, 238, 0.3);
        }

        .download-icon {
          font-size: 1.1rem;
        }

        .download-arrow {
          animation: bounce-down 1.5s ease-in-out infinite;
        }

        @keyframes bounce-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }

        /* ===== SKILLS PANEL ===== */
        .skills-panel {
          position: fixed;
          left: 90px;
          top: 50%;
          transform: translateY(-50%) translateX(-450px);
          width: 400px;
          max-height: 75vh;
          background: rgba(18, 16, 26, 0.97);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(34, 211, 238, 0.3);
          border-radius: 24px;
          padding: 28px;
          z-index: 99;
          opacity: 0;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          scrollbar-gutter: stable;
        }

        .skills-panel::-webkit-scrollbar {
          width: 4px;
        }

        .skills-panel::-webkit-scrollbar-thumb {
          background: var(--tertiary);
          border-radius: 4px;
        }

        .skills-panel--open {
          overflow-y: auto;
        }

        .skills-content {
          position: relative;
          padding-right: 4px;
        }

        .skills-close {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: var(--text-dim);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .skills-close:hover {
          background: rgba(34, 211, 238, 0.2);
          border-color: var(--tertiary);
          color: var(--tertiary);
        }

        .skills-title {
          font-size: 1.4rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--tertiary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
        }

        .skills-section-label {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 12px;
          margin-top: 16px;
        }

        .skills-section-label:first-of-type {
          margin-top: 0;
        }

        /* Tech Icons Grid */
        .tech-icons-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
        }

        .tech-icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 10px 4px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: default;
        }

        .tech-icon-item:hover {
          background: rgba(34, 211, 238, 0.1);
          border-color: rgba(34, 211, 238, 0.3);
          transform: translateY(-4px);
        }

        .tech-icon-item img {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }

        .tech-icon-name {
          font-size: 0.6rem;
          color: var(--text-muted);
          text-align: center;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* RPG Skill Radar Graph */
        .rpg-skill-graph {
          position: relative;
          padding: 10px 5px;
          max-width: 200px;
          margin: 0 auto;
        }

        .skill-radar {
          width: 100%;
          max-width: 140px;
          height: auto;
          margin: 0 auto;
          display: block;
          filter: drop-shadow(0 0 15px rgba(255, 193, 87, 0.15));
        }

        .radar-ring {
          fill: none;
          stroke: rgba(255, 193, 87, 0.2);
          stroke-width: 0.5;
        }

        .radar-axis {
          stroke: rgba(255, 193, 87, 0.15);
          stroke-width: 0.5;
        }

        .radar-polygon {
          fill: rgba(255, 193, 87, 0.1);
          stroke: #ffc157;
          stroke-width: 1.5;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 6px rgba(255, 193, 87, 0.4));
        }

        .radar-point-glow {
          opacity: 0.3;
          filter: blur(2px);
        }

        .radar-point {
          stroke: white;
          stroke-width: 1;
          transition: all 0.3s ease;
        }

        /* Skill Labels - Compact Genshin Style */
        .skill-labels {
          position: absolute;
          inset: -10px;
          pointer-events: none;
        }

        .skill-label {
          position: absolute;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1px;
          padding: 3px 6px;
          background: rgba(20, 18, 30, 0.9);
          border: 1px solid rgba(255, 193, 87, 0.2);
          border-radius: 6px;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
          pointer-events: auto;
          cursor: default;
        }

        .skill-label:hover {
          border-color: var(--skill-color);
          transform: translate(-50%, -50%) scale(1.05);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .skill-label-icon {
          font-size: 0.7rem;
        }

        .skill-label-name {
          font-size: 0.45rem;
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .skill-label-level {
          font-size: 0.6rem;
          font-weight: 700;
          font-family: 'Orbitron', sans-serif;
        }

        /* ===== MAIN CONTAINER ===== */
        .hero-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1300px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        /* ===== LEFT CONTENT ===== */
        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 24px;
          font-size: 0.85rem;
          color: #22c55e;
          width: fit-content;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Title */
        .hero-title {
          display: flex;
          flex-direction: column;
          margin: 0;
          line-height: 0.95;
        }

        .hero-title-line {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 900;
          color: var(--text);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-title-line--gradient {
          font-family: 'Orbitron', sans-serif;
          background: linear-gradient(135deg, var(--primary), var(--secondary), var(--tertiary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 20px rgba(255, 107, 157, 0.3));
        }

        /* Subtitle */
        .hero-subtitle {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .hero-role {
          font-size: 1.1rem;
          color: var(--text-dim);
          margin: 0;
        }

        .hero-stars {
          display: flex;
          gap: 4px;
        }

        .star {
          color: #fbbf24;
          font-size: 1.1rem;
        }

        /* Stats */
        .stats-row {
          display: flex;
          gap: 16px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 16px;
          min-width: 120px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(168, 85, 247, 0.4);
        }

        .stat-card--accent {
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.15), rgba(168, 85, 247, 0.15));
          border-color: rgba(255, 107, 157, 0.3);
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 10px;
          font-size: 1rem;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text);
        }

        .stat-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Skills */
        .skills-section {
          margin-top: 8px;
        }

        .skills-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skill-chip {
          padding: 8px 16px;
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 20px;
          font-size: 0.85rem;
          color: var(--text-dim);
          transition: all 0.3s ease;
        }

        .skill-chip:hover {
          background: rgba(168, 85, 247, 0.2);
          border-color: var(--secondary);
          color: var(--text);
        }

        /* CTA */
        .hero-cta {
          display: flex;
          gap: 16px;
          margin-top: 8px;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 28px;
          border-radius: 16px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          text-decoration: none;
        }

        .btn--primary {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
        }

        .btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 107, 157, 0.3);
        }

        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .btn--primary:hover .btn-arrow {
          transform: translateX(4px);
        }

        /* Download Button */
        .btn--download {
          background: transparent;
          color: var(--tertiary);
          border: 1px solid rgba(34, 211, 238, 0.3);
          position: relative;
          overflow: hidden;
        }

        .btn--download::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(168, 85, 247, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .btn--download:hover::before {
          opacity: 1;
        }

        .btn--download:hover {
          border-color: var(--tertiary);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(34, 211, 238, 0.2);
        }

        .btn-download-icon {
          font-size: 1.1rem;
          position: relative;
          z-index: 1;
        }

        .btn-download-arrow {
          position: relative;
          z-index: 1;
          animation: bounce-down 1.5s ease-in-out infinite;
        }

        .btn--download span {
          position: relative;
          z-index: 1;
        }

        /* ===== CHARACTER ===== */
        .hero-character-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          min-height: 500px;
        }

        /* Cyan Popup Box */
        .character-popup-box {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 85%;
          height: 65%;
          background: linear-gradient(180deg, 
            rgba(34, 211, 238, 0.25) 0%,
            rgba(34, 211, 238, 0.4) 50%,
            rgba(34, 211, 238, 0.5) 100%
          );
          border: 2px solid rgba(34, 211, 238, 0.5);
          border-radius: 24px 24px 24px 24px;
          box-shadow: 
            0 0 40px rgba(34, 211, 238, 0.3),
            0 0 80px rgba(34, 211, 238, 0.15),
            inset 0 0 60px rgba(34, 211, 238, 0.1);
          backdrop-filter: blur(10px);
          z-index: 1;
        }

        .character-popup-box::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 26px;
          background: linear-gradient(180deg, 
            rgba(34, 211, 238, 0.6) 0%,
            rgba(168, 85, 247, 0.3) 100%
          );
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask-composite: xor;
          padding: 2px;
        }

        .hero-character {
          position: relative;
          width: 100%;
          max-width: 420px;
          z-index: 2;
        }

        .hero-character img {
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.4));
        }

        .character-badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 16px;
          font-size: 0.85rem;
          color: var(--text);
          transition: all 0.3s ease;
        }

        .character-badge:hover {
          transform: translateY(-4px);
          border-color: var(--primary);
        }

        .character-badge--top {
          top: 60px;
          right: -10px;
          z-index: 10;
          animation: badgeFloat 3s ease-in-out infinite;
          animation-delay: 0s;
        }

        .character-badge--bottom {
          bottom: 180px;
          left: -10px;
          z-index: 10;
          animation: badgeFloat 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* ===== SCROLL INDICATOR ===== */
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 10;
        }

        .scroll-text {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--secondary), transparent);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1200px) {
          .hero-section {
            padding: 80px 40px;
          }

          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .hero-content {
            align-items: center;
          }

          .hero-character-container {
            order: -1;
          }

          .hero-character {
            max-width: 320px;
          }

          .character-badge--top { right: 5%; }
          .character-badge--bottom { left: 5%; }

          .sidebar-nav {
            left: 16px;
            padding: 12px 10px;
          }

          .nav-btn {
            width: 38px;
            height: 38px;
          }

          .story-panel {
            left: 70px;
            width: 300px;
          }

          .stats-row {
            justify-content: center;
          }

          .skills-chips {
            justify-content: center;
          }

          .hero-cta {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 60px 24px;
          }

          .hero-title-line {
            font-size: 2.8rem;
          }

          .hero-character {
            max-width: 260px;
          }

          .stats-row {
            flex-wrap: wrap;
          }

          .stat-card {
            min-width: auto;
            flex: 1;
            padding: 12px 14px;
          }

          .character-badge {
            display: none;
          }

          .sidebar-nav {
            display: none;
          }

          .story-panel {
            display: none;
          }

          .hero-cta {
            flex-direction: column;
            width: 100%;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
