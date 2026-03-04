export interface Room {
    id: number;
    name: string;
    price: string;
    image: string;
    gallery: string[];
    description: string;
    longDescription: string;
    amenities: string[];
    category: 'Suites' | 'Villas' | 'View' | 'Ocean';
}

export const rooms: Room[] = [
    {
        id: 1,
        name: "The Ocean Suite",
        price: "$850",
        image: "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?q=80&w=2574&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?q=80&w=2574&auto=format&fit=crop",
            "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ],
        description: "Suspended over the azure waters, the Ocean Suite offers an intimate connection with the horizon.",
        longDescription: "Experience the ultimate coastal sanctuary. The Ocean Suite is meticulously designed to dissolve the boundaries between your private living space and the vast Pacific. Featuring sustainable teak wood, artisanal stone finishes, and floor-to-ceiling retractable glass walls, every moment here is a dialogue with the tides. Enjoy a private infinity pool that seems to spill directly into the ocean, and a dedicated butler to curate your every need.",
        amenities: ["Private Infinity Pool", "Direct Ocean Access", "24/7 Butler Service", "Rain Shower", "Ocean-safe Toiletries", "Private Bar"],
        category: 'Suites'
    },
    {
        id: 2,
        name: "Forest Hideaway",
        price: "$650",
        image: "https://images.pexels.com/photos/7061662/pexels-photo-7061662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        gallery: [
            "https://images.pexels.com/photos/7061662/pexels-photo-7061662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ],
        description: "Nestled deep within the ancient ferns, this hideaway is a sanctuary of earth and wood.",
        longDescription: "Find true stillness among the whispering pines. The Forest Hideaway is a biophilic masterpiece, built using reclaimed timber and local stone to blend seamlessly into the lush canopy. The interior features a warming central fireplace, organic cotton linens, and a hidden meditation deck. The sounds of the forest become your natural soundtrack, providing a profound sense of isolation and peace.",
        amenities: ["Outdoor Stone Bath", "Fireplace", "Forest Meditation Deck", "Organic Minibar", "Yoga Mats", "Binoculars"],
        category: 'Villas'
    },
    {
        id: 3,
        name: "Sky Penthouse",
        price: "$1,200",
        image: "https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        gallery: [
            "https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ],
        description: "Perched at the highest peak, the Sky Penthouse commands a 360-degree view of the island.",
        longDescription: "Your private observatory above the clouds. The Sky Penthouse is the crown jewel of The Ethereal, offering unparalleled panoramic views. With a sprawling rooftop terrace, a state-of-the-art telescope, and a private chef's kitchen, it is designed for grand experiences and intimate stargazing. The minimalist luxury of the interior allows the majestic landscape to take center stage.",
        amenities: ["Private Rooftop Terrace", "Jacuzzi", "Telescope for Stargazing", "Chef's Kitchen", "Wine Cellar", "Private Lift"],
        category: 'Suites'
    },
    {
        id: 4,
        name: "Canyon Villa",
        price: "$950",
        image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        gallery: [
            "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ],
        description: "Carved into the rugged cliffs, the Canyon Villa blends raw stone textures with soft luxurious fabrics.",
        longDescription: "A fortress of solitude carved directly into the ancient canyon walls. This villa celebrates the raw power of geology, featuring natural stone walls and cool concrete floors layered with plush hand-knotted rugs. A heated outdoor plunge pool offers dramatic views of the gorge below, while a private 'cave' dining area provides a unique setting for subterranean culinary experiences.",
        amenities: ["Heated Plunge Pool", "Private Cave Dining", "Massage Room", "Sound System", "Fire Pit", "Copper Bathtub"],
        category: 'Villas'
    },
    {
        id: 5,
        name: "Lake Retreat",
        price: "$700",
        image: "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        gallery: [
            "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/261108/pexels-photo-261108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ],
        description: "Reflecting the calm waters of the Mirror Lake, this retreat is designed for absolute stillness.",
        longDescription: "Surrender to the silence of the Mirror Lake. The Lake Retreat is a minimalist masterpiece, hovering gently over the water on a series of slender piles. The design emphasizes horizontal lines and open spaces, inviting the glassy surface of the lake into your living room. With a private dock and personal kayaks, it is the perfect base for quiet aquatic exploration or simple meditative reflection.",
        amenities: ["Private Dock", "Kayak Included", "Floating Yoga Deck", "Moonlight Cinema", "Record Player", "Library"],
        category: 'View'
    }
];
