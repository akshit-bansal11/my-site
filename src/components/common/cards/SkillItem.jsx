import { motion } from 'framer-motion';
import React from 'react';

const IconCard = ({ Icon, name }) => {
    return (
        <motion.div
            className="flex flex-col items-center select-none"
        >
            <motion.div
                className="
                    flex gap-2 items-center lg:px-4 md:px-2 px-1 lg:py-2 md:py-1 py-0.5 md:rounded-sm
                    bg-neutral-400/10 
                    border border-neutral-600
                    text-white
                ">
                {typeof Icon === "string" ? (
                    <img
                        src={Icon}
                        alt={name}
                        className="lg:h-[20px] md:h-[15px] h-[10px]"
                    />
                ) : (
                    <Icon
                        className="
                            lg:text-[20px] md:text-[15px] text-[10px] transition-colors duration-300 text-amber-400
                        "
                    />
                )}
                <div className='
                    lg:text-[14px] md:text-[10px] text-[7px]
                '>
                    {name}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default IconCard;
