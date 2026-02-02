import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
    Diamond,
    Sparkle,
    Hexagon,
    CircleDashed,
    Star,
    ArrowUpRight,
} from '@phosphor-icons/react';

interface LoadingExperienceProps {
    onComplete: () => void;
    duration?: number;
}

const LoadingExperience = ({ onComplete, duration = 3500 }: LoadingExperienceProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const coreRef = useRef<HTMLDivElement>(null);
    const [currentPhase, setCurrentPhase] = useState(0);
    const [displayText, setDisplayText] = useState('');

    // Dramatic gaming-themed loading phrases
    const loadingPhases = [
        { text: 'Establishing connection to the digital realm...', icon: <Diamond weight="fill" size={20} /> },
        { text: 'Channeling creative energy...', icon: <Sparkle weight="fill" size={20} /> },
        { text: 'Loading portfolio archives...', icon: <Hexagon weight="duotone" size={20} /> },
        { text: 'Preparing your experience...', icon: <CircleDashed weight="bold" size={20} /> },
        { text: 'Welcome, Traveler', icon: <Star weight="fill" size={20} /> },
    ];

    useEffect(() => {
        // Phase-based text animation
        const phaseInterval = setInterval(() => {
            setCurrentPhase(prev => {
                if (prev < loadingPhases.length - 1) {
                    return prev + 1;
                }
                return prev;
            });
        }, duration / loadingPhases.length);

        return () => clearInterval(phaseInterval);
    }, [duration]);

    useEffect(() => {
        // Typewriter effect for current phase
        const currentText = loadingPhases[currentPhase].text;
        let charIndex = 0;
        setDisplayText('');

        const typeInterval = setInterval(() => {
            if (charIndex <= currentText.length) {
                setDisplayText(currentText.slice(0, charIndex));
                charIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 40);

        return () => clearInterval(typeInterval);
    }, [currentPhase]);

    useEffect(() => {
        // Transition out after duration
        const timeout = setTimeout(() => {
            const tl = gsap.timeline({
                onComplete: onComplete,
            });

            tl.to('.loading-text-container', {
                opacity: 0,
                y: -20,
                duration: 0.4,
            })
                .to(coreRef.current, {
                    scale: 80,
                    opacity: 0,
                    duration: 1,
                    ease: 'power4.in',
                }, '-=0.2')
                .to(containerRef.current, {
                    opacity: 0,
                    duration: 0.5,
                }, '-=0.4');
        }, duration);

        return () => clearTimeout(timeout);
    }, [onComplete, duration]);

    // Ring animation
    useEffect(() => {
        gsap.to('.loading-ring', {
            rotation: 360,
            duration: 8,
            ease: 'none',
            repeat: -1,
            stagger: {
                each: 0.5,
                from: 'start',
            },
        });

        gsap.to('.loading-ring-reverse', {
            rotation: -360,
            duration: 6,
            ease: 'none',
            repeat: -1,
        });

        gsap.to('.constellation-dot', {
            opacity: 0.3,
            scale: 1.5,
            duration: 1.5,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
            stagger: {
                each: 0.2,
                from: 'random',
            },
        });
    }, []);

    return (
        <div ref={containerRef} className="loading-experience">
            {/* Cosmic Background */}
            <div className="loading-experience__bg">
                <div className="cosmic-bg-gradient cosmic-bg-gradient--1" />
                <div className="cosmic-bg-gradient cosmic-bg-gradient--2" />
                <div className="star-field-loading" />
            </div>

            {/* Constellation Effect */}
            <div className="constellation-container">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="constellation-dot"
                        style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                        }}
                    />
                ))}
            </div>

            {/* Center portal */}
            <div className="loading-experience__portal">
                <div ref={coreRef} className="loading-experience__core" />
                <div className="loading-ring loading-ring--1" />
                <div className="loading-ring loading-ring--2" />
                <div className="loading-ring-reverse" />

                {/* Element symbols */}
                <div className="element-orbit">
                    {['◈', '✦', '⬡', '◉'].map((symbol, i) => (
                        <span
                            key={i}
                            className="orbit-element"
                            style={{ transform: `rotate(${i * 90}deg) translateY(-80px)` }}
                        >
                            {symbol}
                        </span>
                    ))}
                </div>
            </div>

            {/* Loading Text */}
            <div className="loading-text-container">
                <div className="loading-phase-indicator">
                    {loadingPhases.map((_, i) => (
                        <span
                            key={i}
                            className={`phase-dot ${i <= currentPhase ? 'phase-dot--active' : ''}`}
                        />
                    ))}
                </div>
                <p className="loading-experience__text">
                    <span className="loading-icon">{loadingPhases[currentPhase].icon}</span>
                    <span className="loading-text">{displayText}</span>
                    <span className="loading-experience__cursor">|</span>
                </p>
            </div>

            {/* Progress Bar */}
            <div className="loading-progress">
                <div
                    className="loading-progress__fill"
                    style={{ width: `${((currentPhase + 1) / loadingPhases.length) * 100}%` }}
                />
            </div>

            {/* Skip button */}
            <button
                className="loading-experience__skip"
                onClick={onComplete}
            >
                <ArrowUpRight weight="bold" size={16} className="skip-icon" />
                Skip Intro
            </button>

            <style>{`
                .loading-experience {
                    position: fixed;
                    inset: 0;
                    z-index: 10001;
                    background: #0a0a12;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: var(--space-2xl);
                }

                .loading-experience__bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .cosmic-bg-gradient {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                    opacity: 0.4;
                    animation: cosmicPulse 8s ease-in-out infinite;
                }

                .cosmic-bg-gradient--1 {
                    width: 500px;
                    height: 500px;
                    top: 20%;
                    left: 10%;
                    background: radial-gradient(circle, #ff6b9d 0%, transparent 70%);
                }

                .cosmic-bg-gradient--2 {
                    width: 400px;
                    height: 400px;
                    bottom: 20%;
                    right: 15%;
                    background: radial-gradient(circle, #a855f7 0%, transparent 70%);
                    animation-delay: -4s;
                }

                @keyframes cosmicPulse {
                    0%, 100% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.2); opacity: 0.5; }
                }

                .star-field-loading {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        radial-gradient(2px 2px at 10% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
                        radial-gradient(2px 2px at 30% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                        radial-gradient(1px 1px at 50% 30%, rgba(255, 255, 255, 0.5) 0%, transparent 50%),
                        radial-gradient(2px 2px at 70% 70%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                        radial-gradient(1px 1px at 90% 40%, rgba(255, 255, 255, 0.4) 0%, transparent 50%);
                    animation: twinkleStars 3s ease-in-out infinite;
                }

                @keyframes twinkleStars {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }

                .constellation-container {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                }

                .constellation-dot {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: #22d3ee;
                    border-radius: 50%;
                    box-shadow: 0 0 15px #22d3ee, 0 0 30px rgba(34, 211, 238, 0.5);
                }

                .loading-experience__portal {
                    position: relative;
                    width: 250px;
                    height: 250px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .loading-experience__core {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    background: radial-gradient(circle, #ff6b9d 0%, #a855f7 50%, #22d3ee 100%);
                    border-radius: 50%;
                    box-shadow: 
                        0 0 40px #ff6b9d,
                        0 0 80px #a855f7,
                        0 0 120px rgba(34, 211, 238, 0.4);
                    animation: corePulse 2s ease-in-out infinite;
                }

                @keyframes corePulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 40px #ff6b9d, 0 0 80px #a855f7; }
                    50% { transform: scale(1.1); box-shadow: 0 0 60px #ff6b9d, 0 0 100px #a855f7, 0 0 140px #22d3ee; }
                }

                .loading-ring {
                    position: absolute;
                    border-radius: 50%;
                    border: 2px solid transparent;
                }

                .loading-ring--1 {
                    width: 120px;
                    height: 120px;
                    border-top-color: #ff6b9d;
                    border-right-color: #a855f7;
                    box-shadow: 0 0 20px rgba(255, 107, 157, 0.3);
                }

                .loading-ring--2 {
                    width: 160px;
                    height: 160px;
                    border-bottom-color: #a855f7;
                    border-left-color: #22d3ee;
                    box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
                }

                .loading-ring-reverse {
                    position: absolute;
                    width: 200px;
                    height: 200px;
                    border: 1px solid rgba(34, 211, 238, 0.3);
                    border-radius: 50%;
                    border-top-color: #22d3ee;
                }

                .element-orbit {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    animation: orbitSpin 12s linear infinite;
                }

                @keyframes orbitSpin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .orbit-element {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    font-size: 1.2rem;
                    color: #a855f7;
                    text-shadow: 0 0 10px #a855f7;
                    transform-origin: 0 0;
                }

                .loading-text-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                    z-index: 1;
                }

                .loading-phase-indicator {
                    display: flex;
                    gap: 8px;
                }

                .phase-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: rgba(168, 85, 247, 0.3);
                    transition: all 0.3s ease;
                }

                .phase-dot--active {
                    background: linear-gradient(135deg, #ff6b9d, #a855f7);
                    box-shadow: 0 0 10px #ff6b9d;
                }

                .loading-experience__text {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: #c4b5fd;
                    font-size: 1rem;
                    letter-spacing: 0.1em;
                    min-height: 24px;
                }

                .loading-icon {
                    font-size: 1.2rem;
                    color: #ff6b9d;
                    text-shadow: 0 0 10px #ff6b9d;
                    animation: iconPulse 1.5s ease-in-out infinite;
                }

                @keyframes iconPulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.7; }
                }

                .loading-text {
                    text-transform: uppercase;
                    font-weight: 500;
                }

                .loading-experience__cursor {
                    animation: blink 0.6s infinite;
                    color: #22d3ee;
                }

                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }

                .loading-progress {
                    position: absolute;
                    bottom: 100px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 200px;
                    height: 4px;
                    background: rgba(168, 85, 247, 0.2);
                    border-radius: 2px;
                    overflow: hidden;
                }

                .loading-progress__fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ff6b9d, #a855f7, #22d3ee);
                    border-radius: 2px;
                    transition: width 0.4s ease;
                    box-shadow: 0 0 10px #ff6b9d;
                }

                .loading-experience__skip {
                    position: absolute;
                    bottom: var(--space-2xl);
                    right: var(--space-2xl);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(168, 85, 247, 0.1);
                    border: 1px solid rgba(168, 85, 247, 0.3);
                    border-radius: 20px;
                    padding: 10px 20px;
                    color: #c4b5fd;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .loading-experience__skip:hover {
                    background: rgba(168, 85, 247, 0.2);
                    border-color: #a855f7;
                    color: white;
                    box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
                }

                .skip-icon {
                    font-size: 1rem;
                    transition: transform 0.3s ease;
                }

                .loading-experience__skip:hover .skip-icon {
                    transform: translate(2px, -2px);
                }

                @media (prefers-reduced-motion: reduce) {
                    .loading-ring,
                    .loading-ring-reverse,
                    .element-orbit,
                    .constellation-dot,
                    .cosmic-bg-gradient {
                        animation: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default LoadingExperience;
