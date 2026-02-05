import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookingWidget from './BookingWidget';

export default function Hero() {
    const [shouldLoadVideo, setShouldLoadVideo] = useState(true);

    useEffect(() => {
        // Check for Data Saver preference
        const connection = (navigator as any).connection;
        const isSaveData = connection?.saveData === true;

        // Check for Mobile (simple UA check)
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isSaveData || isMobile) {
            setShouldLoadVideo(false);
        }
    }, []);

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
                    poster="https://images.pexels.com/photos/2416075/pexels-photo-2416075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    className="w-full h-full object-cover"
                >
                    {shouldLoadVideo && (
                        <source src="https://videos.pexels.com/video-files/3205625/3205625-hd_1920_1080_25fps.mp4" type="video/mp4" />
                    )}
                    Your browser does not support the video tag.
                </video>
            </motion.div>

            {/* Typography Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
                <div className="max-w-6xl pointer-events-none">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="font-serif text-cream text-[10vw] md:text-[8vw] lg:text-[7vw] leading-[0.85] tracking-tighter mix-blend-overlay mb-4"
                    >
                        THE <br /> ETHEREAL
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.6 }}
                        className="text-white/60 text-xs md:text-sm uppercase tracking-[0.4em] font-light max-w-sm mx-auto"
                    >
                        Sanctuaries of silence in the heart of nature
                    </motion.p>
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                    className="pointer-events-auto mt-12"
                >
                    <Link
                        to="/rooms"
                        className="px-12 py-5 bg-cream text-charcoal rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
                    >
                        Book Your Stay
                    </Link>
                </motion.div>
            </div>

            <BookingWidget />

        </section>
    );
}
