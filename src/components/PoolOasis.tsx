import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function PoolOasis() {
    const [isNight, setIsNight] = useState(false);

    return (
        <section className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-1000 ease-in-out ${isNight ? 'bg-[#0a0f1e]' : 'bg-stone-900'}`}>

            {/* Background Images Layer */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout" initial={false}>
                    {!isNight ? (
                        <motion.div
                            key="day"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <img
                                src="https://images.pexels.com/photos/2227774/pexels-photo-2227774.jpeg?auto=compress&cs=tinysrgb&w=2000&q=80"
                                alt="Day Pool"
                                className="w-full h-full object-cover"
                            />
                            {/* Premium Day Overlay - Enhances contrast without making it "muddy" */}
                            <div className="absolute inset-0 bg-stone-900/30 mix-blend-multiply" />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-stone-900/40" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="night"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <img
                                src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=2000&q=80"
                                alt="Night Pool"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-[#0a0f1e]/40 mix-blend-multiply" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/90 via-[#0a0f1e]/20 to-[#0a0f1e]/60" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl px-6">

                {/* Toggle Switch */}
                <div className="flex justify-center mb-12">
                    <button
                        onClick={() => setIsNight(!isNight)}
                        className={`relative flex items-center gap-4 px-2 py-2 rounded-full border backdrop-blur-md transition-all duration-500 hover:scale-105 shadow-xl ${isNight ? 'bg-white/10 border-white/20' : 'bg-white/20 border-white/30'}`}
                    >
                        <div className={`p-2 rounded-full transition-colors duration-500 ${!isNight ? 'bg-white text-charcoal shadow-md' : 'text-cream/50'}`}>
                            <Sun size={18} strokeWidth={1.5} />
                        </div>
                        <div className={`p-2 rounded-full transition-colors duration-500 ${isNight ? 'bg-white text-[#0a0f1e] shadow-md' : 'text-cream/50'}`}>
                            <Moon size={18} strokeWidth={1.5} />
                        </div>
                    </button>
                </div>

                <motion.h2
                    key={isNight ? 'night-title' : 'day-title'}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 tracking-tight text-white drop-shadow-2xl"
                >
                    {isNight ? "Moonlight Serenity" : "The Water Lounge"}
                </motion.h2>

                <motion.p
                    key={isNight ? 'night-desc' : 'day-desc'}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed text-cream/90 drop-shadow-lg"
                >
                    {isNight
                        ? "As the sun sets, the water turns into a mirror of stars. Experience our exclusive night bar with ambient sounds and crafted mixology."
                        : "Bask in the golden hour by our infinity pool. Refreshing cocktails, sun-drenched decks, and the gentle sound of pristine waters."}
                </motion.p>
            </div>

        </section>
    );
}
