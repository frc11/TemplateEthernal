import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const location = useLocation();

    // Excluimos explícitamente el overlay de checkout de tener transición de página completa
    // para que TheCheckout se anime por su cuenta sobre la página anterior
    if (location.pathname === '/checkout') {
        return <>{children}</>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // smooth ease-out (framer-motion)
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
}
