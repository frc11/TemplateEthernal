import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface Room {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
    amenities: string[];
}

const rooms: Room[] = [
    {
        id: 1,
        name: "The Ocean Suite",
        price: "$850 / Night",
        image: "https://images.pexels.com/photos/2416075/pexels-photo-2416075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "Suspended over the azure waters, the Ocean Suite offers an intimate connection with the horizon. Floor-to-ceiling glass dissolves the boundary between within and without.",
        amenities: ["Private Infinity Pool", "Direct Ocean Access", "24/7 Butler Service", "Rain Shower"]
    },
    {
        id: 2,
        name: "Forest Hideaway",
        price: "$650 / Night",
        image: "https://images.pexels.com/photos/7061662/pexels-photo-7061662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "Nestled deep within the ancient ferns, this hideaway is a sanctuary of earth and wood. Wake up to the symphony of birds and the scent of rain-soaked moss.",
        amenities: ["Outdoor Stone Bath", "Fireplace", "Forest Meditation Deck", "Organic Minibar"]
    },
    {
        id: 3,
        name: "Sky Penthouse",
        price: "$1,200 / Night",
        image: "https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "Perched at the highest peak, the Sky Penthouse commands a 360-degree view of the island. It is where the clouds meet comfort.",
        amenities: ["Private Rooftop Terrace", "Jacuzzi", "Telescope for Stargazing", "Chef's Kitchen"]
    },
    {
        id: 4,
        name: "Canyon Villa",
        price: "$950 / Night",
        image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "Carved into the rugged cliffs, the Canyon Villa blends raw stone textures with soft luxurious fabrics. A fortress of solitude.",
        amenities: ["Heated Plunge Pool", "Private Cave Dining", "Massage Room", "Sound System"]
    },
    {
        id: 5,
        name: "Lake Retreat",
        price: "$700 / Night",
        image: "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "Reflecting the calm waters of the Mirror Lake, this retreat is designed for absolute stillness. A minimalist masterpiece.",
        amenities: ["Private Dock", "Kayak Included", "Floating Yoga Deck", "Moonlight Cinema"]
    }
];

export default function RoomShowcase() {
    const targetRef = useRef<HTMLDivElement>(null);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    return (
        <>
            <section ref={targetRef} className="relative h-[300vh] bg-charcoal">
                <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex gap-10 px-12">

                        {/* Introductory Card */}
                        <div className="flex h-[80vh] w-[40vw] flex-col justify-center shrink-0">
                            <h2 className="font-serif text-6xl text-cream mb-6 leading-tight">
                                Sanctuaries <br /> of Silence.
                            </h2>
                            <p className="text-sand/70 max-w-sm text-lg">
                                Each room is designed as a private observatory of nature, blending seamless architecture with organic comfort.
                            </p>
                        </div>

                        {rooms.map((room) => (
                            <motion.div
                                key={room.id}
                                layoutId={`card-${room.id}`}
                                onClick={() => setSelectedRoom(room)}
                                className="group relative h-[80vh] w-[60vw] md:w-[40vw] shrink-0 overflow-hidden rounded-3xl cursor-pointer"
                            >
                                <motion.img
                                    layoutId={`image-${room.id}`}
                                    src={room.image}
                                    alt={room.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100Pointer-events-none" />

                                {/* Info on Hover */}
                                <motion.div
                                    layoutId={`info-${room.id}`}
                                    className="absolute bottom-10 left-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                                >
                                    <h3 className="font-serif text-3xl text-cream">{room.name}</h3>
                                    <p className="text-sm font-medium tracking-wide text-sand/80 mt-1">{room.price}</p>
                                </motion.div>

                            </motion.div>
                        ))}

                    </motion.div>
                </div>
            </section>

            {/* Expanded View Modal */}
            <AnimatePresence>
                {selectedRoom && (
                    <motion.div
                        layoutId={`card-${selectedRoom.id}`}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal"
                    >
                        {/* Background Image scaling to full screen */}
                        <motion.div className="absolute inset-0 overflow-hidden">
                            <motion.img
                                layoutId={`image-${selectedRoom.id}`}
                                src={selectedRoom.image}
                                className="w-full h-full object-cover opacity-50"
                            />
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                        </motion.div>

                        {/* Content */}
                        <div className="relative z-10 max-w-4xl w-full px-6 grid md:grid-cols-2 gap-12 items-end">

                            <div className="text-cream">
                                <motion.h4
                                    layoutId={`info-${selectedRoom.id}`}
                                    className="font-serif text-5xl md:text-7xl mb-4 leading-none"
                                >
                                    {selectedRoom.name}
                                </motion.h4>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="text-xl md:text-2xl text-sand/80 font-light"
                                >
                                    {selectedRoom.price}
                                </motion.p>
                            </div>

                            <div className="text-cream/90">
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="text-lg leading-relaxed mb-8"
                                >
                                    {selectedRoom.description}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <h5 className="text-xs uppercase tracking-widest text-sand/60 mb-4">Amenities</h5>
                                    <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                                        {selectedRoom.amenities.map((amenity, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm">
                                                <Check className="w-4 h-4 text-sand" />
                                                {amenity}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                <motion.button
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-10 bg-cream text-charcoal px-8 py-3 rounded-full text-sm font-medium hover:bg-white transition-colors"
                                >
                                    Book This Room
                                </motion.button>
                            </div>
                        </div>

                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedRoom(null)}
                            className="absolute top-8 right-8 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-cream transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
