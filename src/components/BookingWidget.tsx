import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import DatePicker from 'react-datepicker';
import { motion, AnimatePresence } from 'framer-motion';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/datepicker.css';

interface BookingWidgetProps {
    isStatic?: boolean;
}

export default function BookingWidget({ isStatic = false }: BookingWidgetProps) {
    const navigate = useNavigate();
    const { booking, setCheckIn, setCheckOut, setGuests } = useBooking();
    const [isGuestPopupOpen, setIsGuestPopupOpen] = useState(false);
    const guestPopupRef = useRef<HTMLDivElement>(null);

    const [isSearching, setIsSearching] = useState(false);

    // Close guest popup on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (guestPopupRef.current && !guestPopupRef.current.contains(event.target as Node)) {
                setIsGuestPopupOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "Add Date";
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const handleCtaClick = () => {
        if (isStatic || booking.roomTypeId) {
            navigate('/checkout');
        } else {
            setIsSearching(true);
            setTimeout(() => {
                setIsSearching(false);
                navigate('/rooms');
            }, 2000);
        }
    };

    return (
        <div id="booking" className={`${isStatic ? 'relative w-full' : 'absolute bottom-12 left-1/2 -translate-x-1/2 z-30 hidden md:block w-fit'}`}>
            <AnimatePresence>
                {isSearching && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-charcoal text-cream px-6 py-4 rounded-full shadow-2xl z-50 flex items-center gap-3 whitespace-nowrap font-serif tracking-wide border border-white/10"
                    >
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                        <span className="text-sm">Buscando habitaciones con disponibilidad para estas fechas...</span>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className={`flex flex-col md:flex-row items-stretch md:items-center bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-charcoal/5 p-2 md:p-3 ${isStatic ? 'rounded-3xl' : 'rounded-3xl md:rounded-full'}`}>

                {/* Check In */}
                <div className="flex-1 px-6 py-3 border-b md:border-b-0 md:border-r border-charcoal/5 cursor-pointer hover:bg-stone-50 transition-colors rounded-t-2xl md:rounded-l-full md:rounded-tr-none flex flex-col justify-center min-w-[160px]">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-bold mb-1">Check-In</span>
                    <DatePicker
                        selected={booking.checkIn ? new Date(booking.checkIn) : null}
                        onChange={(date: Date | null) => setCheckIn(date?.toISOString() || null)}
                        customInput={
                            <button className="text-left font-serif text-lg text-charcoal outline-none w-full">
                                {formatDate(booking.checkIn)}
                            </button>
                        }
                        minDate={new Date()}
                        placeholderText="Add date"
                        popperPlacement={isStatic ? "bottom-start" : "top-start"}
                    />
                </div>

                {/* Check Out */}
                <div className="flex-1 px-6 py-3 border-b md:border-b-0 md:border-r border-charcoal/5 cursor-pointer hover:bg-stone-50 transition-colors flex flex-col justify-center min-w-[160px]">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-bold mb-1">Check-Out</span>
                    <DatePicker
                        selected={booking.checkOut ? new Date(booking.checkOut) : null}
                        onChange={(date: Date | null) => setCheckOut(date?.toISOString() || null)}
                        customInput={
                            <button className="text-left font-serif text-lg text-charcoal outline-none w-full">
                                {formatDate(booking.checkOut)}
                            </button>
                        }
                        minDate={booking.checkIn ? new Date(booking.checkIn) : new Date()}
                        placeholderText="Add date"
                        popperPlacement={isStatic ? "bottom-start" : "top-start"}
                    />
                </div>

                {/* Guests */}
                <div className="relative flex-1 px-6 py-3 cursor-pointer hover:bg-stone-50 transition-colors md:rounded-r-full flex flex-col justify-center min-w-[160px]" ref={guestPopupRef}>
                    <div onClick={() => setIsGuestPopupOpen(!isGuestPopupOpen)} className="w-full">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 font-bold mb-1 whitespace-nowrap">Guests</span>
                        <div className="font-serif text-lg text-charcoal">
                            {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                        </div>
                    </div>

                    <AnimatePresence>
                        {isGuestPopupOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: isStatic ? 10 : -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: isStatic ? 10 : -10, scale: 0.95 }}
                                className={`absolute ${isStatic ? 'top-full mt-4' : 'bottom-full mb-4'} left-0 md:left-auto md:right-0 bg-white p-6 rounded-3xl shadow-2xl border border-charcoal/5 z-50 min-w-[240px]`}
                            >
                                <div className="flex items-center justify-between gap-12">
                                    <div>
                                        <div className="text-sm font-bold text-charcoal">Adults</div>
                                        <div className="text-[10px] text-charcoal/40 uppercase tracking-widest">Ages 13+</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setGuests(Math.max(1, booking.guests - 1))}
                                            className="w-8 h-8 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="font-serif text-lg w-4 text-center">{booking.guests}</span>
                                        <button
                                            onClick={() => setGuests(Math.min(4, booking.guests + 1))}
                                            className="w-8 h-8 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* CTA */}
                <div className="p-1 flex justify-center md:block">
                    <button
                        onClick={handleCtaClick}
                        disabled={isSearching}
                        className="bg-charcoal text-cream h-14 w-14 rounded-full flex items-center justify-center hover:bg-black transition-all group disabled:opacity-80 disabled:cursor-not-allowed"
                    >
                        {isSearching ? (
                            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                        ) : (
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}

