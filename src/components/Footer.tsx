import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-charcoal text-cream min-h-[90vh] flex flex-col justify-between px-6 md:px-12 py-20 overflow-hidden relative">

            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">

                {/* Navigation Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 font-light text-sm md:text-base text-cream/60">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-cream uppercase tracking-widest mb-2 text-xs">Explore</h4>
                        <a href="#" className="hover:text-cream transition-colors">Villas</a>
                        <a href="#" className="hover:text-cream transition-colors">Dining</a>
                        <a href="#" className="hover:text-cream transition-colors">Wellness</a>
                        <a href="#" className="hover:text-cream transition-colors">Experiences</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-cream uppercase tracking-widest mb-2 text-xs">Company</h4>
                        <a href="#" className="hover:text-cream transition-colors">Our Story</a>
                        <a href="#" className="hover:text-cream transition-colors">Careers</a>
                        <a href="#" className="hover:text-cream transition-colors">Press</a>
                        <a href="#" className="hover:text-cream transition-colors">Sustainability</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-cream uppercase tracking-widest mb-2 text-xs">Social</h4>
                        <a href="#" className="hover:text-cream transition-colors flex items-center gap-2"><Instagram size={16} /> Instagram</a>
                        <a href="#" className="hover:text-cream transition-colors flex items-center gap-2"><Facebook size={16} /> Facebook</a>
                        <a href="#" className="hover:text-cream transition-colors flex items-center gap-2"><Twitter size={16} /> Twitter</a>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="w-full md:max-w-md">
                    <h4 className="text-cream uppercase tracking-widest mb-6 text-xs">Newsletter</h4>
                    <div className="relative group">
                        <input
                            type="email"
                            placeholder="Stay updated"
                            className="w-full bg-transparent border-b border-cream/20 py-4 text-xl text-cream placeholder-cream/30 focus:outline-none focus:border-cream/80 transition-all"
                        />
                        <button className="absolute right-0 bottom-4 text-cream/40 group-hover:text-cream transition-colors group-hover:translate-x-2 duration-300">
                            <ArrowRight size={24} strokeWidth={1} />
                        </button>
                    </div>
                </div>

            </div>

            {/* Giant Typography */}
            <div className="mt-20 md:mt-0">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="font-serif text-[12vw] leading-none text-center md:text-left text-cream tracking-tighter"
                >
                    YOUR ESCAPE <br className="hidden md:block" /> AWAITS.
                </motion.h1>
            </div>

            {/* Copyright */}
            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-cream/30 mt-12 pt-8 border-t border-cream/10">
                <p>&copy; 2026 The Ethereal Resort. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-cream/60 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-cream/60 transition-colors">Terms of Service</a>
                </div>
            </div>

        </footer>
    );
}
