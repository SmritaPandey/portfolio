import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, Star, Heart, Sparkle, ArrowRight } from '@phosphor-icons/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { getBlogPostBySlug } from '../content';

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const contentRef = useRef<HTMLDivElement>(null);

    const post = slug ? getBlogPostBySlug(slug) : null;

    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
            );
        }
    }, [slug]);

    if (!post) {
        return (
            <div className="blog-post-page">
                <div className="blog-post__not-found">
                    <h1>Post not found</h1>
                    <Link to="/blog" className="blog-post__back"><ArrowLeft weight="bold" size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />Back to blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="blog-post-page">
            {/* Floating elements */}
            <div className="kawaii-decorations">
                <div className="kawaii-element floating" style={{ top: '15%', right: '5%' }}><Star weight="fill" size={20} /></div>
                <div className="kawaii-element floating floating-delay-1" style={{ top: '40%', left: '3%' }}><Heart weight="fill" size={22} /></div>
                <div className="kawaii-element floating floating-delay-2" style={{ bottom: '20%', right: '8%' }}><Sparkle weight="fill" size={20} /></div>
            </div>

            {/* Shared Header */}
            <Header variant="light" />

            {/* Article */}
            <article ref={contentRef} className="blog-post">
                <div className="blog-post__meta">
                    <Link to="/blog" className="blog-post__back"><ArrowLeft weight="bold" size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />Back to blog</Link>
                    <div className="blog-post__info">
                        <span>{new Date(post.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}</span>
                        <span>·</span>
                        <span>{post.readTime} read</span>
                    </div>
                </div>

                <h1 className="blog-post__title">{post.title}</h1>

                <div className="blog-post__tags">
                    {post.tags.map(tag => (
                        <span key={tag} className="blog-post__tag">{tag}</span>
                    ))}
                </div>

                <div className="blog-post__content" dangerouslySetInnerHTML={{
                    __html: (post.content || '')
                        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/`{3}(\w+)?\n([\s\S]*?)`{3}/g, '<pre><code class="language-$1">$2</code></pre>')
                        .replace(/`(.*?)`/g, '<code>$1</code>')
                        .replace(/^- (.*$)/gm, '<li>$1</li>')
                        .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
                        .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
                        .replace(/---/g, '<hr>')
                        .replace(/\n\n/g, '</p><p>')
                        .replace(/^(.+)$/gm, '<p>$1</p>')
                        .replace(/<p><h/g, '<h')
                        .replace(/<\/h(\d)><\/p>/g, '</h$1>')
                        .replace(/<p><ul>/g, '<ul>')
                        .replace(/<\/ul><\/p>/g, '</ul>')
                        .replace(/<p><pre>/g, '<pre>')
                        .replace(/<\/pre><\/p>/g, '</pre>')
                        .replace(/<p><hr><\/p>/g, '<hr>')
                        .replace(/<p><\/p>/g, '')
                }} />

                {/* Bottom Navigation */}
                <div className="blog-post__nav">
                    <Link to="/blog" className="blog-post__nav-link">
                        <ArrowLeft weight="bold" size={16} />
                        <span>Back to all posts</span>
                    </Link>
                    <Link to="/" className="blog-post__nav-link">
                        <span>Home</span>
                        <ArrowRight weight="bold" size={16} />
                    </Link>
                </div>
            </article>

            <Footer />

            <style>{`
                .blog-post-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #FFF5F8 0%, #F8F0FF 50%, #FFF5E6 100%);
                    position: relative;
                }

                .kawaii-decorations {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 0;
                }

                .kawaii-element {
                    position: absolute;
                    font-size: 1.5rem;
                    opacity: 0.5;
                    color: #FFB7D5;
                }

                /* Floating animations */
                .floating {
                    animation: kawaiiFloat 6s ease-in-out infinite;
                }
                .floating-delay-1 { animation-delay: -1.5s; }
                .floating-delay-2 { animation-delay: -3s; }

                @keyframes kawaiiFloat {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    25% { transform: translateY(-12px) rotate(5deg); }
                    50% { transform: translateY(-6px) rotate(-3deg); }
                    75% { transform: translateY(-18px) rotate(3deg); }
                }

                .blog-post {
                    max-width: 720px;
                    margin: 0 auto;
                    padding: 3rem 2rem 4rem;
                    position: relative;
                    z-index: 1;
                }

                .blog-post__meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .blog-post__back {
                    font-size: 0.875rem;
                    color: #FF8FAB;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .blog-post__back:hover {
                    color: #FF6B9D;
                    transform: translateX(-4px);
                }

                .blog-post__info {
                    display: flex;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                    color: #8B7A8D;
                }

                .blog-post__title {
                    font-family: var(--font-display);
                    font-size: clamp(2rem, 5vw, 3rem);
                    color: #5A4A5C;
                    line-height: 1.2;
                    margin-bottom: 1rem;
                    background: linear-gradient(135deg, #5A4A5C 0%, #FF6B9D 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .blog-post__tags {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                }

                .blog-post__tag {
                    font-size: 0.75rem;
                    padding: 0.25rem 0.75rem;
                    background: linear-gradient(135deg, #FFB7D5, #E8D5F2);
                    border-radius: 12px;
                    color: #5A4A5C;
                    font-weight: 500;
                }

                .blog-post__content {
                    font-size: 1.1rem;
                    line-height: 1.85;
                    color: #5A4A5C;
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(8px);
                    border-radius: 24px;
                    padding: 2.5rem;
                    border: 1px solid rgba(255, 183, 213, 0.15);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
                }

                .blog-post__content h1 {
                    font-size: 2rem;
                    margin: 2rem 0 1rem;
                    color: #5A4A5C;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid rgba(255, 183, 213, 0.3);
                }

                .blog-post__content h2 {
                    font-size: 1.5rem;
                    margin: 2rem 0 1rem;
                    color: #5A4A5C;
                    position: relative;
                    padding-left: 16px;
                }

                .blog-post__content h2::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 4px;
                    bottom: 4px;
                    width: 4px;
                    background: linear-gradient(135deg, #FFB7D5, #E8D5F2);
                    border-radius: 2px;
                }

                .blog-post__content h3 {
                    font-size: 1.25rem;
                    margin: 1.5rem 0 0.75rem;
                    color: #FF6B9D;
                }

                .blog-post__content p {
                    margin-bottom: 1rem;
                }

                .blog-post__content ul {
                    margin: 1rem 0;
                    padding-left: 1.5rem;
                }

                .blog-post__content li {
                    margin-bottom: 0.5rem;
                    position: relative;
                }

                .blog-post__content li::marker {
                    color: #FFB7D5;
                }

                .blog-post__content code {
                    font-family: var(--font-mono);
                    font-size: 0.9em;
                    background: rgba(255, 183, 213, 0.15);
                    padding: 0.2rem 0.5rem;
                    border-radius: 6px;
                    border: 1px solid rgba(255, 183, 213, 0.2);
                }

                .blog-post__content pre {
                    background: #2a2a3a;
                    padding: 1.5rem;
                    border-radius: 16px;
                    overflow-x: auto;
                    margin: 1.5rem 0;
                    border: 1px solid rgba(255, 183, 213, 0.15);
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
                }

                .blog-post__content pre code {
                    background: none;
                    padding: 0;
                    color: #e0e0e0;
                    border: none;
                }

                .blog-post__content hr {
                    border: none;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #FFB7D5, #E8D5F2, transparent);
                    margin: 2.5rem 0;
                }

                .blog-post__content strong {
                    font-weight: 600;
                    color: #FF8FAB;
                }

                .blog-post__content em {
                    font-style: italic;
                    color: #8B7A8D;
                }

                /* Bottom Navigation */
                .blog-post__nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 3rem;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(255, 183, 213, 0.2);
                }

                .blog-post__nav-link {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.9rem;
                    color: #FF8FAB;
                    padding: 10px 20px;
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(8px);
                    border-radius: 16px;
                    border: 1px solid rgba(255, 183, 213, 0.2);
                    transition: all 0.3s ease;
                    font-weight: 500;
                }

                .blog-post__nav-link:hover {
                    background: linear-gradient(135deg, #FFB7D5, #E8D5F2);
                    color: #5A4A5C;
                    border-color: transparent;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(255, 143, 171, 0.2);
                }

                .blog-post__not-found {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 80vh;
                    gap: 1rem;
                    color: #5A4A5C;
                }

                @media (max-width: 768px) {
                    .blog-post {
                        padding: 2rem 1rem 3rem;
                    }

                    .blog-post__content {
                        padding: 1.5rem;
                    }

                    .blog-post__meta {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }

                    .blog-post__nav {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .blog-post__nav-link {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default BlogPostPage;
