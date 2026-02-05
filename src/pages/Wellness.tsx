import { motion } from 'framer-motion';
import { treatments } from '../data/wellness';
import { Droplets, Wind, Send, Calendar } from 'lucide-react';
import SensorialBackground from '../components/wellness/SensorialBackground';
import TreatmentAccordion from '../components/wellness/TreatmentAccordion';
import SensoryGallery from '../components/wellness/SensoryGallery';
import NoiseOverlay from '../components/NoiseOverlay';

export default function Wellness() {
    return (
        <div className="bg-stone-50 min-h-screen relative">
            <NoiseOverlay />
            <SensorialBackground />

            {/* Hero Header */}
            <section className="relative pt-48 pb-24 px-6 text-center max-w-5xl mx-auto z-10">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] uppercase tracking-[0.5em] text-charcoal/30 mb-8 block"
                >
                    Holistic Sanctuary
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-7xl md:text-[9vw] text-charcoal mb-12 leading-[0.9] tracking-tighter"
                >
                    Wellness <br /> & Rebirth.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="text-charcoal/50 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
                >
                    A return to essence. From hydro-therapy orbits to crystal healing chambers, our sanctuary is designed to realign your cellular frequency.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16"
                >
                    <a href="#treatments" className="inline-flex flex-col items-center gap-4 group">
                        <span className="text-[9px] uppercase tracking-widest text-charcoal/40 group-hover:text-charcoal transition-colors">Explore Rituals</span>
                        <div className="w-px h-12 bg-gradient-to-b from-charcoal/20 to-transparent" />
                    </a>
                </motion.div>
            </section>

            {/* Treatment Menu (Accordion) */}
            <div id="treatments">
                <TreatmentAccordion />
            </div>

            {/* Sensory Gallery (Parallax) */}
            <SensoryGallery />

            {/* Appointment Section */}
            <section id="schedule" className="relative py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12 relative z-10"
                    >
                        <div>
                            <h2 className="font-serif text-5xl md:text-7xl mb-8 text-charcoal">Begin Your <br /> Journey.</h2>
                            <p className="text-charcoal/50 text-lg font-light leading-relaxed max-w-md">
                                Reserve your ritual in advance. Our practitioners will tailor every session to your current energetic needs.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-6 items-center">
                                <div className="w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center shrink-0">
                                    <Droplets size={20} className="text-charcoal/40" />
                                </div>
                                <div className="text-charcoal">
                                    <h4 className="text-sm font-medium">Hydro-Thermal Circuits</h4>
                                    <p className="text-[10px] uppercase tracking-widest text-charcoal/40 mt-1">Open daily 08:00 - 20:00</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-center">
                                <div className="w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center shrink-0">
                                    <Wind size={20} className="text-charcoal/40" />
                                </div>
                                <div className="text-charcoal">
                                    <h4 className="text-sm font-medium">Zen Meditation Garden</h4>
                                    <p className="text-[10px] uppercase tracking-widest text-charcoal/40 mt-1">Complimentary Access for Guests</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-bold text-charcoal border-b border-charcoal/20 pb-2 hover:border-charcoal transition-all">
                                Download Menu Guide (PDF)
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl relative z-10 border border-charcoal/5"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center">
                                <Calendar size={14} className="text-charcoal/50" />
                            </div>
                            <h3 className="font-serif text-2xl text-charcoal">Schedule Treatment</h3>
                        </div>

                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-charcoal/40">Full Name</label>
                                <input type="text" className="w-full bg-transparent border-b border-charcoal/10 py-2 outline-none focus:border-charcoal transition-colors" placeholder="Alex Rivers" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-charcoal/40">Ideal Ritual</label>
                                    <select className="w-full bg-transparent border-b border-charcoal/10 py-2 outline-none focus:border-charcoal transition-colors appearance-none cursor-pointer">
                                        <option>Select a Treatment</option>
                                        {treatments.map(t => <option key={t.name}>{t.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-charcoal/40">Preferred Date</label>
                                    <input type="date" className="w-full bg-transparent border-b border-charcoal/10 py-2 outline-none focus:border-charcoal transition-colors" />
                                </div>
                            </div>

                            <button className="w-full bg-charcoal text-cream py-6 rounded-full flex items-center justify-center gap-4 group hover:bg-black transition-all duration-300 shadow-xl">
                                <span className="text-xs uppercase tracking-[0.4em] font-bold">Request Appointment</span>
                                <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
