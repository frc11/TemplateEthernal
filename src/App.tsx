import { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import SEO from './components/SEO';
import SectionLoader from './components/SectionLoader';
import ScrollToTop from './components/ScrollToTop';
import { BookingProvider } from './context/BookingContext';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const Rooms = lazy(() => import('./pages/RoomsIndex'));
const DiningPage = lazy(() => import('./pages/DiningPage'));
const Wellness = lazy(() => import('./pages/Wellness'));
const Contact = lazy(() => import('./pages/Contact'));
const RoomDetail = lazy(() => import('./pages/RoomDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(true); // Keep it true initially for first load
            setIsLoading(false);
        }, 2500);

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            clearTimeout(timer);
        }
    }, []);

    return (
        <BookingProvider>
            <main className="min-h-screen w-full relative bg-cream cursor-none">
                <ScrollToTop />
                <SEO />
                <CustomCursor />
                <NoiseOverlay />

                <AnimatePresence mode='wait'>
                    {isLoading && <Preloader key="preloader" />}
                </AnimatePresence>

                <Navbar />

                <Routes>
                    <Route path="/" element={<Suspense fallback={<SectionLoader />}><Home /></Suspense>} />
                    <Route path="/rooms" element={<Suspense fallback={<SectionLoader />}><Rooms /></Suspense>} />
                    <Route path="/dining" element={<Suspense fallback={<SectionLoader />}><DiningPage /></Suspense>} />
                    <Route path="/wellness" element={<Suspense fallback={<SectionLoader />}><Wellness /></Suspense>} />
                    <Route path="/contact" element={<Suspense fallback={<SectionLoader />}><Contact /></Suspense>} />
                    <Route path="/rooms/:id" element={<Suspense fallback={<SectionLoader />}><RoomDetail /></Suspense>} />
                    <Route path="/checkout" element={<Suspense fallback={<SectionLoader />}><Checkout /></Suspense>} />
                </Routes>

                {location.pathname !== '/checkout' && (
                    <Suspense fallback={null}>
                        <Footer />
                    </Suspense>
                )}

            </main>
        </BookingProvider>
    )
}

export default App
