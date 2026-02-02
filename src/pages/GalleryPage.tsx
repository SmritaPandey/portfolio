import ArtGallery from '../components/sections/ArtGallery';
import CursorTrail from '../components/effects/CursorTrail';
import Header from '../components/layout/Header';

const GalleryPage = () => {
    return (
        <div className="gallery-page">
            <CursorTrail />

            {/* Shared Header */}
            <Header variant="dark" />

            <main>
                <ArtGallery />
            </main>

            {/* Footer */}
            <footer className="gallery-footer">
                <div className="container">
                    <p className="text-meta">© 2026 Smrita Pandey. All artworks are original creations.</p>
                </div>
            </footer>

            <style>{`
                .gallery-page {
                    min-height: 100vh;
                    background: var(--bg-void);
                }

                .gallery-page main {
                    padding-top: 80px;
                }

                .gallery-footer {
                    padding: var(--space-2xl);
                    border-top: 1px solid var(--glass-border);
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

export default GalleryPage;
