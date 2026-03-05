import { motion } from 'framer-motion';
import { useMagneticCursor } from '../hooks/useMagneticCursor';

export default function CustomCursor() {
    const { x, y, isHovered } = useMagneticCursor();

    return (
        <motion.div
            style={{
                translateX: x,
                translateY: y,
            }}
            className={`hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none -ml-3 -mt-3 rounded-full mix-blend-difference transition-all duration-300 ease-out
        ${isHovered
                    ? 'w-16 h-16 bg-transparent border border-white mix-blend-normal'
                    : 'w-4 h-4 bg-white/80 backdrop-blur-sm'
                }
      `}
        />
    );
}
