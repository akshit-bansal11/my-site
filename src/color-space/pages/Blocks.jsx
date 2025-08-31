//--------------------|    DEPENDENCIES    |--------------------//
import React from "react";
import { motion } from "framer-motion";


//--------------------|        DATA        |--------------------//
import { colors } from "../data/colors.js";


//--------------------|     COMPONENT/S     |--------------------//
import ColorBlock from "../shared/ColorBlock.jsx";


//--------------------|    MAIN RENDER     |--------------------//
export default function ColorBlocksBrowser() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4"
        >
            {colors.map((color, index) => (
                <ColorBlock hover={{ scale: 1.05, zIndex: 10 }} iconSize={`text-3xl`} className={`w-full rounded-xl`} key={index} color={color} />
            ))}
        </motion.div>
    );
};