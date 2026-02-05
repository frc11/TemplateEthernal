import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Send } from 'lucide-react';

export default function Concierge() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Trigger Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group flex items-center gap-3 bg-cream border border-sand px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="font-serif text-charcoal tracking-wide">Concierge</span>
                    <div className="relative">
                        <Bell size={18} strokeWidth={1.5} className="text-charcoal/80 group-hover:text-charcoal transition-colors" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    </div>
                </motion.button>
            </div>

            {/* Invitation Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                        className="fixed bottom-24 right-8 z-50 w-full max-w-sm origin-bottom-right"
                    >
                        <div className="bg-[#FDFDFB] border border-[#E3E0D6] p-8 rounded-sm shadow-2xl relative overflow-hidden">

                            {/* Texture Overlay for Paper Feel */}
                            <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal transition-colors z-20"
                            >
                                <X size={20} strokeWidth={1} />
                            </button>

                            <div className="relative z-10 text-center space-y-6">
                                <div>
                                    <h4 className="font-serif text-2xl text-charcoal mb-2">At Your Service</h4>
                                    <p className="text-xs uppercase tracking-widest text-charcoal/50">The Ethereal Concierge</p>
                                </div>

                                <div className="h-px w-16 bg-charcoal/20 mx-auto" />

                                <p className="font-serif italic text-charcoal/70 text-lg">
                                    "How may we enhance your stay today?"
                                </p>

                                {/* Chat Input Area */}
                                <div className="relative mt-8">
                                    <input
                                        type="text"
                                        placeholder="Request dining, spa, or transport..."
                                        className="w-full bg-transparent border-b border-charcoal/20 py-2 text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-charcoal/60 transition-colors font-serif italic"
                                    />
                                    <button className="absolute right-0 bottom-2 text-charcoal/40 hover:text-charcoal transition-colors">
                                        <Send size={18} strokeWidth={1} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
