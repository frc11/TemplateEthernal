import { Wifi, Waves, Utensils, Flower2, Car, ConciergeBell, Wine, Sun, LucideIcon } from 'lucide-react';

export interface Service {
    id: number;
    name: string;
    icon: LucideIcon;
}

export const services: Service[] = [
    { id: 1, name: "High-Speed Wifi", icon: Wifi },
    { id: 2, name: "Infinity Pool", icon: Waves },
    { id: 3, name: "Gourmet Dining", icon: Utensils },
    { id: 4, name: "Holistic Spa", icon: Flower2 },
    { id: 5, name: "Valet Parking", icon: Car },
    { id: 6, name: "24/7 Concierge", icon: ConciergeBell },
    { id: 7, name: "Private Cellar", icon: Wine },
    { id: 8, name: "Private Beach", icon: Sun },
];
