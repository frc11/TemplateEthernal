import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Philosophy() {
    const { ref: containerRef, isInView } = useScrollAnimation();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, -80]);

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants: Variants = {
        hidden: {
            y: 20,
            opacity: 0,
            filter: "blur(5px)"
        },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1]
            }
        }
    };

    const text = "At The Ethereal, we believe true luxury lies in the absence of rush. We curate moments of stillness, allowing you to reconnect with the rhythm of nature. Every detail is a whisper, every space a sanctuary designed for the soul to breathe.";

    return (
        <section ref={containerRef} className="relative w-full py-48 md:py-64 px-6 flex items-center justify-center overflow-hidden">

            <div className="max-w-3xl w-full relative z-10 text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.h2 variants={itemVariants} className="text-xs uppercase tracking-[0.2em] mb-8 text-charcoal/60">
                        Our Philosophy
                    </motion.h2>

                    <p className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
                        {text.split(" ").map((word, i) => (
                            <motion.span key={i} variants={itemVariants} className="inline-block mr-[0.25em]">
                                {word}
                            </motion.span>
                        ))}
                    </p>
                </motion.div>
            </div>

            {/* Scattered Parallax Images Group */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Image 1 (Original - Right Mid) */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute right-[5%] top-[15%] w-48 h-64 md:w-64 md:h-80 opacity-40 md:opacity-100 hidden md:block"
                >
                    <img
                        src="https://images.pexels.com/photos/1703666/pexels-photo-1703666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Abstract Nature"
                        className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 pointer-events-auto"
                    />
                </motion.div>

                {/* Image 2 (Left Bottom) */}
                <motion.div
                    style={{ y: y2 }}
                    className="absolute left-[8%] top-[60%] w-40 h-56 md:w-56 md:h-72 opacity-30 md:opacity-80 hidden md:block"
                >
                    <img
                        src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Resort Detail"
                        className="w-full h-full object-cover rounded-2xl grayscale md:hover:grayscale-0 transition-all duration-700 pointer-events-auto shadow-2xl"
                    />
                </motion.div>

                {/* Image 3 (Left Top) */}
                <motion.div
                    style={{ y: y3 }}
                    className="absolute left-[12%] top-[10%] w-32 h-40 md:w-48 md:h-56 opacity-20 md:opacity-60 hidden xl:block"
                >
                    <img
                        src="https://images.pexels.com/photos/3315291/pexels-photo-3315291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Nature Leaves"
                        className="w-full h-full object-cover rounded-2xl grayscale md:hover:grayscale-0 transition-all duration-700 pointer-events-auto shadow-xl"
                    />
                </motion.div>

                {/* Image 4 (Right Bottom) */}
                <motion.div
                    style={{ y: y4 }}
                    className="absolute right-[15%] top-[70%] w-36 h-36 md:w-48 md:h-48 opacity-25 md:opacity-70 hidden lg:block"
                >
                    <img
                        src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80"
                        alt="Spa Candles"
                        className="w-full h-full object-cover rounded-2xl grayscale md:hover:grayscale-0 transition-all duration-700 pointer-events-auto shadow-lg"
                    />
                </motion.div>
            </div>

        </section>
    );
}
