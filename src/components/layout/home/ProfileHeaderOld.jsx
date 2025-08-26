// Dependencies
import React from "react";
import { motion } from "framer-motion";

// Icons
import {
    FaLocationDot,
    FaCircle,
    FaArrowDownLong,
    FaGithub,
    FaLinkedinIn,
    FaXTwitter,
    FaHackerrank,
} from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import Gmail from "../../../assets/icons/gmail.svg";

// Images
import Pfp from "../../../assets/images/pfp.webp";
import Resume from "/akshit_bansal.pdf?url";

// Constants
const SOCIAL_LINKS = [
    {
        name: "GitHub",
        Icon: FaGithub,
        href: "https://github.com/akshit-bansal11",
    },
    {
        name: "LinkedIn",
        Icon: FaLinkedinIn,
        href: "https://www.linkedin.com/in/akshit-bansal11/",
    },
    {
        name: "HackerRank",
        Icon: FaHackerrank,
        href: "http://hackerrank.com/profile/akshitbansal11",
    },
    { name: "Twitter", Icon: FaXTwitter, href: "https://x.com/akshit_bansal11" },
    {
        name: "LeetCode",
        Icon: SiLeetcode,
        href: "https://leetcode.com/u/akshit-bansal11/",
    },
];

const ProfileHeaderOld = () => {
    const ProfileInfo = () => (
        <div className="flex md:flex-row flex-col items-center gap-3 lg:gap-6">
            <img
                src={Pfp}
                alt="Profile picture of Akshit Bansal"
                className="lg:h-40 md:h-32 h-20 rounded-md md:rounded-lg lg:rounded-xl md:translate-y-0 -translate-y-8 select-none"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
            />
            <div className="flex flex-col gap-3 md:gap-5 lg:gap-6">
                <div>
                    <h1 className="text-white font-clash text-lg md:text-2xl lg:text-3xl">
                        Akshit Bansal
                    </h1>
                    <h2 className="text-neutral-400 text-xs md:text-sm lg:text-lg">
                        MERN-Stack Developer | Web Designer
                    </h2>
                    <div className="flex items-center gap-1 text-neutral-400 text-xs md:text-sm lg:text-lg">
                        <FaLocationDot className="text-[10px] md:text-sm lg:text-lg" />
                        <p>Punjab, India</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-green-500">
                    <motion.div
                        initial={{ scale: 0.6 }}
                        animate={{ scale: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <FaCircle className="w-2 drop-shadow-sm drop-shadow-green-500" />
                    </motion.div>
                    <p className="text-neutral-400 text-xs md:text-sm">
                        Available for work
                    </p>
                </div>
            </div>
        </div>
    );

    const ContactButtons = () => (
        <div className="flex not-md:w-full items-center justify-between md:gap-4 lg:gap-6">
            {/* Gmail */}
            <motion.a
                href="mailto:artistbansal2004@gmail.com"
                aria-label="Send Email"
                target="_blank"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-neutral-300 hover:text-white text-xl lg:text-3xl"
            >
                <img src={Gmail} className="w-6 lg:w-8" alt="Gmail" />
            </motion.a>

            {/* Resume */}
            <motion.a
                href={Resume}
                download="akshit_bansal.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.85 }}
                className="group flex items-center gap-2 px-3 py-2 rounded-2xl text-neutral-300 text-sm lg:text-lg font-medium
          bg-gradient-to-r from-[#232526] to-[#414345]
          border border-neutral-500 hover:border-transparent
          hover:text-amber-400 transition-all duration-150"
            >
                <p>Download CV</p>
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#ffa600] to-[#ffd900] group-hover:from-neutral-800 group-hover:to-neutral-800 group-hover:text-amber-400">
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <FaArrowDownLong />
                    </motion.div>
                </div>
            </motion.a>
        </div>
    );

    const SocialLinks = () => (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-row md:flex-col justify-evenly md:justify-center w-full md:w-min
        p-2 md:p-4 lg:p-6 gap-2 md:gap-3 lg:gap-5
        backdrop-blur-sm rounded-b-lg md:rounded-r-lg lg:rounded-r-2xl
        border border-neutral-600 text-neutral-400"
        >
            {SOCIAL_LINKS.map(({ name, Icon, href }) => (
                <a
                    key={name}
                    href={href}
                    target="_blank"
                    aria-label={name}
                    rel="noopener noreferrer"
                    className="hover:scale-125 transition-transform duration-150 ease-in-out"
                >
                    <Icon className="text-lg md:text-xl lg:text-2xl hover:text-amber-400" />
                </a>
            ))}
        </motion.div>
    );

    return (
        <motion.div
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex md:flex-row flex-col items-center justify-center w-full max-w-6xl gap-2 md:gap-4 mt-6"
        >
            <div
                className="flex md:flex-row flex-col items-center justify-between w-full gap-6
        backdrop-blur-sm border border-neutral-200/30 rounded-t-lg md:rounded-l-lg p-4 lg:p-6"
            >
                <ProfileInfo />
                <ContactButtons />
            </div>
            <SocialLinks />
        </motion.div>
    );
};

export default ProfileHeaderOld;
