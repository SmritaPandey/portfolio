import type { ReactNode } from 'react';

interface GlitchTextProps {
    children: ReactNode;
    className?: string;
    active?: boolean;
}

const GlitchText = ({
    children,
    className = '',
    active = true,
}: GlitchTextProps) => {
    const text = typeof children === 'string' ? children : '';

    return (
        <span
            className={`glitch-wrapper ${active ? 'glitch-active' : ''} ${className}`}
            data-text={text}
        >
            <span className="glitch-text" data-text={text}>
                {children}
            </span>

            <style>{`
                .glitch-wrapper {
                    position: relative;
                    display: inline-block;
                }

                .glitch-active .glitch-text {
                    position: relative;
                }

                .glitch-active .glitch-text::before,
                .glitch-active .glitch-text::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    pointer-events: none;
                }

                .glitch-active:hover .glitch-text::before {
                    color: var(--accent-cyan);
                    animation: glitch-1 0.2s infinite linear;
                    opacity: 0.8;
                    left: -2px;
                }

                .glitch-active:hover .glitch-text::after {
                    color: var(--accent-magenta);
                    animation: glitch-2 0.2s infinite linear;
                    opacity: 0.8;
                    left: 2px;
                }

                @keyframes glitch-1 {
                    0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); }
                    25% { clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%); }
                    50% { clip-path: polygon(0 20%, 100% 20%, 100% 80%, 0 80%); }
                    75% { clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%); }
                }

                @keyframes glitch-2 {
                    0%, 100% { clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%); }
                    25% { clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); }
                    50% { clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%); }
                    75% { clip-path: polygon(0 45%, 100% 45%, 100% 75%, 0 75%); }
                }
            `}</style>
        </span>
    );
};

export default GlitchText;
