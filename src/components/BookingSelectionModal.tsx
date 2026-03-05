import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SmartImage from './ui/SmartImage';

interface BookingSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const services = [
    {
        id: 'stay',
        title: 'Private Sanctuaries',
        subtitle: 'Reserve your Stay',
        path: '/rooms',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=2000'
    },
    {
        id: 'dining',
        title: 'Culinary Arts',
        subtitle: 'Reserve a Table',
        path: '/dining',
        image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=2000'
    },
    {
        id: 'wellness',
        title: 'Sensory Spa',
        subtitle: 'Book a Ritual',
        path: '/wellness',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2000'
    }
];

export default function BookingSelectionModal({ isOpen, onClose }: BookingSelectionModalProps) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSelect = (path: string) => {
        onClose();
        navigate(path);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-[110] bg-stone-950/90 backdrop-blur-xl flex flex-col pt-24 md:pt-32 px-6 lg:px-20 pb-20 overflow-y-auto"
                onClick={onClose}
            >
                <button
                    onClick={onClose}
                    className="fixed top-6 right-6 lg:top-10 lg:right-10 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors z-[120]"
                >
                    <X size={24} strokeWidth={1} />
                </button>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-center mb-16 shrink-0"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 block mb-4 font-bold">Reservation Request</span>
                    <h2 className="font-serif text-5xl md:text-7xl text-white">What service do you desire?</h2>
                </motion.div>

                <div className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 md:h-full md:min-h-0" onClick={(e) => e.stopPropagation()}>
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.id}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + (idx * 0.1), duration: 0.8 }}
                            className="group relative w-full h-full min-h-[300px] rounded-[2.5rem] overflow-hidden cursor-pointer"
                            onClick={() => handleSelect(service.path)}
                        >
                            <SmartImage
                                src={service.image}
                                alt={service.title}
                                containerClassName="absolute inset-0 w-full h-full"
                                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 opacity-60 group-hover:opacity-100"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:via-black/40" />

                            {/* Content */}
                            <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                <div className="transform transition-transform duration-700 group-hover:-translate-y-4">
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-sand mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        {service.subtitle}
                                    </span>
                                    <h3 className="font-serif text-3xl md:text-4xl text-white mb-6">
                                        {service.title}
                                    </h3>

                                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">
                                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                        <span>Select</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
