import { motion, AnimatePresence } from 'framer-motion';
import { treatments } from '../data/wellness';
import { Droplets, Wind, Send, Calendar, ChevronDown, Sparkles, Sprout } from 'lucide-react';
import SensorialBackground from '../components/wellness/SensorialBackground';
import TreatmentAccordion from '../components/wellness/TreatmentAccordion';
import SensoryGallery from '../components/wellness/SensoryGallery';
import NoiseOverlay from '../components/NoiseOverlay';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/datepicker.css';

export default function Wellness() {
    const navigate = useNavigate();
    const [selectedTreatment, setSelectedTreatment] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const formatDate = (date: Date | null) => {
        if (!date) return "Select Date";
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const handleRequest = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedTreatment && selectedTreatment !== "Select a Treatment") {
            navigate('/wellness-checkout', {
                state: {
                    treatments: [selectedTreatment],
                    preferredDate: selectedDate ? selectedDate.toISOString() : null
                }
            });
        } else {
            alert('Please select a ritual to continue.');
        }
    };
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
            <section id="schedule" className="relative py-32">
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
                        className="bg-white p-4 md:p-10 lg:p-16 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative z-10 border border-charcoal/5"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center">
                                <Calendar size={14} className="text-charcoal/50" />
                            </div>
                            <h3 className="font-serif text-2xl text-charcoal">Schedule Treatment</h3>
                        </div>

                        <form className="space-y-6" onSubmit={handleRequest}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-50">
                                <div className="space-y-2 relative">
                                    <label className="text-[10px] uppercase tracking-widest text-charcoal/40">Ideal Ritual</label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="w-full bg-white/60 backdrop-blur-md border border-charcoal/10 rounded-2xl px-6 py-4 outline-none focus:border-charcoal/30 transition-colors cursor-pointer flex justify-between items-center whitespace-nowrap"
                                        >
                                            <span className={selectedTreatment ? "text-charcoal" : "text-charcoal/40"}>
                                                {selectedTreatment || "Select a Treatment"}
                                            </span>
                                            <ChevronDown size={16} className={`text-charcoal/40 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        <AnimatePresence>
                                            {isDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute top-full left-0 mt-4 bg-white/95 backdrop-blur-2xl border border-charcoal/10 rounded-3xl shadow-2xl z-50 p-2 max-h-64 overflow-y-auto custom-scrollbar w-[120%] md:w-max min-w-full"
                                                >
                                                    {treatments.map((t) => {
                                                        const Icon = t.category === 'Massages' ? Sprout : t.category === 'Facials' ? Sparkles : Wind;
                                                        return (
                                                            <button
                                                                type="button"
                                                                key={t.name}
                                                                onClick={() => {
                                                                    setSelectedTreatment(t.name);
                                                                    setIsDropdownOpen(false);
                                                                }}
                                                                className="w-full text-left px-4 py-3 hover:bg-charcoal/5 rounded-2xl transition-colors flex items-center justify-between group"
                                                            >
                                                                <div className="flex items-center gap-3 pr-4">
                                                                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-charcoal/50 group-hover:text-charcoal group-hover:bg-white transition-colors shrink-0">
                                                                        <Icon size={14} />
                                                                    </div>
                                                                    <span className="text-charcoal font-medium text-sm whitespace-nowrap">{t.name}</span>
                                                                </div>
                                                                <span className="text-[10px] uppercase tracking-widest text-charcoal/40 shrink-0 ml-4">{t.duration}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <div className="space-y-2 flex flex-col justify-center relative">
                                    <label className="text-[10px] uppercase tracking-widest text-charcoal/40">Preferred Date</label>
                                    <div className="w-full bg-white/60 backdrop-blur-md border border-charcoal/10 rounded-2xl px-6 py-4 transition-colors cursor-pointer hover:border-charcoal/30 flex items-center">
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={(date: Date | null) => setSelectedDate(date)}
                                            customInput={
                                                <button type="button" className="text-left font-serif text-lg text-charcoal outline-none w-full bg-transparent">
                                                    {formatDate(selectedDate)}
                                                </button>
                                            }
                                            minDate={new Date()}
                                            placeholderText="Select Date"
                                            popperPlacement="bottom-start"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-charcoal/40">Special Requests / Goals</label>
                                <input type="text" className="w-full bg-white/60 backdrop-blur-md border border-charcoal/10 rounded-2xl px-6 py-4 outline-none focus:border-charcoal/30 transition-colors" placeholder="e.g. Deep tissue focus, stress relief" />
                            </div>

                            <button type="submit" className="w-full bg-charcoal text-cream py-5 rounded-full flex items-center justify-center gap-4 group hover:bg-black transition-all duration-300 shadow-xl shadow-charcoal/20 mt-4">
                                <span className="text-xs uppercase tracking-[0.3em] font-bold">Reserver Ritual</span>
                                <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
