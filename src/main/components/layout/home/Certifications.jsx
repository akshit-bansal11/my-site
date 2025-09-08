//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    DEPENDENCIES    |--------------------//
//--------------------|____________________|--------------------//
import React from "react";
import { motion } from "framer-motion"; // <-- 1. Import motion from 'framer-motion'

//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|     COMPONENTS     |--------------------//
//--------------------|____________________|--------------------//
import ScrollSection from '../../common/sections/ScrollSection'
import ScrollSectionHeading from '../../common/headings/ScrollSectionHeading'
import SkillBadge from "../../common/cards/SkillBadge";

// LinkedIn + Microsoft
import ceisd from '../../../../assets/images/certificates/ceisd.webp';
import ceiga from '../../../../assets/images/certificates/ceiga.webp';

// HackerRank
import sqlbhack from '../../../../assets/images/certificates/sqlbhack.webp';
import jsbhack from '../../../../assets/images/certificates/jsbhack.webp';
import cssbhack from '../../../../assets/images/certificates/cssbhack.webp';

import { SiCplusplus, SiCoursera } from "react-icons/si";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Certifications() {
    return (
        <ScrollSection id="certif">
            <ScrollSectionHeading heading="certifications & achievements" />
            <div className="flex flex-col gap-4">
                <h1 className="text-neutral-400 text-xs md:text-sm lg:text-xl">Achievements</h1>
                <div className="flex lg:gap-4 gap-2">
                    <SkillBadge
                        name="C++"
                        icon={<SiCplusplus />}
                        stars={5}
                        source="HackerRank"
                        delay={0.2}
                        link="https://www.hackerrank.com/profile/akshitbansal11"
                    />
                    <SkillBadge
                        name="C"
                        icon={<SiCoursera />}
                        stars={2}
                        source="HackerRank"
                        delay={0}
                        link="https://www.hackerrank.com/profile/akshitbansal11"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-neutral-400 text-xs md:text-sm lg:text-xl">Certifications</h1>
                <div className="grid grid-cols-3 gap-4">
                    <Certificates certificate={ceisd} link="https://www.linkedin.com/learning/certificates/b49081d79547f863f12dd8656302ede27f342d628631d481085b14b727dcc910?trk=share_certificate" />
                    <Certificates certificate={ceiga} link="https://www.linkedin.com/learning/certificates/b0d6803487e5b12b7ddf935a52b4efa6541460fcae5faacb7e7354ec96f78832?trk=share_certificate" />
                    <Certificates certificate={sqlbhack} link="https://www.hackerrank.com/certificates/7f1a01b7b859" />
                    <Certificates certificate={jsbhack} link="https://www.hackerrank.com/certificates/9eabe8ab61b1" />
                    <Certificates certificate={cssbhack} link="https://www.hackerrank.com/certificates/35384d086309" />
                </div>
            </div>
        </ScrollSection>
    );
}



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|  UTILITY FUNCTIONS |--------------------//
//--------------------|____________________|--------------------//
function Certificates({ certificate, name, link = "" }) {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: 0.1,
            },
        },
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <motion.div
            className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg dark:border-slate-700 dark:bg-slate-800"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            whileTap={{ scale: 0.9 }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View certificate: ${name}`}
                className="block"
            >
                <motion.img
                    className="h-auto w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    src={certificate}
                    alt={name || "Certificate Image"}
                />
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-4 text-white"
                    variants={overlayVariants}
                    initial="hidden"
                    whileHover="visible"
                    transition={{ duration: 0.4 }}
                >
                    <FaExternalLinkAlt className="mb-2 h-10 w-10" />
                    <p className="text-center font-semibold">{name}</p>
                    <p className="mt-1 text-center text-sm text-slate-300">
                        Click to view
                    </p>
                </motion.div>
            </a>
        </motion.div>
    );
}