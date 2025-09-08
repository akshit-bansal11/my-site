import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function SkillBadge({
    name,
    icon,
    stars,
    source = "",
    delay,
    link = ""
}) {
    const totalStars = 5;

    return (
        <motion.a
            href={link}
            target="blank"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut", delay: delay } }}
            whileTap={{ scale: 0.9 }}
            className={`
                group flex flex-col justify-between lg:gap-4 md:gap-2 gap-1 rounded-2xl overflow-hidden
                lg:w-[156px] w-[120px]
                lg:h-[156px] h-[120px] 
                bg-gradient-to-br from-neutral-400/20 to-neutral-900/20
                border border-white/10
                hover:border-white/30
                transition-colors duration-300 ease-in-out
            `}
        >
            {/* Top Section */}
            <div className="flex flex-col items-center lg:gap-4 md:gap-2 gap-1 px-3 pt-3">
                <SkillIconAndName icon={icon} name={name} />
                <SkillStars stars={stars} totalStars={totalStars} />
            </div>

            {/* Bottom Section */}
            <SkillSource source={source} />
        </motion.a>
    );
}

function SkillIconAndName({ icon, name }) {
    return (
        <div className="flex w-full items-center md:gap-2 gap-1">
            <div
                className="
                    lg:text-4xl md:text-2xl text-lg
                    bg-neutral-900/60
                    border border-white/10
                    lg:p-4 md:p-3 p-2
                    rotate-6
                    rounded-xl text-white
                    transition-all duration-300
                    group-hover:border group-hover:border-white/30
                    group-hover:rotate-0 group-hover:scale-110 group-hover:-translate-3 
                    group-hover:rounded-l-none group-hover:rounded-t-none
                "
            >
                {icon}
            </div>
            <div className="lg:text-lg md:text-sm text-xs font-semibold text-neutral-100 tracking-tight">
                {name}
            </div>
        </div>
    );
}

function SkillStars({ stars, totalStars }) {
    return (
        <div className="flex justify-center gap-1 w-full">
            {[...Array(totalStars)].map((_, idx) => (
                <FaStar
                    key={idx}
                    className={`
                        lg:text-base md:text-[10px] text-[8px] transition-all duration-300
                        ${idx < stars
                            ? "text-yellow-300 group-hover:scale-120"
                            : "text-neutral-600"}
                    `}
                />
            ))}
        </div>
    );
}

function SkillSource({ source }) {
    return (
        <div className="
            md:text-xs text-[8px] font-medium text-green-400 
            group-hover:text-shadow-xs group-hover:text-shadow-green-500
            transition-all duration-200 italic text-center pb-3
        ">
            {source}
        </div>
    );
}