import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Check,
    Shield,
    Maximize,
    ArrowRight,
    MapPin
} from 'lucide-react';
import { rooms, Room } from '../data/rooms';
import SmartImage from '../components/ui/SmartImage';
import BookingWidget from '../components/BookingWidget';

export default function RoomDetail() {
    const { id } = useParams();
    const [room, setRoom] = useState<Room | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        const foundRoom = rooms.find(r => r.id === Number(id));
        if (foundRoom) setRoom(foundRoom);
    }, [id]);

    if (!room) return <div className="h-screen flex items-center justify-center bg-cream font-serif text-2xl">Loading...</div>;

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % room.gallery.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + room.gallery.length) % room.gallery.length);

    return (
        <div className="bg-cream min-h-screen pb-20">
            {/* Fullscreen Hero Slider */}
            <section className="relative h-screen w-full overflow-hidden bg-charcoal">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                        className="absolute inset-0"
                    >
                        <SmartImage
                            src={room.gallery[currentImageIndex]}
                            alt={`${room.name} gallery image ${currentImageIndex + 1}`}
                            containerClassName="h-full w-full"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                    </motion.div>
                </AnimatePresence>

                {/* Slider Controls */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-8 flex justify-between z-20 pointer-events-none">
                    <button
                        onClick={prevImage}
                        className="p-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/20 transition-all pointer-events-auto active:scale-90"
                    >
                        <ChevronLeft size={24} strokeWidth={1} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="p-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/20 transition-all pointer-events-auto active:scale-90"
                    >
                        <ChevronRight size={24} strokeWidth={1} />
                    </button>
                </div>

                {/* Hero Title Overlay */}
                <div className="absolute bottom-20 left-12 right-12 z-20 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-white/60 mb-4 block">Private Sanctuary</span>
                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-none tracking-tighter">
                            {room.name}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="flex gap-2"
                    >
                        {room.gallery.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 transition-all duration-500 rounded-full ${i === currentImageIndex ? 'w-12 bg-white' : 'w-4 bg-white/30'}`}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Main Content Layout */}
            <div className="max-w-7xl mx-auto px-6 mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                    {/* Left Column: Info */}
                    <div className="lg:col-span-8 space-y-24">

                        {/* Narrative Description */}
                        <section>
                            <h2 className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-8 font-medium">Concept & Narrative</h2>
                            <p className="font-serif text-3xl md:text-4xl text-charcoal leading-snug mb-8 italic">
                                "{room.description}"
                            </p>
                            <p className="text-charcoal/70 text-lg leading-relaxed font-light">
                                {room.longDescription}
                            </p>
                        </section>

                        {/* Amenities */}
                        <section>
                            <h2 className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-12 font-medium">Signature Inclusions</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
                                {room.amenities.map((amenity, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-sand/20 flex items-center justify-center shrink-0">
                                            <Check size={16} className="text-charcoal/60" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-charcoal mb-1">{amenity}</h4>
                                            <p className="text-[10px] uppercase tracking-widest text-charcoal/40">Exclusive</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Floor Plan Placeholder */}
                        <section>
                            <h2 className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-12 font-medium">Spatial Architecture</h2>
                            <div className="aspect-[16/9] w-full bg-sand/10 border border-sand/30 rounded-3xl flex items-center justify-center group overflow-hidden relative">
                                <div className="absolute inset-0 opacity-5 pointer-events-none"
                                    style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                                <div className="text-center transition-transform duration-700 group-hover:scale-105">
                                    <div className="w-20 h-20 rounded-full border border-charcoal/10 flex items-center justify-center mx-auto mb-6">
                                        <Maximize size={24} className="text-charcoal/30" />
                                    </div>
                                    <p className="font-serif text-xl text-charcoal/40">Blueprint: {room.name}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-charcoal/30 mt-2">Interactive Schematic Coming Soon</p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sticky Booking Panel */}
                    <div className="lg:col-span-4 relative">
                        <div className="lg:sticky lg:top-32 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-sand/20 border border-sand/20"
                            >
                                <div className="mb-10 pb-10 border-b border-sand/30">
                                    <span className="text-[10px] uppercase tracking-widest text-charcoal/40 mb-2 block">Price per night</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-serif text-5xl text-charcoal">{room.price}</span>
                                        <span className="text-lg text-charcoal/40 font-light">USD</span>
                                    </div>
                                </div>

                                <div className="space-y-6 mb-10">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-charcoal/60">Minimum Stay</span>
                                        <span className="font-medium">3 Nights</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-charcoal/60">Capacity</span>
                                        <span className="font-medium">2 Adults</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-charcoal/60">Check-in</span>
                                        <span className="font-medium">15:00</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsBookingOpen(true)}
                                    className="w-full bg-charcoal text-white py-6 rounded-full flex items-center justify-center gap-4 group transition-all duration-500 hover:bg-charcoal/90 active:scale-95 shadow-lg shadow-charcoal/20"
                                >
                                    <span className="text-xs uppercase tracking-[0.2em] font-medium">Book This Sanctuary</span>
                                    <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-2" />
                                </button>

                                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-charcoal/40">
                                    <Shield size={12} />
                                    <span>Instant Confirmation & Security</span>
                                </div>
                            </motion.div>

                            {/* Secondary Info Card */}
                            <div className="bg-sand/10 p-8 rounded-3xl border border-sand/30">
                                <Link to="/contact" className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <MapPin size={20} className="text-charcoal/40" />
                                        <p className="text-sm font-medium">Plan your journey</p>
                                    </div>
                                    <ChevronRight size={16} className="text-charcoal/40 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal-style Booking Overlay */}
            <AnimatePresence>
                {isBookingOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-charcoal/60 backdrop-blur-xl flex items-center justify-center p-6"
                        onClick={() => setIsBookingOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-4xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="bg-cream rounded-[3rem] p-12 relative shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-center">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-sand/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />

                                <div className="relative z-10 text-center mb-16 px-10">
                                    <span className="text-xs uppercase tracking-[0.3em] text-charcoal/40 mb-4 block">Reservation Request</span>
                                    <h2 className="font-serif text-5xl text-charcoal">Secure Your Sanctuary.</h2>
                                    <p className="text-charcoal/60 mt-4 max-w-lg mx-auto font-light">
                                        You are booking <span className="text-charcoal font-medium">{room.name}</span> for <span className="text-charcoal font-medium">{room.price}</span> per night.
                                    </p>
                                </div>

                                <div className="relative z-20 flex justify-center">
                                    {/* Using a modified static version of the widget for the modal */}
                                    <div className="scale-110">
                                        <BookingWidget isStatic />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsBookingOpen(false)}
                                    className="absolute top-10 right-10 w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/40 hover:text-charcoal hover:border-charcoal/20 transition-all active:scale-90"
                                >
                                    <span className="text-2xl font-light">×</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
