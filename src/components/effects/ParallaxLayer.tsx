import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
    children: ReactNode;
    speed?: number;
    direction?: 'vertical' | 'horizontal';
    className?: string;
}

const ParallaxLayer = ({
    children,
    speed = 0.5,
    direction = 'vertical',
    className = '',
}: ParallaxLayerProps) => {
    const layerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const layer = layerRef.current;
        if (!layer) return;

        const movement = direction === 'vertical' ? 'y' : 'x';
        const distance = 100 * speed;

        const ctx = gsap.context(() => {
            gsap.to(layer, {
                [movement]: distance,
                ease: 'none',
                scrollTrigger: {
                    trigger: layer.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, layer);

        return () => ctx.revert();
    }, [speed, direction]);

    return (
        <div ref={layerRef} className={`parallax-layer ${className}`}>
            {children}
        </div>
    );
};

export default ParallaxLayer;
