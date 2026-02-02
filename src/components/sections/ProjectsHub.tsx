import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CaretLeft,
  CaretRight,
  X,
  Stack,
  ArrowUpRight,
  GithubLogo,
} from '@phosphor-icons/react';
import { projects, type Project } from '../../content';

gsap.registerPlugin(ScrollTrigger);

const ProjectsHub = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlaying || selectedProject) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, selectedProject]);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-carousel',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const navigateTo = useCallback((index: number) => {
    if (index < 0) index = projects.length - 1;
    if (index >= projects.length) index = 0;
    setActiveIndex(index);
  }, []);

  const openProjectPopup = (project: Project) => {
    setSelectedProject(project);
    setIsAutoPlaying(false);
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('lenis-stopped');
  };

  const closeProjectPopup = () => {
    setSelectedProject(null);
    setIsAutoPlaying(true);
    document.body.style.overflow = 'auto';
    document.documentElement.classList.remove('lenis-stopped');
  };

  // Calculate position for each card
  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const wrappedDiff = ((diff + projects.length + Math.floor(projects.length / 2)) % projects.length) - Math.floor(projects.length / 2);

    const isActive = wrappedDiff === 0;
    const isAdjacent = Math.abs(wrappedDiff) === 1;
    const isVisible = Math.abs(wrappedDiff) <= 2;

    if (!isVisible) {
      return {
        opacity: 0,
        transform: `translateX(${wrappedDiff * 100}%) scale(0.5)`,
        zIndex: 0,
        filter: 'blur(20px)',
        pointerEvents: 'none' as const,
      };
    }

    return {
      opacity: isActive ? 1 : isAdjacent ? 0.6 : 0.3,
      transform: `translateX(${wrappedDiff * 85}%) scale(${isActive ? 1 : isAdjacent ? 0.85 : 0.7})`,
      zIndex: isActive ? 10 : isAdjacent ? 5 : 1,
      filter: isActive ? 'blur(0px)' : `blur(${isAdjacent ? 3 : 8}px)`,
      pointerEvents: isActive ? 'auto' as const : 'none' as const,
    };
  };

  return (
    <section ref={sectionRef} id="projects" className="projects-section">
      {/* Header */}
      <div className="projects-header">
        <span className="projects-label">Selected Work</span>
        <h2 className="projects-title">
          <span>PROJECTS</span>
        </h2>
        <p className="projects-subtitle">
          Systems built for scale. Real impact. Real responsibility.
        </p>
      </div>

      {/* Carousel */}
      <div
        className="projects-carousel"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => !selectedProject && setIsAutoPlaying(true)}
      >
        {/* Navigation Arrows */}
        <button
          className="carousel-nav carousel-nav--prev"
          onClick={() => navigateTo(activeIndex - 1)}
        >
          <CaretLeft weight="bold" size={24} />
        </button>

        <div ref={carouselRef} className="carousel-track">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`carousel-card ${index === activeIndex ? 'carousel-card--active' : ''}`}
              style={{
                ...getCardStyle(index),
                '--accent': project.accentColor,
              } as React.CSSProperties}
              onClick={() => index === activeIndex && openProjectPopup(project)}
            >
              {/* Screenshot/Gradient Placeholder */}
              <div className="card-screenshot">
                {project.screenshot ? (
                  <img src={project.screenshot} alt={project.title} />
                ) : (
                  <div className="card-screenshot__placeholder">
                    <div className="placeholder-icon">
                      <Stack weight="duotone" size={48} />
                    </div>
                  </div>
                )}
              </div>

              {/* Stats Bar */}
              <div className="card-stats">
                {project.stats?.map((stat, i) => (
                  <div key={i} className="card-stat">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="card-content">
                <div className="card-meta">
                  <span className={`card-rarity card-rarity--${project.rarity.toLowerCase()}`}>
                    {project.rarity === 'Legendary' && '⭐'}
                    {project.rarity === 'Epic' && '💎'}
                    {project.rarity === 'Rare' && '✨'}
                    {project.rarity === 'Mythic' && '🔮'}
                    {project.rarity}
                  </span>
                  <span className="card-year">{project.year}</span>
                </div>
                <h3 className="card-title">{project.title}</h3>

                {/* RPG Item Description */}
                <div className="card-rpg-description">
                  <p>{project.rpgDescription}</p>
                </div>

                {/* Tech Stack */}
                <div className="card-tech">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-chip">{tech}</span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="tech-chip tech-chip--more">+{project.tech.length - 4}</span>
                  )}
                </div>
              </div>

              {/* Glow Effect */}
              <div className="card-glow" />
            </div>
          ))}
        </div>

        <button
          className="carousel-nav carousel-nav--next"
          onClick={() => navigateTo(activeIndex + 1)}
        >
          <CaretRight weight="bold" size={24} />
        </button>

        {/* Pagination Dots */}
        <div className="carousel-dots">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === activeIndex ? 'carousel-dot--active' : ''}`}
              onClick={() => navigateTo(index)}
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <a href="/projects" className="view-all-btn">
          <span>View All Projects</span>
          <ArrowUpRight weight="bold" size={18} />
        </a>
      </div>

      {/* Project Popup Modal */}
      {selectedProject && (
        <div className="project-popup" onClick={closeProjectPopup}>
          <div
            className="popup-content"
            data-lenis-prevent
            style={{ '--accent': selectedProject.accentColor } as React.CSSProperties}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-close" onClick={closeProjectPopup}>
              <X weight="bold" size={20} />
            </button>

            {/* Popup Screenshot */}
            <div className="popup-screenshot">
              {selectedProject.screenshot ? (
                <img src={selectedProject.screenshot} alt={selectedProject.title} />
              ) : (
                <div className="popup-screenshot__placeholder">
                  <Stack weight="duotone" size={64} />
                </div>
              )}
            </div>

            {/* Popup Details */}
            <div className="popup-details">
              <div className="popup-meta">
                <span className="popup-type">{selectedProject.type}</span>
                <span className="popup-year">{selectedProject.year}</span>
              </div>

              <h2 className="popup-title">{selectedProject.title}</h2>
              <p className="popup-tagline">{selectedProject.tagline}</p>

              {/* Stats Grid */}
              <div className="popup-stats">
                {selectedProject.stats?.map((stat, i) => (
                  <div key={i} className="popup-stat">
                    <span className="popup-stat-value">{stat.value}</span>
                    <span className="popup-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <p className="popup-description">{selectedProject.description}</p>

              {/* Full Tech Stack */}
              <div className="popup-tech">
                <span className="popup-tech-label">Tech Stack</span>
                <div className="popup-tech-chips">
                  {selectedProject.tech.map((tech) => (
                    <span key={tech} className="popup-tech-chip">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="popup-actions">
                {selectedProject.url && selectedProject.url !== '#' && (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="popup-btn popup-btn--primary"
                  >
                    <span>Visit Project</span>
                    <ArrowUpRight weight="bold" size={18} />
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="popup-btn popup-btn--secondary"
                  >
                    <GithubLogo weight="duotone" size={18} />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ===== VARIABLES ===== */
        .projects-section {
          --bg-dark: #0a0a12;
          --bg-card: rgba(18, 16, 26, 0.9);
          --primary: #ff6b9d;
          --secondary: #a855f7;
          --tertiary: #22d3ee;
          --text: #ffffff;
          --text-dim: #a1a1aa;
          --text-muted: #71717a;
        }

        /* ===== SECTION ===== */
        .projects-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 100px 40px;
          background: var(--bg-dark);
          overflow: hidden;
        }

        /* ===== HEADER ===== */
        .projects-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .projects-label {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--tertiary);
          margin-bottom: 16px;
        }

        .projects-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          margin: 0 0 16px 0;
        }

        .projects-title span {
          background: linear-gradient(135deg, var(--primary), var(--secondary), var(--tertiary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .projects-subtitle {
          font-size: 1.1rem;
          color: var(--text-dim);
          margin: 0;
        }

        /* ===== CAROUSEL ===== */
        .projects-carousel {
          position: relative;
          width: 100%;
          max-width: 1400px;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-track {
          position: relative;
          width: 380px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ===== NAVIGATION ARROWS ===== */
        .carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 50%;
          color: var(--text-dim);
          cursor: pointer;
          z-index: 20;
          transition: all 0.3s ease;
        }

        .carousel-nav svg {
          width: 24px;
          height: 24px;
        }

        .carousel-nav:hover {
          background: rgba(168, 85, 247, 0.2);
          border-color: var(--secondary);
          color: var(--text);
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-nav--prev {
          left: 5%;
        }

        .carousel-nav--next {
          right: 5%;
        }

        /* ===== CAROUSEL CARD ===== */
        .carousel-card {
          position: absolute;
          width: 380px;
          background: var(--bg-card);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity, filter;
        }

        .carousel-card--active {
          border-color: var(--accent);
          box-shadow: 
            0 25px 60px rgba(0, 0, 0, 0.4),
            0 0 60px color-mix(in srgb, var(--accent) 25%, transparent);
        }

        .carousel-card--active:hover {
          transform: translateX(0) scale(1.02) !important;
        }

        /* ===== CARD SCREENSHOT ===== */
        .card-screenshot {
          position: relative;
          width: 100%;
          height: 160px;
          overflow: hidden;
        }

        .card-screenshot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-screenshot__placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--accent) 20%, transparent),
            color-mix(in srgb, var(--accent) 5%, transparent)
          );
        }

        .placeholder-icon {
          opacity: 0.4;
          color: var(--accent);
        }

        .placeholder-icon svg {
          width: 48px;
          height: 48px;
        }

        /* ===== STATS BAR ===== */
        .card-stats {
          display: flex;
          justify-content: space-around;
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .card-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .stat-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--accent);
        }

        .stat-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        /* ===== CARD CONTENT ===== */
        .card-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-type {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent);
        }

        .card-year {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text);
          margin: 0;
          line-height: 1.3;
        }

        .card-tagline {
          font-size: 0.85rem;
          color: var(--text-dim);
          margin: 0;
          line-height: 1.5;
        }

        /* ===== RARITY BADGES ===== */
        .card-rarity {
          padding: 4px 12px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .card-rarity--legendary {
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2));
          border: 1px solid rgba(251, 191, 36, 0.5);
          color: #fbbf24;
          text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
        }

        .card-rarity--epic {
          background: linear-gradient(135deg, rgba(217, 70, 239, 0.2), rgba(168, 85, 247, 0.2));
          border: 1px solid rgba(217, 70, 239, 0.5);
          color: #d946ef;
          text-shadow: 0 0 10px rgba(217, 70, 239, 0.5);
        }

        .card-rarity--rare {
          background: linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(59, 130, 246, 0.2));
          border: 1px solid rgba(34, 211, 238, 0.5);
          color: #22d3ee;
          text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
        }

        .card-rarity--mythic {
          background: linear-gradient(135deg, rgba(255, 107, 157, 0.2), rgba(236, 72, 153, 0.2));
          border: 1px solid rgba(255, 107, 157, 0.5);
          color: #ff6b9d;
          text-shadow: 0 0 10px rgba(255, 107, 157, 0.5);
        }

        .card-rarity--common {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--text-dim);
        }

        /* ===== RPG DESCRIPTION ===== */
        .card-rpg-description {
          padding: 10px 12px;
          margin: 8px 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2));
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-left: 2px solid var(--accent);
          border-radius: 0 10px 10px 0;
        }

        .card-rpg-description p {
          margin: 0;
          font-size: 0.75rem;
          font-style: italic;
          line-height: 1.5;
          color: var(--text-dim);
        }

        /* ===== TECH CHIPS ===== */
        .card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .tech-chip {
          padding: 4px 10px;
          font-size: 0.65rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: var(--text-muted);
        }

        .tech-chip--more {
          background: color-mix(in srgb, var(--accent) 15%, transparent);
          border-color: color-mix(in srgb, var(--accent) 30%, transparent);
          color: var(--accent);
        }

        /* ===== IMPACT ===== */
        .card-impact {
          display: flex;
          align-items: baseline;
          gap: 8px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .impact-value {
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .impact-label {
          font-size: 0.85rem;
          color: var(--text-dim);
        }

        /* ===== CARD GLOW ===== */
        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .carousel-card--active .card-glow {
          opacity: 1;
        }

        /* ===== PAGINATION DOTS ===== */
        .carousel-dots {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
        }

        .carousel-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-dot:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        .carousel-dot--active {
          background: var(--tertiary);
          transform: scale(1.3);
        }

        /* ===== VIEW ALL BUTTON ===== */
        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          margin-top: 50px;
          background: transparent;
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 16px;
          color: var(--text-dim);
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .view-all-btn:hover {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(34, 211, 238, 0.2));
          border-color: var(--secondary);
          color: var(--text);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(168, 85, 247, 0.2);
        }

        .view-all-btn svg {
          transition: transform 0.3s ease;
        }

        .view-all-btn:hover svg {
          transform: translate(3px, -3px);
        }

        /* ===== POPUP MODAL ===== */
        .project-popup {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .popup-content {
          position: relative;
          width: 90%;
          max-width: 700px;
          max-height: 85vh;
          background: rgba(18, 16, 26, 0.95);
          border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
          border-radius: 28px;
          overflow: hidden;
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 30px 80px rgba(0, 0, 0, 0.5),
            0 0 80px color-mix(in srgb, var(--accent) 20%, transparent);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .popup-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: var(--text-dim);
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
        }

        .popup-close:hover {
          background: rgba(255, 107, 157, 0.2);
          border-color: var(--primary);
          color: var(--primary);
        }

        .popup-close svg {
          width: 20px;
          height: 20px;
        }

        /* ===== POPUP SCREENSHOT ===== */
        .popup-screenshot {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .popup-screenshot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .popup-screenshot__placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--accent) 25%, transparent),
            color-mix(in srgb, var(--accent) 5%, transparent)
          );
        }

        .popup-screenshot__placeholder svg {
          width: 64px;
          height: 64px;
          opacity: 0.3;
          color: var(--accent);
        }

        /* ===== POPUP DETAILS ===== */
        .popup-details {
          padding: 28px;
          overflow-y: auto;
          max-height: calc(85vh - 200px);
        }

        .popup-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
        }

        .popup-type {
          padding: 6px 14px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: color-mix(in srgb, var(--accent) 20%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
          border-radius: 20px;
          color: var(--accent);
        }

        .popup-year {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .popup-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 8px 0;
        }

        .popup-tagline {
          font-size: 1rem;
          color: var(--accent);
          margin: 0 0 20px 0;
        }

        /* ===== POPUP STATS ===== */
        .popup-stats {
          display: flex;
          gap: 24px;
          padding: 16px 0;
          margin-bottom: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .popup-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .popup-stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--accent);
        }

        .popup-stat-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .popup-description {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-dim);
          margin: 0 0 24px 0;
        }

        /* ===== POPUP TECH ===== */
        .popup-tech {
          margin-bottom: 24px;
        }

        .popup-tech-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .popup-tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .popup-tech-chip {
          padding: 8px 14px;
          font-size: 0.8rem;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          color: var(--text-dim);
          transition: all 0.3s ease;
        }

        .popup-tech-chip:hover {
          background: color-mix(in srgb, var(--accent) 15%, transparent);
          border-color: var(--accent);
          color: var(--accent);
        }

        /* ===== POPUP ACTIONS ===== */
        .popup-actions {
          display: flex;
          gap: 12px;
        }

        .popup-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 24px;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 14px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .popup-btn svg {
          width: 18px;
          height: 18px;
        }

        .popup-btn--primary {
          background: linear-gradient(135deg, var(--accent), var(--secondary));
          color: white;
          border: none;
        }

        .popup-btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px color-mix(in srgb, var(--accent) 40%, transparent);
        }

        .popup-btn--secondary {
          background: transparent;
          color: var(--text-dim);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .popup-btn--secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.4);
          color: var(--text);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 900px) {
          .carousel-nav {
            display: none;
          }

          .carousel-card {
            width: 320px;
          }

          .carousel-track {
            width: 320px;
          }
        }

        @media (max-width: 600px) {
          .projects-section {
            padding: 60px 20px;
          }

          .carousel-card {
            width: 280px;
          }

          .carousel-track {
            width: 280px;
          }

          .popup-content {
            max-height: 90vh;
            border-radius: 20px;
          }

          .popup-details {
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsHub;
