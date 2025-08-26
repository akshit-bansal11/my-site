//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    DEPENDENCIES    |--------------------//
//--------------------|____________________|--------------------//
import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    MAIN RENDER     |--------------------//
//--------------------|____________________|--------------------//
export default function EduItem({ location, company, role, date }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group relative flex flex-col w-full overflow-hidden rounded-xl bg-neutral-800/40 border border-neutral-700/80 shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:border-neutral-600"
        >
            {/* Top bar for date and location */}
            <div className="flex justify-between items-center mb-4 lg:text-sm mb:text-xs text-[8px] text-neutral-400">
                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    <span>{location}</span>
                </div>
                <span>{date}</span>
            </div>

            {/* Main content: Institution and Degree */}
            <div className="flex flex-col gap-1">
                <h3 className="text-neutral-100 lg:text-xl mb:text-lg text-sm md:font-semibold tracking-wide">{company}</h3>
                <p className="lg:text md:text-sm text-xs text-neutral-300">{role}</p>
            </div>

            {/* Spacer to push content up, maintaining layout consistency */}
            <div className="flex-grow" />
        </motion.div>
    );
};