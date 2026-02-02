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
} from '@phosphor-icons/react';
import Header from '../components/layout/Header';
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
                            <div className="blog-card__image">
                                <img src={post.coverImage} alt={post.title} />
                                <div className="blog-card__overlay" />
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

            {/* Footer */}
            <footer className="blog-footer">
                <p>Made with <Heart weight="fill" size={14} style={{ color: '#FF8FAB', verticalAlign: 'middle', margin: '0 4px' }} /> by Smrita</p>
            </footer>

            <style>{`
                .blog-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #FFF5F8 0%, #F8F0FF 50%, #FFF5E6 100%);
                    position: relative;
                    overflow-x: hidden;
                }

                .kawaii-decorations {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 0;
                }

                .kawaii-element {
                    position: absolute;
                    font-size: 2rem;
                    opacity: 0.6;
                }

                .kawaii-star { color: #FFD93D; font-size: 1.5rem; }
                .kawaii-heart { color: #FF8FAB; font-size: 1.8rem; }
                .kawaii-cloud { color: #B5E8D5; font-size: 2.5rem; }
                .kawaii-bow { font-size: 2rem; }
                .kawaii-sparkle { color: #E8D5F2; font-size: 1.5rem; }

                .blog-header {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                }

                .blog-nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .blog-nav__logo {
                    font-family: var(--font-heading);
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #5A4A5C;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .blog-nav__logo-img {
                    height: 36px;
                    width: auto;
                    filter: brightness(0.3);
                    transition: all 0.3s ease;
                }

                .blog-nav__logo:hover .blog-nav__logo-img {
                    filter: brightness(0.2) drop-shadow(0 0 8px rgba(255, 143, 171, 0.5));
                }

                .blog-nav__links {
                    display: flex;
                    gap: 1.5rem;
                }

                .blog-nav__link {
                    font-size: 0.875rem;
                    color: #5A4A5C;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    transition: all 0.3s ease;
                }

                .blog-nav__link:hover {
                    background: rgba(255, 143, 171, 0.1);
                    color: #FF6B9D;
                }

                .blog-nav__link--active {
                    background: linear-gradient(135deg, #FFB7D5, #E8D5F2);
                    color: #5A4A5C;
                }

                .blog-main {
                    position: relative;
                    z-index: 1;
                    padding: 4rem 2rem;
                }

                .blog-author-hero {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    margin-bottom: 3rem;
                    padding: 2rem;
                    background: white;
                    border-radius: 32px;
                    box-shadow: 
                        0 4px 20px rgba(0, 0, 0, 0.05),
                        0 8px 32px rgba(255, 143, 171, 0.15);
                }

                .blog-author-avatar {
                    position: relative;
                    width: 120px;
                    height: 120px;
                    flex-shrink: 0;
                }

                .blog-author-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                    border: 4px solid #FFB7D5;
                }

                .blog-author-glow {
                    position: absolute;
                    inset: -10px;
                    background: radial-gradient(circle, rgba(255, 183, 213, 0.4) 0%, transparent 70%);
                    border-radius: 50%;
                    z-index: -1;
                    animation: avatar-glow 3s ease-in-out infinite;
                }

                @keyframes avatar-glow {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.1); }
                }

                .blog-author-info {
                    flex: 1;
                }

                .blog-author-stats {
                    display: flex;
                    gap: 1.5rem;
                    margin-top: 1rem;
                    font-size: 0.875rem;
                    color: #8B7A8D;
                }

                .blog-title-section {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .kawaii-emoji {
                    font-size: 3rem;
                    display: block;
                    margin-bottom: 1rem;
                }

                .blog-title {
                    font-family: var(--font-display);
                    font-size: clamp(2rem, 5vw, 3.5rem);
                    color: #5A4A5C;
                    margin-bottom: 0.5rem;
                }

                .blog-subtitle {
                    font-size: 1.125rem;
                    color: #8B7A8D;
                }

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
                    border: 2px solid rgba(255, 183, 213, 0.3);
                    border-radius: 20px;
                    background: white;
                    color: #5A4A5C;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .blog-filter:hover {
                    border-color: #FFB7D5;
                    background: rgba(255, 183, 213, 0.1);
                }

                .blog-filter--active {
                    background: linear-gradient(135deg, #FFB7D5, #E8D5F2);
                    border-color: transparent;
                    box-shadow: 0 4px 15px rgba(255, 143, 171, 0.3);
                }

                .blog-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 2rem;
                }

                .blog-card {
                    background: white;
                    border-radius: 24px;
                    overflow: hidden;
                    transition: all 0.4s ease;
                    box-shadow: 
                        0 4px 20px rgba(0, 0, 0, 0.05),
                        0 8px 32px rgba(255, 143, 171, 0.1);
                }

                .blog-card:hover {
                    transform: translateY(-8px) rotate(0.5deg);
                    box-shadow: 
                        0 12px 40px rgba(0, 0, 0, 0.1),
                        0 16px 48px rgba(255, 143, 171, 0.2);
                }

                .blog-card__image {
                    position: relative;
                    height: 180px;
                    overflow: hidden;
                }

                .blog-card__image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }

                .blog-card:hover .blog-card__image img {
                    transform: scale(1.1);
                }

                .blog-card__overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(255, 183, 213, 0.3), transparent);
                }

                .blog-card__content {
                    padding: 1.5rem;
                }

                .blog-card__tags {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 0.75rem;
                }

                .blog-card__tag {
                    font-size: 0.7rem;
                    padding: 0.25rem 0.75rem;
                    background: linear-gradient(135deg, #FFB7D5, #E8D5F2);
                    border-radius: 12px;
                    color: #5A4A5C;
                }

                .blog-card__title {
                    font-family: var(--font-heading);
                    font-size: 1.25rem;
                    color: #5A4A5C;
                    margin-bottom: 0.5rem;
                    line-height: 1.3;
                }

                .blog-card__excerpt {
                    font-size: 0.875rem;
                    color: #8B7A8D;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }

                .blog-card__meta {
                    display: flex;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    color: #B8A8BA;
                }

                .blog-footer {
                    text-align: center;
                    padding: 3rem;
                    color: #8B7A8D;
                    font-size: 0.875rem;
                }

                @media (max-width: 768px) {
                    .blog-nav {
                        padding: 1rem;
                    }

                    .blog-nav__links {
                        gap: 0.5rem;
                    }

                    .blog-nav__link {
                        padding: 0.4rem 0.75rem;
                        font-size: 0.8rem;
                    }

                    .blog-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default BlogPage;
