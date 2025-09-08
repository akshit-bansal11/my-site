//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    DEPENDENCIES    |--------------------//
//--------------------|____________________|--------------------//
import React, { useState } from 'react';
import { motion } from 'framer-motion';



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|       ASSETS       |--------------------//
//--------------------|____________________|--------------------//

//--------------------|       ICONS        |--------------------//
import { FaBars, FaTimes } from 'react-icons/fa';



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|     COMPONENTS     |--------------------//
//--------------------|____________________|--------------------//

//--------------------|       COMMON       |--------------------//
import NavLinks from '../common/sections/NavLinks';

//--------------------|       CONFIG       |--------------------//
import { navConfigs } from '../../config/NavConfig';



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|  UTILITY FUNCTIONS |--------------------//
//--------------------|____________________|--------------------//
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    MAIN RENDER     |--------------------//
//--------------------|____________________|--------------------//
export default function NavBar({ page = 'home' }) {
    const navItems = navConfigs[page] || [];

    const links = navItems.map((item) => ({
        ...item,
        icon: item.icon ? <item.icon /> : null,
        onClick: () => scrollToSection(item.to),
    }));

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="flex items-center flex-nowrap w-min justify-center px-5 py-3 rounded-2xl"
        >
            <NavLinks links={links} />
        </motion.nav>
    );
}
