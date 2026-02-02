import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingExperience from '../components/LoadingExperience';
import CursorTrail from '../components/effects/CursorTrail';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import AnimeDashboard from '../components/sections/AnimeDashboard';
import ContactSignal from '../components/sections/ContactSignal';

const LandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    // Handle hash-based scroll navigation (e.g., from /#projects)
    useEffect(() => {
        if (!isLoading && location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                // Small delay to ensure DOM is ready
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [isLoading, location.hash]);

    return (
        <>
            {isLoading && (
                <LoadingExperience onComplete={() => setIsLoading(false)} />
            )}
            <CursorTrail />
            <Header variant="dark" />
            <main className={isLoading ? 'hidden' : ''}>
                <Hero />
                <AnimeDashboard />
                <ContactSignal />
                <Footer />
            </main>

            <style>{`
                .hidden {
                    opacity: 0;
                    visibility: hidden;
                }
            `}</style>
        </>
    );
};

export default LandingPage;
