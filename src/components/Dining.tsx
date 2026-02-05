import { motion } from 'framer-motion';

const menuItems = [
    {
        name: "Seared Scallops",
        price: "$42",
        ingredients: "Cauliflower purée, truffle oil, micro-greens."
    },
    {
        name: "Wild Mushroom Risotto",
        price: "$38",
        ingredients: "Arborio rice, porcini dust, parmesan crisp."
    },
    {
        name: "Pan-Roasted Sea Bass",
        price: "$55",
        ingredients: "Saffron broth, fennel confit, citrus foam."
    },
    {
        name: "Herb-Crusted Lamb",
        price: "$65",
        ingredients: "Rosemary reduction, root vegetable pavé."
    },
    {
        name: "Dark Chocolate Tart",
        price: "$24",
        ingredients: "Sea salt, raspberry coulis, gold leaf."
    }
];

export default function Dining() {
    return (
        <section className="min-h-screen bg-cream flex flex-col md:flex-row items-center overflow-hidden">

            {/* Left: Rotating Visual */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center relative bg-[#EBEBE6]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] rounded-full overflow-hidden shadow-2xl"
                >
                    <img
                        src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Culinary Masterpiece"
                        className="w-full h-full object-cover scale-110"
                    />
                </motion.div>
                {/* Decorative Circle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] border border-charcoal/5 rounded-full" />
                </div>
            </div>

            {/* Right: Menu */}
            <div className="w-full md:w-1/2 min-h-[50vh] flex flex-col justify-center px-8 md:px-20 py-20">
                <h2 className="text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-12">Culinary Arts</h2>

                <div className="flex flex-col gap-8">
                    {menuItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="group cursor-pointer"
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                        >
                            <div className="flex justify-between items-baseline mb-2 text-charcoal">
                                <h3 className="font-serif text-2xl md:text-3xl">{item.name}</h3>
                                <span className="font-medium text-lg text-charcoal/60">{item.price}</span>
                            </div>

                            {/* Divider Line */}
                            <motion.div
                                variants={{
                                    rest: { width: "100%", backgroundColor: "rgba(26, 26, 26, 0.1)", height: "1px" },
                                    hover: { width: "100%", backgroundColor: "rgba(26, 26, 26, 0.8)", height: "2px" }
                                }}
                                className="w-full h-px bg-charcoal/10 origin-left"
                            />

                            {/* Ingredients Reveal */}
                            <motion.div
                                variants={{
                                    rest: { height: 0, opacity: 0, marginTop: 0 },
                                    hover: { height: "auto", opacity: 1, marginTop: 8 }
                                }}
                                className="overflow-hidden"
                            >
                                <p className="text-sm font-light text-charcoal/70 italic">
                                    {item.ingredients}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16">
                    <button className="text-xs uppercase tracking-widest border-b border-charcoal/30 pb-1 hover:border-charcoal transition-colors">
                        View Full Menu
                    </button>
                </div>
            </div>

        </section>
    );
}
