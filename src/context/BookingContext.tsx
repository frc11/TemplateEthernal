import { createContext, useContext, useState, ReactNode } from 'react';

interface BookingState {
    checkIn: string | null;
    checkOut: string | null;
    guests: number;
    roomTypeId: number | null;
}

interface BookingContextType {
    booking: BookingState;
    setCheckIn: (date: string | null) => void;
    setCheckOut: (date: string | null) => void;
    setGuests: (count: number) => void;
    setRoomType: (id: number | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
    const [booking, setBooking] = useState<BookingState>({
        checkIn: null,
        checkOut: null,
        guests: 2,
        roomTypeId: null
    });

    const setCheckIn = (date: string | null) => setBooking(prev => ({ ...prev, checkIn: date }));
    const setCheckOut = (date: string | null) => setBooking(prev => ({ ...prev, checkOut: date }));
    const setGuests = (count: number) => setBooking(prev => ({ ...prev, guests: count }));
    const setRoomType = (id: number | null) => setBooking(prev => ({ ...prev, roomTypeId: id }));

    return (
        <BookingContext.Provider value={{ booking, setCheckIn, setCheckOut, setGuests, setRoomType }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
