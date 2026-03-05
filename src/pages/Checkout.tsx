import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CreditCard, ShieldCheck, Info, Calendar as CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useBooking } from '../context/BookingContext';
import { rooms } from '../data/rooms';

const bookingSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    cardNumber: z.string().regex(/^\d{16}$/, "Must be 16 digits").optional(),
    expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Format MM/YY").optional(),
    cvc: z.string().regex(/^\d{3}$/, "3 digits").optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function Checkout() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const { booking } = useBooking();

    useEffect(() => {
        if (!booking.checkIn || !booking.checkOut) {
            navigate('/rooms', { replace: true });
        }
    }, [booking.checkIn, booking.checkOut, navigate]);

    const selectedRoom = useMemo(() => {
        return rooms.find(r => r.id === booking.roomTypeId) || rooms[0]; // Fallback to first room
    }, [booking.roomTypeId]);

    const calculateNights = (start: string | null, end: string | null) => {
        if (!start || !end) return 1;
        const d1 = new Date(start);
        const d2 = new Date(end);
        const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 1;
    };

    const nights = calculateNights(booking.checkIn, booking.checkOut);
    const roomPrice = parseInt(selectedRoom.price.replace(/[^0-9]/g, ''));
    const subtotal = roomPrice * nights;
    const taxes = subtotal * 0.15;
    const fees = 120;
    const total = subtotal + taxes + fees;

    const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
        }
    });

    const nextStep = () => setStep(s => Math.min(s + 1, 2));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const onSubmit = (data: BookingFormData) => {
        console.log("Booking Confirmed:", data, booking);
        alert("Booking Confirmed! Check console for data.");
    };

    // Validation for redirects if dates are missing
    const isNavigationInvalid = !booking.checkIn || !booking.checkOut;

    return (
        <div className="bg-cream min-h-screen pt-24 pb-20 font-sans text-charcoal">
            {/* Minimal Header */}
            <div className="max-w-7xl mx-auto px-6 mb-16 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors group"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Sanctuary
                </button>
                <div className="flex gap-4">
                    <div className={`h-1 w-12 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-charcoal' : 'bg-charcoal/10'}`} />
                    <div className={`h-1 w-12 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-charcoal' : 'bg-charcoal/10'}`} />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Main Form Area */}
                <div className="lg:col-span-8">
                    {isNavigationInvalid && step === 1 && (
                        <div className="mb-12 p-6 bg-rose-50 border border-rose-100 rounded-3xl flex items-center gap-4 text-rose-900">
                            <Info size={20} />
                            <p className="text-sm">Please select your stay dates on the home page or room detail for a precise summary.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-12"
                                >
                                    <div>
                                        <h1 className="font-serif text-5xl mb-4">Guest Details.</h1>
                                        <p className="text-charcoal/60 font-light">Tell us who will be staying in this sanctuary.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40">First Name</label>
                                            <input
                                                {...register("firstName")}
                                                type="text"
                                                className={`w-full bg-white border ${errors.firstName ? 'border-rose-300' : 'border-sand/30'} rounded-2xl px-6 py-4 outline-none focus:border-charcoal/20 transition-colors`}
                                                placeholder="Alex"
                                            />
                                            {errors.firstName && <p className="text-rose-500 text-[10px] tracking-wide mt-1">{errors.firstName.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40">Last Name</label>
                                            <input
                                                {...register("lastName")}
                                                type="text"
                                                className={`w-full bg-white border ${errors.lastName ? 'border-rose-300' : 'border-sand/30'} rounded-2xl px-6 py-4 outline-none focus:border-charcoal/20 transition-colors`}
                                                placeholder="Rivers"
                                            />
                                            {errors.lastName && <p className="text-rose-500 text-[10px] tracking-wide mt-1">{errors.lastName.message}</p>}
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40">Email Address</label>
                                            <input
                                                {...register("email")}
                                                type="email"
                                                className={`w-full bg-white border ${errors.email ? 'border-rose-300' : 'border-sand/30'} rounded-2xl px-6 py-4 outline-none focus:border-charcoal/20 transition-colors`}
                                                placeholder="alex@ethereal.com"
                                            />
                                            {errors.email && <p className="text-rose-500 text-[10px] tracking-wide mt-1">{errors.email.message}</p>}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!!(errors.firstName || errors.lastName || errors.email)}
                                        className="w-full md:w-auto px-12 py-5 bg-charcoal text-white rounded-full flex items-center justify-center gap-3 group transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <span className="text-xs uppercase tracking-[0.2em]">Continue to Payment</span>
                                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-12"
                                >
                                    <div>
                                        <h1 className="font-serif text-5xl mb-4">Payment.</h1>
                                        <p className="text-charcoal/60 font-light">Secure your stay with a guaranteed reservation.</p>
                                    </div>

                                    <div className="bg-white p-8 rounded-[2rem] border border-sand/30 space-y-8 shadow-sm">
                                        <div className="flex justify-between items-center bg-sand/5 p-4 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-charcoal/5 rounded-lg">
                                                    <CreditCard size={20} className="text-charcoal/40" />
                                                </div>
                                                <span className="text-sm font-medium">Credit or Debit Card</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest text-charcoal/40">Card Number</label>
                                                <input
                                                    {...register("cardNumber")}
                                                    type="text"
                                                    className="w-full bg-white border border-sand/30 rounded-2xl px-6 py-4 outline-none focus:border-charcoal/20"
                                                    placeholder="**** **** **** ****"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest text-charcoal/40">Expiry Date</label>
                                                <input
                                                    {...register("expiry")}
                                                    type="text"
                                                    className="w-full bg-white border border-sand/30 rounded-2xl px-6 py-4 outline-none focus:border-charcoal/20"
                                                    placeholder="MM/YY"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest text-charcoal/40">CVC</label>
                                                <input
                                                    {...register("cvc")}
                                                    type="text"
                                                    className="w-full bg-white border border-sand/30 rounded-2xl px-6 py-4 outline-none focus:border-charcoal/20"
                                                    placeholder="***"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="px-12 py-5 border border-charcoal/10 text-charcoal rounded-full text-xs uppercase tracking-[0.2em] hover:bg-sand/10 transition-all font-bold"
                                        >
                                            Go Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-12 py-5 bg-charcoal text-white rounded-full flex items-center justify-center gap-3 group transition-all shadow-xl shadow-charcoal/20 disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <span className="text-xs uppercase tracking-[0.2em] font-bold">Confirm Booking: ${total.toFixed(2)}</span>
                                            <ShieldCheck size={18} className="text-cream/60" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                    <div className="bg-sand/10 border border-sand/30 rounded-[2.5rem] p-10 space-y-10 shadow-lg backdrop-blur-sm">
                        <div>
                            <h2 className="text-[10px] uppercase tracking-widest text-charcoal/40 mb-6 font-bold">Stay Details</h2>
                            <div className="flex gap-4 items-center mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-white overflow-hidden shrink-0 border border-sand/20">
                                    <img
                                        src={selectedRoom.image}
                                        className="w-full h-full object-cover"
                                        alt="Room preview"
                                    />
                                </div>
                                <div>
                                    <p className="font-serif text-xl">{selectedRoom.name}</p>
                                    <p className="text-xs text-charcoal/40 font-medium">{nights} Nights &bull; {booking.guests} Guests</p>
                                </div>
                            </div>

                            <div className="space-y-6 border-t border-sand/30 pt-8">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3 text-charcoal/40">
                                        <CalendarIcon size={12} />
                                        <span className="text-[10px] uppercase tracking-widest font-bold">Timeline</span>
                                    </div>
                                    <p className="text-sm font-medium">{booking.checkIn || '---'} — {booking.checkOut || '---'}</p>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-sand/10">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-charcoal/60">Nightly Rate ({nights}x)</span>
                                        <span className="font-medium">${subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-charcoal/60">VAT & Taxes</span>
                                            <Info size={12} className="text-charcoal/20" />
                                        </div>
                                        <span className="font-medium">${taxes.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-charcoal/60">Resort Fee</span>
                                        <span className="font-medium">${fees}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-charcoal/10 flex justify-between items-end">
                            <span className="font-serif text-xl italic">Total Price</span>
                            <div className="text-right">
                                <span className="font-serif text-4xl leading-none text-charcoal">${total.toLocaleString()}</span>
                                <p className="text-[10px] uppercase tracking-widest text-charcoal/30 mt-2">All-inclusive stay</p>
                            </div>
                        </div>

                        <div className="bg-white/40 p-6 rounded-3xl border border-white flex gap-4">
                            <ShieldCheck size={20} className="text-emerald-600/60" />
                            <p className="text-[11px] leading-relaxed text-charcoal/60">
                                Protected by Ethereal Guarantee. Free cancellation until 48h prior.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

