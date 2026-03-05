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
        <section id="wellness" className="relative py-32 overflow-hidden bg-charcoal text-cream">

            {/* Animated Ethereal Background - Darker, moodier */}
            <div className="absolute inset-0 z-0 overflow-hidden mix-blend-screen opacity-20">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-stone-700 w rounded-full filter blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-zinc-800 rounded-full filter blur-3xl opacity-50"
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-neutral-800 rounded-full filter blur-3xl opacity-60"
                />
            </div>

            {/* Glass Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-charcoal via-transparent to-charcoal" />

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-6">

                <div className="text-center mb-20">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-sand mb-4">Wellness Sanctuary</h2>
                    <p className="font-serif text-5xl md:text-7xl text-cream">Ethereal Treatments</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {treatments.map((treatment, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 1 }}
                            className="bg-white/5 backdrop-blur-md border border-white/10 p-10 lg:p-12 rounded-[2rem] hover:bg-white/10 transition-all duration-500 group relative overflow-hidden"
                            onClick={() => navigate('/wellness-checkout', { state: { treatments: [treatment.name] } })}
                        >
                            {/* Subtle hover glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <h3 className="font-serif text-3xl text-cream group-hover:text-white transition-colors">
                                        {treatment.name}
                                    </h3>
                                    <span className="text-sm font-medium text-sand font-serif italic">
                                        {treatment.price}
                                    </span>
                                </div>

                                <p className="text-cream/60 font-light leading-relaxed mb-12 min-h-[4rem] group-hover:text-cream/80 transition-colors">
                                    {treatment.description}
                                </p>

                                <div className="flex items-center gap-4 text-xs tracking-widest text-cream/40 group-hover:text-white transition-colors w-full cursor-pointer uppercase font-bold mt-auto">
                                    <span>{treatment.duration}</span>
                                    <div className="h-px flex-1 bg-white/20 group-hover:bg-white/50 transition-colors" />
                                    <span className="group-hover:translate-x-2 transition-transform duration-300">Book Now</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="flex justify-center mt-20">
                    <Link to="/wellness">
                        <motion.button
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="px-14 py-6 border border-white/20 text-cream rounded-full text-xs uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-charcoal transition-all duration-500"
                        >
                            Discover Sanctuary
                        </motion.button>
                    </Link>
                </div>

            </div>

        </section>
    );
}
