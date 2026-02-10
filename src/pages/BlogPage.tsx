import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
    Sparkle,
    Heart,
    Cloud,
    Star,
    PencilLine,
    Palette,
    MagicWand,
    Butterfly,
} from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { blogPosts } from '../content';

const BlogPage = () => {
    const [filter, setFilter] = useState<string>('all');

    const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];
    const filteredPosts = filter === 'all'
        ? blogPosts
        : blogPosts.filter(post => post.tags.includes(filter));


    useEffect(() => {
        gsap.fromTo('.blog-card',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
    }, [filter]);

    return (
        <div className="blog-page">
            {/* Floating kawaii elements */}
            <div className="kawaii-decorations">
                <div className="kawaii-element kawaii-star floating" style={{ top: '10%', left: '5%' }}><Sparkle weight="fill" size={24} /></div>
                <div className="kawaii-element kawaii-heart floating floating-delay-1" style={{ top: '20%', right: '8%' }}><Heart weight="fill" size={28} /></div>
                <div className="kawaii-element kawaii-cloud floating floating-delay-2" style={{ top: '50%', left: '3%' }}><Cloud weight="fill" size={36} /></div>
                <div className="kawaii-element kawaii-bow floating floating-delay-3" style={{ bottom: '20%', right: '5%' }}><Heart weight="fill" size={28} /></div>
                <div className="kawaii-element kawaii-sparkle floating" style={{ bottom: '30%', left: '10%' }}><Star weight="fill" size={22} /></div>
                <div className="kawaii-element floating floating-delay-2" style={{ top: '35%', right: '12%', color: '#E8D5F2' }}><MagicWand weight="fill" size={20} /></div>
                <div className="kawaii-element floating floating-delay-1" style={{ bottom: '40%', left: '7%', color: '#B5E8D5' }}><Butterfly weight="fill" size={26} /></div>
                <div className="kawaii-element kawaii-star floating floating-delay-3" style={{ top: '65%', right: '3%' }}><Sparkle weight="fill" size={18} /></div>
            </div>

            {/* Shared Header */}
            <Header variant="light" />

            <main className="blog-main container">
                {/* Author Hero */}
                <div className="blog-author-hero">
                    <div className="blog-author-avatar">
                        <img src="/img/blog-avatar.jpg" alt="Smrita" />
                        <div className="blog-author-glow" />
                    </div>
                    <div className="blog-author-info">
                        <h1 className="blog-title">Smrita's Blog <Sparkle weight="fill" size={28} style={{ verticalAlign: 'middle' }} /></h1>
                        <p className="blog-subtitle">Thoughts on tech, art, and the creative journey</p>
                        <div className="blog-author-stats">
                            <span><PencilLine weight="duotone" size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} /> {blogPosts.length} posts</span>
                            <span><Heart weight="fill" size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Digital creator</span>
                            <span><Palette weight="duotone" size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Artist & Developer</span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="blog-filters">
                    <button
                        className={`blog-filter ${filter === 'all' ? 'blog-filter--active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All Posts
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            className={`blog-filter ${filter === tag ? 'blog-filter--active' : ''}`}
                            onClick={() => setFilter(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Posts Grid */}
                <div className="blog-grid">
                    {filteredPosts.map((post) => (
                        <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-card clay-card">
                            <div className="blog-card__shimmer" />
                            <div className="blog-card__image">
                                <img src={post.coverImage} alt={post.title} />
                                <div className="blog-card__overlay" />
                                <div className="blog-card__sparkle">
                                    <Sparkle weight="fill" size={16} />
                                </div>
                            </div>
                            <div className="blog-card__content">
                                <div className="blog-card__tags">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="blog-card__tag">{tag}</span>
                                    ))}
                                </div>
                                <h2 className="blog-card__title">{post.title}</h2>
                                <p className="blog-card__excerpt">{post.excerpt}</p>
                                <div className="blog-card__meta">
                                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    <span>·</span>
                                    <span>{post.readTime} read</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />

            <style>{`
                .blog-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #FFF5F8 0%, #F8F0FF 50%, #FFF5E6 100%);
                    position: relative;
                    overflow-x: hidden;
                }

                /* ===== KAWAII DECORATIONS ===== */
                .kawaii-decorations {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 0;
                }

                .kawaii-element {
                    position: absolute;
                    font-size: 2rem;
                    opacity: 0.5;
                }

                .kawaii-star { color: #FFD93D; }
                .kawaii-heart { color: #FF8FAB; }
                .kawaii-cloud { color: #B5E8D5; }
                .kawaii-bow { color: #FF8FAB; }
                .kawaii-sparkle { color: #E8D5F2; }

                /* Floating Animations */
                .floating {
                    animation: kawaiiFloat 6s ease-in-out infinite;
                }
                .floating-delay-1 { animation-delay: -1.5s; }
                .floating-delay-2 { animation-delay: -3s; }
                .floating-delay-3 { animation-delay: -4.5s; }

                @keyframes kawaiiFloat {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    25% { transform: translateY(-12px) rotate(5deg); }
                    50% { transform: translateY(-6px) rotate(-3deg); }
                    75% { transform: translateY(-18px) rotate(3deg); }
                }

                /* ===== MAIN ===== */
                .blog-main {
                    position: relative;
                    z-index: 1;
                    padding: 4rem 2rem;
                }

                /* ===== AUTHOR HERO ===== */
                .blog-author-hero {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    margin-bottom: 3rem;
                    padding: 2rem 2.5rem;
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(16px);
                    border-radius: 32px;
                    border: 1px solid rgba(255, 183, 213, 0.25);
                    box-shadow:
                        0 4px 20px rgba(0, 0, 0, 0.04),
                        0 8px 32px rgba(255, 143, 171, 0.12);
                    position: relative;
                    overflow: hidden;
                }

                .blog-author-hero::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -30%;
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, rgba(255, 183, 213, 0.2) 0%, transparent 70%);
                    pointer-events: none;
                }

                .blog-author-avatar {
                    position: relative;
                    width: 110px;
                    height: 110px;
                    flex-shrink: 0;
                }

                .blog-author-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                    border: 3px solid #FFB7D5;
                    box-shadow: 0 4px 16px rgba(255, 143, 171, 0.25);
                }

                .blog-author-glow {
                    position: absolute;
                    inset: -10px;
                    background: radial-gradient(circle, rgba(255, 183, 213, 0.35) 0%, transparent 70%);
                    border-radius: 50%;
                    z-index: -1;
                    animation: avatar-glow 3s ease-in-out infinite;
                }

                @keyframes avatar-glow {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 0.9; transform: scale(1.15); }
                }

                .blog-author-info {
                    flex: 1;
                }

                .blog-author-stats {
                    display: flex;
                    gap: 1.5rem;
                    margin-top: 1rem;
                    font-size: 0.85rem;
                    color: #8B7A8D;
                }

                .blog-title {
                    font-family: var(--font-display);
                    font-size: clamp(1.8rem, 4vw, 3rem);
                    color: #5A4A5C;
                    margin-bottom: 0.5rem;
                    background: linear-gradient(135deg, #5A4A5C 0%, #FF6B9D 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .blog-subtitle {
                    font-size: 1.05rem;
                    color: #8B7A8D;
                    line-height: 1.6;
                }

                /* ===== FILTERS ===== */
                .blog-filters {
                    display: flex;
                    justify-content: center;
                    gap: 0.75rem;
                    margin-bottom: 3rem;
                    flex-wrap: wrap;
                }

                .blog-filter {
                    padding: 0.5rem 1.25rem;
                    font-size: 0.8rem;
                    border: 2px solid rgba(255, 183, 213, 0.25);
                    border-radius: 20px;
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(8px);
                    color: #5A4A5C;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    font-weight: 500;
                }

                .blog-filter:hover {
                    border-color: #FFB7D5;
                    background: rgba(255, 183, 213, 0.12);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(255, 143, 171, 0.15);
                }

                .blog-filter--active {
                    background: linear-gradient(135deg, #FFB7D5, #E8D5F2);
                    border-color: transparent;
                    box-shadow: 0 4px 15px rgba(255, 143, 171, 0.3);
                    transform: translateY(-2px);
                }

                /* ===== BLOG GRID ===== */
                .blog-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 2rem;
                }

                .blog-card {
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(8px);
                    border-radius: 24px;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid rgba(255, 183, 213, 0.15);
                    position: relative;
                    box-shadow:
                        0 4px 20px rgba(0, 0, 0, 0.04),
                        0 8px 32px rgba(255, 143, 171, 0.08);
                }

                .blog-card:hover {
                    transform: translateY(-10px) rotate(0.5deg);
                    border-color: rgba(255, 183, 213, 0.4);
                    box-shadow:
                        0 16px 48px rgba(0, 0, 0, 0.08),
                        0 24px 64px rgba(255, 143, 171, 0.18);
                }

                /* Card Shimmer */
                .blog-card__shimmer {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 183, 213, 0.08),
                        transparent
                    );
                    transition: left 0.7s ease;
                    z-index: 5;
                    pointer-events: none;
                }

                .blog-card:hover .blog-card__shimmer {
                    left: 100%;
                }

                /* Card Sparkle Badge */
                .blog-card__sparkle {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    width: 28px;
                    height: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 50%;
                    color: #FFD93D;
                    box-shadow: 0 2px 8px rgba(255, 217, 61, 0.3);
                    opacity: 0;
                    transform: scale(0.5) rotate(-45deg);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .blog-card:hover .blog-card__sparkle {
                    opacity: 1;
                    transform: scale(1) rotate(0deg);
                }

                .blog-card__image {
                    position: relative;
                    height: 190px;
                    overflow: hidden;
                }

                .blog-card__image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .blog-card:hover .blog-card__image img {
                    transform: scale(1.08);
                }

                .blog-card__overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(255, 183, 213, 0.25) 0%, transparent 60%);
                }

                .blog-card__content {
                    padding: 1.5rem;
                }

                .blog-card__tags {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 0.75rem;
                    flex-wrap: wrap;
                }

                .blog-card__tag {
                    font-size: 0.68rem;
                    padding: 0.2rem 0.7rem;
                    background: linear-gradient(135deg, #FFB7D5, #E8D5F2);
                    border-radius: 12px;
                    color: #5A4A5C;
                    font-weight: 500;
                    letter-spacing: 0.02em;
                }

                .blog-card__title {
                    font-family: var(--font-heading);
                    font-size: 1.2rem;
                    color: #5A4A5C;
                    margin-bottom: 0.5rem;
                    line-height: 1.3;
                    transition: color 0.3s ease;
                }

                .blog-card:hover .blog-card__title {
                    color: #FF6B9D;
                }

                .blog-card__excerpt {
                    font-size: 0.85rem;
                    color: #8B7A8D;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .blog-card__meta {
                    display: flex;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    color: #B8A8BA;
                    padding-top: 0.75rem;
                    border-top: 1px solid rgba(255, 183, 213, 0.15);
                }

                /* ===== RESPONSIVE ===== */
                @media (max-width: 768px) {
                    .blog-author-hero {
                        flex-direction: column;
                        text-align: center;
                        padding: 1.5rem;
                    }

                    .blog-author-stats {
                        justify-content: center;
                        flex-wrap: wrap;
                    }

                    .blog-grid {
                        grid-template-columns: 1fr;
                    }

                    .blog-filters {
                        gap: 0.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default BlogPage;
