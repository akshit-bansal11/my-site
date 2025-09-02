//--------------------|    DEPENDENCIES    |--------------------//
import React from "react";
import { AnimatePresence, motion } from "framer-motion";


//--------------------|        ICONS        |--------------------//
import { FaCheck, FaRegCopy } from "react-icons/fa6";


//--------------------|    MAIN RENDER     |--------------------//
export default function CopyButton({ copied, iconSize }) {
    return (
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col gap-2 p-2">
            <AnimatePresence mode="popLayout">
                {copied ? (
                    <motion.div
                        key="check"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <FaCheck className={`text-green-400 ${iconSize}`} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="copy"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <FaRegCopy className={`${iconSize}`} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}