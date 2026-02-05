export interface MenuItem {
    name: string;
    description: string;
    ingredients?: string;
    price: string;
    tags?: string[];
    image?: string;
}

export interface DiningMenu {
    breakfast: MenuItem[];
    lunch: MenuItem[];
    dinner: MenuItem[];
    wine: MenuItem[];
}

export const diningData: DiningMenu = {
    breakfast: [
        { name: "Organic Acai Bowl", description: "Wild-harvested acai, seasonal rainforest fruits, house-made granola, and stingless bee honey.", price: "$24", tags: ["Vegan", "Gluten-Free"], image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300" },
        { name: "Truffle Cloud Eggs", description: "Whipped egg whites, shaved black truffle, sourdough crisps, and cultured macadamia butter.", price: "$32", image: "https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=300" },
        { name: "Green Goddess Omelette", description: "Farm-fresh eggs, baby spinach, avocado, local herbs, and goat's cheese mousse.", price: "$28", tags: ["Vegetarian"], image: "https://images.pexels.com/photos/6294356/pexels-photo-6294356.jpeg?auto=compress&cs=tinysrgb&w=300" }
    ],
    lunch: [
        { name: "Pacific Reef Carpaccio", description: "Thinly sliced wild snapper, finger lime, pickled sea grapes, and cold-pressed olive oil.", price: "$38", tags: ["Raw", "Sustainable"], image: "https://images.pexels.com/photos/17650165/pexels-photo-17650165/free-photo-of-close-up-of-traditional-japanese-dish.jpeg?auto=compress&cs=tinysrgb&w=300" },
        { name: "Ancient Grain Salad", description: "Quinoa, amaranth, roasted root vegetables, pomegranate, and tahini-lemon dressing.", price: "$34", tags: ["Vegan"], image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=300" },
        { name: "Wood-Fired Octopus", description: "Charred lagoon octopus, smoked paprika, saffron emulsions, and crispy chickpeas.", price: "$42", image: "https://images.pexels.com/photos/2827263/pexels-photo-2827263.jpeg?auto=compress&cs=tinysrgb&w=300" }
    ],
    dinner: [
        { name: "Dusky Wagyu Fillet", description: "30-day aged wagyu, charcoal-roasted marrow, wild mushrooms, and red wine reduction.", price: "$85", image: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=300" },
        { name: "Seabass in Salt Crust", description: "Whole local seabass baked in sea salt, served with lemon myrtle and steamed greens.", price: "$72", tags: ["Signature"], image: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=300" },
        { name: "Truffle Forest Risotto", description: "Acquerello rice, found forest mushrooms, 24-month parmesan, and fresh truffle shavings.", price: "$58", tags: ["Vegetarian"], image: "https://images.pexels.com/photos/8991845/pexels-photo-8991845.jpeg?auto=compress&cs=tinysrgb&w=300" }
    ],
    wine: [
        { name: "Cloudy Bay Sauvignon", description: "Marlborough, NZ. Vibrant, aromatic, with notes of lime and grapefruit.", price: "$120", image: "https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&cs=tinysrgb&w=300" },
        { name: "Opus One 2018", description: "Napa Valley, USA. Rich, complex, with velvety tannins and dark fruit.", price: "$450", image: "https://images.pexels.com/photos/2042220/pexels-photo-2042220.jpeg?auto=compress&cs=tinysrgb&w=300" },
        { name: "Dom Pérignon", description: "Champagne, FR. Precise, crystalline, with delicate floral notes.", price: "$380", image: "https://images.pexels.com/photos/317181/pexels-photo-317181.jpeg?auto=compress&cs=tinysrgb&w=300" }
    ]
};

export const menuItems: MenuItem[] = [
    { name: "Dusky Wagyu Fillet", description: "30-day aged wagyu...", ingredients: "30-day aged wagyu, charcoal-roasted marrow, wild mushrooms", price: "$85" },
    { name: "Pacific Reef Carpaccio", description: "Sustainably sourced...", ingredients: "Wild snapper, finger lime, pickled sea grapes", price: "$38" },
    { name: "Lake Retreat Soup", description: "Local watercress...", ingredients: "Watercress, organic cream, roasted seeds", price: "$26" }
];
