//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    DEPENDENCIES    |--------------------//
//--------------------|____________________|--------------------//
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|       ASSETS       |--------------------//
//--------------------|____________________|--------------------//

//--------------------|       ICONS        |--------------------//
import { IoColorPalette } from "react-icons/io5";
import { HiColorSwatch } from "react-icons/hi";
import { MdGradient } from "react-icons/md";



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|  UTILITY FUNCTIONS |--------------------//
//--------------------|____________________|--------------------//

//--------------------|    CARDS CONFIG    |--------------------//
const cardsConfig = [
    {
        name: "Colors",
        icon: IoColorPalette,
        description: "Browse ready-made color blocks, create your own with the color wheel, or browse beautiful 2-color to 5-color palettes to match your project’s style.",
    },
    {
        name: "Gradients",
        icon: MdGradient,
        description: "Discover smooth, modern gradients curated for different moods and themes.",
    },
]



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    MAIN RENDER     |--------------------//
//--------------------|____________________|--------------------//
export default function Tools() {

    const navigate = useNavigate();

    return (
        <div className="flex gap-10">
            {cardsConfig.map((card, index) => (
                <motion.button
                    onClick={() => navigate("/private/tools/" +
                        card.name
                            .trim()
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                    )}
                    key={index}
                    whileHover={{
                        scale: 1.05,
                        rotate: 1,
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="
                        group flex flex-col gap-2 justify-center
                        w-[250px] h-[250px]
                    "
                >
                    <div
                        className='
                            flex flex-col items-center justify-center gap-2 rounded-2xl
                            group-hover:rounded-b-none
                            w-full h-[70%]
                            text-neutral-200
                            border border-neutral-700
                            bg-neutral-800/40
                            group-hover:border-neutral-500
                            transition-all duration-300
                            group-hover:shadow-[2px_0px_20px_rgba(255,_255,_255,_0.2)]
                        '
                    >
                        <card.icon className="text-5xl" />
                        <div className="text-xl font-medium">{card.name}</div>
                    </div>
                    <div
                        className='
                            p-2 text-xs rounded-b-2xl
                            translate-y-4 opacity-0
                            group-hover:translate-y-0 group-hover:opacity-100
                            w-full h-[20%]
                            text-neutral-200 text-center
                            border border-neutral-700
                            bg-neutral-800/40
                            group-hover:border-neutral-500
                            transition-all duration-500 ease-out
                            group-hover:shadow-[2px_0px_20px_rgba(255,_255,_255,_0.2)]
                        '
                    >{card.description}</div>
                </motion.button>

            ))}
        </div>
    )
}
