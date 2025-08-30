//--------------------|    DEPENDENCIES    |--------------------//
import React from "react";
import { AnimatePresence, motion } from "framer-motion";


//--------------------|        HOOKS       |--------------------//
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";


//--------------------|        ICONS        |--------------------//
import { FaCheck, FaRegCopy } from "react-icons/fa6";


//--------------------|        DATA        |--------------------//
const colors = [
    "#e03a3e", "#dd4132", "#d85944", "#d26f58", "#c8836c", "#bb9581", "#ac9a88", "#9b9e90", "#89a299", "#75a6a2",
    "#61a9ac", "#4bada6", "#32b0a1", "#ff4e50", "#fc913a", "#f9d423", "#f8f371", "#a6c0fe", "#fbc2eb", "#fdcbf1",
    "#e6dee9", "#f6d365", "#fda085", "#f093fb", "#f5576c", "#4facfe", "#00f2fe", "#43e97b", "#38f9d7", "#fa709a",
    "#fee140", "#fccb90", "#d57eeb", "#f83600", "#f9d423", "#fe8c00", "#f83600", "#00c6ff", "#0072ff", "#f0cb35",
    "#c02425", "#f0cb35", "#ee0979", "#ff6a00", "#f7971e", "#ffd200", "#c471f5", "#fa71cd", "#1fa2ff", "#12d8fa",
    "#a6ffcb", "#20e3b2", "#29ffc6", "#f8ff00", "#3ad59f", "#00d2ff", "#3a7bd5", "#7928ca", "#ff0080", "#ffc600",
    "#f2709c", "#ff9472", "#ff512f", "#dd2476", "#ff5f6d", "#ffc371", "#f12711", "#f5af19", "#e52d27", "#b31217",
    "#ff416c", "#ff4b2b", "#ff416c", "#ef473a", "#cb2d3e", "#ef473a", "#c33764", "#1d2671", "#ee9ca7", "#ffdde1",
    "#f64f59", "#c471ed", "#12c2e9", "#f64f59", "#f7b733", "#fc4a1a", "#f7b733", "#6a11cb", "#2575fc", "#ec008c",
    "#fc6767", "#00c9ff", "#92fe9d", "#ffdde1", "#ee9ca7", "#f6d365", "#fda085", "#f093fb", "#f5576c", "#4facfe",
    "#00f2fe", "#43e97b", "#38f9d7", "#fa709a", "#fee140", "#fccb90", "#d57eeb", "#f83600", "#f9d423", "#fe8c00",
    "#f83600", "#00c6ff", "#0072ff", "#f0cb35", "#c02425", "#f0cb35", "#ee0979", "#ff6a00", "#f7971e", "#ffd200",
    "#c471f5", "#fa71cd", "#1fa2ff", "#12d8fa", "#a6ffcb", "#20e3b2", "#29ffc6", "#f8ff00", "#3ad59f", "#00d2ff",
    "#3a7bd5", "#7928ca", "#ff0080", "#ffc600", "#f2709c", "#ff9472", "#ff512f", "#dd2476", "#ff5f6d", "#ffc371",
    "#f12711", "#f5af19", "#e52d27", "#b31217", "#ff416c", "#ff4b2b", "#ff416c", "#ef473a", "#cb2d3e", "#ef473a",
    "#c33764", "#1d2671", "#ee9ca7", "#ffdde1", "#f64f59", "#c471ed", "#12c2e9", "#f64f59", "#f7b733", "#fc4a1a",
    "#f7b733", "#6a11cb", "#2575fc", "#ec008c", "#fc6767", "#00c9ff", "#92fe9d", "#eb3349", "#f45c43", "#ff8008",
    "#ffc837", "#f953c6", "#b91d73", "#f7941d", "#f24949", "#24fe41", "#fdfc47", "#24fe41", "#ff0099", "#493240",
    "#ff00cc", "#333399", "#1cb5e0", "#000046", "#e94057", "#f27121", "#8a2387", "#e94057", "#f27121", "#c0392b",
    "#8e44ad", "#ff512f", "#f09819", "#ff512f", "#ff9a44", "#ff512f", "#ff9a44", "#ff7e5f", "#feb47b", "#ff7e5f",
    "#606c88", "#3f4c6b", "#434343", "#000000", "#1e3c72", "#2a5298", "#1e3c72", "#1e3c72", "#2a5298", "#1e3c72",
    "#2193b0", "#6dd5ed", "#cc2b5e", "#753a88", "#ee9ca7", "#ffdde1", "#42275a", "#734b6d", "#bdc3c7", "#2c3e50",
    "#de6262", "#ffb88c", "#de6262", "#6441a5", "#2a0845", "#ddd6f3", "#faaca8", "#ddd6f3", "#4ca1af", "#c4e0e5",
    "#4ca1af", "#b21f1f", "#fdbb2d", "#b21f1f", "#1a2a6c", "#b21f1f", "#fdbb2d", "#1a2a6c", "#fdbb2d", "#20002c",
    "#cbb4d4", "#20002c", "#cbb4d4", "#cbb4d4", "#20002c", "#141e30", "#243b55", "#000428", "#004e92", "#ff512f",
    "#dd2476", "#ff5f6d", "#ffc371", "#f12711", "#f5af19", "#e52d27", "#b31217", "#ff416c", "#ff4b2b", "#ff416c",
    "#ef473a", "#cb2d3e", "#ef473a", "#c33764", "#1d2671", "#ee9ca7", "#ffdde1", "#f64f59", "#c471ed", "#12c2e9",
    "#f64f59", "#f7b733", "#fc4a1a", "#f7b733", "#6a11cb", "#2575fc", "#ec008c", "#fc6767", "#00c9ff", "#92fe9d",
    "#eb3349", "#f45c43", "#ff8008", "#ffc837", "#f953c6", "#b91d73", "#f7941d", "#f24949", "#24fe41", "#fdfc47",
    "#24fe41", "#ff0099", "#493240", "#ff00cc", "#333399", "#1cb5e0", "#000046", "#e94057", "#f27121", "#8a2387",
    "#e94057", "#f27121", "#c0392b", "#8e44ad", "#ff512f", "#f09819", "#ff512f", "#ff9a44", "#ff512f", "#ff9a44",
    "#ff7e5f", "#feb47b", "#ff7e5f", "#606c88", "#3f4c6b", "#434343", "#000000", "#1e3c72", "#2a5298", "#1e3c72",
    "#1e3c72", "#2a5298", "#1e3c72", "#2193b0", "#6dd5ed", "#cc2b5e", "#753a88", "#ee9ca7", "#ffdde1", "#42275a",
    "#734b6d", "#bdc3c7", "#2c3e50", "#de6262", "#ffb88c", "#de6262", "#6441a5", "#2a0845", "#ddd6f3", "#faaca8",
    "#ddd6f3", "#4ca1af", "#c4e0e5", "#4ca1af", "#b21f1f", "#fdbb2d", "#b21f1f", "#1a2a6c", "#b21f1f", "#fdbb2d",
    "#1a2a6c", "#fdbb2d", "#20002c", "#cbb4d4", "#20002c", "#cbb4d4", "#cbb4d4", "#20002c", "#141e30", "#243b55",
    "#000428", "#004e92", "#c94b4b", "#4b134f", "#43cea2", "#185a9d", "#ba5370", "#f4e2d8", "#ff5e62", "#ff9966",
    "#36d1dc", "#5b86e5", "#11998e", "#38ef7d", "#108dc7", "#ef8e38", "#e96443", "#904e95", "#e65c00", "#f9d423",
    "#b3ffab", "#12fff7", "#4776e6", "#8e54e9", "#ed213a", "#93291e", "#ff5f6d", "#ffc371", "#ff9a9e", "#fecfef",
    "#ff9a9e", "#ffecd2", "#fcb69f", "#ffecd2", "#a1c4fd", "#c2e9fb", "#a1c4fd", "#8fd3f4", "#84fab0", "#8fd3f4",
    "#d4fc79", "#96e6a1", "#f093fb", "#f5576c", "#4facfe", "#00f2fe", "#43e97b", "#38f9d7", "#fa709a", "#fee140",
    "#fccb90", "#d57eeb", "#f83600", "#f9d423", "#fe8c00", "#f83600", "#00c6ff", "#0072ff", "#f0cb35", "#c02425",
    "#f0cb35", "#ee0979", "#ff6a00", "#f7971e", "#ffd200", "#c471f5", "#fa71cd", "#1fa2ff", "#12d8fa", "#a6ffcb",
    "#20e3b2", "#29ffc6", "#f8ff00", "#3ad59f", "#00d2ff", "#3a7bd5", "#7928ca", "#ff0080", "#ffc600", "#f2709c",
    "#ff9472", "#ff512f", "#dd2476", "#ff5f6d", "#ffc371", "#f12711", "#f5af19", "#e52d27", "#b31217", "#ff416c",
    "#ff4b2b", "#ff416c", "#ef473a", "#cb2d3e", "#ef473a", "#c33764", "#1d2671", "#ee9ca7", "#ffdde1", "#f64f59",
    "#c471ed", "#12c2e9", "#f64f59", "#f7b733", "#fc4a1a", "#f7b733", "#6a11cb", "#2575fc", "#ec008c", "#fc6767",
    "#00c9ff", "#92fe9d", "#eb3349", "#f45c43", "#ff8008", "#ffc837", "#f953c6", "#b91d73", "#f7941d", "#f24949",
    "#24fe41", "#fdfc47", "#24fe41", "#ff0099", "#493240", "#ff00cc", "#333399", "#1cb5e0", "#000046", "#e94057",
    "#f27121", "#8a2387", "#e94057", "#f27121", "#c0392b", "#8e44ad", "#ff512f", "#f09819", "#ff512f", "#ff9a44"
];


//--------------------|     COMPONENT/S     |--------------------//
function ColorBlock({ color }) {
    const [copied, copy] = useCopyToClipboard();
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className="relative w-full aspect-square rounded-xl overflow-hidden cursor-pointer group"
            style={{ backgroundColor: color }}
            onClick={() => copy(color)}
        >
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col gap-2 p-2">
                <span className="font-mono text-sm break-all text-center">{color}</span>
                <AnimatePresence>
                    {copied ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center gap-1"
                        >
                            <FaCheck size={20} className="text-green-400" />
                        </motion.div>
                    ) : (
                        <FaRegCopy size={18} />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}


//--------------------|    MAIN RENDER     |--------------------//
export default function ColorBlocksBrowser() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4"
        >
            {colors.map((color, index) => (
                <ColorBlock key={index} color={color} />
            ))}
        </motion.div>
    );
}