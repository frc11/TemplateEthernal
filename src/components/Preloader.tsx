import { motion } from 'framer-motion';

export default function Preloader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.8 } }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
            {/* Left Curtain */}
            <motion.div
                initial={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                className="absolute top-0 left-0 w-1/2 h-full bg-[#E3E0D6]"
            />

            {/* Right Curtain */}
            <motion.div
                initial={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                className="absolute top-0 right-0 w-1/2 h-full bg-[#E3E0D6]"
            />

            {/* Logo Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.5 } }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center gap-4 text-charcoal"
            >
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Simple Geometric Logo Placeholder */}
                    <div className="w-16 h-16 border-2 border-charcoal transform rotate-45 flex items-center justify-center">
                        <div className="w-8 h-8 bg-charcoal transform rotate-45" />
                    </div>
                </motion.div>

                <motion.h1
                    className="font-serif text-2xl tracking-[0.3em] uppercase mt-4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    Ethernal
                </motion.h1>
            </motion.div>

        </motion.div>
    );
}
