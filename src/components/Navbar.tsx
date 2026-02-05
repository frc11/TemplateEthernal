import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const currentScrollY = latest;
        // Show if scrolling up or at the very top
        if (currentScrollY < lastScrollY || currentScrollY < 50) {
            setIsVisible(true);
        } else if (currentScrollY > 50 && currentScrollY > lastScrollY) {
            // Hide if scrolling down and past initial threshold
            setIsVisible(false);
        }
        setLastScrollY(currentScrollY);
    });

    return (
        <AnimatePresence mode="wait">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: isVisible ? 0 : -100,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }} // Slow Web principle
                className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
            >
                <div className="pointer-events-auto flex items-center justify-between px-2 py-2 pl-6 bg-cream/70 backdrop-blur-md border border-sand/50 rounded-full shadow-sm w-fit gap-12">

                    {/* Navigation Links */}
                    <div className="flex items-center gap-8 text-sm font-medium text-charcoal/80">
                        {['Stay', 'Dining', 'Wellness'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="hover:text-charcoal transition-colors duration-300"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Logo */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="font-serif text-xl tracking-wide text-charcoal">THE ETHEREAL</span>
                    </div>

                    {/* CTA Button */}
                    <button className="bg-charcoal text-cream px-6 py-2.5 rounded-full text-xs font-medium tracking-wide hover:bg-charcoal/90 transition-colors duration-300">
                        Book Your Stay
                    </button>

                </div>
            </motion.nav>
        </AnimatePresence>
    );
}
