import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SmartImage from '../ui/SmartImage';

export default function SensoryGallery() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yCenter = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const ySide = useTransform(scrollYProgress, [0, 1], [0, 150]);

    const images = [
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80", // Massage Therapy
        "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80", // Spa Products / Towels
        "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80"  // Zen / Stones
    ];

    return (
        <section ref={containerRef} className="py-32 px-6 bg-stone-50 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

                {/* Side Image 1 */}
                <motion.div style={{ y: ySide }} className="aspect-[3/4] rounded-sm overflow-hidden shadow-xl">
                    <SmartImage
                        src={images[0]}
                        alt="Heated Stones Ritual"
                        className="w-full h-full object-cover scale-110"
                        containerClassName="w-full h-full"
                    />
                </motion.div>

                {/* Center Image (Faster) */}
                <motion.div style={{ y: yCenter }} className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl z-10 md:-mt-20">
                    <SmartImage
                        src={images[1]}
                        alt="Essential Oils Extraction"
                        className="w-full h-full object-cover scale-110"
                        containerClassName="w-full h-full"
                    />
                </motion.div>

                {/* Side Image 2 */}
                <motion.div style={{ y: ySide }} className="aspect-[3/4] rounded-sm overflow-hidden shadow-xl">
                    <SmartImage
                        src={images[2]}
                        alt="Linen & Purity"
                        className="w-full h-full object-cover scale-110"
                        containerClassName="w-full h-full"
                    />
                </motion.div>

            </div>

            <div className="mt-32 text-center space-y-6 max-w-2xl mx-auto">
                <span className="text-[10px] uppercase tracking-[0.5em] text-charcoal/30">The Sensory Edge</span>
                <p className="font-serif text-2xl md:text-3xl italic text-charcoal/70">
                    "Silence is not the absence of sound, but the presence of focus. Every texture here is curated to quiet the mind."
                </p>
            </div>
        </section>
    );
}
