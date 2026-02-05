import { motion } from 'framer-motion';
import MenuSection from '../components/dining/MenuSection';
import ChefHighlight from '../components/dining/ChefHighlight';
import ReservationCTA from '../components/dining/ReservationCTA';
import NoiseOverlay from '../components/NoiseOverlay';

export default function DiningPage() {
    return (
        <div className="bg-cream min-h-screen cursor-none">
            <NoiseOverlay />

            {/* Cinematic Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover brightness-50 contrast-125"
                    >
                        <source src="https://videos.pexels.com/video-files/4039151/4039151-hd_1920_1080_25fps.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/60" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-[10px] uppercase tracking-[0.8em] text-cream/60 mb-8 block"
                    >
                        The Art of Flavor
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="font-serif text-6xl md:text-9xl text-cream tracking-tighter leading-none"
                    >
                        Culinary <br /> Artistry.
                    </motion.h1>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                >
                    <span className="text-[8px] uppercase tracking-[0.4em] text-cream/40">Discover Menus</span>
                    <div className="w-px h-12 bg-gradient-to-b from-cream/40 to-transparent" />
                </motion.div>
            </section>

            {/* Interactive Menu Section */}
            <MenuSection />

            {/* Chef Highlight */}
            <ChefHighlight />

            {/* Final Reservation CTA */}
            <ReservationCTA />

        </div>
    );
}

