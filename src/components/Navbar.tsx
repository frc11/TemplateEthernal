import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const navItems = [
    { name: 'Stay', path: '/rooms', image: 'https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Dining', path: '/dining', image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Wellness', path: '/wellness', image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Contact', path: '/contact', image: 'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
];

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const location = useLocation();

    // Advanced Scroll Sensitivity Logic
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        const diff = latest - previous;

        setIsScrolled(latest > 50);

        // Logic: Show if scrolling up significantly OR near top
        if (latest < 50) {
            setIsVisible(true);
        } else if (diff < -5) { // Intentional upward scroll (>5px)
            setIsVisible(true);
        } else if (diff > 5) { // Downward scroll (>5px)
            setIsVisible(false);
        }
    });

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    return (
        <>
            <AnimatePresence>
                {isVisible && !isMenuOpen && (
                    <motion.nav
                        initial={{ y: -100, opacity: 0, x: '-50%' }}
                        animate={{ y: 0, opacity: 1, x: '-50%' }}
                        exit={{ y: -100, opacity: 0, x: '-50%' }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                        className={`fixed top-6 left-1/2 z-50 flex items-center justify-between px-2 py-2 rounded-full border transition-all duration-500 max-w-[95vw] md:max-w-none ${isScrolled
                            ? 'bg-stone-900/40 backdrop-blur-xl shadow-2xl scale-95 md:scale-100 border-white/20'
                            : 'bg-white/10 backdrop-blur-md shadow-lg scale-100 border-charcoal/10'
                            }`}
                        style={{ width: 'auto' }}
                    >
                        <div className="flex items-center gap-1 md:gap-8 px-4 md:px-6">

                            {/* Desktop Nav Items */}
                            <div className="hidden md:flex items-center gap-8">
                                {navItems.slice(0, 3).map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        onMouseEnter={() => setHoveredItem(item.name)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        className={`relative text-[10px] uppercase tracking-[0.3em] font-medium transition-colors py-2 ${isScrolled ? 'text-white/70 hover:text-white' : 'text-charcoal/60 hover:text-charcoal'
                                            }`}
                                    >
                                        {item.name}
                                        {hoveredItem === item.name && (
                                            <motion.div
                                                layoutId="nav-dot"
                                                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isScrolled ? 'bg-white shadow-[0_0_8px_white]' : 'bg-charcoal shadow-[0_0_8px_rgba(26,26,26,0.3)]'
                                                    }`}
                                            />
                                        )}
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile Hamburger */}
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className={`md:hidden p-3 transition-colors ${isScrolled ? 'text-white/70 hover:text-white' : 'text-charcoal/60 hover:text-charcoal'}`}
                                aria-label="Open Menu"
                            >
                                <Menu size={20} strokeWidth={1.5} />
                            </button>

                            {/* Logo */}
                            <Link to="/" className="mx-4 md:mx-8">
                                <span className={`font-serif text-lg md:text-2xl tracking-[0.2em] whitespace-nowrap transition-all ${isScrolled ? 'text-white opacity-80' : 'text-charcoal opacity-100'}`}>
                                    ETHEREAL
                                </span>
                            </Link>

                            {/* Right Section */}
                            <div className="flex items-center gap-4 md:gap-8">
                                <Link
                                    to="/contact"
                                    className={`hidden lg:block text-[10px] uppercase tracking-[0.3em] font-medium transition-colors ${isScrolled ? 'text-white/70 hover:text-white' : 'text-charcoal/60 hover:text-charcoal'}`}
                                >
                                    Contact
                                </Link>

                                <Link to="/checkout">
                                    <button className={`px-4 md:px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl ${isScrolled ? 'bg-white text-charcoal shadow-black/10' : 'bg-charcoal text-white shadow-charcoal/10'}`}>
                                        Book Now
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* Cinematic Mobile Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="fixed inset-0 z-[60] bg-stone-950 flex flex-col md:flex-row"
                    >
                        {/* Static Overlay Background with Reveal logic */}
                        <div className="absolute inset-0 z-0 hidden md:block opacity-30">
                            <AnimatePresence mode="wait">
                                {hoveredItem && (
                                    <motion.img
                                        key={hoveredItem}
                                        src={navItems.find(n => n.name === hoveredItem)?.image}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.8 }}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-stone-950/40" />
                        </div>

                        {/* Top Bar for Close */}
                        <div className="relative z-10 w-full p-8 flex justify-between items-center text-white">
                            <span className="font-serif text-xl tracking-widest">ETHEREAL</span>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                            >
                                <X size={24} strokeWidth={1} />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="relative z-10 flex-1 flex flex-col justify-center px-10 md:px-32 space-y-6 md:space-y-10">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                                >
                                    <Link
                                        to={item.path}
                                        onMouseEnter={() => setHoveredItem(item.name)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        className="group flex items-center gap-6"
                                    >
                                        <span className="text-white/20 font-serif text-2xl md:text-3xl group-hover:text-white/40 transition-colors">
                                            0{i + 1}
                                        </span>
                                        <h2 className="font-serif text-5xl md:text-8xl text-white group-hover:italic group-hover:translate-x-4 transition-all duration-500">
                                            {item.name}
                                        </h2>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom Info / CTA */}
                        <div className="relative z-10 p-10 md:p-32 flex flex-col justify-end space-y-8">
                            <div className="space-y-4">
                                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Discover more</p>
                                <div className="space-y-2 text-white/60 font-light">
                                    <p>Calle de los Sueños, 11</p>
                                    <p>Baja California, Mexico</p>
                                </div>
                            </div>
                            <Link to="/checkout" className="inline-flex items-center gap-4 text-white group">
                                <span className="text-xs uppercase tracking-[0.3em]">Direct Reservation</span>
                                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-charcoal transition-all">
                                    <ArrowRight size={16} />
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
