import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const pois = [
    { id: 1, label: "Private Beach", x: 20, y: 40, image: "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 2, label: "Main Lodge", x: 50, y: 50, image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 3, label: "Spa Sanctuary", x: 75, y: 30, image: "https://images.pexels.com/photos/7061662/pexels-photo-7061662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 4, label: "Ocean Villas", x: 35, y: 70, image: "https://images.pexels.com/photos/2416075/pexels-photo-2416075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 5, label: "Rainforest Trail", x: 80, y: 65, image: "https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
];

export default function CustomMap() {
    return (
        <section className="relative h-[80vh] w-full bg-[#E3E0D6] overflow-hidden flex items-center justify-center">

            {/* Map Background (Stylized) */}
            <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none">
                {/* Using a texture overlay to give it a 'paper' feel */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-80" />

                {/* Abstract topography lines (simulated with CSS radial gradients for this demo, usually an SVG) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_transparent_10%,_rgba(168,162,158,0.2)_11%,_transparent_12%)] bg-[length:40px_40px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_transparent_10%,_rgba(168,162,158,0.2)_11%,_transparent_12%)] bg-[length:60px_60px]" />
            </div>

            {/* Main Map Image (Stylized) */}
            <div className="relative w-full h-full max-w-6xl max-h-[800px] p-10">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/e/ec/USA_Vermont_location_map.svg" // Placeholder SVG map - styling applied below
                    alt="Resort Map"
                    className="w-full h-full object-contain opacity-20 contrast-150 sepia-[.5] hue-rotate-15"
                />

                {/* Points of Interest */}
                {pois.map((poi) => (
                    <div
                        key={poi.id}
                        className="absolute group z-10"
                        style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                    >
                        {/* Pulsating Circle */}
                        <div className="relative flex items-center justify-center w-6 h-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                            <motion.div
                                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                className="absolute inset-0 bg-charcoal rounded-full"
                            />
                            <div className="w-2 h-2 bg-charcoal rounded-full relative z-10" />

                            {/* Tooltip */}
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                whileInView={{ opacity: 0, y: 10, scale: 0.9 }} // Default state
                                whileHover={{ opacity: 1, y: 0, scale: 1 }} // Hover state
                                transition={{ duration: 0.3 }}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-40 bg-white p-2 rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100"
                            >
                                <div className="h-24 w-full overflow-hidden rounded mb-2">
                                    <img src={poi.image} alt={poi.label} className="w-full h-full object-cover" />
                                </div>
                                <p className="text-center font-serif text-sm text-charcoal">{poi.label}</p>

                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white" />
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-10 left-10 z-20">
                <h2 className="font-serif text-3xl text-charcoal/80">Explore the Grounds</h2>
                <p className="text-sm text-charcoal/60 flex items-center gap-2 mt-2">
                    <MapPin size={16} /> Drag/Zoom not enabled (Static Artist Map)
                </p>
            </div>

        </section>
    );
}
