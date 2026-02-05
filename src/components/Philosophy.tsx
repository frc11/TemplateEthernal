import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, Variants } from 'framer-motion';

export default function Philosophy() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]); // Parallax effect

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
        <section ref={containerRef} className="relative w-full py-32 px-6 flex items-center justify-center overflow-hidden">

            <div className="max-w-3xl w-full relative z-10 text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.h2 variants={itemVariants} className="text-xs uppercase tracking-[0.2em] mb-8 text-charcoal/60">
                        Our Philosophy
                    </motion.h2>

                    <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
                        {text.split(" ").map((word, i) => (
                            <motion.span key={i} variants={itemVariants} className="inline-block mr-[0.25em]">
                                {word}
                            </motion.span>
                        ))}
                    </h3>
                </motion.div>
            </div>

            {/* Parallax Image */}
            <motion.div
                style={{ y }}
                className="absolute right-[5%] top-[20%] w-48 h-64 md:w-64 md:h-80 opacity-20 md:opacity-100 hidden md:block"
            >
                <img
                    src="https://images.pexels.com/photos/1703666/pexels-photo-1703666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Abstract Nature"
                    className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
            </motion.div>

        </section>
    );
}
