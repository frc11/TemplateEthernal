import { motion } from 'framer-motion';
import BookingWidget from './BookingWidget';

export default function Hero() {
    return (
        <section className="h-screen w-full flex items-center justify-center bg-cream relative overflow-hidden">

            {/* Video Container with Scale-up Effect */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0, borderRadius: "5rem" }}
                animate={{ scale: 1, opacity: 1, borderRadius: "3rem" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // Custom ease for "Slow Web" feel
                className="relative w-[80%] h-[80%] overflow-hidden shadow-2xl"
            >
                <div className="absolute inset-0 bg-charcoal/20 z-10" /> {/* Subtle Overlay */}

                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="https://videos.pexels.com/video-files/3205625/3205625-hd_1920_1080_25fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </motion.div>

            {/* Typography Overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    className="font-serif text-cream text-[8vw] md:text-[10vw] leading-none tracking-tighter text-center mix-blend-overlay"
                >
                    THE ETHEREAL
                </motion.h1>
            </div>

            <BookingWidget />

        </section>
    );
}
