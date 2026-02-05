import { motion } from 'framer-motion';
import { Wifi, Waves, Utensils, Flower2, Car, ConciergeBell, Wine, Sun } from 'lucide-react';

const services = [
    { id: 1, name: "High-Speed Wifi", icon: Wifi },
    { id: 2, name: "Infinity Pool", icon: Waves },
    { id: 3, name: "Gourmet Dining", icon: Utensils },
    { id: 4, name: "Holistic Spa", icon: Flower2 },
    { id: 5, name: "Valet Parking", icon: Car },
    { id: 6, name: "24/7 Concierge", icon: ConciergeBell },
    { id: 7, name: "Private Cellar", icon: Wine },
    { id: 8, name: "Private Beach", icon: Sun },
];

export default function Services() {
    return (
        <section className="py-32 bg-cream flex justify-center">
            <div className="max-w-7xl w-full px-6">

                <div className="text-center mb-24">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-4">Amenities</h2>
                    <p className="font-serif text-4xl md:text-5xl text-charcoal">Curated Comforts</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-sand/20 border border-sand/20">
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                            className="bg-cream h-64 flex flex-col items-center justify-center gap-6 cursor-pointer group hover:bg-[#FDFDFB] transition-colors duration-500"
                        >
                            <motion.div
                                variants={{
                                    rest: { y: 0, scale: 1 },
                                    hover: { y: -8, scale: 1.05 }
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <service.icon strokeWidth={0.5} className="w-12 h-12 text-charcoal/80" />
                            </motion.div>

                            <span className="font-serif text-lg text-charcoal/80 tracking-wide group-hover:text-charcoal transition-colors">
                                {service.name}
                            </span>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
