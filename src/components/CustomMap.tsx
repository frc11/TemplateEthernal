import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Info, ArrowRight } from 'lucide-react';

interface PointOfInterest {
    id: number;
    x: number;
    y: number;
    title: string;
    description: string;
    image: string;
}

const pointsOfInterest: PointOfInterest[] = [
    {
        id: 1,
        x: 30,
        y: 45,
        title: "The Ocean Villas",
        description: "Private infinity pools facing the sunset and curated organic amenities.",
        image: "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        id: 2,
        x: 65,
        y: 35,
        title: "Serenity Spa",
        description: "World-class holistic treatments integrated with the sounds of the surrounding forest.",
        image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        id: 3,
        x: 52,
        y: 72,
        title: "Azure Dining",
        description: "A Michelin-star culinary journey focused on sustainable sea-to-table excellence.",
        image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        id: 4,
        x: 75,
        y: 20,
        title: "Mountain Retreat",
        description: "High-altitude chalets offering panoramic snow-capped views and alpine luxury.",
        image: "https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        id: 5,
        x: 20,
        y: 60,
        title: "Jungle Sanctuary",
        description: "Immersive treehouses surrounded by vibrant biodiversity and ancient ruins.",
        image: "https://images.pexels.com/photos/2583852/pexels-photo-2583852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        id: 6,
        x: 88,
        y: 55,
        title: "Zen Gardens",
        description: "Minimalist traditional pavilions set within meticulously raked sand and koi ponds.",
        image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2076&auto=format&fit=crop"
    },
    {
        id: 7,
        x: 45,
        y: 25,
        title: "The Ice Fjords",
        description: "Glass igloos providing an unobstructed view of the Northern Lights.",
        image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1965&auto=format&fit=crop"
    }
];

interface CustomMapProps {
    height?: string;
}

export default function CustomMap({ height = "80vh" }: CustomMapProps) {
    const [hoveredPoint, setHoveredPoint] = useState<PointOfInterest | null>(null);

    return (
        <section
            className="relative w-full flex items-center justify-center p-4 md:p-12"
            style={{ height }}
        >
            {/* Map Container - The Paper/Canvas */}
            <div className="relative w-full h-full max-w-7xl mx-auto rounded-[2.5rem] shadow-2xl shadow-sand/30 border border-sand/30">

                {/* Background Map Image - Stylized Texture */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem]">
                    <img
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                        alt="Ethereal Grounds Map"
                        className="w-full h-full object-cover grayscale opacity-90 contrast-125 saturate-50"
                    />
                    {/* Artistic Overlays */}
                    <div className="absolute inset-0 bg-sand/10 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_20%,_rgba(0,0,0,0.2)_100%)]" />
                    <div className="absolute inset-0 pointer-events-none opacity-20"
                        style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>

                {/* Markers Layer */}
                <div className="absolute inset-0 z-10">
                    {pointsOfInterest.map((point) => (
                        <div
                            key={point.id}
                            className="absolute group"
                            style={{ left: `${point.x}%`, top: `${point.y}%` }}
                        >
                            <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                                {/* Pulsing Halo */}
                                <motion.div
                                    animate={{
                                        scale: [1, 2.5],
                                        opacity: [0.6, 0]
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeOut"
                                    }}
                                    className="absolute inset-0 w-8 h-8 rounded-full bg-[#E5B582]/40"
                                />

                                {/* Interactive Core Pin */}
                                <motion.button
                                    onMouseEnter={() => setHoveredPoint(point)}
                                    onMouseLeave={() => setHoveredPoint(null)}
                                    whileHover={{ scale: 1.3 }}
                                    className="relative z-20 w-5 h-5 rounded-full bg-[#E5B582] border-2 border-[#1a1a1a] shadow-[0_0_20px_rgba(229,181,130,0.8)] transition-transform group"
                                    aria-label={`Learn more about ${point.title}`}
                                >
                                    <div className="absolute inset-0 rounded-full animate-pulse bg-white/40 group-hover:bg-white/60" />
                                </motion.button>

                                {/* Tooltip Card */}
                                <AnimatePresence>
                                    {hoveredPoint?.id === point.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                                            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 w-72 bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-2xl border border-white/40 pointer-events-none"
                                        >
                                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 shadow-sm border border-black/5">
                                                <img src={point.image} alt={point.title} className="w-full h-full object-cover" />
                                            </div>
                                            <h3 className="font-serif text-xl text-charcoal mb-2">{point.title}</h3>
                                            <p className="text-[11px] leading-relaxed text-charcoal/60 font-medium">
                                                {point.description}
                                            </p>

                                            <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
                                                <span className="text-[9px] uppercase tracking-widest text-charcoal/40">Destination {point.id}</span>
                                                <ArrowRight size={12} className="text-charcoal/40" />
                                            </div>

                                            {/* Pointer Arrow */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white/80" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Floating Map Legend */}
                <div className="absolute top-8 left-8 z-20">
                    <div className="bg-charcoal/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 shadow-xl">
                        <div className="flex items-center gap-3">
                            <MapPin size={16} className="text-sand" />
                            <h2 className="text-xs uppercase tracking-[0.3em] font-medium text-white">The Grounds</h2>
                        </div>
                    </div>
                </div>

                {/* Interaction Hint */}
                <div className="absolute bottom-8 right-8 z-20">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/95 backdrop-blur-xl px-7 py-4 rounded-full border border-black/10 flex items-center gap-4 shadow-2xl shadow-charcoal/20"
                    >
                        <div className="bg-[#E5B582] p-1.5 rounded-full shadow-inner">
                            <Info size={14} className="text-charcoal" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-charcoal">
                            Hover hotspots to explore rituals
                        </span>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
