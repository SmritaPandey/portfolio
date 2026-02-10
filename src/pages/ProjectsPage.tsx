import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  X,
  Stack,
  ArrowUpRight,
  GithubLogo,
  FunnelSimple,
  MagnifyingGlass,
  Crown,
  Lightning,
  Star,
  Diamond,
} from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { projects } from '../content';
import type { Project, ProjectRarity } from '../content';

gsap.registerPlugin(ScrollTrigger);

const rarityColors: Record<ProjectRarity, string> = {
  Mythic: '#ff4500',
  Legendary: '#fbbf24',
  Epic: '#a855f7',
  Rare: '#22d3ee',
  Common: '#71717a',
};

const rarityIcons: Record<ProjectRarity, React.ReactNode> = {
  Mythic: <Crown weight="fill" size={14} />,
  Legendary: <Lightning weight="fill" size={14} />,
  Epic: <Diamond weight="fill" size={14} />,
  Rare: <Star weight="fill" size={14} />,
  Common: <Star weight="regular" size={14} />,
};

const projectTypes = ['All', ...new Set(projects.map(p => p.type))];

const ProjectsPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'All' || project.type === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo('.projects-page-header',
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo('.project-grid-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.4
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  const openProjectPopup = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('lenis-stopped');
  };

  const closeProjectPopup = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
    document.documentElement.classList.remove('lenis-stopped');
  };

  return (
    <div ref={pageRef} className="projects-page">
      {/* Background Video */}
      <div className="projects-bg-video">
        <video autoPlay muted loop playsInline>
          <source src="/videos/hero-2.mp4" type="video/mp4" />
        </video>
        <div className="projects-bg-overlay" />
      </div>

      {/* Shared Header */}
      <Header variant="dark" />

      {/* Page Header */}
      <header className="projects-page-header">
        <span className="page-label">Portfolio</span>
        <h1 className="page-title">
          <span>All Projects</span>
        </h1>
        <p className="page-subtitle">
          A complete collection of my work — from enterprise systems to AI experiments.
        </p>

        {/* Search & Filters */}
        <div className="projects-controls">
          <div className="search-box">
            <MagnifyingGlass weight="regular" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <FunnelSimple weight="duotone" size={18} />
            {projectTypes.map(type => (
              <button
                key={type}
                className={`filter-btn ${activeFilter === type ? 'filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="project-grid-card"
            style={{ '--accent': project.accentColor } as React.CSSProperties}
            onClick={() => openProjectPopup(project)}
          >
            {/* Screenshot */}
            <div className="grid-card-screenshot">
              {project.screenshot ? (
                <img src={project.screenshot} alt={project.title} />
              ) : (
                <div className="grid-card-placeholder">
                  <Stack weight="duotone" size={40} />
                </div>
              )}
              <div className="grid-card-overlay" />
            </div>

            {/* Rarity Badge */}
            {project.rarity && (
              <div className="grid-card-rarity" style={{ '--rarity-color': rarityColors[project.rarity] } as React.CSSProperties}>
                {rarityIcons[project.rarity]}
                <span>{project.rarity}</span>
              </div>
            )}

            {/* Content */}
            <div className="grid-card-content">
              <div className="grid-card-meta">
                <span className="grid-card-type">{project.type}</span>
                <span className="grid-card-year">{project.year}</span>
              </div>
              <h3 className="grid-card-title">{project.title}</h3>
              <p className="grid-card-tagline">{project.tagline}</p>

              {/* Tech */}
              <div className="grid-card-tech">
                {project.tech.slice(0, 3).map((tech) => (
                  <span key={tech} className="grid-tech-chip">{tech}</span>
                ))}
                {project.tech.length > 3 && (
                  <span className="grid-tech-chip grid-tech-chip--more">+{project.tech.length - 3}</span>
                )}
              </div>

              {/* Impact */}
              <div className="grid-card-impact">
                <span className="grid-impact-value">{project.impact[0]}</span>
                <span className="grid-impact-label">{project.impact[1]}</span>
              </div>
            </div>

            {/* Glow */}
            <div className="grid-card-glow" />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="empty-state">
          <p>No projects match your search. Try a different filter.</p>
        </div>
      )}

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
                {selectedProject.rarity && (
                  <span className="popup-rarity" style={{ '--rarity-color': rarityColors[selectedProject.rarity] } as React.CSSProperties}>
                    {rarityIcons[selectedProject.rarity]}
                    {selectedProject.rarity}
                  </span>
                )}
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

              {/* RPG Description */}
              {selectedProject.rpgDescription && (
                <div className="popup-rpg">
                  <span className="popup-rpg-label">⚔️ Lore</span>
                  <p className="popup-rpg-text">{selectedProject.rpgDescription}</p>
                </div>
              )}

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
        .projects-page {
          --bg-dark: #0a0a12;
          --bg-card: rgba(18, 16, 26, 0.9);
          --primary: #ff6b9d;
          --secondary: #a855f7;
          --tertiary: #22d3ee;
          --text: #ffffff;
          --text-dim: #a1a1aa;
          --text-muted: #71717a;
        }

        /* ===== PAGE LAYOUT ===== */
        .projects-page {
          position: relative;
          min-height: 100vh;
          background: var(--bg-dark);
          padding: 40px 60px 100px;
          padding-top: 100px;
        }

        /* ===== BACKGROUND VIDEO ===== */
        .projects-bg-video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        .projects-bg-video video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.3;
        }

        .projects-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(10, 10, 18, 0.7) 0%,
            rgba(10, 10, 18, 0.9) 50%,
            rgba(10, 10, 18, 0.95) 100%
          );
        }

        /* Content above video */
        .projects-page-header,
        .projects-grid,
        .empty-state,
        .project-popup {
          position: relative;
          z-index: 1;
        }

        /* ===== HEADER ===== */
        .projects-page-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .page-label {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--tertiary);
          margin-bottom: 16px;
        }

        .page-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          margin: 0 0 16px 0;
        }

        .page-title span {
          background: linear-gradient(135deg, var(--primary), var(--secondary), var(--tertiary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-subtitle {
          font-size: 1.1rem;
          color: var(--text-dim);
          margin: 0 0 40px 0;
        }

        /* ===== CONTROLS ===== */
        .projects-controls {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: var(--bg-card);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 12px;
          min-width: 280px;
        }

        .search-box svg {
          color: var(--text-muted);
        }

        .search-box input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text);
          font-size: 0.9rem;
          width: 100%;
        }

        .search-box input::placeholder {
          color: var(--text-muted);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-group svg {
          color: var(--text-muted);
          margin-right: 8px;
        }

        .filter-btn {
          padding: 8px 16px;
          background: var(--bg-card);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 20px;
          color: var(--text-dim);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          border-color: var(--secondary);
          color: var(--text);
        }

        .filter-btn--active {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-color: transparent;
          color: white;
        }

        /* ===== PROJECTS GRID ===== */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 30px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* ===== GRID CARD ===== */
        .project-grid-card {
          background: var(--bg-card);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .project-grid-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent);
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.4),
            0 0 40px color-mix(in srgb, var(--accent) 20%, transparent);
        }

        .grid-card-screenshot {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
        }

        .grid-card-screenshot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .project-grid-card:hover .grid-card-screenshot img {
          transform: scale(1.05);
        }

        .grid-card-placeholder {
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

        .grid-card-placeholder svg {
          color: var(--accent);
          opacity: 0.5;
        }

        .grid-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.6) 100%);
        }

        .grid-card-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .grid-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .grid-card-type {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent);
        }

        .grid-card-year {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .grid-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text);
          margin: 0;
          line-height: 1.3;
        }

        .grid-card-tagline {
          font-size: 0.85rem;
          color: var(--text-dim);
          margin: 0;
          line-height: 1.5;
        }

        .grid-card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .grid-tech-chip {
          padding: 4px 8px;
          font-size: 0.65rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: var(--text-muted);
        }

        .grid-tech-chip--more {
          background: color-mix(in srgb, var(--accent) 15%, transparent);
          border-color: color-mix(in srgb, var(--accent) 30%, transparent);
          color: var(--accent);
        }

        .grid-card-impact {
          display: flex;
          align-items: baseline;
          gap: 8px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .grid-impact-value {
          font-size: 1.3rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .grid-impact-label {
          font-size: 0.8rem;
          color: var(--text-dim);
        }

        .grid-card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-grid-card:hover .grid-card-glow {
          opacity: 1;
        }

        /* ===== EMPTY STATE ===== */
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-dim);
        }

        /* ===== POPUP MODAL ===== */
        .project-popup {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.85);
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
          background: rgba(18, 16, 26, 0.98);
          border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
          border-radius: 28px;
          overflow: hidden;
          overflow-y: auto;
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
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: var(--text-dim);
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .popup-close:hover {
          background: rgba(255, 107, 157, 0.2);
          border-color: var(--primary);
          color: var(--primary);
        }

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
            color-mix(in srgb, var(--accent) 20%, transparent),
            color-mix(in srgb, var(--accent) 5%, transparent)
          );
        }

        .popup-screenshot__placeholder svg {
          color: var(--accent);
          opacity: 0.4;
        }

        .popup-details {
          padding: 28px;
        }

        .popup-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
        }

        .popup-type {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent);
          padding: 6px 14px;
          background: color-mix(in srgb, var(--accent) 15%, transparent);
          border-radius: 20px;
        }

        .popup-year {
          font-size: 0.75rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
        }

        .popup-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 8px 0;
        }

        .popup-tagline {
          font-size: 1rem;
          color: var(--text-dim);
          margin: 0 0 20px 0;
        }

        .popup-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 16px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 16px;
          margin-bottom: 20px;
        }

        .popup-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .popup-stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent);
        }

        .popup-stat-label {
          font-size: 0.7rem;
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
          margin-bottom: 10px;
        }

        .popup-tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .popup-tech-chip {
          padding: 6px 14px;
          font-size: 0.75rem;
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 16px;
          color: var(--secondary);
        }

        .popup-actions {
          display: flex;
          gap: 12px;
        }

        .popup-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 24px;
          border-radius: 14px;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .popup-btn--primary {
          background: linear-gradient(135deg, var(--accent), var(--secondary));
          color: white;
        }

        .popup-btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px color-mix(in srgb, var(--accent) 40%, transparent);
        }

        .popup-btn--secondary {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--text-dim);
        }

        .popup-btn--secondary:hover {
          border-color: var(--text);
          color: var(--text);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .projects-page {
            padding: 20px;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .projects-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box {
            min-width: auto;
          }

          .filter-group {
            justify-content: center;
          }

          .popup-content {
            width: 95%;
            max-height: 90vh;
          }

          .popup-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }

          .popup-stat-value {
            font-size: 1.2rem;
          }
        }
        /* ===== RARITY BADGE ===== */
        .grid-card-rarity {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--rarity-color);
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid color-mix(in srgb, var(--rarity-color) 50%, transparent);
          border-radius: 20px;
          backdrop-filter: blur(8px);
        }

        .popup-rarity {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--rarity-color);
          padding: 6px 14px;
          background: color-mix(in srgb, var(--rarity-color) 15%, transparent);
          border: 1px solid color-mix(in srgb, var(--rarity-color) 40%, transparent);
          border-radius: 20px;
        }

        .popup-rpg {
          margin-bottom: 20px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          border-left: 3px solid var(--accent);
        }

        .popup-rpg-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .popup-rpg-text {
          font-size: 0.9rem;
          font-style: italic;
          line-height: 1.6;
          color: var(--text-dim);
          margin: 0;
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
