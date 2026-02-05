import { useState, useEffect, useRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface SmartImageProps extends HTMLMotionProps<"img"> {
    containerClassName?: string;
}

export default function SmartImage({ src, alt, className, containerClassName, ...props }: SmartImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (imgRef.current?.complete) {
            setIsLoaded(true);
        }
    }, []);

    return (
        <div className={`relative overflow-hidden ${containerClassName || ''}`}>
            {/* Placeholder */}
            <div
                className={`absolute inset-0 bg-stone-200 transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Image */}
            <motion.img
                ref={imgRef}
                src={src}
                alt={alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                onLoad={() => setIsLoaded(true)}
                className={`block w-full h-full object-cover ${className || ''}`}
                {...props}
            />
        </div>
    );
}
