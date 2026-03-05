import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wellnessData } from '../../data/wellness';
import { ChevronDown, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TreatmentAccordion() {
    const [openCategory, setOpenCategory] = useState<string | null>('Massages');
    const navigate = useNavigate();

    return (
        <section className="py-24 max-w-5xl mx-auto px-6 relative z-10">
            <div className="space-y-4">
                {Object.entries(wellnessData).map(([category, treatments]) => (
                    <div key={category} className="border-b border-charcoal/5 last:border-0">
                        <button
                            onClick={() => setOpenCategory(openCategory === category ? null : category)}
                            className="w-full flex justify-between items-center py-10 group"
                        >
                            <h2 className={`font-serif text-4xl md:text-6xl transition-all duration-500 ${openCategory === category ? 'italic translate-x-4' : 'opacity-40 group-hover:opacity-100'
                                }`}>
                                {category}
                            </h2>
                            <motion.div
                                animate={{ rotate: openCategory === category ? 180 : 0 }}
                                className="w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center"
                            >
                                <ChevronDown size={20} strokeWidth={1} />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {openCategory === category && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-16 space-y-12 pl-4 md:pl-12">
                                        {treatments.map((treatment, i) => (
                                            <div key={i} className="flex flex-col md:flex-row justify-between gap-6 md:items-end group/item">
                                                <div className="space-y-4 max-w-2xl">
                                                    <div className="flex items-center gap-4">
                                                        <h3 className="font-serif text-2xl md:text-3xl text-charcoal">
                                                            {treatment.name}
                                                        </h3>
                                                        <span className="text-[10px] uppercase tracking-widest text-charcoal/30 px-3 py-1 bg-stone-100 rounded-full">
                                                            {treatment.duration}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm md:text-base text-charcoal/50 font-light leading-relaxed">
                                                        {treatment.description}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between md:justify-end gap-12 pt-4 md:pt-0">
                                                    <span className="font-serif text-2xl text-charcoal/80">{treatment.price}</span>
                                                    <button
                                                        onClick={() => navigate('/wellness-checkout', { state: { treatments: [treatment.name] } })}
                                                        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-charcoal hover:translate-x-2 transition-transform"
                                                    >
                                                        Book <Plus size={14} strokeWidth={3} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
