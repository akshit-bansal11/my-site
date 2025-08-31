//--------------------|    DEPENDENCIES    |--------------------//
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


//--------------------|       ICONS        |--------------------//
import { FaCheck, FaRegCopy, FaSpotify, FaAmazon, FaMeta, FaGoogle } from 'react-icons/fa6'
import { SiIkea, SiMcdonalds, SiNetflix, SiStarbucks, SiNvidia, } from "react-icons/si";
import { TbOlympics } from "react-icons/tb";


//--------------------|        HOOKS       |--------------------//
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";


//--------------------|        DATA        |--------------------//
const palettes = [

    // Popular Brands
    { name: "Spotify", Icon: FaSpotify, colors: ["#1EDD60", "#1B1716"], category: "Popular Brands" },
    { name: "IKEA", Icon: SiIkea, colors: ["#0058A3", "#FFDB00"], category: "Popular Brands" },
    { name: "Amazon", Icon: FaAmazon, colors: ["#FF6201", "#171D27"], category: "Popular Brands" },
    { name: "McDonalds", Icon: SiMcdonalds, colors: ["#DB0007", "#FFBC0D"], category: "Popular Brands" },
    { name: "Netflix", Icon: SiNetflix, colors: ["#B1060F", "#E50914", "#000000"], category: "Popular Brands" },
    { name: "Starbucks", Icon: SiStarbucks, colors: ["#006341", "#000000", "#FFFFFF"], category: "Popular Brands" },
    { name: "nVidia", Icon: SiNvidia, colors: ["#517C00", "#75B600", "#000000"], category: "Popular Brands" },
    { name: "Meta", Icon: FaMeta, colors: ["#0265E0", "#0080F9", "#1C2B33"], category: "Popular Brands" },
    { name: "Google", Icon: FaGoogle, colors: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"], category: "Popular Brands" },
    { name: "Olympics", Icon: TbOlympics, colors: ["#0081C8", "#000000", "#DF3D59", "#F0BA6A", "#00A651"], category: "Popular Brands" },

    // 3-Color
    { colors: ["#e74c3c", "#f39c12", "#f1c40f"], category: "3-color" },
    { colors: ["#e74c3c", "#f39c12", "#f1c40f"], category: "3-color" },
    { colors: ["#10367D", "#EBEBEB", "#74B4D9"], category: "3-color" },
    { colors: ["#05614B", "#020E0E", "#01DE82"], category: "3-color" },
    { colors: ["#FD0D02", "#FEA603", "#4D6802"], category: "3-color" },
    { colors: ["#0C0E0B", "#D6E7F3", "#D6303A"], category: "3-color" },

    // 4-Color
    { colors: ["#2c3e50", "#3498db", "#ecf0f1", "#95a5a6"], category: "4-color" },
    { colors: ["#16a085", "#27ae60", "#2ecc71", "#34495e"], category: "4-color" },
    { colors: ["#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"], category: "4-color" },

    // 5-Color
    { colors: ["#272727", "#484848", "#ffb900", "#009eff", "#d7d7d7"], category: "5-color" },
    { colors: ["#f0932b", "#eb4d4b", "#6ab04c", "#4834d4", "#30336b"], category: "5-color" },
    { colors: ["#a29bfe", "#ffeaa7", "#fab1a0", "#74b9ff", "#55efc4"], category: "5-color" }
];


//--------------------|     COMPONENT/S    |--------------------//
function ColorPalette({ colors, name, Icon }) {
    const [copied, copy] = useCopyToClipboard();
    const [copiedColor, setCopiedColor] = useState(null);

    const handleCopy = (color) => {
        copy(color);
        setCopiedColor(color);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="w-full flex flex-col rounded-xl overflow-hidden shadow-lg bg-neutral-800/50 border border-neutral-700/80"
        >
            <div className="flex h-32">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="w-full h-full cursor-pointer group relative"
                        style={{ backgroundColor: color }}
                        onClick={() => handleCopy(color)}
                    >
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-center flex-col gap-1">
                            <AnimatePresence>
                                {copied && copiedColor === color ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex flex-col items-center gap-1"
                                    >
                                        <FaCheck  className="text-green-400" />
                                    </motion.div>
                                ) : (
                                    <FaRegCopy  />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-3 flex flex-col items-center gap-2 bg-neutral-800">
                <div className="flex gap-2 items-center mb-4 mt-4">
                    {Icon && <Icon className="h-8 w-8 text-neutral-200" />}
                    {name && <p className="flex gap-10 text-sm font-semibold text-neutral-200">{name}</p>}
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center">
                    {colors.map((color, index) => (
                        <span key={index} className="text-xs font-mono text-neutral-400">{color}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}


//--------------------|    MAIN RENDER     |--------------------//
export default function CuratedPalettes() {

    const groupedPalettes = palettes.reduce((acc, palette) => {
        const { category } = palette;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(palette);
        return acc;
    }, {});

    const categoryOrder = ["Popular Brands", "2-color", "3-color", "4-color", "5-color"];
    const sortedCategories = categoryOrder.filter(cat => groupedPalettes[cat]);

    return (
        <div className="w-full flex flex-col gap-12">
            {sortedCategories.map(category => (
                <section key={category} className="flex flex-col gap-6">

                    <h2 className="text-2xl font-bold text-neutral-200 capitalize border-b border-neutral-700 pb-2">
                        {category === "Popular Brands" ? category : `${category} Palettes`}
                    </h2>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedPalettes[category].map((palette, index) => (
                            <ColorPalette key={index} {...palette} />
                        ))}
                    </div>

                </section>
            ))}
        </div>
    );
}