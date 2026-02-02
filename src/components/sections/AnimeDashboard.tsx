import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Book,
  RocketLaunch,
  Lightning,
  Palette,
  Sparkle,
  Diamond,
  Star,
  ArrowRight,
  Heart,
  Eye,
  Play,
  Code,
  Trophy,
  Rocket,
  X,
  GlobeHemisphereWest,
  GitBranch,
  Users,
  ChartLineUp,
  Brain,
  Shield,
  CloudArrowUp,
  Database,
  Cpu,
  Gear,
  Crown,
  Fire,
  Target,
  Medal,
  Certificate,
  ArrowUpRight,
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

type TabId = 'about' | 'projects' | 'skills' | 'gallery';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDesc: string;
  tech: string[];
  status: 'live' | 'building' | 'beta';
  gradient: string;
  icon: React.ReactNode;
  metrics: { label: string; value: string }[];
  link?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 'neurq',
    title: 'NeurQ AI Labs',
    subtitle: 'Enterprise AI Platform',
    description: 'AI-powered GRC & compliance automation',
    detailedDesc: 'Building the future of enterprise governance, risk, and compliance with cutting-edge AI that understands regulations.',
    tech: ['Python', 'React', 'TensorFlow', 'AWS'],
    status: 'live',
    gradient: 'linear-gradient(135deg, #ff6b9d 0%, #a855f7 100%)',
    icon: <Brain weight="fill" size={28} />,
    metrics: [
      { label: 'Users', value: '1K+' },
      { label: 'Accuracy', value: '99.2%' },
    ],
    link: 'https://neurq.ai',
    featured: true,
  },
  {
    id: 'nbatech',
    title: 'NBATech',
    subtitle: 'GovTech Solutions',
    description: 'Public sector digital transformation',
    detailedDesc: 'Pioneering digital solutions for government agencies, making public services accessible and efficient.',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    status: 'live',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    icon: <GlobeHemisphereWest weight="fill" size={28} />,
    metrics: [
      { label: 'Agencies', value: '15+' },
      { label: 'Citizens', value: '50K+' },
    ],
    link: 'https://nbatech.in',
    featured: true,
  },
  {
    id: 'aiassist',
    title: 'AI Assistant',
    subtitle: 'LLM-Powered Platform',
    description: 'Custom enterprise workflow automation',
    detailedDesc: 'Next-gen AI assistant leveraging GPT-4 and custom fine-tuned models for enterprise-specific tasks.',
    tech: ['Python', 'FastAPI', 'LangChain', 'GPT-4'],
    status: 'building',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
    icon: <Cpu weight="fill" size={28} />,
    metrics: [
      { label: 'Models', value: '3' },
      { label: 'Tasks', value: '100+' },
    ],
    featured: false,
  },
];

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: React.ReactNode;
  color: string;
  achievement: string;
}

const skillCategories = [
  { id: 'frontend', name: 'Frontend', icon: <Code weight="fill" size={18} />, color: '#ffc157' },
  { id: 'backend', name: 'Backend', icon: <Database weight="fill" size={18} />, color: '#a855f7' },
  { id: 'ai', name: 'AI/ML', icon: <Brain weight="fill" size={18} />, color: '#22c55e' },
  { id: 'infra', name: 'Infrastructure', icon: <CloudArrowUp weight="fill" size={18} />, color: '#06b6d4' },
];

const skills: Skill[] = [
  { name: 'React & TypeScript', level: 95, category: 'frontend', icon: <Code weight="duotone" size={20} />, color: '#ffc157', achievement: 'Expert' },
  { name: 'Python & AI/ML', level: 92, category: 'ai', icon: <Brain weight="duotone" size={20} />, color: '#22c55e', achievement: 'Master' },
  { name: 'Node.js & APIs', level: 88, category: 'backend', icon: <Gear weight="duotone" size={20} />, color: '#a855f7', achievement: 'Advanced' },
  { name: 'System Architecture', level: 90, category: 'backend', icon: <GitBranch weight="duotone" size={20} />, color: '#a855f7', achievement: 'Architect' },
  { name: 'DevOps & Cloud', level: 85, category: 'infra', icon: <CloudArrowUp weight="duotone" size={20} />, color: '#06b6d4', achievement: 'Certified' },
  { name: 'GRC & Security', level: 88, category: 'backend', icon: <Shield weight="duotone" size={20} />, color: '#ff6b9d', achievement: 'Specialist' },
];

const techStack = [
  { name: 'React', hot: true },
  { name: 'TypeScript', hot: true },
  { name: 'Python', hot: true },
  { name: 'TensorFlow', hot: false },
  { name: 'AWS', hot: true },
  { name: 'Docker', hot: false },
  { name: 'PostgreSQL', hot: false },
  { name: 'Redis', hot: false },
  { name: 'GraphQL', hot: false },
  { name: 'Next.js', hot: true },
  { name: 'LangChain', hot: true },
  { name: 'GPT-4', hot: true },
];

const artworks = [
  { id: '1', title: 'Digital Dreams', image: '/img/gallery-1.webp', category: 'Digital Art', likes: 342 },
  { id: '2', title: 'Cyberpunk Miku', image: '/img/cyberpunk-miku.jpg', category: 'Character Art', likes: 528 },
  { id: '3', title: 'Cosmic Sailor', image: '/img/cosmic-sailor.jpg', category: 'Illustration', likes: 456 },
  { id: '4', title: 'Abstract Flow', image: '/img/gallery-3.webp', category: 'Abstract', likes: 289 },
  { id: '5', title: 'Neon Nights', image: '/img/gallery-4.webp', category: 'Digital Art', likes: 721 },
  { id: '6', title: 'Ethereal Portrait', image: '/img/gallery-5.webp', category: 'Portrait', likes: 634 },
];

const AnimeDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabId>('about');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const openLightbox = (image: string) => {
    setLightboxImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          }
        }
      );

      // Animate header elements
      gsap.fromTo('.anime-dash__header > *',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          }
        }
      );

      // Animate tabs
      gsap.fromTo('.anime-dash__tab',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Animate tab content change
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="anime-dash__about anime-dash__about--compact">
            {/* Horizontal Scrollable Timeline */}
            <div className="anime-dash__timeline-section">
              <div className="anime-dash__journey-header">
                <div className="anime-dash__journey-ornament">◆</div>
                <div className="anime-dash__journey-icon">
                  <Sparkle weight="fill" size={20} />
                </div>
                <h3>The Journey</h3>
                <div className="anime-dash__journey-icon">
                  <Sparkle weight="fill" size={20} />
                </div>
                <div className="anime-dash__journey-ornament">◆</div>
              </div>

              <div className="anime-dash__timeline-scroll">
                <div className="anime-dash__timeline anime-dash__timeline--horizontal">
                  {/* Energy flow line */}
                  <div className="anime-dash__timeline-track">
                    <div className="anime-dash__timeline-energy" />
                  </div>

                  {/* Timeline Items */}
                  {[
                    {
                      year: '2020',
                      title: 'Origin Story',
                      subtitle: 'The Beginning',
                      desc: 'Started coding journey',
                      detail: 'First lines of Python, discovered passion for building digital experiences',
                      tech: ['Python', 'HTML/CSS'],
                      icon: <Play weight="fill" size={16} />,
                      achievement: 'First App Built'
                    },
                    {
                      year: '2022',
                      title: 'AI Awakening',
                      subtitle: 'Deep Learning',
                      desc: 'Machine learning mastery',
                      detail: 'Built neural networks, explored computer vision & NLP domains',
                      tech: ['TensorFlow', 'PyTorch', 'OpenCV'],
                      icon: <Code weight="bold" size={16} />,
                      achievement: 'AI Certification'
                    },
                    {
                      year: '2024',
                      title: 'Founder Era',
                      subtitle: 'Entrepreneurship',
                      desc: 'Founded two companies',
                      detail: 'Launched NeurQ AI Labs for enterprise GRC & NBATech for GovTech solutions',
                      tech: ['React', 'Node.js', 'AWS'],
                      icon: <Rocket weight="fill" size={16} />,
                      achievement: 'CEO & Founder'
                    },
                    {
                      year: 'NOW',
                      title: 'Building Future',
                      subtitle: 'Scaling Impact',
                      desc: 'Enterprise AI at scale',
                      detail: 'Leading teams, architecting systems that serve thousands of users daily',
                      tech: ['LangChain', 'GPT-4', 'Kubernetes'],
                      icon: <Trophy weight="fill" size={16} />,
                      achievement: 'Tech Leader',
                      active: true
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`anime-dash__timeline-item anime-dash__timeline-item--h ${item.active ? 'anime-dash__timeline-item--active' : ''}`}
                      style={{ animationDelay: `${idx * 0.15}s` }}
                    >
                      {/* Particle effects for active */}
                      {item.active && (
                        <div className="anime-dash__particles">
                          <span className="anime-dash__particle" />
                          <span className="anime-dash__particle" />
                          <span className="anime-dash__particle" />
                        </div>
                      )}

                      {/* Node */}
                      <div className="anime-dash__timeline-node anime-dash__timeline-node--h">
                        <div className={`anime-dash__timeline-dot anime-dash__timeline-dot--h ${item.active ? 'anime-dash__timeline-dot--pulse' : ''}`}>
                          <span className="anime-dash__dot-icon">{item.icon}</span>
                          <span className="anime-dash__dot-ring" />
                          <span className="anime-dash__dot-glow" />
                        </div>
                      </div>

                      {/* Card */}
                      <div className="anime-dash__timeline-card anime-dash__timeline-card--h">
                        <div className="anime-dash__card-shimmer" />
                        <div className="anime-dash__card-content">
                          <span className="anime-dash__timeline-year anime-dash__timeline-year--styled">{item.year}</span>
                          <span className="anime-dash__timeline-subtitle">{item.subtitle}</span>
                          <h4 className="anime-dash__timeline-title">{item.title}</h4>
                          <p className="anime-dash__timeline-desc">{item.desc}</p>

                          {/* Hover reveal content */}
                          <div className="anime-dash__timeline-reveal">
                            <p className="anime-dash__timeline-detail">{item.detail}</p>
                            <div className="anime-dash__timeline-tech">
                              {item.tech.map((t, i) => (
                                <span key={i} className="anime-dash__mini-badge">{t}</span>
                              ))}
                            </div>
                            <div className="anime-dash__timeline-achievement">
                              <Trophy weight="fill" size={12} />
                              <span>{item.achievement}</span>
                            </div>
                          </div>
                        </div>
                        <div className="anime-dash__card-border" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="anime-dash__scroll-hint">
                <ArrowRight weight="bold" size={14} />
                <span>Scroll to explore</span>
              </div>
            </div>

            {/* Compact Stats Row */}
            <div className="anime-dash__about-stats anime-dash__about-stats--row">
              <div className="anime-dash__stat-card anime-dash__stat-card--compact">
                <Sparkle weight="fill" size={20} className="anime-dash__stat-icon" />
                <div className="anime-dash__stat-info">
                  <span className="anime-dash__stat-number">5+</span>
                  <span className="anime-dash__stat-label">Years</span>
                </div>
              </div>
              <div className="anime-dash__stat-divider">◆</div>
              <div className="anime-dash__stat-card anime-dash__stat-card--compact">
                <Diamond weight="fill" size={20} className="anime-dash__stat-icon" />
                <div className="anime-dash__stat-info">
                  <span className="anime-dash__stat-number">50+</span>
                  <span className="anime-dash__stat-label">Projects</span>
                </div>
              </div>
              <div className="anime-dash__stat-divider">◆</div>
              <div className="anime-dash__stat-card anime-dash__stat-card--compact">
                <Star weight="fill" size={20} className="anime-dash__stat-icon" />
                <div className="anime-dash__stat-info">
                  <span className="anime-dash__stat-number">2</span>
                  <span className="anime-dash__stat-label">Companies</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="anime-dash__projects anime-dash__projects--enhanced">
            {/* Section Header */}
            <div className="anime-dash__projects-header">
              <div className="anime-dash__journey-ornament">◆</div>
              <div className="anime-dash__journey-icon">
                <RocketLaunch weight="fill" size={20} />
              </div>
              <h3>Featured Works</h3>
              <div className="anime-dash__journey-icon">
                <RocketLaunch weight="fill" size={20} />
              </div>
              <div className="anime-dash__journey-ornament">◆</div>
            </div>

            <div className="anime-dash__projects-grid">
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  className={`anime-dash__project-card anime-dash__project-card--enhanced ${project.featured ? 'anime-dash__project-card--featured' : ''}`}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="anime-dash__project-featured">
                      <Crown weight="fill" size={12} />
                      <span>Featured</span>
                    </div>
                  )}

                  {/* Card glow effect */}
                  <div className="anime-dash__project-glow" style={{ background: project.gradient }} />

                  {/* Header with gradient and icon */}
                  <div
                    className="anime-dash__project-header anime-dash__project-header--enhanced"
                    style={{ background: project.gradient }}
                  >
                    <div className="anime-dash__project-icon-wrapper">
                      <div className="anime-dash__project-icon">
                        {project.icon}
                      </div>
                      <div className="anime-dash__project-icon-ring" />
                    </div>

                    <span className={`anime-dash__project-status anime-dash__project-status--${project.status}`}>
                      {project.status === 'live' ? (
                        <><span className="anime-dash__status-dot" /> Live</>
                      ) : project.status === 'building' ? (
                        <><Fire weight="fill" size={12} /> Building</>
                      ) : (
                        <><Target weight="fill" size={12} /> Beta</>
                      )}
                    </span>
                  </div>

                  {/* Body content */}
                  <div className="anime-dash__project-body anime-dash__project-body--enhanced">
                    <span className="anime-dash__project-subtitle">{project.subtitle}</span>
                    <h4>{project.title}</h4>
                    <p className="anime-dash__project-desc">{project.description}</p>

                    {/* Metrics row */}
                    <div className="anime-dash__project-metrics">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="anime-dash__project-metric">
                          <span className="anime-dash__metric-value">{metric.value}</span>
                          <span className="anime-dash__metric-label">{metric.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hover reveal section */}
                    <div className="anime-dash__project-reveal">
                      <p className="anime-dash__project-detail">{project.detailedDesc}</p>
                      <div className="anime-dash__project-tech">
                        {project.tech.map(t => (
                          <span key={t} className="anime-dash__tech-badge">{t}</span>
                        ))}
                      </div>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="anime-dash__project-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Visit Project</span>
                          <ArrowUpRight weight="bold" size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Card border effect */}
                  <div className="anime-dash__project-border" />
                </div>
              ))}
            </div>

            {/* View all projects link */}
            <a href="/projects" className="anime-dash__projects-link">
              <span>View All Projects</span>
              <ArrowRight weight="bold" size={16} />
            </a>
          </div>
        );

      case 'skills':
        return (
          <div className="anime-dash__skills anime-dash__skills--enhanced">
            {/* Section Header */}
            <div className="anime-dash__skills-header">
              <div className="anime-dash__journey-ornament">◆</div>
              <div className="anime-dash__journey-icon">
                <Lightning weight="fill" size={20} />
              </div>
              <h3>Skill Arsenal</h3>
              <div className="anime-dash__journey-icon">
                <Lightning weight="fill" size={20} />
              </div>
              <div className="anime-dash__journey-ornament">◆</div>
            </div>

            {/* Category Pills */}
            <div className="anime-dash__skill-categories">
              {skillCategories.map((cat, i) => (
                <div
                  key={cat.id}
                  className="anime-dash__skill-category"
                  style={{ animationDelay: `${i * 0.08}s`, '--cat-color': cat.color } as React.CSSProperties}
                >
                  <span className="anime-dash__category-icon">{cat.icon}</span>
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>

            {/* Enhanced Skills Grid */}
            <div className="anime-dash__skills-grid anime-dash__skills-grid--enhanced">
              {skills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="anime-dash__skill-card anime-dash__skill-card--enhanced"
                  style={{ animationDelay: `${i * 0.1}s`, '--skill-color': skill.color } as React.CSSProperties}
                >
                  {/* Skill icon */}
                  <div className="anime-dash__skill-icon-wrap">
                    <div className="anime-dash__skill-icon" style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                  </div>

                  {/* Skill info */}
                  <div className="anime-dash__skill-info">
                    <div className="anime-dash__skill-header-row">
                      <span className="anime-dash__skill-name">{skill.name}</span>
                      <span className="anime-dash__skill-achievement" style={{ color: skill.color }}>
                        <Medal weight="fill" size={12} />
                        {skill.achievement}
                      </span>
                    </div>

                    <div className="anime-dash__skill-bar-container">
                      <div
                        className="anime-dash__skill-bar-fill"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${skill.color} 0%, ${skill.color}88 100%)`
                        }}
                      >
                        <div className="anime-dash__skill-bar-glow" style={{ background: skill.color }} />
                      </div>
                      <div className="anime-dash__skill-bar-particles">
                        <span className="anime-dash__bar-particle" />
                        <span className="anime-dash__bar-particle" />
                        <span className="anime-dash__bar-particle" />
                      </div>
                    </div>

                    <div className="anime-dash__skill-footer">
                      <span className="anime-dash__skill-level">{skill.level}%</span>
                      <span className="anime-dash__skill-xp">Mastery Level</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack - Skill Icons */}
            <div className="anime-dash__tech-section">
              <div className="anime-dash__tech-label">
                <Sparkle weight="fill" size={14} />
                <span>Tech Stack</span>
              </div>
              <div className="anime-dash__tech-icons">
                <img
                  src="https://skillicons.dev/icons?i=react,ts,python,tensorflow,aws,docker,postgres,redis,graphql,nextjs,nodejs,git&theme=dark&perline=6"
                  alt="Tech Stack"
                  className="anime-dash__skillicons"
                />
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="anime-dash__gallery">
            <div className="anime-dash__gallery-grid">
              {artworks.map((art, i) => (
                <div
                  key={art.id}
                  className="anime-dash__art-card"
                  style={{ animationDelay: `${i * 0.1}s` }}
                  onClick={() => openLightbox(art.image)}
                >
                  <div
                    className="anime-dash__art-image"
                    style={{ backgroundImage: `url(${art.image})` }}
                  />
                  <div className="anime-dash__art-overlay">
                    <span className="anime-dash__art-category">{art.category}</span>
                    <h4 className="anime-dash__art-title">{art.title}</h4>
                    <div className="anime-dash__art-stats">
                      <span className="anime-dash__art-stat">
                        <Heart weight="fill" size={14} />
                        {art.likes}
                      </span>
                      <span className="anime-dash__art-stat">
                        <Eye weight="fill" size={14} />
                        View
                      </span>
                    </div>
                  </div>
                  <div className="anime-dash__art-glow" />
                </div>
              ))}
            </div>
            <a href="/gallery" className="anime-dash__gallery-link">
              <span>Explore Full Gallery</span>
              <ArrowRight weight="bold" size={16} />
            </a>
          </div>
        );
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="anime-dash">
      {/* Enhanced Background */}
      <div className="anime-dash__bg">
        <div className="anime-dash__bg-gradient" />
        <div className="anime-dash__bg-orb anime-dash__bg-orb--1" />
        <div className="anime-dash__bg-orb anime-dash__bg-orb--2" />
        <div className="anime-dash__bg-orb anime-dash__bg-orb--3" />
        <div className="anime-dash__bg-grid" />
        <div className="anime-dash__bg-noise" />
      </div>


      <div className="anime-dash__container">
        {/* Header */}
        <div className="anime-dash__header">
          <h2>Explore My World</h2>
          <p>Click tabs to navigate through my story, projects, and skills</p>
        </div>

        {/* Tab Navigation */}
        <div className="anime-dash__tabs">
          {[
            { id: 'about', label: 'Story', icon: <Book weight="duotone" size={20} /> },
            { id: 'projects', label: 'Projects', icon: <RocketLaunch weight="duotone" size={20} /> },
            { id: 'skills', label: 'Skills', icon: <Lightning weight="fill" size={20} /> },
            { id: 'gallery', label: 'Gallery', icon: <Palette weight="duotone" size={20} /> },
          ].map(tab => (
            <button
              key={tab.id}
              className={`anime-dash__tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as TabId)}
            >
              <span className="anime-dash__tab-icon">{tab.icon}</span>
              <span className="anime-dash__tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div ref={contentRef} className="anime-dash__content">
          {renderTabContent()}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="anime-dash__lightbox" onClick={closeLightbox}>
          <button className="anime-dash__lightbox-close" onClick={closeLightbox}>
            <X weight="bold" size={28} />
          </button>
          <img src={lightboxImage} alt="" className="anime-dash__lightbox-image" />
        </div>
      )}

      <style>{`
        .anime-dash {
          position: relative;
          min-height: 100vh;
          padding: var(--space-3xl) var(--space-xl);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .anime-dash__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .anime-dash__bg-gradient {
          position: absolute;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255, 193, 87, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 60% at 100% 50%, rgba(168, 85, 247, 0.12) 0%, transparent 40%),
            radial-gradient(ellipse 50% 50% at 0% 80%, rgba(255, 193, 87, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 100% 100% at 50% 100%, rgba(20, 16, 30, 0.95) 0%, transparent 70%);
        }
        
        .anime-dash__bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
          animation: orbFloat 15s ease-in-out infinite;
        }
        
        .anime-dash__bg-orb--1 {
          width: 400px;
          height: 400px;
          top: -100px;
          right: 10%;
          background: radial-gradient(circle, rgba(255, 193, 87, 0.35) 0%, transparent 70%);
          animation-delay: 0s;
        }
        
        .anime-dash__bg-orb--2 {
          width: 300px;
          height: 300px;
          bottom: 10%;
          left: 5%;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%);
          animation-delay: -5s;
          animation-duration: 18s;
        }
        
        .anime-dash__bg-orb--3 {
          width: 250px;
          height: 250px;
          top: 40%;
          right: -50px;
          background: radial-gradient(circle, rgba(255, 193, 87, 0.25) 0%, transparent 70%);
          animation-delay: -10s;
          animation-duration: 20s;
        }
        
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.05); }
          50% { transform: translate(-15px, 20px) scale(0.95); }
          75% { transform: translate(25px, 10px) scale(1.02); }
        }
        
        .anime-dash__bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 193, 87, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 193, 87, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
        }
        
        .anime-dash__bg-noise {
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.3;
          pointer-events: none;
        }

        .anime-dash__container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1200px;
        }

        /* Header - Genshin Style */
        .anime-dash__header {
          text-align: center;
          margin-bottom: var(--space-2xl);
          position: relative;
        }

        .anime-dash__header::before,
        .anime-dash__header::after {
          content: '◆';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.8rem;
          color: rgba(255, 193, 87, 0.4);
        }
        
        .anime-dash__header::before { left: 20%; }
        .anime-dash__header::after { right: 20%; }

        .anime-dash__header h2 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          background: linear-gradient(135deg, #fff 0%, #ffc157 50%, #e5a333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: var(--space-sm);
          text-shadow: 0 0 60px rgba(255, 193, 87, 0.3);
        }

        .anime-dash__header p {
          color: var(--text-muted);
          font-size: 1rem;
        }

        /* Tabs - Genshin Impact Style */
        .anime-dash__tabs {
          display: flex;
          justify-content: center;
          gap: var(--space-xs);
          margin-bottom: var(--space-2xl);
          padding: 6px;
          background: linear-gradient(135deg, rgba(30, 25, 45, 0.9) 0%, rgba(20, 16, 30, 0.95) 100%);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 193, 87, 0.15);
          box-shadow: 
            0 4px 30px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          position: relative;
        }

        .anime-dash__tabs::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 17px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255, 193, 87, 0.3) 0%, transparent 50%, rgba(255, 193, 87, 0.1) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .anime-dash__tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: transparent;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .anime-dash__tab::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255, 193, 87, 0.15) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .anime-dash__tab:hover {
          color: rgba(255, 255, 255, 0.9);
        }

        .anime-dash__tab:hover::before {
          opacity: 1;
        }

        .anime-dash__tab.active {
          background: linear-gradient(135deg, rgba(255, 193, 87, 0.2) 0%, rgba(255, 193, 87, 0.05) 100%);
          color: #ffc157;
          box-shadow: 
            0 0 20px rgba(255, 193, 87, 0.2),
            inset 0 1px 0 rgba(255, 193, 87, 0.2);
          border: 1px solid rgba(255, 193, 87, 0.3);
        }

        .anime-dash__tab.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ffc157, transparent);
        }

        .anime-dash__tab-icon {
          font-size: 1.2rem;
          display: flex;
          align-items: center;
        }

        .anime-dash__tab.active .anime-dash__tab-icon {
          filter: drop-shadow(0 0 8px rgba(255, 193, 87, 0.6));
        }

        /* Content area */
        .anime-dash__content {
          min-height: 320px;
        }

        /* About tab - Compact Layout */
        .anime-dash__about--compact {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .anime-dash__timeline-section {
          position: relative;
        }

        .anime-dash__journey-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: var(--space-lg);
        }

        .anime-dash__journey-ornament {
          font-size: 0.75rem;
          color: rgba(255, 193, 87, 0.4);
          animation: ornamentPulse 3s ease-in-out infinite;
        }

        @keyframes ornamentPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }

        .anime-dash__journey-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(255, 193, 87, 0.15) 0%, rgba(255, 193, 87, 0.05) 100%);
          border: 1px solid rgba(255, 193, 87, 0.25);
          border-radius: 10px;
          color: #ffc157;
        }

        .anime-dash__timeline-section h3 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 500;
          color: white;
          margin: 0;
          background: linear-gradient(135deg, #fff 0%, #ffc157 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Horizontal Scrollable Timeline */
        .anime-dash__timeline-scroll {
          overflow-x: auto;
          overflow-y: hidden;
          padding: var(--space-md) 0;
          margin: 0 calc(-1 * var(--space-md));
          padding-left: var(--space-md);
          padding-right: var(--space-md);
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 193, 87, 0.3) transparent;
        }

        .anime-dash__timeline-scroll::-webkit-scrollbar {
          height: 6px;
        }

        .anime-dash__timeline-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 3px;
        }

        .anime-dash__timeline-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, rgba(255, 193, 87, 0.3), rgba(168, 85, 247, 0.3));
          border-radius: 3px;
        }

        .anime-dash__timeline--horizontal {
          display: flex;
          gap: var(--space-lg);
          padding: var(--space-xl) 0;
          padding-bottom: var(--space-md);
          min-width: max-content;
          position: relative;
        }

        /* Energy Flow Track */
        .anime-dash__timeline-track {
          position: absolute;
          top: 28px;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(255, 193, 87, 0.1) 0%,
            rgba(255, 193, 87, 0.3) 20%,
            rgba(255, 193, 87, 0.3) 80%,
            rgba(168, 85, 247, 0.2) 100%);
          border-radius: 2px;
        }

        .anime-dash__timeline-energy {
          position: absolute;
          top: 0;
          left: 0;
          width: 80px;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 193, 87, 0.8), 
            rgba(255, 215, 100, 0.6),
            transparent);
          border-radius: 2px;
          animation: energyFlow 3s ease-in-out infinite;
        }

        @keyframes energyFlow {
          0% { left: -80px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: calc(100% + 80px); opacity: 0; }
        }

        /* Timeline Item - Horizontal */
        .anime-dash__timeline-item--h {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-sm);
          width: 220px;
          flex-shrink: 0;
          position: relative;
          animation: timelineItemFade 0.6s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes timelineItemFade {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Particles */
        .anime-dash__particles {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 60px;
          pointer-events: none;
        }

        .anime-dash__particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffc157;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255, 193, 87, 0.8);
        }

        .anime-dash__particle:nth-child(1) {
          top: 10px;
          left: 10px;
          animation: particleFloat 2.5s ease-in-out infinite;
        }

        .anime-dash__particle:nth-child(2) {
          top: 5px;
          right: 15px;
          animation: particleFloat 3s ease-in-out infinite 0.5s;
        }

        .anime-dash__particle:nth-child(3) {
          top: 20px;
          left: 50%;
          animation: particleFloat 2.8s ease-in-out infinite 1s;
        }

        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-15px) scale(1.3); 
            opacity: 1;
          }
        }

        /* Node - Horizontal */
        .anime-dash__timeline-node--h {
          position: relative;
          z-index: 2;
        }

        .anime-dash__timeline-dot--h {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(30, 25, 45, 0.98) 0%, rgba(20, 16, 30, 1) 100%);
          border: 2px solid rgba(255, 193, 87, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .anime-dash__dot-icon {
          color: rgba(255, 193, 87, 0.7);
          transition: all 0.4s ease;
          z-index: 2;
        }

        .anime-dash__dot-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(255, 193, 87, 0.15);
          opacity: 0;
          transition: all 0.4s ease;
        }

        .anime-dash__dot-glow {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 193, 87, 0.2) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .anime-dash__timeline-item--h:hover .anime-dash__timeline-dot--h {
          border-color: #ffc157;
          transform: scale(1.1);
          box-shadow: 0 0 30px rgba(255, 193, 87, 0.5);
        }

        .anime-dash__timeline-item--h:hover .anime-dash__dot-icon {
          color: #ffc157;
          transform: scale(1.15) rotate(5deg);
          filter: drop-shadow(0 0 8px rgba(255, 193, 87, 0.8));
        }

        .anime-dash__timeline-item--h:hover .anime-dash__dot-ring {
          opacity: 1;
          animation: ringPulse 1.5s ease-in-out infinite;
        }

        .anime-dash__timeline-item--h:hover .anime-dash__dot-glow {
          opacity: 1;
        }

        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 1; }
        }

        .anime-dash__timeline-dot--pulse {
          border-color: #ffc157;
          animation: activePulse 2.5s ease-in-out infinite;
        }

        .anime-dash__timeline-dot--pulse .anime-dash__dot-icon {
          color: #ffc157;
        }

        .anime-dash__timeline-dot--pulse .anime-dash__dot-glow {
          opacity: 0.6;
        }

        @keyframes activePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 193, 87, 0.5); }
          50% { box-shadow: 0 0 25px 8px rgba(255, 193, 87, 0.25); }
        }

        /* Card - Horizontal */
        .anime-dash__timeline-card--h {
          width: 100%;
          padding: var(--space-md);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: 160px;
        }

        .anime-dash__card-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 193, 87, 0.08),
            transparent
          );
          transition: left 0.6s ease;
        }

        .anime-dash__timeline-item--h:hover .anime-dash__card-shimmer {
          left: 100%;
        }

        .anime-dash__card-border {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255, 193, 87, 0.3) 0%, transparent 50%, rgba(168, 85, 247, 0.2) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .anime-dash__timeline-item--h:hover .anime-dash__timeline-card--h {
          background: linear-gradient(135deg, rgba(255, 193, 87, 0.08) 0%, rgba(255, 193, 87, 0.02) 100%);
          border-color: rgba(255, 193, 87, 0.25);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 193, 87, 0.1);
        }

        .anime-dash__timeline-item--h:hover .anime-dash__card-border {
          opacity: 1;
        }

        .anime-dash__timeline-item--active .anime-dash__timeline-card--h {
          background: linear-gradient(135deg, rgba(255, 193, 87, 0.1) 0%, rgba(255, 193, 87, 0.03) 100%);
          border-color: rgba(255, 193, 87, 0.3);
        }

        .anime-dash__timeline-item--active .anime-dash__card-border {
          opacity: 0.5;
        }

        .anime-dash__card-content {
          position: relative;
          z-index: 1;
        }

        /* Custom Typography */
        .anime-dash__timeline-year--styled {
          display: inline-block;
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 600;
          background: linear-gradient(135deg, #ffc157 0%, #e5a333 50%, #ffd93d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          padding: 0;
          margin-bottom: 4px;
          letter-spacing: 0.1em;
          text-shadow: 0 0 30px rgba(255, 193, 87, 0.5);
        }

        .anime-dash__timeline-subtitle {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: rgba(255, 193, 87, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 6px;
        }

        .anime-dash__timeline-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 4px;
          transition: color 0.3s ease;
        }

        .anime-dash__timeline-item--h:hover .anime-dash__timeline-title {
          color: #ffc157;
        }

        .anime-dash__timeline-desc {
          font-family: var(--font-body);
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin-bottom: 0;
        }

        /* Hover Reveal Content */
        .anime-dash__timeline-reveal {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .anime-dash__timeline-item--h:hover .anime-dash__timeline-reveal {
          max-height: 150px;
          opacity: 1;
          margin-top: var(--space-sm);
        }

        .anime-dash__timeline-detail {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
          margin-bottom: var(--space-sm);
        }

        .anime-dash__timeline-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: var(--space-sm);
        }

        .anime-dash__mini-badge {
          padding: 3px 8px;
          background: rgba(255, 193, 87, 0.12);
          border: 1px solid rgba(255, 193, 87, 0.2);
          border-radius: 12px;
          font-size: 0.65rem;
          color: #ffc157;
          font-family: var(--font-mono);
        }

        .anime-dash__timeline-achievement {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(168, 85, 247, 0.9);
          font-size: 0.7rem;
          font-weight: 600;
        }

        .anime-dash__timeline-achievement svg {
          color: #a855f7;
        }

        /* Scroll Hint */
        .anime-dash__scroll-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.7rem;
          color: rgba(255, 193, 87, 0.5);
          margin-top: var(--space-sm);
          animation: hintPulse 2s ease-in-out infinite;
        }

        @keyframes hintPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .anime-dash__scroll-hint svg {
          animation: hintArrow 1.5s ease-in-out infinite;
        }

        @keyframes hintArrow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }

        /* Compact Stats Row */
        .anime-dash__about-stats--row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--space-md);
          flex-wrap: wrap;
        }

        .anime-dash__stat-divider {
          color: rgba(255, 193, 87, 0.3);
          font-size: 0.6rem;
        }

        .anime-dash__stat-card--compact {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border-radius: 12px;
          border: 1px solid rgba(255, 193, 87, 0.1);
          transition: all 0.3s ease;
        }

        .anime-dash__stat-card--compact:hover {
          border-color: rgba(255, 193, 87, 0.25);
          transform: translateY(-2px);
        }

        .anime-dash__stat-card--compact .anime-dash__stat-icon {
          color: #ffc157;
          filter: drop-shadow(0 0 6px rgba(255, 193, 87, 0.4));
        }

        .anime-dash__stat-info {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .anime-dash__stat-card--compact .anime-dash__stat-number {
          font-size: 1.3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ffc157 0%, #e5a333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .anime-dash__stat-card--compact .anime-dash__stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Legacy About Styles (keep for backward compat) */
        .anime-dash__about {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--space-xl);
        }

        /* Stats Cards */
        .anime-dash__about-stats {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .anime-dash__stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-lg);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
          border-radius: 20px;
          border: 1px solid rgba(255, 193, 87, 0.1);
          text-align: center;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .anime-dash__stat-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 193, 87, 0.1) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .anime-dash__stat-card:hover {
          border-color: rgba(255, 193, 87, 0.3);
          transform: translateY(-4px);
        }

        .anime-dash__stat-card:hover::before {
          opacity: 1;
        }

        .anime-dash__stat-icon {
          color: #ffc157;
          margin-bottom: var(--space-sm);
          filter: drop-shadow(0 0 10px rgba(255, 193, 87, 0.4));
        }

        .anime-dash__stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ffc157 0%, #e5a333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .anime-dash__stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        /* Projects tab */
        .anime-dash__projects {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-lg);
        }

        .anime-dash__project-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 193, 87, 0.1);
          transition: all 0.4s ease;
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
          from { opacity: 0; transform: translateY(20px); }
        }

        .anime-dash__project-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 193, 87, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 193, 87, 0.1);
        }

        .anime-dash__project-header {
          height: 120px;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          padding: var(--space-md);
          position: relative;
        }

        .anime-dash__project-status {
          padding: 6px 14px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .anime-dash__project-status--live { color: #22c55e; }
        .anime-dash__project-status--building { color: #ffc157; }

        .anime-dash__project-body {
          padding: var(--space-lg);
        }

        .anime-dash__project-body h4 {
          font-size: 1.2rem;
          color: white;
          margin-bottom: var(--space-sm);
        }

        .anime-dash__project-body p {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: var(--space-md);
          line-height: 1.5;
        }

        .anime-dash__project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-xs);
        }

        .anime-dash__tech-badge {
          padding: 5px 12px;
          background: rgba(255, 193, 87, 0.1);
          border-radius: 20px;
          font-size: 0.75rem;
          color: #ffc157;
          border: 1px solid rgba(255, 193, 87, 0.2);
        }

        /* Skills tab */
        .anime-dash__skills {
          display: flex;
          flex-direction: column;
          gap: var(--space-2xl);
        }

        .anime-dash__skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-md);
        }

        .anime-dash__skill-card {
          padding: var(--space-lg);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
          border-radius: 16px;
          border: 1px solid rgba(255, 193, 87, 0.1);
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .anime-dash__skill-card:hover {
          border-color: rgba(255, 193, 87, 0.25);
          transform: translateY(-4px);
        }

        .anime-dash__skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-sm);
        }

        .anime-dash__skill-name {
          font-weight: 600;
          color: white;
        }

        .anime-dash__skill-badge {
          padding: 4px 10px;
          background: rgba(168, 85, 247, 0.15);
          border-radius: 20px;
          font-size: 0.7rem;
          color: #a855f7;
        }

        .anime-dash__skill-bar-container {
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: var(--space-xs);
        }

        .anime-dash__skill-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #ffc157 0%, #e5a333 60%, #a855f7 100%);
          border-radius: 4px;
          transition: width 1s ease;
          box-shadow: 0 0 15px rgba(255, 193, 87, 0.4);
        }

        .anime-dash__skill-level {
          font-size: 0.8rem;
          color: #ffc157;
          font-weight: 600;
        }

        .anime-dash__tech-cloud {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-sm);
        }

        .anime-dash__tech-tag {
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 193, 87, 0.1);
          border-radius: 30px;
          font-size: 0.9rem;
          color: var(--text-secondary);
          transition: all 0.3s ease;
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
        }

        .anime-dash__tech-tag:hover {
          background: rgba(255, 193, 87, 0.1);
          border-color: rgba(255, 193, 87, 0.3);
          color: #ffc157;
          transform: translateY(-3px);
          box-shadow: 0 5px 20px rgba(255, 193, 87, 0.15);
        }

        /* ========== ENHANCED PROJECTS TAB ========== */
        .anime-dash__projects--enhanced {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
        }

        .anime-dash__projects-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: var(--space-md);
        }

        .anime-dash__projects-header h3 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 500;
          margin: 0;
          background: linear-gradient(135deg, #fff 0%, #ffc157 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .anime-dash__projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: var(--space-lg);
        }

        .anime-dash__project-card--enhanced {
          position: relative;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 193, 87, 0.1);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
        }

        .anime-dash__project-card--enhanced:hover {
          transform: translateY(-10px);
          border-color: rgba(255, 193, 87, 0.4);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 193, 87, 0.15);
        }

        .anime-dash__project-card--featured {
          border-color: rgba(255, 193, 87, 0.25);
        }

        .anime-dash__project-featured {
          position: absolute;
          top: var(--space-md);
          left: var(--space-md);
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 5px 10px;
          background: linear-gradient(135deg, rgba(255, 193, 87, 0.9) 0%, rgba(229, 163, 51, 0.9) 100%);
          border-radius: 20px;
          font-size: 0.65rem;
          font-weight: 700;
          color: #1a1520;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(255, 193, 87, 0.4);
        }

        .anime-dash__project-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          opacity: 0;
          filter: blur(100px);
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .anime-dash__project-card--enhanced:hover .anime-dash__project-glow {
          opacity: 0.15;
        }

        .anime-dash__project-header--enhanced {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-md) var(--space-lg);
          position: relative;
        }

        .anime-dash__project-icon-wrapper {
          position: relative;
        }

        .anime-dash__project-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          color: white;
          transition: all 0.4s ease;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .anime-dash__project-card--enhanced:hover .anime-dash__project-icon {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .anime-dash__project-icon-ring {
          position: absolute;
          inset: -8px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          opacity: 0;
          transition: all 0.4s ease;
        }

        .anime-dash__project-card--enhanced:hover .anime-dash__project-icon-ring {
          opacity: 1;
          animation: ringPulse 1.5s ease-in-out infinite;
        }

        .anime-dash__project-status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .anime-dash__status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
          animation: statusPulse 2s ease-in-out infinite;
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .anime-dash__project-body--enhanced {
          padding: var(--space-lg);
          position: relative;
        }

        .anime-dash__project-subtitle {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: rgba(255, 193, 87, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 4px;
        }

        .anime-dash__project-body--enhanced h4 {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 6px;
          transition: color 0.3s ease;
        }

        .anime-dash__project-card--enhanced:hover .anime-dash__project-body--enhanced h4 {
          color: #ffc157;
        }

        .anime-dash__project-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: var(--space-md);
        }

        .anime-dash__project-metrics {
          display: flex;
          gap: var(--space-lg);
          margin-bottom: var(--space-sm);
        }

        .anime-dash__project-metric {
          display: flex;
          flex-direction: column;
        }

        .anime-dash__metric-value {
          font-size: 1.2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ffc157 0%, #e5a333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .anime-dash__metric-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .anime-dash__project-reveal {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .anime-dash__project-card--enhanced:hover .anime-dash__project-reveal {
          max-height: 200px;
          opacity: 1;
          margin-top: var(--space-md);
          padding-top: var(--space-md);
          border-top: 1px solid rgba(255, 193, 87, 0.1);
        }

        .anime-dash__project-detail {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: var(--space-sm);
        }

        .anime-dash__project-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: var(--space-sm);
          padding: 8px 16px;
          background: linear-gradient(135deg, rgba(255, 193, 87, 0.15) 0%, rgba(255, 193, 87, 0.05) 100%);
          border: 1px solid rgba(255, 193, 87, 0.25);
          border-radius: 20px;
          color: #ffc157;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .anime-dash__project-link:hover {
          background: rgba(255, 193, 87, 0.2);
          transform: translateX(3px);
        }

        .anime-dash__project-border {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255, 193, 87, 0.4) 0%, transparent 50%, rgba(168, 85, 247, 0.2) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .anime-dash__project-card--enhanced:hover .anime-dash__project-border {
          opacity: 1;
        }

        .anime-dash__projects-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: var(--space-md) var(--space-xl);
          background: linear-gradient(135deg, rgba(255, 193, 87, 0.1) 0%, rgba(255, 193, 87, 0.03) 100%);
          border: 1px solid rgba(255, 193, 87, 0.2);
          border-radius: 50px;
          color: #ffc157;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.4s ease;
          margin: 0 auto;
        }

        .anime-dash__projects-link:hover {
          background: linear-gradient(135deg, rgba(255, 193, 87, 0.2) 0%, rgba(255, 193, 87, 0.08) 100%);
          border-color: rgba(255, 193, 87, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 193, 87, 0.15);
        }

        /* ========== ENHANCED SKILLS TAB ========== */
        .anime-dash__skills--enhanced {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
        }

        .anime-dash__skills-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: var(--space-sm);
        }

        .anime-dash__skills-header h3 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 500;
          margin: 0;
          background: linear-gradient(135deg, #fff 0%, #ffc157 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .anime-dash__skill-categories {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: var(--space-sm);
        }

        .anime-dash__skill-category {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          transition: all 0.3s ease;
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
        }

        .anime-dash__skill-category:hover {
          border-color: var(--cat-color, rgba(255, 193, 87, 0.3));
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-2px);
        }

        .anime-dash__category-icon {
          display: flex;
          color: var(--cat-color, #ffc157);
        }

        .anime-dash__skills-grid--enhanced {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-md);
        }

        .anime-dash__skill-card--enhanced {
          display: flex;
          gap: var(--space-md);
          padding: var(--space-lg);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .anime-dash__skill-card--enhanced::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--skill-color, #ffc157), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .anime-dash__skill-card--enhanced:hover {
          border-color: rgba(255, 193, 87, 0.2);
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
        }

        .anime-dash__skill-card--enhanced:hover::before {
          opacity: 1;
        }

        .anime-dash__skill-icon-wrap {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }

        .anime-dash__skill-card--enhanced:hover .anime-dash__skill-icon-wrap {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 193, 87, 0.2);
          transform: scale(1.05);
        }

        .anime-dash__skill-icon {
          filter: drop-shadow(0 0 8px currentColor);
          transition: all 0.3s ease;
        }

        .anime-dash__skill-card--enhanced:hover .anime-dash__skill-icon {
          transform: scale(1.1);
        }

        .anime-dash__skill-info {
          flex: 1;
          min-width: 0;
        }

        .anime-dash__skill-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-sm);
          gap: var(--space-sm);
        }

        .anime-dash__skill-achievement {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .anime-dash__skill-bar-container {
          position: relative;
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          overflow: visible;
          margin-bottom: var(--space-xs);
        }

        .anime-dash__skill-bar-fill {
          position: relative;
          height: 100%;
          border-radius: 4px;
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .anime-dash__skill-bar-glow {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          filter: blur(8px);
          opacity: 0.6;
        }

        .anime-dash__skill-bar-particles {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .anime-dash__skill-card--enhanced:hover .anime-dash__skill-bar-particles {
          opacity: 1;
        }

        .anime-dash__bar-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: var(--skill-color, #ffc157);
          border-radius: 50%;
          animation: barParticle 1.5s ease-in-out infinite;
        }

        .anime-dash__bar-particle:nth-child(1) {
          right: 0;
          animation-delay: 0s;
        }

        .anime-dash__bar-particle:nth-child(2) {
          right: -5px;
          animation-delay: 0.3s;
        }

        .anime-dash__bar-particle:nth-child(3) {
          right: -10px;
          animation-delay: 0.6s;
        }

        @keyframes barParticle {
          0%, 100% { 
            transform: translateY(-50%) translateY(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-50%) translateY(-8px);
            opacity: 1;
          }
        }

        .anime-dash__skill-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .anime-dash__skill-level {
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffc157;
        }

        .anime-dash__skill-xp {
          font-size: 0.65rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .anime-dash__tech-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
        }

        .anime-dash__tech-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 193, 87, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .anime-dash__tech-icons {
          display: flex;
          justify-content: center;
          padding: var(--space-sm);
        }

        .anime-dash__skillicons {
          max-width: 100%;
          height: auto;
          filter: drop-shadow(0 4px 20px rgba(255, 193, 87, 0.15));
          transition: filter 0.3s ease, transform 0.3s ease;
        }

        .anime-dash__skillicons:hover {
          filter: drop-shadow(0 4px 30px rgba(255, 193, 87, 0.3));
          transform: scale(1.02);
        }

        /* Gallery tab - Genshin Style */
        .anime-dash__gallery {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
        }

        .anime-dash__gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: var(--space-md);
        }

        .anime-dash__art-card {
          position: relative;
          aspect-ratio: 1;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
          border: 1px solid rgba(255, 193, 87, 0.1);
          transition: all 0.4s ease;
        }

        .anime-dash__art-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(255, 193, 87, 0.4);
        }

        .anime-dash__art-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.6s ease;
        }

        .anime-dash__art-card:hover .anime-dash__art-image {
          transform: scale(1.15);
        }

        .anime-dash__art-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(15, 10, 25, 0.95) 0%,
            rgba(15, 10, 25, 0.7) 40%,
            transparent 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: var(--space-md);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .anime-dash__art-card:hover .anime-dash__art-overlay {
          opacity: 1;
        }

        .anime-dash__art-category {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #ffc157;
          margin-bottom: 4px;
        }

        .anime-dash__art-title {
          font-size: 1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 8px;
        }

        .anime-dash__art-stats {
          display: flex;
          gap: var(--space-md);
        }

        .anime-dash__art-stat {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .anime-dash__art-stat svg {
          color: #ffc157;
        }

        .anime-dash__art-glow {
          position: absolute;
          inset: -50%;
          background: radial-gradient(circle, rgba(255, 193, 87, 0.2) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .anime-dash__art-card:hover .anime-dash__art-glow {
          opacity: 1;
        }

        .anime-dash__gallery-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: var(--space-lg) var(--space-2xl);
          background: linear-gradient(135deg, rgba(255, 193, 87, 0.1) 0%, rgba(255, 193, 87, 0.03) 100%);
          border: 1px solid rgba(255, 193, 87, 0.2);
          border-radius: 50px;
          color: #ffc157;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.4s ease;
          margin: 0 auto;
        }

        .anime-dash__gallery-link:hover {
          background: linear-gradient(135deg, rgba(255, 193, 87, 0.2) 0%, rgba(255, 193, 87, 0.08) 100%);
          border-color: rgba(255, 193, 87, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 193, 87, 0.15);
        }

        /* Lightbox */
        .anime-dash__lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(10, 8, 20, 0.95);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-2xl);
          cursor: zoom-out;
        }

        .anime-dash__lightbox-close {
          position: absolute;
          top: var(--space-xl);
          right: var(--space-xl);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 193, 87, 0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .anime-dash__lightbox-close:hover {
          background: rgba(255, 193, 87, 0.2);
          border-color: rgba(255, 193, 87, 0.5);
          transform: rotate(90deg);
        }

        .anime-dash__lightbox-image {
          max-width: 90%;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 16px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
          cursor: default;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .anime-dash__about {
            grid-template-columns: 1fr;
          }

          .anime-dash__about-stats {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }

          .anime-dash__header::before,
          .anime-dash__header::after {
            display: none;
          }

          .anime-dash__timeline-item--h {
            width: 200px;
          }

          .anime-dash__timeline-card--h {
            min-height: 140px;
          }
        }

        @media (max-width: 600px) {
          .anime-dash {
            padding: var(--space-xl) var(--space-md);
          }

          .anime-dash__tabs {
            flex-wrap: wrap;
            border-radius: 12px;
          }

          .anime-dash__tab-label {
            display: none;
          }

          .anime-dash__tab {
            padding: 12px 16px;
          }

          .anime-dash__about-stats--row {
            flex-direction: column;
            gap: var(--space-sm);
          }

          .anime-dash__stat-divider {
            display: none;
          }

          .anime-dash__journey-ornament {
            display: none;
          }

          .anime-dash__timeline-item--h {
            width: 180px;
          }

          .anime-dash__timeline-dot--h {
            width: 44px;
            height: 44px;
          }

          .anime-dash__timeline-card--h {
            min-height: 120px;
            padding: var(--space-sm);
          }

          .anime-dash__timeline-title {
            font-size: 0.9rem;
          }

          .anime-dash__scroll-hint {
            display: flex;
          }

          .anime-dash__gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .anime-dash__project-card,
          .anime-dash__skill-card,
          .anime-dash__tech-tag,
          .anime-dash__art-card,
          .anime-dash__timeline-item--h {
            animation: none;
            opacity: 1;
          }
          
          .anime-dash__timeline-dot--pulse,
          .anime-dash__timeline-energy,
          .anime-dash__particle,
          .anime-dash__card-shimmer,
          .anime-dash__journey-ornament {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default AnimeDashboard;
