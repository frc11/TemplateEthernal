export interface Treatment {
    name: string;
    duration: string;
    price: string;
    description: string;
    category: 'Massages' | 'Facials' | 'Holistic';
}

export const wellnessData: Record<Treatment['category'], Treatment[]> = {
    Massages: [
        { name: "Deep Forest Ritual", duration: "90 min", price: "$280", category: 'Massages', description: "A full-body massage using warm volcanic stones and cedarwood essential oils to ground the spirit." },
        { name: "Ancient Fern Mud Wrap", duration: "90 min", price: "$260", category: 'Massages', description: "Detoxifying body wrap using local geothermal clay and botanical infusions." }
    ],
    Facials: [
        { name: "Luminous Marine Facial", duration: "60 min", price: "$220", category: 'Facials', description: "Advanced cellular renewal using bioactive sea minerals and oxygen therapy for a radiant glow." }
    ],
    Holistic: [
        { name: "Mirror Lake Float", duration: "45 min", price: "$150", category: 'Holistic', description: "Zero-gravity sensory deprivation tank experience filled with mineral-rich salts." },
        { name: "Crystal Vibrational Healing", duration: "75 min", price: "$240", category: 'Holistic', description: "Sound therapy and gemstone alignment to rebalance your subtle energy centers." }
    ]
};

export const treatments: Treatment[] = Object.values(wellnessData).flat();
