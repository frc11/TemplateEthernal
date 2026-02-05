import { ArrowRight, Calendar, Users } from 'lucide-react';

export default function BookingWidget() {
    return (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 hidden md:block">
            <div className="flex items-center gap-2 p-2 pr-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/20 shadow-lg">

                {/* Check-in */}
                <div className="flex items-center gap-3 px-6 py-2 border-r border-white/10 cursor-pointer hover:bg-white/10 rounded-l-full transition-colors">
                    <Calendar className="w-4 h-4 text-charcoal/60" />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-charcoal/50 font-medium">Check-in</span>
                        <span className="text-sm font-serif text-charcoal">Add Date</span>
                    </div>
                </div>

                {/* Check-out */}
                <div className="flex items-center gap-3 px-6 py-2 border-r border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                    <Calendar className="w-4 h-4 text-charcoal/60" />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-charcoal/50 font-medium">Check-out</span>
                        <span className="text-sm font-serif text-charcoal">Add Date</span>
                    </div>
                </div>

                {/* Guests */}
                <div className="flex items-center gap-3 px-6 py-2 cursor-pointer hover:bg-white/10 rounded-r-full transition-colors mr-2">
                    <Users className="w-4 h-4 text-charcoal/60" />
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-charcoal/50 font-medium">Guests</span>
                        <span className="text-sm font-serif text-charcoal">2 Adults</span>
                    </div>
                </div>

                {/* CTA */}
                <button className="h-12 w-12 rounded-full bg-charcoal flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-md">
                    <ArrowRight className="w-5 h-5 text-cream" />
                </button>

            </div>
        </div>
    )
}
