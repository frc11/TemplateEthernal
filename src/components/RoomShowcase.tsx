import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ArrowRight, Expand, Sparkles } from 'lucide-react';
import { rooms, Room } from '../data/rooms';
import SmartImage from './ui/SmartImage';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Suites', 'Villas', 'View'];

export default function RoomShowcase() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    const [scrollStep, setScrollStep] = useState(65);

    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef
    });

    useEffect(() => {
        const calculateStep = () => {
            if (window.innerWidth >= 1024) setScrollStep(55); // Card 50vw + Gap 5vw
            else if (window.innerWidth >= 768) setScrollStep(65); // Card 60vw + Gap 5vw
            else setScrollStep(85); // Card 80vw + Gap 5vw
        };
        calculateStep();
        window.addEventListener('resize', calculateStep);
        return () => window.removeEventListener('resize', calculateStep);
    }, []);

    const filteredRooms = activeCategory === 'All'
        ? rooms
        : rooms.filter(room => room.category === activeCategory);

    // Calculate the total horizontal width to scroll precisely.
    // Total travel = (Number of Transitions) * (Step Distance)
    const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${filteredRooms.length * scrollStep}vw`]);

    return (
        <section id="rooms" ref={targetRef} className="relative h-[400vh] bg-charcoal">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">

                {/* Header Overlay */}
                <div className="absolute top-12 left-0 w-full z-20 px-6 md:px-20 flex flex-col md:flex-row justify-between items-end gap-10">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[10px] uppercase tracking-[0.4em] text-sand/30 font-bold mb-4 block"
                        >
                            Private Sanctuaries
                        </motion.span>
                        <h2 className="font-serif text-5xl md:text-8xl text-cream leading-[0.9]">
                            Silence <br /> <span className="italic pl-12 md:pl-24">Redefined.</span>
                        </h2>
                    </div>

                    {/* Filter Tabs - Premium Glassmorphic */}
                    <div className="flex gap-2 p-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shrink-0">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className="relative px-6 py-2 group"
                            >
                                <span className={`relative z-10 text-[9px] uppercase tracking-[0.2em] transition-all duration-300 font-bold ${activeCategory === cat ? 'text-charcoal' : 'text-sand/40 group-hover:text-sand/80'
                                    }`}>
                                    {cat}
                                </span>
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-cream rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Animated Track */}
                <motion.div style={{ x }} className="flex gap-[5vw] px-6 md:px-[15vw] items-center">
                    <AnimatePresence mode="popLayout">
                        {filteredRooms.map((room, idx) => (
                            <motion.div
                                key={room.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                onClick={() => setSelectedRoom(room)}
                                className="group relative w-[80vw] md:w-[60vw] lg:w-[50vw] aspect-[4/5] md:aspect-[16/10] flex-shrink-0 cursor-pointer"
                            >
                                {/* Background Index Number - Large Scale */}
                                <div className="absolute -top-20 -left-10 text-[15vw] font-serif italic text-white/5 select-none pointer-events-none z-0">
                                    0{idx + 1}
                                </div>

                                <div className="relative h-full w-full overflow-hidden rounded-[3rem] bg-stone-900 border border-white/5 shadow-2xl transition-all duration-700 group-hover:shadow-sand/10 group-hover:-translate-y-2">
                                    <SmartImage
                                        layoutId={`image-${room.id}`}
                                        src={room.image}
                                        alt={room.name}
                                        containerClassName="h-full w-full opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                                        className="transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                                    />

                                    {/* Info Overlay - Premium Editorial */}
                                    <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent">
                                        <div className="flex justify-between items-end">
                                            <motion.div layoutId={`info-${room.id}`}>
                                                <h3 className="font-serif text-4xl md:text-6xl text-cream mb-4">{room.name}</h3>
                                                <div className="flex items-center gap-6">
                                                    <span className="text-sand/40 text-[10px] uppercase tracking-[0.3em] font-bold">Category &bull; {room.category}</span>
                                                    <div className="h-px w-12 bg-sand/20" />
                                                    <span className="text-cream text-sm font-serif italic">{room.price} / Night</span>
                                                </div>
                                            </motion.div>

                                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-cream group-hover:bg-cream group-hover:text-charcoal transition-all duration-500 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100">
                                                <Expand size={20} strokeWidth={1} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* End Card - Elegant Closing */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative w-[80vw] md:w-[60vw] lg:w-[50vw] aspect-[4/5] md:aspect-[16/10] flex-shrink-0 flex items-center justify-center"
                        >
                            <div className="absolute inset-0 rounded-[3rem] bg-stone-950/40 border border-white/5 backdrop-blur-sm" />
                            <div className="relative text-center p-12">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.3, 0.6, 0.3]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="mb-8 flex justify-center text-sand/30"
                                >
                                    <Sparkles size={48} strokeWidth={0.5} />
                                </motion.div>
                                <h3 className="font-serif text-3xl md:text-5xl text-cream/80 italic leading-tight">
                                    Find your perfect <br /> sanctuary.
                                </h3>
                                <div className="mt-8 flex justify-center">
                                    <div className="w-12 h-px bg-sand/20" />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Progress Indicator */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-white/10">
                    <motion.div
                        style={{ scaleX: scrollYProgress }}
                        className="h-full bg-sand origin-left"
                    />
                </div>

                {/* View All CTA */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <Link to="/rooms">
                        <button className="px-10 py-4 border border-cream/20 text-cream rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-cream hover:text-charcoal transition-all duration-500 backdrop-blur-sm">
                            View All Collections
                        </button>
                    </Link>
                </div>
            </div>

            {/* Expanded View Modal (Unchanged logic, updated styling) */}
            <AnimatePresence>
                {selectedRoom && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-6 md:p-12"
                    >
                        <motion.div
                            className="absolute inset-0 bg-charcoal/98 backdrop-blur-2xl"
                            onClick={() => setSelectedRoom(null)}
                        />

                        <motion.div
                            layoutId={`card-${selectedRoom.id}`}
                            className="relative z-10 max-w-7xl w-full bg-stone-950 rounded-[4rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row h-full max-h-[90vh]"
                        >
                            <div className="w-full lg:w-3/5 h-[40vh] lg:h-auto relative">
                                <SmartImage
                                    layoutId={`image-${selectedRoom.id}`}
                                    src={selectedRoom.image}
                                    alt={selectedRoom.name}
                                    containerClassName="h-full w-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
                            </div>

                            <div className="flex-1 p-10 md:p-20 flex flex-col justify-center overflow-y-auto bg-stone-950">
                                <motion.div layoutId={`info-${selectedRoom.id}`} className="mb-10">
                                    <h4 className="font-serif text-5xl md:text-7xl text-cream mb-4 leading-tight">
                                        {selectedRoom.name}
                                    </h4>
                                    <p className="text-2xl text-sand/60 font-serif italic">
                                        Starting at {selectedRoom.price}
                                    </p>
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-cream/60 text-lg leading-relaxed mb-12 font-light italic"
                                >
                                    {selectedRoom.longDescription.split('.')[0]}.
                                </motion.p>

                                <div className="space-y-12">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <h5 className="text-[10px] uppercase tracking-[0.4em] text-sand/20 mb-6 font-bold">Resort Inclusions</h5>
                                        <div className="grid grid-cols-2 gap-y-4 gap-x-10">
                                            {selectedRoom.amenities.map((amenity, i) => (
                                                <div key={i} className="flex items-center gap-4 text-xs text-cream/70">
                                                    <div className="w-1 h-1 rounded-full bg-sand" />
                                                    {amenity}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="flex flex-col sm:flex-row gap-6 pt-12 border-t border-white/5"
                                    >
                                        <Link to={`/rooms/${selectedRoom.id}`} className="flex-1">
                                            <button className="w-full bg-cream text-charcoal px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-all flex items-center justify-center gap-4 group">
                                                Enter the Sanctuary
                                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </Link>
                                        <Link to="/checkout" className="flex-1">
                                            <button className="w-full border border-white/10 text-cream px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-white/5 transition-all">
                                                Fast Reservation
                                            </button>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedRoom(null)}
                                className="absolute top-10 right-10 w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all border border-white/10"
                            >
                                <X size={24} strokeWidth={1} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
