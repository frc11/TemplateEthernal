import { motion } from 'framer-motion';
import SmartImage from '../ui/SmartImage';

export default function ChefHighlight() {
    return (
        <section className="py-32 px-6 bg-[#1a1a1a] text-cream">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-32">

                {/* Left: Chef Portrait */}
                <div className="w-full md:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="relative aspect-[4/5] overflow-hidden rounded-sm"
                    >
                        <SmartImage
                            src="https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Executive Chef Julian Vane"
                            className="transition-transform duration-[3s] hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-charcoal/10 mix-blend-multiply" />
                    </motion.div>
                </div>

                {/* Right: Philosophy & Signature */}
                <div className="w-full md:w-1/2 space-y-12">
                    <div className="space-y-6">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-cream/40">The Visionary</span>
                        <h2 className="font-serif text-5xl md:text-7xl leading-tight">Mastering <br /> the Element.</h2>
                    </div>

                    <p className="font-serif text-xl md:text-2xl text-cream/70 leading-relaxed italic border-l-2 border-cream/10 pl-8">
                        "In every grain of salt, there is a memory of the ocean. My mission is not to transform ingredients, but to reveal their true essence through fire, air, and intent."
                    </p>

                    <div className="pt-8 flex flex-col gap-2">
                        <p className="text-sm font-light tracking-widest text-cream/40 italic">Julian Vane, Executive Chef</p>
                        {/* Stylized SVG Signature */}
                        <motion.svg
                            width="200"
                            height="80"
                            viewBox="0 0 200 80"
                            className="text-cream/80 opacity-60"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                        >
                            <path
                                d="M20 40 C 40 10, 80 10, 100 40 S 140 70, 180 40 Q 190 35, 170 30 Q 150 25, 160 50 Q 170 75, 190 60"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </motion.svg>
                    </div>
                </div>

            </div>
        </section>
    );
}
