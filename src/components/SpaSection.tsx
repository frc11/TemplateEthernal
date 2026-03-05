import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const treatments = [
    {
        name: "Moonlight Massage",
        duration: "90 min",
        price: "$220",
        description: "A soothing full-body massage under soft ambient light, using warm essential oils."
    },
    {
        name: "Hydro-facial Glow",
        duration: "60 min",
        price: "$180",
        description: "Deep hydration therapy using marine collagen and oxygen infusion."
    },
    {
        name: "Crystal Healing",
        duration: "45 min",
        price: "$150",
        description: "Chakra balancing using warm river stones and quartz crystals."
    }
];

import { useNavigate } from 'react-router-dom';

export default function SpaSection() {
    const navigate = useNavigate();
    return (
        <section id="wellness" className="relative py-32 overflow-hidden bg-[#FDFDFB]">

            {/* Animated Ethereal Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#FFE4E6] rounded-full mix-blend-multiply filter blur-3xl opacity-70"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-[#D1FAE5] rounded-full mix-blend-multiply filter blur-3xl opacity-70"
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-[#E9D5FF] rounded-full mix-blend-multiply filter blur-3xl opacity-70"
                />
            </div>

            {/* Glass Overlay */}
            <div className="absolute inset-0 z-10 backdrop-blur-3xl bg-cream/30" />

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-6">

                <div className="text-center mb-20">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-4">Wellness Sanctuary</h2>
                    <p className="font-serif text-5xl text-charcoal">Ethereal Treatments</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {treatments.map((treatment, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="bg-white/40 backdrop-blur-xl border border-white/50 p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-serif text-2xl text-charcoal group-hover:text-charcoal/80 transition-colors">{treatment.name}</h3>
                                <span className="text-sm font-medium text-charcoal/60 bg-white/50 px-3 py-1 rounded-full">{treatment.price}</span>
                            </div>
                            <p className="text-charcoal/70 font-light leading-relaxed mb-8 min-h-[3rem]">
                                {treatment.description}
                            </p>
                            <button
                                onClick={() => navigate('/wellness-checkout', { state: { treatments: [treatment.name] } })}
                                className="flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal/50 hover:text-charcoal transition-colors w-full cursor-pointer mt-4"
                            >
                                <span>{treatment.duration}</span>
                                <div className="h-px flex-1 bg-charcoal/20" />
                                <span>Book Now</span>
                            </button>
                        </motion.div>
                    ))}
                </div>
                <div className="flex justify-center mt-20">
                    <Link to="/wellness">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="px-12 py-5 bg-white/20 backdrop-blur-md border border-white/40 text-charcoal rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all shadow-xl"
                        >
                            Discover Treatments
                        </motion.button>
                    </Link>
                </div>

            </div>

        </section>
    );
}
