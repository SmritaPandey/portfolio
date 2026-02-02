import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, Star, Heart, Sparkle } from '@phosphor-icons/react';
import Header from '../components/layout/Header';

// Sample post content - will be replaced by CMS/markdown
const postsContent: Record<string, { title: string; date: string; readTime: string; content: string; tags: string[] }> = {
    'building-ai-systems-at-scale': {
        title: 'Building AI Systems at Scale',
        date: '2026-01-28',
        readTime: '5 min',
        tags: ['AI', 'Engineering'],
        content: `
# Building AI Systems at Scale

## Introduction

When deploying machine learning models in production environments, the challenges extend far beyond model accuracy. In this post, I'll share lessons learned from building and scaling AI systems that serve millions of users.

## Key Considerations

### 1. Infrastructure

The foundation of any scalable AI system is robust infrastructure. This includes:

- **Model serving**: Using optimized inference servers
- **Auto-scaling**: Dynamic resource allocation based on demand
- **Monitoring**: Real-time performance metrics and alerting

### 2. Data Pipeline

A reliable data pipeline is crucial:

\`\`\`python
def process_data(raw_data):
    # Clean and validate
    cleaned = validate_schema(raw_data)
    
    # Feature engineering
    features = extract_features(cleaned)
    
    return features
\`\`\`

### 3. Model Versioning

Always version your models and maintain rollback capabilities.

## Conclusion

Building AI at scale is as much about engineering as it is about data science. The best models are useless without proper infrastructure.

---

*Thanks for reading! Feel free to reach out if you have questions.*
        `,
    },
    'the-art-of-system-design': {
        title: 'The Art of System Design',
        date: '2026-01-15',
        readTime: '8 min',
        tags: ['Architecture', 'Tech'],
        content: `
# The Art of System Design

## Thinking About Scale

System design is both an art and a science. When building systems that serve millions of users, every decision matters.

## Core Principles

### Start Simple

Don't over-engineer from day one. Start with a simple architecture and evolve as needed.

### Plan for Failure

Everything fails eventually. Design your systems to be resilient.

### Measure Everything

What you can't measure, you can't improve.

## Common Patterns

- **Microservices**: Breaking down monoliths
- **Event-driven**: Decoupling through events
- **CQRS**: Separating reads from writes

*More on this topic coming soon...*
        `,
    },
    'from-developer-to-founder': {
        title: 'From Developer to Founder',
        date: '2026-01-05',
        readTime: '6 min',
        tags: ['Startup', 'Personal'],
        content: `
# From Developer to Founder

## The Journey

My path from writing code to building companies wasn't planned. It evolved naturally from solving problems I cared about.

## What Changed

As a developer, I focused on building great products. As a founder, I had to think about:

- Vision and strategy
- Team building
- Business development
- Customer relationships

## Lessons Learned

1. **Code is just one part** - The best product doesn't always win
2. **People matter most** - Your team makes or breaks you
3. **Stay technical** - Don't lose touch with the craft

## What's Next

I'm still learning every day. The journey continues...

*Share your own stories with me!*
        `,
    },
};

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const contentRef = useRef<HTMLDivElement>(null);

    const post = slug ? postsContent[slug] : null;

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
                    __html: post.content
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
            </article>

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

                .blog-post {
                    max-width: 720px;
                    margin: 0 auto;
                    padding: 3rem 2rem 5rem;
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
                    transition: color 0.3s ease;
                }

                .blog-post__back:hover {
                    color: #FF6B9D;
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
                }

                .blog-post__content {
                    font-size: 1.125rem;
                    line-height: 1.8;
                    color: #5A4A5C;
                }

                .blog-post__content h1 {
                    font-size: 2rem;
                    margin: 2rem 0 1rem;
                    color: #5A4A5C;
                }

                .blog-post__content h2 {
                    font-size: 1.5rem;
                    margin: 2rem 0 1rem;
                    color: #5A4A5C;
                }

                .blog-post__content h3 {
                    font-size: 1.25rem;
                    margin: 1.5rem 0 0.75rem;
                    color: #5A4A5C;
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
                }

                .blog-post__content code {
                    font-family: var(--font-mono);
                    font-size: 0.9em;
                    background: rgba(255, 183, 213, 0.2);
                    padding: 0.2rem 0.4rem;
                    border-radius: 4px;
                }

                .blog-post__content pre {
                    background: #2a2a3a;
                    padding: 1.5rem;
                    border-radius: 12px;
                    overflow-x: auto;
                    margin: 1.5rem 0;
                }

                .blog-post__content pre code {
                    background: none;
                    padding: 0;
                    color: #e0e0e0;
                }

                .blog-post__content hr {
                    border: none;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #FFB7D5, transparent);
                    margin: 2rem 0;
                }

                .blog-post__content strong {
                    font-weight: 600;
                    color: #FF8FAB;
                }

                .blog-post__content em {
                    font-style: italic;
                    color: #8B7A8D;
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
                        padding: 2rem 1rem 4rem;
                    }

                    .blog-post__meta {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default BlogPostPage;
