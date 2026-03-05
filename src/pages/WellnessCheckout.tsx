import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CreditCard, ShieldCheck, Sparkles, Calendar as CalendarIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/datepicker.css';

const wellnessSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    preferredDate: z.string().min(1, "Date is required"),
    cardNumber: z.string().regex(/^\d{16}$/, "Must be 16 digits").optional(),
    expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Format MM/YY").optional(),
    cvc: z.string().regex(/^\d{3}$/, "3 digits").optional(),
});

type WellnessFormData = z.infer<typeof wellnessSchema>;

export default function WellnessCheckout() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();

    // Read treatments from route state, fallback to empty array
    const selectedTreatments: string[] = location.state?.treatments || [];
    const preferredDateState: string = location.state?.preferredDate || "";

    const treatmentPrice = 150;
    const subtotal = selectedTreatments.length * treatmentPrice;
    const taxes = subtotal * 0.15;
    const total = subtotal + taxes;

    const { register, handleSubmit, control, formState: { errors } } = useForm<WellnessFormData>({
        resolver: zodResolver(wellnessSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            preferredDate: preferredDateState,
        }
    });

    const nextStep = () => setStep(s => Math.min(s + 1, 2));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const formatDate = (date: Date | null) => {
        if (!date) return "Select Date";
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const onSubmit = (data: WellnessFormData) => {
        console.log("Wellness Booking Confirmed:", data, selectedTreatments);
        alert("Wellness Appointment Confirmed! Check console for data.");
    };

    const isNavigationInvalid = selectedTreatments.length === 0;

    return (
        <div className="bg-[#FDFDFB] min-h-screen pt-24 pb-20 font-sans text-charcoal relative overflow-hidden">
            {/* Soft Background Gradients */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#E9D5FF] rounded-full mix-blend-multiply filter blur-[100px] opacity-40" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#D1FAE5] rounded-full mix-blend-multiply filter blur-[100px] opacity-40" />
            </div>

            {/* Minimal Header */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 mb-16 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors group"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Wellness
                </button>
                <div className="flex gap-4">
                    <div className={`h-1 w-12 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-charcoal' : 'bg-charcoal/10'}`} />
                    <div className={`h-1 w-12 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-charcoal' : 'bg-charcoal/10'}`} />
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Main Form Area */}
                <div className="lg:col-span-8">
                    {isNavigationInvalid && step === 1 && (
                        <div className="mb-12 p-6 bg-rose-50 border border-rose-100 rounded-3xl flex items-center gap-4 text-rose-900">
                            <Sparkles size={20} />
                            <p className="text-sm">Please select a treatment from our Wellness Menu before proceeding.</p>
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
                                        <h1 className="font-serif text-5xl mb-4 text-charcoal">Guest Details.</h1>
                                        <p className="text-charcoal/60 font-light">Tell us who will be receiving these ethereal treatments.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40">First Name</label>
                                            <input
                                                {...register("firstName")}
                                                type="text"
                                                className={`w-full bg-white/60 backdrop-blur-md border ${errors.firstName ? 'border-rose-300' : 'border-charcoal/10'} rounded-2xl px-6 py-4 outline-none focus:border-charcoal/30 transition-colors`}
                                                placeholder="Alex"
                                            />
                                            {errors.firstName && <p className="text-rose-500 text-[10px] tracking-wide mt-1">{errors.firstName.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40">Last Name</label>
                                            <input
                                                {...register("lastName")}
                                                type="text"
                                                className={`w-full bg-white/60 backdrop-blur-md border ${errors.lastName ? 'border-rose-300' : 'border-charcoal/10'} rounded-2xl px-6 py-4 outline-none focus:border-charcoal/30 transition-colors`}
                                                placeholder="Rivers"
                                            />
                                            {errors.lastName && <p className="text-rose-500 text-[10px] tracking-wide mt-1">{errors.lastName.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40">Email Address</label>
                                            <input
                                                {...register("email")}
                                                type="email"
                                                className={`w-full bg-white/60 backdrop-blur-md border ${errors.email ? 'border-rose-300' : 'border-charcoal/10'} rounded-2xl px-6 py-4 outline-none focus:border-charcoal/30 transition-colors`}
                                                placeholder="alex@ethereal.com"
                                            />
                                            {errors.email && <p className="text-rose-500 text-[10px] tracking-wide mt-1">{errors.email.message}</p>}
                                        </div>
                                        <div className="space-y-2 flex flex-col justify-center">
                                            <label className="text-[10px] uppercase tracking-widest text-charcoal/40">Preferred Date</label>
                                            <div className={`w-full bg-white/60 backdrop-blur-md border ${errors.preferredDate ? 'border-rose-300' : 'border-charcoal/10'} rounded-2xl px-6 py-4 transition-colors cursor-pointer hover:border-charcoal/30 flex items-center`}>
                                                <Controller
                                                    control={control}
                                                    name="preferredDate"
                                                    render={({ field }) => (
                                                        <DatePicker
                                                            selected={field.value ? new Date(field.value) : null}
                                                            onChange={(date: Date | null) => field.onChange(date?.toISOString() || "")}
                                                            customInput={
                                                                <button type="button" className="text-left font-serif text-lg text-charcoal outline-none w-full bg-transparent flex items-center justify-between">
                                                                    {formatDate(field.value ? new Date(field.value) : null)}
                                                                    <CalendarIcon size={16} className="text-charcoal/40" />
                                                                </button>
                                                            }
                                                            minDate={new Date()}
                                                            placeholderText="Select Date"
                                                            popperPlacement="bottom-start"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            {errors.preferredDate && <p className="text-rose-500 text-[10px] tracking-wide mt-1">{errors.preferredDate.message}</p>}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!!(errors.firstName || errors.lastName || errors.email || errors.preferredDate) || isNavigationInvalid}
                                        className="w-full md:w-auto px-12 py-5 bg-charcoal text-white rounded-full flex items-center justify-center gap-3 group transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-charcoal/10"
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
                                        <h1 className="font-serif text-5xl mb-4 text-charcoal">Payment.</h1>
                                        <p className="text-charcoal/60 font-light">Secure your wellness session.</p>
                                    </div>

                                    <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border border-charcoal/10 space-y-8 shadow-sm">
                                        <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-charcoal/5">
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
                                                    className="w-full bg-white border border-charcoal/10 rounded-2xl px-6 py-4 outline-none focus:border-charcoal/30"
                                                    placeholder="**** **** **** ****"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest text-charcoal/40">Expiry Date</label>
                                                <input
                                                    {...register("expiry")}
                                                    type="text"
                                                    className="w-full bg-white border border-charcoal/10 rounded-2xl px-6 py-4 outline-none focus:border-charcoal/30"
                                                    placeholder="MM/YY"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest text-charcoal/40">CVC</label>
                                                <input
                                                    {...register("cvc")}
                                                    type="text"
                                                    className="w-full bg-white border border-charcoal/10 rounded-2xl px-6 py-4 outline-none focus:border-charcoal/30"
                                                    placeholder="***"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="px-12 py-5 border border-charcoal/20 bg-white/40 backdrop-blur-md text-charcoal rounded-full text-xs uppercase tracking-[0.2em] hover:bg-white transition-all font-bold"
                                        >
                                            Go Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-12 py-5 bg-charcoal text-white rounded-full flex items-center justify-center gap-3 group transition-all shadow-xl shadow-charcoal/20 disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <span className="text-xs uppercase tracking-[0.2em] font-bold">Confirm Booking: ${total.toLocaleString()}</span>
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
                    <div className="bg-white/40 backdrop-blur-xl border border-charcoal/10 rounded-[2.5rem] p-10 space-y-10 shadow-xl">
                        <div>
                            <h2 className="text-[10px] uppercase tracking-widest text-charcoal/40 mb-6 font-bold flex items-center gap-2">
                                <Sparkles size={12} />
                                Selected Rituals
                            </h2>

                            {selectedTreatments.length > 0 ? (
                                <ul className="space-y-4 mb-6">
                                    {selectedTreatments.map((t: string, idx: number) => (
                                        <li key={idx} className="flex justify-between items-center border-b border-charcoal/5 pb-4 last:border-0 last:pb-0">
                                            <span className="font-serif text-lg text-charcoal leading-tight">{t}</span>
                                            <span className="text-sm font-medium text-charcoal/60">${treatmentPrice}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-charcoal/50 italic mb-6">No treatments selected.</p>
                            )}

                            <div className="space-y-6 border-t border-charcoal/10 pt-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-charcoal/60">Subtotal ({selectedTreatments.length} items)</span>
                                        <span className="font-medium text-charcoal">${subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-charcoal/60">VAT & Taxes</span>
                                        <span className="font-medium text-charcoal">${taxes.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-charcoal/10 flex justify-between items-end">
                            <span className="font-serif text-xl text-charcoal italic">Total Price</span>
                            <div className="text-right">
                                <span className="font-serif text-4xl leading-none text-charcoal">${total.toLocaleString()}</span>
                                <p className="text-[10px] uppercase tracking-widest text-charcoal/40 mt-2">Drawn in local currency</p>
                            </div>
                        </div>

                        <div className="bg-white/60 p-6 rounded-3xl border border-white flex gap-4">
                            <ShieldCheck size={20} className="text-emerald-700/60" />
                            <p className="text-[11px] leading-relaxed text-charcoal/70">
                                Guaranteed serenity. Reschedule free of charge up to 24h prior to your appointment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
