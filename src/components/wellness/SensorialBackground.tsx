import { motion } from 'framer-motion';

export default function SensorialBackground() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
            {/* Soft Stone Gradients */}
            <div className="absolute inset-0 bg-stone-50" />

            {/* Animated Blobs */}
            <motion.div
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -50, 50, 0],
                    scale: [1, 1.2, 0.9, 1],
                    rotate: [0, 90, -90, 0]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full bg-blue-100/30 blur-[120px]"
            />

            <motion.div
                animate={{
                    x: [0, -80, 40, 0],
                    y: [0, 100, -60, 0],
                    scale: [1, 0.8, 1.1, 1],
                    rotate: [0, -120, 120, 0]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full bg-rose-50/40 blur-[100px]"
            />

            <motion.div
                animate={{
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-white via-transparent to-transparent"
            />
        </div>
    );
}
