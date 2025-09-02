//--------------------|    DEPENDENCIES    |--------------------//
import React from "react";
import { motion } from "framer-motion";


//--------------------|        HOOKS       |--------------------//
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";


//--------------------|     COMPONENT/S     |--------------------//
import CopyButton from "./CopyButton";


//--------------------|    MAIN RENDER     |--------------------//
export default function ColorBlock({ color, className, iconSize, hover }) {
    const [copied, copy] = useCopyToClipboard();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={hover}
            className={`relative aspect-square overflow-hidden cursor-pointer group 
                ${className}
            `}
            style={{ backgroundColor: color }}
            onClick={() => copy(color)}
        >
            <CopyButton copied={copied} iconSize={iconSize} />
        </motion.div>
    );
}