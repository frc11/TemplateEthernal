import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems } from '../data/dining';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

export default function Dining() {
    const { ref, isInView } = useScrollAnimation();
    const [hoveredIdx, setHoveredIdx] = useState(0);

    useEffect(() => {
        // Randomize initial plate
        setHoveredIdx(Math.floor(Math.random() * menuItems.length));
    }, []);

    return (
        <section id="dining" ref={ref} className="min-h-screen bg-cream flex flex-col md:flex-row items-center overflow-hidden">

            {/* Left: Rotating Visual */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center relative bg-[#EBEBE6]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="relative w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] rounded-full overflow-hidden shadow-2xl"
                >
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={hoveredIdx}
                            initial={{ opacity: 0, scale: 1.2 }}
                            animate={{ opacity: 1, scale: 1.1 }}
                            exit={{ opacity: 0, scale: 1.2 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            src={menuItems[hoveredIdx].image}
                            alt={menuItems[hoveredIdx].name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                </motion.div>
                {/* Decorative Circle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] border border-charcoal/5 rounded-full" />
                </div>
            </div>

            {/* Right: Menu */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2 min-h-[50vh] flex flex-col justify-center px-8 md:px-20 py-20"
            >
                <h2 className="text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-12">Culinary Arts</h2>

                <div id="menu" className="flex flex-col gap-8">
                    {menuItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="group cursor-pointer"
                            onMouseEnter={() => setHoveredIdx(index)}
                            initial="rest"
                            whileHover="hover"
                            animate={hoveredIdx === index ? "hover" : "rest"}
                        >
                            <div className="flex justify-between items-baseline mb-2 text-charcoal">
                                <h3 className="font-serif text-2xl md:text-3xl transition-colors duration-500">{item.name}</h3>
                                <span className={`font-medium text-lg transition-colors duration-500 ${hoveredIdx === index ? 'text-charcoal' : 'text-charcoal/60'}`}>{item.price}</span>
                            </div>

                            {/* Divider Line */}
                            <motion.div
                                variants={{
                                    rest: { width: "100%", backgroundColor: "rgba(26, 26, 26, 0.1)", height: "1px" },
                                    hover: { width: "100%", backgroundColor: "rgba(26, 26, 26, 0.8)", height: "2px" }
                                }}
                                className="w-full h-px bg-charcoal/10 origin-left"
                            />

                            {/* Ingredients Reveal */}
                            <motion.div
                                variants={{
                                    rest: { height: 0, opacity: 0, marginTop: 0 },
                                    hover: { height: "auto", opacity: 1, marginTop: 8 }
                                }}
                                className="overflow-hidden"
                            >
                                <p className="text-sm font-light text-charcoal/70 italic">
                                    {item.ingredients}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-left">
                    <Link to="/dining" className="group relative text-[10px] uppercase tracking-[0.3em] font-bold text-charcoal flex items-center gap-3 w-fit">
                        <span>Explore Our Menus</span>
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            →
                        </motion.span>
                    </Link>
                </div>
            </motion.div>

        </section>
    );
}
