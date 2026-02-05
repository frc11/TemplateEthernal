import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { diningData, MenuItem, DiningMenu } from '../../data/dining';

export default function MenuSection() {
    const [activeTab, setActiveTab] = useState<keyof DiningMenu>('dinner');
    const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);

    // Mouse tracking for floating image
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the floating image
    const springConfig = { damping: 20, stiffness: 150 };
    const imageX = useSpring(mouseX, springConfig);
    const imageY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX + 20);
        mouseY.set(e.clientY - 150);
    };

    return (
        <section className="py-32 px-6 max-w-7xl mx-auto relative" onMouseMove={handleMouseMove}>

            {/* Tabs Navigation */}
            <div className="flex justify-center gap-6 md:gap-12 mb-24 border-b border-charcoal/5 pb-4 overflow-x-auto no-scrollbar">
                {(Object.keys(diningData) as Array<keyof DiningMenu>).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`group relative text-[10px] uppercase tracking-[0.4em] py-4 transition-all duration-500 ${activeTab === tab ? 'text-charcoal font-bold' : 'text-charcoal/30 hover:text-charcoal'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="menu-tab-accent"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-charcoal"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Menu List */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-12"
                >
                    {diningData[activeTab].map((item, i) => (
                        <div
                            key={i}
                            className="group relative"
                            onMouseEnter={() => setHoveredItem(item)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <div className="flex justify-between items-baseline mb-3">
                                <h3 className="font-serif text-3xl md:text-5xl text-charcoal flex-1 transition-all duration-500 group-hover:italic group-hover:translate-x-2">
                                    {item.name}
                                </h3>
                                <div className="flex-1 mx-8 border-b border-dotted border-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 h-1" />
                                <span className="font-serif text-xl md:text-2xl text-charcoal/40 group-hover:text-charcoal transition-colors">
                                    {item.price}
                                </span>
                            </div>
                            <p className="text-sm md:text-base text-charcoal/50 font-light max-w-2xl leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Floating Image Preview */}
            <AnimatePresence>
                {hoveredItem && hoveredItem.image && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        style={{
                            position: 'fixed',
                            left: imageX,
                            top: imageY,
                            zIndex: 100,
                            pointerEvents: 'none'
                        }}
                        className="w-64 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80"
                    >
                        <img
                            src={hoveredItem.image}
                            alt={hoveredItem.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
