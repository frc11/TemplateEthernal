import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        quote: "A place where time dissolves into the horizon. I found myself in the silence.",
        author: "Elena V., Architect"
    },
    {
        id: 2,
        quote: "The Ethereal isn't just a hotel; it is a return to a rhythm we have long forgotten.",
        author: "James C., Writer"
    },
    {
        id: 3,
        quote: "Every detail whispers of nature. A sanctuary for the weary soul.",
        author: "Sarah L., Artist"
    }
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">

            {/* Dark Blurred Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Atmospheric Background"
                    className="w-full h-full object-cover blur-xl brightness-50 scale-110"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 max-w-5xl px-12 md:px-24 w-full flex items-center justify-between">

                {/* Navigation Left */}
                <button onClick={prev} className="p-4 text-cream/50 hover:text-cream transition-colors group">
                    <ArrowLeft strokeWidth={0.5} size={48} className="group-hover:-translate-x-2 transition-transform duration-500" />
                </button>

                {/* Quote Container */}
                <div className="flex-1 text-center min-h-[300px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            <p className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-cream leading-tight mb-12">
                                "{testimonials[current].quote}"
                            </p>
                            <p className="text-sm uppercase tracking-[0.2em] text-cream/60">
                                — {testimonials[current].author}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Right */}
                <button onClick={next} className="p-4 text-cream/50 hover:text-cream transition-colors group">
                    <ArrowRight strokeWidth={0.5} size={48} className="group-hover:translate-x-2 transition-transform duration-500" />
                </button>

            </div>

        </section>
    );
}
