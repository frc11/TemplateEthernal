import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ReservationCTA() {
    return (
        <section className="py-32 px-6 bg-cream text-charcoal text-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-4xl mx-auto space-y-12"
            >
                <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.6em] text-charcoal/30">Secure Your Table</span>
                    <h2 className="font-serif text-5xl md:text-8xl tracking-tighter">A Taste of the Ethereal.</h2>
                </div>

                <p className="text-lg md:text-xl text-charcoal/60 font-light max-w-2xl mx-auto leading-relaxed">
                    Reservations are advised for our nightly tasting menu. For special dietary requirements or private dining, please contact our concierge.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
                    <button className="group px-12 py-6 bg-charcoal text-cream rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-black transition-all flex items-center gap-4">
                        Reserve a Table
                        <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                    <button className="px-12 py-6 border border-charcoal/20 text-charcoal rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-charcoal/5 transition-all">
                        Private Dining
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
