import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../../content';

gsap.registerPlugin(ScrollTrigger);

const CharacterStats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate character card entrance
      gsap.from(characterRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate skill bars
      const skillBars = statsRef.current?.querySelectorAll('.skill-bar__fill');
      skillBars?.forEach((bar, index) => {
        const width = bar.getAttribute('data-level');
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: `${width}%`,
            duration: 1.5,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Animate skill cards stagger
      gsap.from('.skill-card', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      // XP counter animation
      const xpCounters = statsRef.current?.querySelectorAll('.skill-xp');
      xpCounters?.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-xp') || '0');
        gsap.fromTo(counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'combat': return 'var(--accent-cyan)';
      case 'magic': return 'var(--accent-violet)';
      case 'special': return 'var(--accent-magenta)';
      default: return 'var(--accent-cyan)';
    }
  };

  const totalXP = skills.reduce((acc, skill) => acc + skill.xp, 0);
  const overallLevel = Math.floor(totalXP / 1000);

  return (
    <section ref={sectionRef} className="character-stats" id="stats">
      <div className="character-stats__container">
        {/* Header */}
        <div className="character-stats__header">
          <span className="section-label">// CHARACTER PROFILE</span>
          <h2 className="section-title glitch-text" data-text="SKILL TREE">
            SKILL TREE
          </h2>
        </div>

        <div className="character-stats__content">
          {/* Character Card */}
          <div ref={characterRef} className="character-card">
            <div className="character-card__frame">
              <div className="character-card__glow"></div>
              <div className="character-card__portrait">
                <div className="character-card__avatar">
                  <span className="avatar-icon">🎮</span>
                </div>
                <div className="character-card__rank">
                  <span className="rank-badge">S</span>
                </div>
              </div>

              <div className="character-card__info">
                <h3 className="character-name">
                  <span className="name-first">SMRITA</span>
                  <span className="name-last">PANDEY</span>
                </h3>
                <span className="character-class">Founder & Full-Stack Developer</span>

                <div className="character-level">
                  <div className="level-badge">
                    <span className="level-number">LVL</span>
                    <span className="level-value">{overallLevel}</span>
                  </div>
                  <div className="xp-bar">
                    <div className="xp-bar__track">
                      <div
                        className="xp-bar__fill"
                        style={{ width: `${(totalXP % 10000) / 100}%` }}
                      ></div>
                    </div>
                    <span className="xp-label">{totalXP.toLocaleString()} / {((overallLevel + 1) * 10000).toLocaleString()} XP</span>
                  </div>
                </div>

                <div className="character-traits">
                  <div className="trait">
                    <span className="trait-icon">🔥</span>
                    <span className="trait-name">STR</span>
                    <span className="trait-value">95</span>
                  </div>
                  <div className="trait">
                    <span className="trait-icon">⚡</span>
                    <span className="trait-name">AGI</span>
                    <span className="trait-value">88</span>
                  </div>
                  <div className="trait">
                    <span className="trait-icon">💜</span>
                    <span className="trait-name">INT</span>
                    <span className="trait-value">92</span>
                  </div>
                  <div className="trait">
                    <span className="trait-icon">💚</span>
                    <span className="trait-name">VIT</span>
                    <span className="trait-value">85</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <div ref={statsRef} className="skills-grid">
            {skills.map((skill, _index) => (
              <div
                key={skill.name}
                className="skill-card"
                style={{ '--skill-color': getCategoryColor(skill.category) } as React.CSSProperties}
              >
                <div className="skill-card__header">
                  <span className="skill-icon">{skill.icon}</span>
                  <div className="skill-info">
                    <h4 className="skill-name">{skill.name}</h4>
                    <span className="skill-category">{skill.category.toUpperCase()}</span>
                  </div>
                  <div className="skill-level-badge">
                    <span className="level-num">{skill.level}</span>
                  </div>
                </div>

                <p className="skill-description">{skill.description}</p>

                <div className="skill-bar">
                  <div className="skill-bar__track">
                    <div
                      className="skill-bar__fill"
                      data-level={skill.level}
                      style={{ '--fill-color': getCategoryColor(skill.category) } as React.CSSProperties}
                    ></div>
                    <div className="skill-bar__glow"></div>
                  </div>
                  <div className="skill-bar__labels">
                    <span className="skill-xp" data-xp={skill.xp}>0</span>
                    <span className="skill-max-xp">/ {skill.maxXp.toLocaleString()} XP</span>
                  </div>
                </div>

                {/* Level markers */}
                <div className="skill-markers">
                  {[25, 50, 75, 100].map((marker) => (
                    <div
                      key={marker}
                      className={`marker ${skill.level >= marker ? 'active' : ''}`}
                      style={{ left: `${marker}%` }}
                    >
                      <span className="marker-dot"></span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement badges */}
        <div className="achievements">
          <h3 className="achievements__title">UNLOCKED ACHIEVEMENTS</h3>
          <div className="achievements__grid">
            <div className="achievement unlocked">
              <span className="achievement-icon">🏆</span>
              <span className="achievement-name">First Startup</span>
            </div>
            <div className="achievement unlocked">
              <span className="achievement-icon">💎</span>
              <span className="achievement-name">10K Lines</span>
            </div>
            <div className="achievement unlocked">
              <span className="achievement-icon">🌟</span>
              <span className="achievement-name">Open Source</span>
            </div>
            <div className="achievement unlocked">
              <span className="achievement-icon">🎯</span>
              <span className="achievement-name">Shipped MVP</span>
            </div>
            <div className="achievement locked">
              <span className="achievement-icon">🔒</span>
              <span className="achievement-name">???</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .character-stats {
          position: relative;
          min-height: 100vh;
          padding: 8rem 2rem;
          background: linear-gradient(180deg, 
            var(--bg-primary) 0%,
            rgba(15, 5, 25, 0.98) 50%,
            var(--bg-primary) 100%
          );
          overflow: hidden;
        }

        .character-stats::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        /* Grid overlay for RPG feel */
        .character-stats::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .character-stats__container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .character-stats__header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-label {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.875rem;
          color: var(--accent-cyan);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900;
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-violet), var(--accent-magenta));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 80px rgba(139, 92, 246, 0.5);
        }

        .character-stats__content {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 3rem;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .character-stats__content {
            grid-template-columns: 1fr;
          }
        }

        /* Character Card */
        .character-card {
          position: sticky;
          top: 8rem;
        }

        .character-card__frame {
          position: relative;
          background: linear-gradient(135deg, 
            rgba(139, 92, 246, 0.15) 0%,
            rgba(15, 5, 25, 0.95) 100%
          );
          border: 2px solid rgba(139, 92, 246, 0.3);
          border-radius: 1rem;
          padding: 2rem;
          overflow: hidden;
        }

        .character-card__frame::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--accent-cyan), var(--accent-violet), var(--accent-magenta));
        }

        .character-card__glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, transparent 50%);
          animation: pulse-glow 4s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        .character-card__portrait {
          position: relative;
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .character-card__avatar {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, var(--accent-violet), var(--accent-cyan));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 0 30px rgba(139, 92, 246, 0.5),
            inset 0 0 30px rgba(0, 0, 0, 0.3);
        }

        .avatar-icon {
          font-size: 3rem;
        }

        .character-card__rank {
          position: absolute;
          bottom: 0;
          right: calc(50% - 80px);
        }

        .rank-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          border-radius: 8px;
          font-weight: 900;
          font-size: 1.5rem;
          color: #000;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
          animation: rank-pulse 2s ease-in-out infinite;
        }

        @keyframes rank-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.8); }
        }

        .character-card__info {
          text-align: center;
        }

        .character-name {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin-bottom: 0.5rem;
        }

        .name-first {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.8rem;
          font-weight: 900;
          letter-spacing: 0.15em;
          background: linear-gradient(180deg, #fff 0%, #ffc157 40%, #e5a333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 15px rgba(255, 193, 87, 0.4));
          text-transform: uppercase;
        }

        .name-last {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.5em;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          position: relative;
          padding: 0 24px;
        }

        .name-last::before,
        .name-last::after {
          content: '◆';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.35rem;
          color: rgba(255, 193, 87, 0.6);
        }

        .name-last::before {
          left: 0;
        }

        .name-last::after {
          right: 0;
        }

        .character-class {
          display: block;
          font-size: 0.875rem;
          color: var(--accent-cyan);
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 1.5rem;
        }

        .character-level {
          margin-bottom: 1.5rem;
        }

        .level-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .level-number {
          font-size: 0.75rem;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
        }

        .level-value {
          font-size: 2rem;
          font-weight: 900;
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-violet));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .xp-bar {
          text-align: center;
        }

        .xp-bar__track {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .xp-bar__fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-cyan), var(--accent-violet));
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
          transition: width 1s ease-out;
        }

        .xp-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-family: 'JetBrains Mono', monospace;
        }

        .character-traits {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
        }

        .trait {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.75rem 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .trait:hover {
          background: rgba(139, 92, 246, 0.15);
          border-color: var(--accent-violet);
          transform: translateY(-2px);
        }

        .trait-icon {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .trait-name {
          font-size: 0.625rem;
          color: var(--text-secondary);
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.1em;
        }

        .trait-value {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Skills Grid */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .skill-card {
          position: relative;
          background: rgba(15, 5, 25, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 1.5rem;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .skill-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--skill-color);
          opacity: 0.7;
        }

        .skill-card:hover {
          border-color: var(--skill-color);
          transform: translateY(-4px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .skill-card:hover::before {
          opacity: 1;
          box-shadow: 0 0 20px var(--skill-color);
        }

        .skill-card__header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .skill-icon {
          font-size: 2rem;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .skill-info {
          flex: 1;
        }

        .skill-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .skill-category {
          font-size: 0.625rem;
          color: var(--skill-color);
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.15em;
        }

        .skill-level-badge {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          border: 2px solid var(--skill-color);
          border-radius: 50%;
        }

        .level-num {
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--skill-color);
        }

        .skill-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .skill-bar {
          margin-bottom: 0.5rem;
        }

        .skill-bar__track {
          position: relative;
          height: 10px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 5px;
          overflow: hidden;
        }

        .skill-bar__fill {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, var(--fill-color), color-mix(in srgb, var(--fill-color) 70%, white));
          border-radius: 5px;
          position: relative;
          transition: width 1.5s ease-out;
        }

        .skill-bar__fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .skill-bar__glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 5px;
          box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1);
          pointer-events: none;
        }

        .skill-bar__labels {
          display: flex;
          justify-content: flex-end;
          gap: 0.25rem;
          margin-top: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
        }

        .skill-xp {
          color: var(--skill-color);
        }

        .skill-max-xp {
          color: var(--text-secondary);
        }

        .skill-markers {
          position: relative;
          height: 16px;
          margin-top: 0.5rem;
        }

        .marker {
          position: absolute;
          top: 0;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .marker-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .marker.active .marker-dot {
          background: var(--skill-color);
          border-color: var(--skill-color);
          box-shadow: 0 0 10px var(--skill-color);
        }

        /* Achievements */
        .achievements {
          margin-top: 4rem;
          text-align: center;
        }

        .achievements__title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.2em;
          margin-bottom: 2rem;
        }

        .achievements__grid {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .achievement {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          transition: all 0.3s ease;
        }

        .achievement.unlocked {
          border-color: rgba(255, 215, 0, 0.3);
        }

        .achievement.unlocked:hover {
          border-color: rgba(255, 215, 0, 0.6);
          background: rgba(255, 215, 0, 0.1);
          transform: translateY(-4px);
        }

        .achievement.locked {
          opacity: 0.4;
        }

        .achievement-icon {
          font-size: 1.5rem;
        }

        .achievement-name {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-family: 'JetBrains Mono', monospace;
        }

        .achievement.unlocked .achievement-name {
          color: var(--text-primary);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .character-stats {
            padding: 4rem 1rem;
          }

          .character-card {
            position: relative;
            top: 0;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .character-traits {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .character-card__glow,
          .skill-bar__fill::after {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default CharacterStats;
