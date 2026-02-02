import { useRef, useEffect } from 'react';

interface MaskedTextProps {
    text: string;
    background: string;
    isVideo?: boolean;
    className?: string;
}

const MaskedText = ({
    text,
    background,
    isVideo = false,
    className = '',
}: MaskedTextProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isVideo && videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay blocked, silent fail
            });
        }
    }, [isVideo]);

    if (isVideo) {
        return (
            <div ref={containerRef} className={`masked-text-container ${className}`}>
                <video
                    ref={videoRef}
                    className="masked-text__video"
                    src={background}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <span className="masked-text__text">{text}</span>

                <style>{`
                    .masked-text-container {
                        position: relative;
                        display: inline-block;
                        overflow: hidden;
                    }

                    .masked-text__video {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        z-index: 0;
                    }

                    .masked-text__text {
                        position: relative;
                        z-index: 1;
                        background: inherit;
                        background-clip: text;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        mix-blend-mode: normal;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <span
            className={`text-masked ${className}`}
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            {text}
        </span>
    );
};

export default MaskedText;
