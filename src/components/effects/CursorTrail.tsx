import { useEffect, useRef, useState } from 'react';

interface TrailPoint {
    x: number;
    y: number;
    opacity: number;
}

const CursorTrail = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [trail, setTrail] = useState<TrailPoint[]>([]);
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    useEffect(() => {
        const updateTrail = () => {
            setTrail((prev) => {
                const newTrail = [
                    { x: mousePos.x, y: mousePos.y, opacity: 1 },
                    ...prev.slice(0, 5).map((point) => ({
                        ...point,
                        opacity: point.opacity * 0.85,
                    })),
                ].filter((point) => point.opacity > 0.1);
                return newTrail;
            });
            requestRef.current = requestAnimationFrame(updateTrail);
        };

        requestRef.current = requestAnimationFrame(updateTrail);

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [mousePos]);

    // Don't render on mobile/touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <>
            {/* Cursor dot */}
            <div
                className="cursor-dot"
                style={{
                    left: mousePos.x - 4,
                    top: mousePos.y - 4,
                    opacity: isVisible ? 1 : 0,
                }}
            />

            {/* Trail particles */}
            {trail.map((point, index) => (
                <div
                    key={index}
                    className="cursor-trail"
                    style={{
                        left: point.x - 10,
                        top: point.y - 10,
                        opacity: point.opacity * 0.5,
                        background: `radial-gradient(circle, rgba(0, 255, 247, ${point.opacity * 0.3}) 0%, transparent 70%)`,
                        transform: `scale(${0.5 + point.opacity * 0.5})`,
                    }}
                />
            ))}

            <style>{`
                /* Hide default cursor on desktop */
                @media (hover: hover) and (pointer: fine) {
                    body {
                        cursor: none;
                    }

                    a, button, [role="button"] {
                        cursor: none;
                    }
                }
            `}</style>
        </>
    );
};

export default CursorTrail;
