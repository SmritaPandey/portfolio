import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Chapter {
    id: string;
    number: string;
    title: string;
    subtitle: string;
    description: string;
    accentColor: string;
}

const chapters: Chapter[] = [
    {
        id: 'origin',
        number: '01',
        title: 'ORIGIN',
        subtitle: 'The Systems Thinker',
        description:
            'Before I wrote my first line of code, I was already building systems. Pattern recognition, optimization, breaking things to understand how they work — the foundation of everything that followed.',
        accentColor: 'var(--accent-cyan)',
    },
    {
        id: 'engineer',
        number: '02',
        title: 'ENGINEER',
        subtitle: 'Fullstack & AI Mastery',
        description:
            'From frontend experiences to backend architectures, from machine learning pipelines to security infrastructure. Not specialized — synthesized.',
        accentColor: 'var(--accent-violet)',
    },
    {
        id: 'founder',
        number: '03',
        title: 'FOUNDER',
        subtitle: 'NeurQ AI Labs',
        description:
            'Building NeurQ AI Labs and NBATech from the ground up. Enterprise GRC platforms, GovTech solutions, AI-powered systems serving real institutions at scale.',
        accentColor: 'var(--accent-magenta)',
    },
    {
        id: 'architect',
        number: '04',
        title: 'ARCHITECT',
        subtitle: 'Systems at Scale',
        description:
            'Designing systems that serve millions. Every decision ripples through organizations. The weight of responsibility meets the clarity of purpose.',
        accentColor: 'var(--accent-gold)',
    },
];

const StoryMode = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const chaptersRef = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            chaptersRef.current.forEach((chapter, _index) => {
                if (!chapter) return;

                const content = chapter.querySelector('.story__chapter-content');
                const number = chapter.querySelector('.story__chapter-number');
                const title = chapter.querySelector('.story__chapter-title');
                const subtitle = chapter.querySelector('.story__chapter-subtitle');
                const description = chapter.querySelector('.story__chapter-description');
                const line = chapter.querySelector('.story__chapter-line');

                // Pin each chapter
                ScrollTrigger.create({
                    trigger: chapter,
                    start: 'top top',
                    end: 'bottom top',
                    pin: true,
                    pinSpacing: true,
                });

                // Animate in
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: chapter,
                        start: 'top 80%',
                        end: 'top 20%',
                        scrub: 1,
                    },
                });

                tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 0.5 })
                    .fromTo(number, { opacity: 0, x: -30 }, { opacity: 1, x: 0 }, '-=0.3')
                    .fromTo(title, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, '-=0.2')
                    .fromTo(subtitle, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '-=0.3')
                    .fromTo(description, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.2');

                // Fade out
                gsap.to(content, {
                    opacity: 0,
                    y: -50,
                    scrollTrigger: {
                        trigger: chapter,
                        start: 'bottom 80%',
                        end: 'bottom 30%',
                        scrub: 1,
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="story">
            {/* Section Header */}
            <section className="story__header section">
                <div className="container text-center">
                    <p className="text-meta neon-cyan">The Journey</p>
                    <h2 className="text-title">
                        <span className="neon-gradient">STORY MODE</span>
                    </h2>
                </div>
            </section>

            {/* Chapters */}
            {chapters.map((chapter, index) => (
                <section
                    key={chapter.id}
                    ref={(el) => { chaptersRef.current[index] = el; }}
                    className="story__chapter section section--full"
                    style={{ '--chapter-accent': chapter.accentColor } as React.CSSProperties}
                >
                    <div className="story__chapter-bg">
                        <div className="story__chapter-glow" />
                    </div>

                    <div className="story__chapter-content container">
                        <div className="story__chapter-line" />

                        <span className="story__chapter-number text-meta">
                            Chapter {chapter.number}
                        </span>

                        <h3 className="story__chapter-title text-title">
                            {chapter.title}
                        </h3>

                        <p className="story__chapter-subtitle text-subheading">
                            {chapter.subtitle}
                        </p>

                        <p className="story__chapter-description text-body">
                            {chapter.description}
                        </p>
                    </div>
                </section>
            ))}

            <style>{`
        .story {
          position: relative;
        }

        .story__header {
          min-height: 50vh;
        }

        .story__chapter {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .story__chapter-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .story__chapter-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, var(--chapter-accent) 0%, transparent 70%);
          opacity: 0.1;
          filter: blur(80px);
        }

        .story__chapter-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--space-lg);
        }

        .story__chapter-line {
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, transparent, var(--chapter-accent));
          transform-origin: top;
        }

        .story__chapter-number {
          color: var(--chapter-accent);
        }

        .story__chapter-title {
          color: var(--text-primary);
        }

        .story__chapter-subtitle {
          color: var(--chapter-accent);
        }

        .story__chapter-description {
          max-width: 600px;
        }

        @media (max-width: 768px) {
          .story__chapter-content {
            gap: var(--space-md);
          }
          
          .story__chapter-line {
            height: 50px;
          }
        }
      `}</style>
        </div>
    );
};

export default StoryMode;
