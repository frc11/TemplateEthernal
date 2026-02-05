import { useRef } from 'react';
import { useInView, UseInViewOptions } from 'framer-motion';

export function useScrollAnimation(options?: UseInViewOptions) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        margin: "-10%",
        ...options
    });

    return { ref, isInView };
}
