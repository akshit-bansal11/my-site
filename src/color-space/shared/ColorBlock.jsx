
//--------------------|    DEPENDENCIES    |--------------------//
import React from "react";
import { AnimatePresence, motion } from "framer-motion";


//--------------------|        ICONS        |--------------------//
import { FaCheck, FaRegCopy } from "react-icons/fa6";


//--------------------|        HOOKS       |--------------------//
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";


//--------------------|    MAIN RENDER     |--------------------//
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
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col gap-2 p-2">
                <AnimatePresence>
                    {copied ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center gap-1"
                        >
                            <FaCheck className={`text-green-400 ${iconSize}`} />
                        </motion.div>
                    ) : (
                        <FaRegCopy className={`${iconSize}`} />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}