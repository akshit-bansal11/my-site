//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    DEPENDENCIES    |--------------------//
//--------------------|____________________|--------------------//
import { useState, React } from "react";
import { motion } from "framer-motion";



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|       ASSETS       |--------------------//
//--------------------|____________________|--------------------//

//--------------------|       ICONS        |--------------------//
import { FaCircle, FaLocationDot, FaArrowDownLong } from "react-icons/fa6";
import Gmail from "../../../assets/icons/gmail.svg";

//--------------------|       FILES        |--------------------//
import Resume from "/akshit_bansal.pdf?url";

//--------------------|       IMAGES       |--------------------//
import animeChar from "../../../assets/images/animeChar.svg";



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|     COMPONENTS     |--------------------//
//--------------------|____________________|--------------------//

//--------------------|       CONFIG       |--------------------//
import { socialLinks } from "../../../config/socialLinksConfig"



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|  UTILITY FUNCTIONS |--------------------//
//--------------------|____________________|--------------------//

//--------------------|     CV BUTTON      |--------------------//
function CVButton() {
    return (
        <motion.a
            href={Resume}
            download="akshit_bansal.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.7 }}
            className={`
                group flex items-center gap-4 rounded-2xl border border-neutral-500
                bg-gradient-to-r from-[#232526] to-[#414345]
                px-2 lg:px-4 py-1 md:py-1 lg:py-2
                text-[8px] md:text-sm lg:text-xl font-normal
                text-neutral-300 hover:text-amber-400
                [text-shadow:_0_0_10px_rgb(251_191_36_/_0)]
                hover:[text-shadow:_0_0_10px_rgb(251_191_36_/_10)]
                hover:border-0 transition-colors duration-100 ease-in
            `}
        >
            <p>Download CV</p>
            <div
                className={`
                    h-min w-min rounded-lg p-2
                    bg-gradient-to-r from-[#ffa600] to-[#ffd900]
                    text-neutral-900
                    group-hover:bg-gradient-to-r group-hover:from-neutral-800 group-hover:to-neutral-800
                    group-hover:text-amber-400
                    transition-all duration-100
                `}
            >
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: 5 }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                    className="relative"
                >
                    <FaArrowDownLong className="transition-transform duration-100" />
                </motion.div>
            </div>
        </motion.a>
    )
}

//--------------------|    GMAIL BUTTON    |--------------------//
function GmailButton() {
    return (
        <motion.a
            href="mailto:artistbansal2004@gmail.com"
            target="_blank"
            whileHover={{ scale: 1.3, rotate: 10 }}
            whileTap={{ scale: 0.95, rotate: 0 }}
            className={`
                flex items-center gap-1
                text-[10px] md:text-xl lg:text-3xl
                text-neutral-300 hover:text-white
            `}
        >
            <picture>
                <source type="image/webp" srcSet={Gmail} />
                <img
                    src={Gmail}
                    alt="Gmail"
                    className="min-w-4 md:min-w-6 lg:min-w-8"
                />
            </picture>
        </motion.a>
    )
}

//--------------------|    AVAILABLITY     |--------------------//
function Availability() {
    return (
        <motion.div
            initial={{ marginBottom: "0px", opacity: 0 }}
            whileInView={{
                marginBottom: "20px",
                opacity: 1,
                transition: { duration: 1, ease: "easeInOut" },
            }}
            className="flex items-center gap-1 text-green-500"
        >
            <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: [0.5, 1, 0.5] }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <FaCircle className="w-1 md:w-2 blur-[1px] drop-shadow-sm drop-shadow-green-500" />
            </motion.div>
            <div className="text-[10px] md:text-lg">Available for work</div>
        </motion.div>
    )
}

//--------------------|   DEVELOPER IMAGE  |--------------------//
function DevImg() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
                opacity: 1,
                transition: { duration: 0.8, ease: "easeInOut" },
            }}
        >
            <img
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
                src={animeChar}
                alt=""
                className="w-40 md:w-65 lg:w-80"
            />
        </motion.div>
    )
}

//--------------------|   DEVELOPER INFO   |--------------------//
function DevInfo() {
    return (
        <motion.div
            initial={{ marginBottom: "0px", opacity: 0 }}
            whileInView={{
                marginBottom: "20px",
                opacity: 1,
                transition: { duration: 1, ease: "easeInOut" },
            }}
        >
            <motion.div className="text-lg md:text-2xl font-clash font-semibold lg:text-4xl text-white">
                Akshit Bansal
            </motion.div>
            <motion.div className="text-sm md:text-lg lg:text-2xl text-neutral-400">
                MERN-Stack Developer
            </motion.div>
            <motion.div
                className={`
                    flex items-center gap-1
                    text-sm md:text-lg lg:text-2xl text-neutral-400
                `}
            >
                <FaLocationDot />
                <div>Punjab, India</div>
            </motion.div>
        </motion.div>
    )
}

//--------------------|    SOCIAL LINKS    |--------------------//
function SocialLinks() {
    return (
        <div className="flex gap-2 md:flex-col">
            {socialLinks.map(({ Icon, href, delay }) => (
                <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 1, opacity: 0, x: 100 }}
                    whileHover={{
                        scale: 1.5,
                        transition: { duration: 0.1, ease: "easeOut" },
                    }}
                    whileTap={{
                        scale: 0.7,
                        transition: { duration: 0.1, ease: "easeOut" },
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.5, ease: "easeInOut", delay },
                    }}
                    className={`
                            group flex rounded-lg border border-neutral-600
                            bg-neutral-900 p-1 md:p-2 lg:p-3
                            hover:border hover:border-amber-400/50
                        `}
                >
                    <Icon className="text-lg md:text-xl lg:text-2xl text-neutral-300 group-hover:text-amber-400" />
                </motion.a>
            ))}
        </div>
    )
}



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    MAIN RENDER     |--------------------//
//--------------------|____________________|--------------------//
export default function ProfileHeader() {
    return (
        <div
            className={`
                flex w-[90%] items-center-safe justify-between
                not-md:flex-col not-md:gap-10
            `}
        >
            {/* LEFT - Profile */}
            <motion.div
                className={`
                    flex w-full items-center-safe gap-10
                    md:justify-start justify-evenly
                `}
            >
                <DevImg />
                <motion.div>
                    <div className="flex flex-col">
                        <DevInfo />
                        <Availability />
                        <motion.div
                            className={`
                                flex items-center text-nowrap
                                not-md:w-full justify-between
                                md:gap-3 lg:gap-4
                            `}
                        >
                            <GmailButton />
                            <CVButton />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            {/* RIGHT - Social Links */}
            <SocialLinks />
        </div>
    );
}
