import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronDown, MessageCircle, ExternalLink, Mail, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CustomMap from '../components/CustomMap';

const inquirySchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.enum(["General", "Wedding", "Event", "Dining"]),
    message: z.string().min(10, "Please share a bit more (min 10 chars)"),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

const faqs = [
    {
        q: "How to get there?",
        a: "We provide private chauffeur services from the nearest international airport (60-minute drive). For those arriving by helicopter, our private helipad is available upon prior coordination."
    },
    {
        q: "Cancellation Policy",
        a: "Full refund for cancellations made up to 48 hours before check-in. Within 48 hours, a one-night stay will be charged. Ritual and dining reservations require a 24-hour notice."
    },
    {
        q: "Are pets allowed?",
        a: "We welcome well-behaved companions in our garden villas. A cleaning fee applies, and we offer a bespoke 'Canine Sanctuary' menu for our furry guests."
    }
];

const subjects: { value: InquiryFormData["subject"], label: string }[] = [
    { value: "General", label: "General Inquiry" },
    { value: "Wedding", label: "Wedding Rituals" },
    { value: "Event", label: "Corporate Retreats" },
    { value: "Dining", label: "Private Dining" }
];

export default function Contact() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();

    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<InquiryFormData>({
        resolver: zodResolver(inquirySchema),
    });

    const currentSubject = watch("subject");

    useEffect(() => {
        if (location.state?.inquiryContext === 'Dining') {
            setValue('subject', 'Dining');
        }

        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location.state, location.hash, setValue]);

    const onSubmit = (data: InquiryFormData) => {
        console.log("Inquiry transmitted:", data);
        alert("Transmission successful. Our guardians will reach out shortly.");
    };

    return (
        <div className="bg-cream min-h-screen text-charcoal">
            {/* Hero Header */}
            <section className="pt-48 pb-20 px-6 text-center max-w-4xl mx-auto">
                <span className="text-[10px] uppercase tracking-[0.4em] text-charcoal/40 font-bold mb-4 block">Ethereal Concierge</span>
                <h1 className="font-serif text-6xl md:text-8xl text-charcoal mb-6 leading-none">Talk with us.</h1>
                <p className="text-xl text-charcoal/60 font-light italic">
                    Our guardians are at your disposal to curate your perfect escape.
                </p>
            </section>

            {/* Contained Map Section */}
            <section className="relative z-10 mb-20 w-full max-w-[95vw] lg:max-w-[1400px] mx-auto h-[60vh]">
                <CustomMap height="100%" />
            </section>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Editorial Info Grid */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-20 mb-32 border-b border-sand pb-32">
                    <div className="space-y-8">
                        <h3 className="text-[10px] uppercase tracking-[0.4em] text-charcoal/30 font-bold">The Resort</h3>
                        <div className="space-y-4">
                            <p className="font-serif text-3xl leading-snug">Calle de los Sueños, 11<br />Baja California, MX</p>
                            <p className="text-sm font-light text-charcoal/60">+52 123 456 7890</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h3 className="text-[10px] uppercase tracking-[0.4em] text-charcoal/30 font-bold">Concierge</h3>
                        <div className="space-y-4">
                            <p className="font-serif text-3xl leading-snug">hello@ethereal.com</p>
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-light text-charcoal/60">07:00 — 22:00 Daily</span>
                                <a href="#" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-sand transition-colors font-bold">
                                    <MessageCircle size={14} />
                                    WhatsApp Link
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h3 className="text-[10px] uppercase tracking-[0.4em] text-charcoal/30 font-bold">Press & Careers</h3>
                        <div className="flex flex-col gap-6 pt-2">
                            <a href="#" className="flex items-center justify-between group border-b border-charcoal/10 pb-4">
                                <span className="font-serif text-xl italic hover:translate-x-2 transition-transform duration-500">Press Kit</span>
                                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="#" className="flex items-center justify-between group border-b border-charcoal/10 pb-4">
                                <span className="font-serif text-xl italic hover:translate-x-2 transition-transform duration-500">Career Opportunities</span>
                                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Inquiry Form Section */}
                <section id="inquiry" className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-40">
                    <div className="lg:col-span-5">
                        <h2 className="font-serif text-6xl md:text-8xl leading-[0.9] mb-8">Inquiry.</h2>
                        <p className="text-lg font-light text-charcoal/60 leading-relaxed max-w-sm italic">
                            Allow us to curate your silence. Our guardians respond within two hours of transmission.
                        </p>
                    </div>

                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                                {/* Name */}
                                <div className="relative group">
                                    <input
                                        {...register("name")}
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full bg-transparent border-b border-charcoal/20 py-4 outline-none focus:border-charcoal transition-colors font-serif text-xl placeholder:text-charcoal/20"
                                    />
                                    {errors.name && <span className="absolute -bottom-6 left-0 text-[10px] uppercase text-rose-500 tracking-widest">{errors.name.message}</span>}
                                </div>

                                {/* Email */}
                                <div className="relative group">
                                    <input
                                        {...register("email")}
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-transparent border-b border-charcoal/20 py-4 outline-none focus:border-charcoal transition-colors font-serif text-xl placeholder:text-charcoal/20"
                                    />
                                    {errors.email && <span className="absolute -bottom-6 left-0 text-[10px] uppercase text-rose-500 tracking-widest">{errors.email.message}</span>}
                                </div>

                                {/* Custom Subject Select */}
                                <div className="relative group md:col-span-2">
                                    <input type="hidden" {...register("subject")} />

                                    <div
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full bg-transparent border-b border-charcoal/20 py-4 flex items-center justify-between cursor-pointer transition-colors hover:border-charcoal group-open:border-charcoal"
                                    >
                                        <span className={`font-serif text-xl ${currentSubject ? 'text-charcoal' : 'text-charcoal/20'}`}>
                                            {subjects.find(s => s.value === currentSubject)?.label || "Select Subject"}
                                        </span>
                                        <ChevronDown
                                            size={20}
                                            className={`text-charcoal/40 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                        />
                                    </div>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-xl border border-charcoal/10 rounded-2xl shadow-2xl overflow-hidden z-50 py-2"
                                            >
                                                {subjects.map((s) => (
                                                    <div
                                                        key={s.value}
                                                        onClick={() => {
                                                            setValue("subject", s.value);
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className={`px-6 py-4 cursor-pointer flex items-center justify-between transition-colors hover:bg-charcoal/5 ${currentSubject === s.value ? 'bg-charcoal/5 font-medium' : ''}`}
                                                    >
                                                        <span className="font-serif text-lg text-charcoal">{s.label}</span>
                                                        {currentSubject === s.value && <Check size={16} className="text-charcoal" />}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Message */}
                                <div className="relative group md:col-span-2">
                                    <textarea
                                        {...register("message")}
                                        placeholder="Your Message..."
                                        rows={4}
                                        className="w-full bg-transparent border-b border-charcoal/20 py-4 outline-none focus:border-charcoal transition-colors font-serif text-xl placeholder:text-charcoal/20 resize-none"
                                    />
                                    {errors.message && <span className="absolute -bottom-6 left-0 text-[10px] uppercase text-rose-500 tracking-widest">{errors.message.message}</span>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-6 group"
                            >
                                <div className="w-16 h-16 rounded-full bg-charcoal flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-charcoal/20">
                                    <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>
                                <span className="text-xs uppercase tracking-[0.4em] font-bold">Transmit Journey Request</span>
                            </button>
                        </form>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="max-w-4xl mx-auto space-y-12 mb-20">
                    <div className="text-center mb-16">
                        <h2 className="text-[10px] uppercase tracking-[0.4em] text-charcoal/30 font-bold mb-4">Common Rituals</h2>
                        <p className="font-serif text-4xl italic">Frequently Asked</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border border-sand rounded-[2rem] overflow-hidden bg-white/50 backdrop-blur-sm">
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full flex items-center justify-between px-10 py-8 text-left"
                                >
                                    <span className="font-serif text-2xl">{faq.q}</span>
                                    <motion.div
                                        animate={{ rotate: openFaq === idx ? 180 : 0 }}
                                        className="p-2 rounded-full border border-sand"
                                    >
                                        <ChevronDown size={20} />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-10 pb-10 text-charcoal/60 font-light leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    <div className="pt-20 text-center border-t border-sand/30 flex flex-col items-center gap-6">
                        <p className="text-sm font-light text-charcoal/40 italic">Prefer traditional methods?</p>
                        <a href="mailto:guardian@ethereal.com" className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-sand rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-sand/10 transition-colors">
                            <Mail size={16} />
                            Send Direct Email
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
}
