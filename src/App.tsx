import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import RoomShowcase from './components/RoomShowcase';
import Services from './components/Services';
import PoolOasis from './components/PoolOasis';
import Dining from './components/Dining';
import SpaSection from './components/SpaSection';
import CustomMap from './components/CustomMap';
import Testimonials from './components/Testimonials';
import Concierge from './components/Concierge';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        const lenis = new Lenis({
            duration: 2.0, // Increased for "heavier" feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8, // Slightly reduced to give "weight"
            touchMultiplier: 2,
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
        <main className="min-h-screen w-full relative bg-cream cursor-none">
            <CustomCursor />
            <NoiseOverlay />

            <AnimatePresence mode='wait'>
                {isLoading && <Preloader key="preloader" />}
            </AnimatePresence>

            <Navbar />

            <Hero />

            <Philosophy />

            <RoomShowcase />

            <Services />

            <PoolOasis />

            <Dining />

            <SpaSection />

            <CustomMap />

            <Testimonials />

            <Footer />

            <Concierge />
        </main>
    )
}

export default App
