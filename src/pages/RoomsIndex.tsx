import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { rooms } from '../data/rooms';
import SmartImage from '../components/ui/SmartImage';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';

const CATEGORIES = ['All', 'Suites', 'Villas', 'View'];

export default function RoomsIndex() {
    const [activeCategory, setActiveCategory] = useState('All');
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    const filteredRooms = activeCategory === 'All'
        ? rooms
        : rooms.filter(room => room.category === activeCategory);

    return (
        <div ref={containerRef} className="bg-cream min-h-screen">
            {/* Parallax Header */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-charcoal">
                <motion.div
                    style={{ y: headerY, opacity: headerOpacity }}
                    className="relative z-10 text-center"
                >
                    <h1 className="font-serif text-8xl md:text-[12vw] text-cream tracking-tighter leading-none">
                        Our <br /> Sanctuaries.
                    </h1>
                </motion.div>

                {/* Background Parallax Image */}
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 opacity-40"
                >
                    <img
                        src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Resort landscape"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cream" />
            </section>

            {/* Sticky Filter Bar */}
            <div className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-sand/30 py-6">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-colors ${activeCategory === cat ? 'text-charcoal font-bold' : 'text-charcoal/40 hover:text-charcoal/60'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-charcoal/40">
                        <Filter size={12} />
                        <span>Showing {filteredRooms.length} sanctuaries</span>
                    </div>
                </div>
            </div>

            {/* Zig-Zag Room Grid */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="space-y-40">
                    <AnimatePresence mode="popLayout">
                        {filteredRooms.map((room, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={room.id}
                                    layout
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                    className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
                                >
                                    {/* Image Container */}
                                    <div className="w-full md:w-3/5 aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-3xl group relative">
                                        <SmartImage
                                            src={room.image}
                                            alt={room.name}
                                            containerClassName="h-full w-full"
                                            className="transition-transform duration-1000 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
                                    </div>

                                    {/* Text Content */}
                                    <div className="w-full md:w-2/5 space-y-8">
                                        <div>
                                            <span className="text-xs uppercase tracking-[0.2em] text-charcoal/40 mb-4 block">
                                                {room.category}
                                            </span>
                                            <h2 className="font-serif text-5xl md:text-6xl text-charcoal leading-tight mb-4">
                                                {room.name}
                                            </h2>
                                            <p className="text-charcoal/60 text-lg font-light leading-relaxed">
                                                {room.description}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            {room.amenities.slice(0, 3).map(amenity => (
                                                <span key={amenity} className="text-[10px] uppercase tracking-widest px-3 py-1 bg-sand/20 rounded-full text-charcoal/60">
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="pt-4 border-t border-sand/30 flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-charcoal/40 mb-1">Starting from</p>
                                                <p className="font-serif text-3xl text-charcoal">{room.price}</p>
                                            </div>
                                            <Link
                                                to={`/rooms/${room.id}`}
                                                className="group flex items-center gap-4 bg-charcoal text-white px-8 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-charcoal/90 transition-all duration-300 transform hover:translate-x-1"
                                            >
                                                View Details
                                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}
