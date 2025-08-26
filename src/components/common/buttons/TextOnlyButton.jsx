//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    DEPENDENCIES    |--------------------//
//--------------------|____________________|--------------------//
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    MAIN RENDER     |--------------------//
//--------------------|____________________|--------------------//
export default function TextOnlyButton({
    onClick = null,
    to = null,
    className = '',
    children,
    type = 'button',
    text = 'Button',
}) {
    const navigate = useNavigate();
    const handleClick = (e) => {
        if (onClick) onClick(e);
        if (to) {
            if (!to.startsWith('/')) {
                const section = document.getElementById(to);
                if (section) section.scrollIntoView({ behavior: 'smooth' });
            } else navigate(to);
        }
    };
    return (
        <motion.button
            type={type}
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
                flex items-center gap-2 cursor-pointer
                text-[8px] md:text-sm lg:text-lg text-nowrap md:text-nowrap lg:text-nowrap
                transition-colors duration-200 ease-in-out
                ${className}
            `}
        >
            {children || text}
        </motion.button>
    );
};