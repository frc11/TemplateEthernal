import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Mail, Info, CheckCircle2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface TableReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TABLES = [
    { id: 1, type: '2-top', x: 80, y: 80, width: 40, height: 40, status: 'available' as const },
    { id: 2, type: '2-top', x: 80, y: 200, width: 40, height: 40, status: 'occupied' as const },
    { id: 3, type: '4-top', x: 200, y: 80, width: 60, height: 60, status: 'available' as const },
    { id: 4, type: '4-top', x: 200, y: 190, width: 60, height: 60, status: 'available' as const },
    { id: 5, type: '6-top', x: 340, y: 80, width: 80, height: 60, status: 'occupied' as const },
    { id: 6, type: '2-top', x: 360, y: 200, width: 40, height: 40, status: 'available' as const },
    { id: 7, type: '4-top', x: 460, y: 140, width: 60, height: 60, status: 'available' as const },
];

export default function TableReservationModal({ isOpen, onClose }: TableReservationModalProps) {
    const [selectedTable, setSelectedTable] = useState<number | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const timeSlots = ["20:00", "20:30", "21:00", "21:30", "22:00"];

    if (!isOpen) return null;

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedTable && date && selectedTime) {
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setSelectedTable(null);
                setDate(null);
                setSelectedTime(null);
                onClose();
            }, 3000);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 lg:p-12 overflow-y-auto"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="w-full max-w-6xl bg-stone-50 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row relative min-h-[600px]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="fixed md:absolute top-4 right-4 lg:top-8 lg:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-charcoal/10 flex items-center justify-center text-charcoal/60 hover:text-charcoal transition-all z-[110] hover:bg-stone-100 shadow-md md:shadow-none"
                    >
                        <X size={20} />
                    </button>

                    {isSubmitted ? (
                        <div className="w-full flex items-center justify-center flex-col p-12 text-center h-full min-h-[600px]">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                                className="mb-8 text-green-700"
                            >
                                <CheckCircle2 size={80} strokeWidth={1} />
                            </motion.div>
                            <h2 className="font-serif text-5xl text-charcoal mb-4">Table Secured</h2>
                            <p className="text-charcoal/60 text-lg max-w-md">
                                Your reservation for Table {selectedTable} has been confirmed. We eagerly await your arrival.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Left Side: Interactive Map */}
                            <div className="w-full lg:w-1/2 bg-white relative p-6 md:p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-charcoal/10 flex flex-col pt-16 md:pt-8">
                                <div className="mb-10 text-center lg:text-left">
                                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-charcoal/40 mb-2">Spatial Layout</h3>
                                    <p className="font-serif text-3xl text-charcoal">Select Your Table</p>
                                </div>

                                <div className="flex-1 flex items-center justify-center w-full relative">
                                    {/* The SVG Restaurant Floor Plan */}
                                    <svg viewBox="0 0 600 400" className="w-full h-auto max-w-[500px] drop-shadow-xl bg-stone-100 rounded-3xl border border-charcoal/5">
                                        <defs>
                                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-charcoal/5" />
                                            </pattern>
                                        </defs>

                                        {/* Background Grid */}
                                        <rect width="100%" height="100%" fill="url(#grid)" rx="24" />

                                        {/* Plant decorations / Walls */}
                                        <rect x="0" y="0" width="600" height="20" fill="#2d2d2d" opacity="0.05" />
                                        <rect x="0" y="380" width="600" height="20" fill="#2d2d2d" opacity="0.05" />

                                        {/* Entrance Text */}
                                        <text x="300" y="370" textAnchor="middle" className="text-[10px] tracking-[0.4em] fill-charcoal/20 font-bold uppercase">Entrance</text>

                                        {/* Map the Tables */}
                                        {TABLES.map((table) => {
                                            const isSelected = selectedTable === table.id;
                                            const isOccupied = table.status === 'occupied';

                                            let fillColor = 'white';
                                            let strokeColor = '#e5e5e5'; // charcoal/10
                                            let cursor = 'pointer';

                                            if (isOccupied) {
                                                fillColor = '#f5f5f4'; // stone-100
                                                strokeColor = '#d4d4d8';
                                                cursor = 'not-allowed';
                                            } else if (isSelected) {
                                                fillColor = '#1a1a1a'; // charcoal
                                                strokeColor = '#1a1a1a';
                                            }

                                            return (
                                                <g
                                                    key={table.id}
                                                    transform={`translate(${table.x}, ${table.y})`}
                                                    onClick={() => !isOccupied && setSelectedTable(table.id)}
                                                    className={`transition-all duration-300 ${!isOccupied ? 'hover:opacity-80' : ''}`}
                                                    style={{ cursor }}
                                                >
                                                    {/* Table Shape (Circle or Rect) */}
                                                    {table.type === '2-top' ? (
                                                        <circle
                                                            cx={table.width / 2}
                                                            cy={table.height / 2}
                                                            r={table.width / 2}
                                                            fill={fillColor}
                                                            stroke={strokeColor}
                                                            strokeWidth="2"
                                                        />
                                                    ) : (
                                                        <rect
                                                            width={table.width}
                                                            height={table.height}
                                                            rx="8"
                                                            fill={fillColor}
                                                            stroke={strokeColor}
                                                            strokeWidth="2"
                                                        />
                                                    )}

                                                    {/* Table Number Text */}
                                                    <text
                                                        x={table.width / 2}
                                                        y={(table.height / 2) + 4}
                                                        textAnchor="middle"
                                                        className={`text-xs font-serif ${isSelected ? 'fill-white' : (isOccupied ? 'fill-charcoal/30' : 'fill-charcoal')}`}
                                                    >
                                                        {table.id}
                                                    </text>

                                                    {/* Occupied X mark */}
                                                    {isOccupied && (
                                                        <text
                                                            x={table.width / 2}
                                                            y={(table.height / 2) + 24}
                                                            textAnchor="middle"
                                                            className="text-[8px] tracking-[0.2em] uppercase font-bold fill-charcoal/30"
                                                        >
                                                            Taken
                                                        </text>
                                                    )}
                                                </g>
                                            );
                                        })}
                                    </svg>
                                </div>

                                {/* Map Legend */}
                                <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-xs text-charcoal/60 uppercase tracking-widest font-bold">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full border border-charcoal/20 bg-white" />
                                        <span>Available</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-stone-200 border border-stone-300" />
                                        <span>Occupied</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-charcoal" />
                                        <span>Selected</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Reservation Details Form */}
                            <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-16 flex flex-col justify-center bg-stone-50">
                                <div className="mb-10 text-center lg:text-left">
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-charcoal/40 mb-2 block">The Details</span>
                                    <h2 className="font-serif text-4xl text-charcoal">Complete Request</h2>
                                </div>

                                <form onSubmit={handleConfirm} className="space-y-8 flex-1">

                                    {/* Date Selection */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/60 flex items-center gap-2">
                                            <Calendar size={12} /> Date & Time
                                        </label>
                                        <div className="w-full border-b border-charcoal/20 pb-2">
                                            <DatePicker
                                                selected={date}
                                                onChange={(d: Date | null) => setDate(d)}
                                                dateFormat="MMMM d, yyyy"
                                                minDate={new Date()}
                                                placeholderText="Select your preference..."
                                                className="w-full bg-transparent outline-none font-serif text-xl text-charcoal placeholder:text-charcoal/30 cursor-pointer"
                                                required
                                            />
                                        </div>

                                        {/* Custom Time Selection Buttons */}
                                        <div className="animate-fade-in flex flex-wrap gap-2 pt-2">
                                            {timeSlots.map((time) => (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`px-4 py-2 rounded-full text-xs font-serif transition-colors ${selectedTime === time
                                                        ? 'bg-charcoal text-white shadow-md'
                                                        : 'bg-stone-200/50 text-charcoal/60 hover:bg-stone-200 hover:text-charcoal'
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Guest Name */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/60 flex items-center gap-2">
                                            <User size={12} /> Guest Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            required
                                            className="w-full bg-transparent border-b border-charcoal/20 pb-2 outline-none font-serif text-xl text-charcoal placeholder:text-charcoal/30 focus:border-charcoal transition-colors"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/60 flex items-center gap-2">
                                            <Mail size={12} /> Email Address
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            required
                                            className="w-full bg-transparent border-b border-charcoal/20 pb-2 outline-none font-serif text-xl text-charcoal placeholder:text-charcoal/30 focus:border-charcoal transition-colors"
                                        />
                                    </div>

                                    {/* Dietary / Requests */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/60 flex items-center gap-2">
                                            <Info size={12} /> Dietary Requirements
                                        </label>
                                        <textarea
                                            placeholder="Any allergies or special occasions?"
                                            rows={2}
                                            className="w-full bg-transparent border-b border-charcoal/20 pb-2 outline-none font-serif text-xl text-charcoal placeholder:text-charcoal/30 focus:border-charcoal transition-colors resize-none"
                                        />
                                    </div>

                                    {/* Confirmation Summary */}
                                    <div className="pt-8">
                                        <button
                                            type="submit"
                                            disabled={!selectedTable || !date || !selectedTime}
                                            className="w-full bg-charcoal text-cream py-6 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-charcoal/20"
                                        >
                                            {!selectedTable ? 'Select a Table' : !date ? 'Select Date' : !selectedTime ? 'Select Time' : 'Confirm Reservation'}
                                        </button>
                                        <p className="text-center mt-4 text-[10px] uppercase tracking-widest text-charcoal/40">
                                            Table {selectedTable ? selectedTable : '-'} • Modifiable up to 24h prior
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
