import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft, Heart, Eye, PushPin, X } from '@phosphor-icons/react';
import { artworks } from '../../content';

gsap.registerPlugin(ScrollTrigger);

const ArtGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % artworks.length);
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stack scroll animation
      const stackCards = gsap.utils.toArray<HTMLElement>('.stack-card');
      stackCards.forEach((card, i) => {
        gsap.fromTo(card,
          {
            y: 100 * (i + 1),
            opacity: 0,
            rotateX: 15,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            scrollTrigger: {
              trigger: stackRef.current,
              start: `top+=${i * 100} 80%`,
              end: `top+=${i * 100 + 200} 50%`,
              scrub: 1,
            },
          }
        );
      });

      // Title reveal
      gsap.fromTo(
        '.gallery__title-word',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Carousel fade in
      gsap.fromTo(
        '.carousel-section',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.carousel-section',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (image: string) => {
    setLightboxImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('lenis-stopped');
    setIsAutoPlaying(false);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
    document.documentElement.classList.remove('lenis-stopped');
    setIsAutoPlaying(true);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((activeIndex + 1) % artworks.length);
  };

  const prevSlide = () => {
    goToSlide((activeIndex - 1 + artworks.length) % artworks.length);
  };

  const getCardPosition = (index: number) => {
    const diff = index - activeIndex;
    const total = artworks.length;

    // Handle wrap-around for infinite loop feel
    let normalizedDiff = diff;
    if (diff > total / 2) normalizedDiff = diff - total;
    if (diff < -total / 2) normalizedDiff = diff + total;

    return normalizedDiff;
  };

  return (
    <section ref={sectionRef} id="gallery" className="gallery section">
      {/* Background */}
      <div className="gallery__bg">
        <video autoPlay muted loop playsInline className="gallery__bg-video">
          <source src="/videos/hero-3.mp4" type="video/mp4" />
        </video>
        <div className="gallery__bg-overlay" />
      </div>

      <div className="container">
        {/* Header */}
        <div className="gallery__header">
          <p className="text-meta neon-magenta">Creative Expression</p>
          <h2 className="gallery__title">
            <span className="gallery__title-word">ART</span>
            <span className="gallery__title-word">&</span>
            <span className="gallery__title-word">SOUL</span>
          </h2>
        </div>

        {/* Carousel Section - with blur effect */}
        <div className="carousel-section">
          <div ref={carouselRef} className="gallery-carousel">
            <div className="carousel-track">
              {artworks.map((art, index) => {
                const position = getCardPosition(index);
                const isActive = position === 0;
                const isVisible = Math.abs(position) <= 2;

                return isVisible ? (
                  <div
                    key={art.id}
                    className={`carousel-card ${isActive ? 'active' : ''}`}
                    style={{
                      '--position': position,
                      '--abs-position': Math.abs(position),
                    } as React.CSSProperties}
                    onClick={() => isActive ? openLightbox(art.image) : goToSlide(index)}
                  >
                    <div className="carousel-card-inner">
                      <div className="carousel-card-image-wrap">
                        <img src={art.image} alt={art.title} className="carousel-card-image" />
                        <div className="carousel-card-gradient" />
                      </div>

                      {/* Bento-style info overlay - Pinterest pin style */}
                      <div className="bento-info">
                        <div className="bento-header">
                          <span className="bento-category">{art.category}</span>
                          <PushPin weight="fill" size={16} className="bento-pin" />
                        </div>
                        <h3 className="bento-title">{art.title}</h3>
                        <p className="bento-desc">{art.description}</p>
                        <div className="bento-footer">
                          <div className="bento-stats">
                            <span className="bento-stat">
                              <Heart weight="fill" size={14} />
                              {art.likes}
                            </span>
                            <span className="bento-stat">
                              <Eye weight="fill" size={14} />
                              {art.views}
                            </span>
                          </div>
                          <span className="bento-year">{art.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>

            {/* Carousel Controls */}
            <button className="carousel-nav carousel-prev" onClick={prevSlide}>
              <ArrowLeft weight="bold" size={24} />
            </button>
            <button className="carousel-nav carousel-next" onClick={nextSlide}>
              <ArrowRight weight="bold" size={24} />
            </button>

            {/* Dots indicator */}
            <div className="carousel-dots">
              {artworks.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stack Scroll Section */}
        <div ref={stackRef} className="stack-section">
          <div className="stack-header">
            <h3 className="stack-title">Featured Works</h3>
            <p className="stack-subtitle">Scroll to explore the collection</p>
          </div>

          <div className="stack-container">
            {artworks.slice(0, 3).map((art, index) => (
              <div
                key={art.id}
                className="stack-card"
                style={{ '--stack-index': index } as React.CSSProperties}
                onClick={() => openLightbox(art.image)}
              >
                <div className="stack-card-image-wrap">
                  <img src={art.image} alt={art.title} className="stack-card-image" />
                </div>
                <div className="stack-card-content">
                  <span className="stack-card-number">0{index + 1}</span>
                  <h4 className="stack-card-title">{art.title}</h4>
                  <p className="stack-card-desc">{art.description}</p>
                  <div className="stack-card-meta">
                    <span className="stack-card-category">{art.category}</span>
                    <span className="stack-card-year">{art.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="gallery__footer">
          <a href="/gallery" className="gallery__link">
            <span className="gallery__link-text">Explore Full Gallery</span>
            <ArrowRight weight="bold" size={18} className="gallery__link-arrow" />
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="gallery__lightbox" data-lenis-prevent onClick={closeLightbox}>
          <button className="gallery__lightbox-close" onClick={closeLightbox}>
            <X weight="bold" size={32} />
          </button>
          <img src={lightboxImage} alt="" className="gallery__lightbox-image" />
        </div>
      )}

      <style>{`
        .gallery {
          position: relative;
          padding: var(--space-5xl) 0;
          overflow: hidden;
          min-height: auto;
        }

        .gallery__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .gallery__bg-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.1;
        }

        .gallery__bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            var(--bg-primary) 0%,
            transparent 20%,
            transparent 80%,
            var(--bg-primary) 100%
          );
        }

        .gallery > .container {
          position: relative;
          z-index: 1;
        }

        .gallery__header {
          text-align: center;
          margin-bottom: var(--space-4xl);
        }

        .gallery__title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 10vw, 8rem);
          line-height: 0.9;
          display: flex;
          justify-content: center;
          gap: 0.3em;
          overflow: hidden;
        }

        .gallery__title-word {
          display: inline-block;
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-magenta));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ============ CAROUSEL SECTION ============ */
        .carousel-section {
          margin-bottom: var(--space-5xl);
          perspective: 1200px;
        }

        .gallery-carousel {
          position: relative;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-track {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-card {
          position: absolute;
          width: 340px;
          height: 440px;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          transform: translateX(calc(var(--position) * 280px))
                     scale(calc(1 - var(--abs-position) * 0.12))
                     rotateY(calc(var(--position) * -8deg));
          z-index: calc(10 - var(--abs-position));
          filter: blur(calc(var(--abs-position) * 3px));
          opacity: calc(1 - var(--abs-position) * 0.25);
        }

        .carousel-card.active {
          filter: none;
          opacity: 1;
        }

        .carousel-card-inner {
          width: 100%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid rgba(168, 85, 247, 0.2);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4),
                      0 0 40px rgba(168, 85, 247, 0.1);
          transition: all 0.4s ease;
        }

        .carousel-card.active .carousel-card-inner {
          box-shadow: 0 35px 70px -15px rgba(0, 0, 0, 0.5),
                      0 0 60px rgba(168, 85, 247, 0.2);
          border-color: rgba(168, 85, 247, 0.4);
        }

        .carousel-card-image-wrap {
          position: relative;
          width: 100%;
          height: 55%;
          overflow: hidden;
        }

        .carousel-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .carousel-card.active:hover .carousel-card-image {
          transform: scale(1.08);
        }

        .carousel-card-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60%;
          background: linear-gradient(to top, var(--bg-card), transparent);
        }

        /* ============ BENTO INFO - Pinterest Style ============ */
        .bento-info {
          padding: 20px;
          height: 45%;
          display: flex;
          flex-direction: column;
        }

        .bento-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .bento-category {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-magenta);
          padding: 4px 10px;
          background: rgba(168, 85, 247, 0.15);
          border-radius: 20px;
        }

        .bento-pin {
          color: var(--accent-cyan);
          opacity: 0;
          transform: rotate(-20deg);
          transition: all 0.3s ease;
        }

        .carousel-card.active:hover .bento-pin {
          opacity: 1;
          transform: rotate(0deg);
        }

        .bento-title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          color: var(--text-primary);
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .bento-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .bento-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .bento-stats {
          display: flex;
          gap: 16px;
        }

        .bento-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .bento-stat svg {
          color: var(--accent-magenta);
        }

        .bento-year {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        /* Carousel Navigation */
        .carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(168, 85, 247, 0.3);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 100;
        }

        .carousel-nav:hover {
          background: var(--accent-magenta);
          border-color: var(--accent-magenta);
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-prev {
          left: 20px;
        }

        .carousel-next {
          right: 20px;
        }

        .carousel-dots {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
        }

        .carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-dot.active {
          background: var(--accent-magenta);
          transform: scale(1.3);
        }

        .carousel-dot:hover {
          background: rgba(168, 85, 247, 0.5);
        }

        /* ============ STACK SCROLL SECTION ============ */
        .stack-section {
          padding: var(--space-4xl) 0;
        }

        .stack-header {
          text-align: center;
          margin-bottom: var(--space-3xl);
        }

        .stack-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-magenta));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: var(--space-sm);
        }

        .stack-subtitle {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        .stack-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
          max-width: 900px;
          margin: 0 auto;
        }

        .stack-card {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: var(--space-xl);
          background: var(--bg-card);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(168, 85, 247, 0.15);
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }

        .stack-card:hover {
          border-color: rgba(168, 85, 247, 0.4);
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.4),
                      0 0 40px rgba(168, 85, 247, 0.15);
        }

        .stack-card-image-wrap {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .stack-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .stack-card:hover .stack-card-image {
          transform: scale(1.1);
        }

        .stack-card-content {
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .stack-card-number {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-magenta);
          margin-bottom: var(--space-sm);
        }

        .stack-card-title {
          font-family: var(--font-display);
          font-size: 1.8rem;
          color: var(--text-primary);
          margin-bottom: var(--space-md);
        }

        .stack-card-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-lg);
        }

        .stack-card-meta {
          display: flex;
          gap: var(--space-md);
          align-items: center;
        }

        .stack-card-category {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 6px 12px;
          background: rgba(6, 182, 212, 0.15);
          color: var(--accent-cyan);
          border-radius: 20px;
        }

        .stack-card-year {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Gallery Footer */
        .gallery__footer {
          display: flex;
          justify-content: center;
          margin-top: var(--space-4xl);
        }

        .gallery__link {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          font-family: var(--font-mono);
          font-size: 0.875rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-primary);
          text-decoration: none;
          padding: var(--space-lg) var(--space-2xl);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .gallery__link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-magenta));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery__link:hover {
          border-color: var(--accent-magenta);
          color: white;
        }

        .gallery__link:hover::before {
          opacity: 1;
        }

        .gallery__link-text,
        .gallery__link-arrow {
          position: relative;
          z-index: 1;
        }

        .gallery__link-arrow {
          transition: transform 0.3s ease;
        }

        .gallery__link:hover .gallery__link-arrow {
          transform: translateX(5px);
        }

        /* Lightbox */
        .gallery__lightbox {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
          cursor: zoom-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .gallery__lightbox-close {
          position: absolute;
          top: var(--space-xl);
          right: var(--space-xl);
          background: var(--bg-card);
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .gallery__lightbox-close:hover {
          background: var(--accent-magenta);
          border-color: var(--accent-magenta);
          transform: rotate(90deg);
        }

        .gallery__lightbox-image {
          max-width: 85vw;
          max-height: 85vh;
          object-fit: contain;
          border-radius: var(--radius-lg);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
          cursor: default;
        }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 768px) {
          .gallery-carousel {
            height: 420px;
          }

          .carousel-card {
            width: 280px;
            height: 380px;
            transform: translateX(calc(var(--position) * 200px))
                       scale(calc(1 - var(--abs-position) * 0.15));
          }

          .carousel-nav {
            width: 40px;
            height: 40px;
          }

          .carousel-prev {
            left: 10px;
          }

          .carousel-next {
            right: 10px;
          }

          .stack-card {
            grid-template-columns: 1fr;
          }

          .stack-card-image-wrap {
            height: 180px;
          }

          .gallery__title {
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default ArtGallery;
