//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    DEPENDENCIES    |--------------------//
//--------------------|____________________|--------------------//
import React, { useState, useRef, useEffect, useCallback } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import { motion, AnimatePresence } from "framer-motion";



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|       ASSETS       |--------------------//
//--------------------|____________________|--------------------//

//--------------------|       ICONS        |--------------------//

// Font Awesome 6
import { FaCheck, FaDroplet, FaPlus, FaRegCopy, FaRegTrashCan, FaLayerGroup, FaSpotify, FaAmazon, FaMeta, FaGoogle } from 'react-icons/fa6'

// Simple Icons
import { SiIkea, SiMcdonalds, SiNetflix, SiStarbucks, SiNvidia, } from "react-icons/si";

// Tabler Icons
import { TbOlympics } from "react-icons/tb";

// Ionicons 5
import { IoColorPalette } from "react-icons/io5";

// Heroicons 2
import { HiMiniSwatch } from "react-icons/hi2";

// Material Design Icons
import { MdOutlineImageSearch } from "react-icons/md";
import { icons } from "lucide-react";



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|  UTILITY FUNCTIONS |--------------------//
//--------------------|____________________|--------------------//

// HEX TO RGBA
const hexToRgba = (hex) => {
    let hexValue = hex.startsWith("#") ? hex.substring(1) : hex;
    if (hexValue.length === 3) {
        hexValue = hexValue.split('').map(char => char + char).join('') + 'ff';
    } else if (hexValue.length === 6) {
        hexValue += "ff";
    }

    const r = parseInt(hexValue.slice(0, 2), 16);
    const g = parseInt(hexValue.slice(2, 4), 16);
    const b = parseInt(hexValue.slice(4, 6), 16);
    const a = parseInt(hexValue.slice(6, 8), 16) / 255;
    return { r, g, b, a };
};

// RGBA TO HSLA
const rgbaToHsla = (r, g, b, a) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s;
    let l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
        a: a,
    };
};

// All inputs to HEXA
const parseColorInput = (type, value) => {
    try {
        switch (type) {
            case "HEX":
                if (/^#?[0-9a-fA-F]{6}$/.test(value)) {
                    return `#${value.replace("#", "")}ff`;
                }
                break;
            case "HEXA":
                if (/^#?[0-9a-fA-F]{8}$/.test(value)) {
                    return `#${value.replace("#", "")}`;
                }
                break;
            case "RGB": {
                const m = value.match(/rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/);
                if (m) {
                    const [r, g, b] = m.slice(1, 4).map(Number);
                    if ([r, g, b].every(v => v >= 0 && v <= 255)) {
                        const toHex = (c) => c.toString(16).padStart(2, "0");
                        return `#${toHex(r)}${toHex(g)}${toHex(b)}ff`;
                    }
                }
                break;
            }
            case "RGBA": {
                const m = value.match(/rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([0-9]*\.?[0-9]+)\)/);
                if (m) {
                    const [r, g, b] = m.slice(1, 4).map(Number);
                    const a = parseFloat(m[4]);
                    if ([r, g, b].every(v => v >= 0 && v <= 255) && a >= 0 && a <= 1) {
                        const toHex = (c) => c.toString(16).padStart(2, "0");
                        const alphaHex = Math.round(a * 255).toString(16).padStart(2, "0");
                        return `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaHex}`;
                    }
                }
                break;
            }
            case "HSL": {
                const m = value.match(/hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)/);
                if (m) {
                    let [h, s, l] = m.slice(1, 4).map(Number);
                    s /= 100; l /= 100;
                    let c = (1 - Math.abs(2 * l - 1)) * s,
                        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
                        m_ = l - c / 2,
                        r = 0, g = 0, b = 0;
                    if (h >= 0 && h < 60) { [r, g, b] = [c, x, 0]; }
                    else if (h >= 60 && h < 120) { [r, g, b] = [x, c, 0]; }
                    else if (h >= 120 && h < 180) { [r, g, b] = [0, c, x]; }
                    else if (h >= 180 && h < 240) { [r, g, b] = [0, x, c]; }
                    else if (h >= 240 && h < 300) { [r, g, b] = [x, 0, c]; }
                    else if (h >= 300 && h < 360) { [r, g, b] = [c, 0, x]; }
                    r = Math.round((r + m_) * 255);
                    g = Math.round((g + m_) * 255);
                    b = Math.round((b + m_) * 255);
                    const toHex = (c) => c.toString(16).padStart(2, "0");
                    return `#${toHex(r)}${toHex(g)}${toHex(b)}ff`;
                }
                break;
            }
            case "HSLA": {
                const m = value.match(/hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*([0-9]*\.?[0-9]+)\)/);
                if (m) {
                    let [h, s, l, a] = m.slice(1, 5).map(Number);
                    s /= 100; l /= 100;
                    let c = (1 - Math.abs(2 * l - 1)) * s,
                        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
                        m_ = l - c / 2,
                        r = 0, g = 0, b = 0;
                    if (h >= 0 && h < 60) { [r, g, b] = [c, x, 0]; }
                    else if (h >= 60 && h < 120) { [r, g, b] = [x, c, 0]; }
                    else if (h >= 120 && h < 180) { [r, g, b] = [0, c, x]; }
                    else if (h >= 180 && h < 240) { [r, g, b] = [0, x, c]; }
                    else if (h >= 240 && h < 300) { [r, g, b] = [x, 0, c]; }
                    else if (h >= 300 && h < 360) { [r, g, b] = [c, 0, x]; }
                    r = Math.round((r + m_) * 255);
                    g = Math.round((g + m_) * 255);
                    b = Math.round((b + m_) * 255);
                    const toHex = (c) => c.toString(16).padStart(2, "0");
                    const alphaHex = Math.round(a * 255).toString(16).padStart(2, "0");
                    return `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaHex}`;
                }
                break;
            }
        }
    } catch {
        return null;
    }
    return null;
};



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|        HOOKS       |--------------------//
//--------------------|____________________|--------------------//

// Copy text to clipboard
const useCopyToClipboard = () => {
    const [copied, setCopied] = useState(false);

    const copy = useCallback((text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
    }, []);

    return [copied, copy];
};



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|        DATA        |--------------------//
//--------------------|____________________|--------------------//

// Blocks
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

// Palettes
const palettes = [

    // Popular Brands
    { name: "Spotify", Icon: FaSpotify, colors: ["#1EDD60", "#1B1716"], category: "Popular Brands" },
    { name: "IKEA", Icon: SiIkea, colors: ["#0058A3", "#FFDB00"], category: "Popular Brands" },
    { name: "Amazon", Icon: FaAmazon, colors: ["#FF6201", "#171D27"], category: "Popular Brands" },
    { name: "McDonalds", Icon: SiMcdonalds, colors: ["#DB0007", "#FFBC0D"], category: "Popular Brands" },
    { name: "Netflix", Icon: SiNetflix, colors: ["#B1060F", "#E50914", "#000000"], category: "Popular Brands" },
    { name: "Starbucks", Icon: SiStarbucks, colors: ["#006341", "#000000", "#FFFFFF"], category: "Popular Brands" },
    { name: "nVidia", Icon: SiNvidia, colors: ["#517C00", "#75B600", "#000000"], category: "Popular Brands" },
    { name: "Meta", Icon: FaMeta, colors: ["#0265E0", "#0080F9", "#1C2B33"], category: "Popular Brands" },
    { name: "Google", Icon: FaGoogle, colors: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"], category: "Popular Brands" },
    { name: "Olympics", Icon: TbOlympics, colors: ["#0081C8", "#000000", "#DF3D59", "#F0BA6A", "#00A651"], category: "Popular Brands" },

    // 3-Color
    { colors: ["#e74c3c", "#f39c12", "#f1c40f"], category: "3-color" },
    { colors: ["#e74c3c", "#f39c12", "#f1c40f"], category: "3-color" },
    { colors: ["#10367D", "#EBEBEB", "#74B4D9"], category: "3-color" },
    { colors: ["#05614B", "#020E0E", "#01DE82"], category: "3-color" },
    { colors: ["#FD0D02", "#FEA603", "#4D6802"], category: "3-color" },
    { colors: ["#0C0E0B", "#D6E7F3", "#D6303A"], category: "3-color" },

    // 4-Color
    { colors: ["#2c3e50", "#3498db", "#ecf0f1", "#95a5a6"], category: "4-color" },
    { colors: ["#16a085", "#27ae60", "#2ecc71", "#34495e"], category: "4-color" },
    { colors: ["#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"], category: "4-color" },

    // 5-Color
    { colors: ["#272727", "#484848", "#ffb900", "#009eff", "#d7d7d7"], category: "5-color" },
    { colors: ["#f0932b", "#eb4d4b", "#6ab04c", "#4834d4", "#30336b"], category: "5-color" },
    { colors: ["#a29bfe", "#ffeaa7", "#fab1a0", "#74b9ff", "#55efc4"], category: "5-color" }
];

// Gradients
const gradients = [

    // 2-color Tailwind
    { name: "Ocean Sunset", feel: "Luxury", tailwind: "from-[#0f2027] to-[#2c5364]", css: "linear-gradient(to right, #0f2027, #2c5364)" },
    { name: "Midnight Glow", feel: "Luxury", tailwind: "from-[#141e30] to-[#243b55]", css: "linear-gradient(to right, #141e30, #243b55)" },
    { name: "Crimson Velvet", feel: "Luxury", tailwind: "from-[#2C0F12] to-[#6B1E23]", css: "linear-gradient(to right, #2C0F12, #6B1E23)" },
    { name: "Navy Mirage", feel: "Luxury", tailwind: "from-[#141E30] to-[#35577D]", css: "linear-gradient(to right, #141E30, #35577D)" },
    { name: "Deep Teal Silk", feel: "Luxury", tailwind: "from-[#0B3037] to-[#134E5E]", css: "linear-gradient(to right, #0B3037, #134E5E)" },
    { name: "Obsidian Plum", feel: "Luxury", tailwind: "from-[#2D1E2F] to-[#4E2A4F]", css: "linear-gradient(to right, #2D1E2F, #4E2A4F)" },
    { name: "Emerald Depth", feel: "Luxury", tailwind: "from-[#0F2027] to-[#28623A]", css: "linear-gradient(to right, #0F2027, #28623A)" },
    { name: "Walnut Noir", feel: "Luxury", tailwind: "from-[#2E1F1B] to-[#5E4B43]", css: "linear-gradient(to right, #2E1F1B, #5E4B43)" },
    { name: "Charcoal Steel", feel: "Luxury", tailwind: "from-[#232526] to-[#414345]", css: "linear-gradient(to right, #232526, #414345)" },
    { name: "Onyx Silver", feel: "Luxury", tailwind: "from-[#232526] to-[#757F9A]", css: "linear-gradient(to right, #232526, #757F9A)" },
    { name: "Emerald Chrome", feel: "Luxury", tailwind: "from-[#004E92] to-[#000428]", css: "linear-gradient(to right, #004E92, #000428)" },
    { name: "Imperial Purple", feel: "Luxury", tailwind: "from-[#2E003E] to-[#6A0572]", css: "linear-gradient(to right, #2E003E, #6A0572)" },
    { name: "Velvet Smoke", feel: "Classy", tailwind: "from-[#ada996] to-[#f2f2f2]", css: "linear-gradient(to right, #ada996, #f2f2f2)" },
    { name: "Midnight Gold", feel: "Classy", tailwind: "from-[#1A1A1A] to-[#C0A062]", css: "linear-gradient(to right, #1A1A1A, #C0A062)" },
    { name: "Royal Bronze", feel: "Classy", tailwind: "from-[#2C3E50] to-[#B08D57]", css: "linear-gradient(to right, #2C3E50, #B08D57)" },
    { name: "Lush", feel: "Classy", tailwind: "from-teal-400 to-emerald-600", css: "linear-gradient(to right, #2dd4bf, #059669)" },
    { name: "Royal Aurora", feel: "Vivid", tailwind: "from-[#3e2f5b] to-[#e94560]", css: "linear-gradient(to right, #3e2f5b, #e94560)" },
    { name: "Sunset Glow", feel: "Vivid", tailwind: "from-[#FF5450] to-[#AB0062]", css: "linear-gradient(to right, #FF5450, #AB0062)" },
    { name: "Misty Harbor", feel: "Vivid", tailwind: "from-[#133E57] to-[#B8D1C5]", css: "linear-gradient(to right, #133E57, #B8D1C5)" },
    { name: "Electric Lime", feel: "Vivid", tailwind: "from-[#FEF500] to-[#00A800]", css: "linear-gradient(to right, #FEF500, #00A800)" },
    { name: "Twilight Lavender", feel: "Vivid", tailwind: "from-[#262D57] to-[#A89FC8]", css: "linear-gradient(to right, #262D57, #A89FC8)" },
    { name: "Slate Emerald", feel: "Vivid", tailwind: "from-[#134E5E] to-[#71B280]", css: "linear-gradient(to right, #134E5E, #71B280)" },
    { name: "Vintage Wine", feel: "Vivid", tailwind: "from-[#842A50] to-[#D17B68]", css: "linear-gradient(to right, #842A50, #D17B68)" },
    { name: "Summer Dog", feel: "Summer", tailwind: "from-yellow-200 to-yellow-500", css: "linear-gradient(to right, #fef08a, #eab308)" },
    { name: "Vibrant", feel: "Summer", tailwind: "from-pink-500 to-yellow-500", css: "linear-gradient(to right, #ec4899, #eab308)" },
    { name: "Champagne Blush", feel: "Warm", tailwind: "from-[#fcfabb] to-[#f8b500]", css: "linear-gradient(to right, #fcfabb, #f8b500)" },
    { name: "Neo Future", feel: "Cool", tailwind: "from-[#00c9ff] to-[#92fe9d]", css: "linear-gradient(to right, #00c9ff, #92fe9d)" },

    // 3-color Tailwind
    { name: "Sunset", feel: "Warm", tailwind: "from-red-500 via-yellow-500 to-pink-500", css: "linear-gradient(to right, , )" },
    { name: "Mint", feel: "Cool", tailwind: "from-green-200 via-green-300 to-blue-500", css: "linear-gradient(to right, , )" },
    { name: "Deep Space", feel: "Cool", tailwind: "from-gray-700 via-gray-900 to-black", css: "linear-gradient(to right, , )" },
    { name: "Amethyst", feel: "Luxury", tailwind: "from-purple-800 via-violet-900 to-purple-800", css: "linear-gradient(to right, , )" },

    // Multi-Color CSS
    { name: "Royal", feel: "Luxury", css: "linear-gradient(to right, #8e2de2, #4a00e0)" },
    { name: "Classy", feel: "Classy", css: "linear-gradient(to right, #0f2027, #203a43, #2c5364)" },
    { name: "Cherry", feel: "Warm", css: "linear-gradient(to right, #eb3349, #f45c43)" },
    { name: "Morning", feel: "Warm", css: "linear-gradient(to right, #ff5f6d, #ffc371)" },
];



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|COMPONENTS FUNCTIONS|--------------------//
//--------------------|____________________|--------------------//

// Component: ColorPreview
function ColorPreview({ color }) {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center"
        >
            <div className="relative flex items-center justify-center lg:w-36 md:w-28 w-20 lg:h-36 md:h-28 h-20">
                <div className="absolute w-full h-full gap-2 grid grid-cols-2 p-2">
                    <div className="bg-white rounded-full"></div>
                    <div className="bg-neutral-400 rounded-full"></div>
                    <div className="bg-neutral-700 rounded-full"></div>
                    <div className="bg-black rounded-full"></div>
                </div>
                <div
                    className="absolute w-full h-full rounded-xl shadow-lg"
                    style={{ background: color }}
                />
            </div>
        </motion.div>
    );
}

// Component: InfoItem
function InfoItem({ label, value, editable = false, onChange }) {
    const [copied, copy] = useCopyToClipboard();
    const [inputValue, setInputValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isEditing) {
            setInputValue(value);
        }
    }, [value, isEditing]);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className="flex items-center gap-2 w-full">
            <div
                className={`flex justify-between items-center flex-grow bg-neutral-700/50 rounded-lg px-3 py-2 font-mono text-sm relative group transition-all duration-200 ${editable ? "hover:bg-neutral-700" : ""}`}
                style={{ border: isEditing ? "1px solid #a3a3a3" : "1px solid transparent" }}
            >
                {editable ? (
                    <input
                        className="truncate bg-transparent outline-none w-full text-neutral-200"
                        value={inputValue}
                        onChange={handleInputChange}
                        onFocus={() => setIsEditing(true)}
                        onBlur={() => setIsEditing(false)}
                        spellCheck={false}
                    />
                ) : (
                    <span className="truncate text-neutral-300">{value}</span>
                )}
                <button
                    onClick={() => copy(value)}
                    className="flex-shrink-0 text-neutral-400 hover:text-white transition-colors"
                    title="Copy"
                >
                    <AnimatePresence mode="wait">
                        {copied ? (
                            <motion.div
                                key="copied"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                            >
                                <FaCheck size={18} className="text-green-400" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="icon"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <FaRegCopy size={18} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>
            <span className="text-xs text-neutral-400 w-10 text-right">{label}</span>
        </div>
    );
}

// Component: ColorInfo
function ColorInfo({ color, setColor }) {
    const { r, g, b, a } = hexToRgba(color);
    const { h, s, l } = rgbaToHsla(r, g, b, a);

    const colorFormats = [
        { label: "HEXA", value: color, editable: true },
        { label: "HEX", value: color.slice(0, 7), editable: true },
        { label: "RGBA", value: `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`, editable: true },
        { label: "RGB", value: `rgb(${r}, ${g}, ${b})`, editable: true },
        { label: "HSLA", value: `hsla(${h}, ${s}%, ${l}%, ${a.toFixed(2)})`, editable: true },
        { label: "HSL", value: `hsl(${h}, ${s}%, ${l}%)`, editable: true },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-3 w-full"
        >
            {colorFormats.map((item) => (
                <InfoItem
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    editable={item.editable}
                    onChange={(val) => {
                        const parsed = parseColorInput(item.label, val);
                        if (parsed) {
                            setColor(parsed);
                        }
                    }}
                />
            ))}
        </motion.div>
    );
}

// Component: ColorCreator
function ColorCreator() {
    const [color, setColor] = useState("#3498dbff");
    const [palette, setPalette] = useState([]);
    const [copied, copy] = useCopyToClipboard();
    const [copiedColor, setCopiedColor] = useState(null);

    const addColorToPalette = () => {
        if (palette.length < 5 && !palette.includes(color)) {
            setPalette([...palette, color]);
        }
    };

    const removeColorFromPalette = (colorToRemove) => {
        setPalette(palette.filter(c => c !== colorToRemove));
    };

    const handleCopy = (colorToCopy) => {
        copy(colorToCopy);
        setCopiedColor(colorToCopy);
    };

    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full bg-neutral-800/50 border border-neutral-700/80 rounded-2xl lg:p-8 md:p-6 p-4 flex flex-col items-center gap-8"
        >
            <HexAlphaColorPicker
                color={color}
                onChange={setColor}
                style={{ width: "100%", height: "300px" }}
            />
            <div className="w-full flex flex-col md:flex-row gap-8 justify-between items-center">
                <ColorInfo color={color} setColor={setColor} />
                <ColorPreview color={color} />
            </div>
            <div className="w-full flex flex-col gap-4 items-center">
                <button
                    onClick={addColorToPalette}
                    disabled={palette.length >= 5 || palette.includes(color)}
                    className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                >
                    <FaPlus size={18} /> Add to Palette
                </button>
                {palette.length > 0 && (
                    <div className="w-full flex flex-col gap-2 items-center">
                        <h3 className="text-neutral-300 font-semibold">Current Palette</h3>
                        <div className="flex flex-wrap gap-2 items-center justify-center">
                            <AnimatePresence>
                                {palette.map((c) => (
                                    <motion.div
                                        key={c}
                                        layout
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="relative group"
                                    >
                                        <div
                                            className="w-12 h-12 rounded-lg cursor-pointer"
                                            style={{ backgroundColor: c }}
                                            onClick={() => handleCopy(c)}
                                        >
                                            <div className="w-full h-full flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <AnimatePresence>
                                                    {copied && copiedColor === c ? (
                                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                            <FaCheck size={20} className="text-green-400" />
                                                        </motion.div>
                                                    ) : (
                                                        <FaRegCopy size={20} />
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeColorFromPalette(c)}
                                            className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <FaRegTrashCan size={12} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// Component: ColorBlock
function ColorBlock({ color }) {
    const [copied, copy] = useCopyToClipboard();
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
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

// Component: ColorBlocksBrowser
function ColorBlocksBrowser() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4"
        >
            {colors.map((color, index) => (
                <ColorBlock key={index} color={color} />
            ))}
        </motion.div>
    );
}

// Component: Palette
function ColorPalette({ colors, name, Icon }) {
    const [copied, copy] = useCopyToClipboard();
    const [copiedColor, setCopiedColor] = useState(null);

    const handleCopy = (color) => {
        copy(color);
        setCopiedColor(color);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="w-full flex flex-col rounded-xl overflow-hidden shadow-lg bg-neutral-800/50 border border-neutral-700/80"
        >
            <div className="flex h-32">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="w-full h-full cursor-pointer group relative"
                        style={{ backgroundColor: color }}
                        onClick={() => handleCopy(color)}
                    >
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-center flex-col gap-1">
                            <AnimatePresence>
                                {copied && copiedColor === color ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex flex-col items-center gap-1"
                                    >
                                        <FaCheck size={20} className="text-green-400" />
                                    </motion.div>
                                ) : (
                                    <FaRegCopy size={20} />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-3 flex flex-col items-center gap-2 bg-neutral-800">
                <div className="flex gap-2 items-center mb-4 mt-4">
                    {Icon && <Icon className="h-8 w-8 text-neutral-200" />}
                    {name && <p className="flex gap-10 text-sm font-semibold text-neutral-200">{name}</p>}
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center">
                    {colors.map((color, index) => (
                        <span key={index} className="text-xs font-mono text-neutral-400">{color}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// Component: CuratedPalettes
function CuratedPalettes() {
    // 1. Group palettes by their category
    const groupedPalettes = palettes.reduce((acc, palette) => {
        const { category } = palette;
        // If the category key doesn't exist in the accumulator, create it
        if (!acc[category]) {
            acc[category] = [];
        }
        // Push the current palette into its category array
        acc[category].push(palette);
        return acc;
    }, {});

    // Optional: Define a specific order for the categories
    const categoryOrder = ["Popular Brands", "2-color", "3-color", "4-color", "5-color"];
    const sortedCategories = categoryOrder.filter(cat => groupedPalettes[cat]);

    return (
        <div className="w-full flex flex-col gap-12">
            {/* 2. Map over the sorted categories to create sections */}
            {sortedCategories.map(category => (
                <section key={category} className="flex flex-col gap-6">
                    {/* Section Title */}
                    <h2 className="text-2xl font-bold text-neutral-200 capitalize border-b border-neutral-700 pb-2">
                        {category === "Popular Brands" ? category : `${category} Palettes`}
                    </h2>

                    {/* Grid for the palettes in this category */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedPalettes[category].map((palette, index) => (
                            <ColorPalette key={index} {...palette} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}

// Component: GradientCard
function GradientCard({ name, feel, tailwind, css }) {
    const [copied, copy] = useCopyToClipboard();
    const [copiedKey, setCopiedKey] = useState(null); // tracks which text was copied
    const timerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleCopy = (text) => {
        copy(text);
        setCopiedKey(text);

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopiedKey(null), 1500);
    };

    const entry = { opacity: 0, scale: 0.9, y: 6 };
    const center = { opacity: 1, scale: 1, y: 0 };
    const exit = { opacity: 0, scale: 0.9, y: 6 };

    const cardVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        hover: {},
    };

    const infoVariants = {
        initial: { y: "100%" },
        animate: { y: "100%" },
        hover: { y: 0 },
    };

    return (
        <motion.div
            layout
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ type: "tween", stiffness: 260, damping: 20 }}
            className="relative w-full flex flex-col rounded-2xl overflow-hidden shadow-lg bg-neutral-800/50 border border-neutral-700/80 group"
        >
            {/* Gradient Preview */}
            <div
                className={`h-38 w-full ${tailwind ? `bg-gradient-to-r ${tailwind}` : ""}`}
                style={!tailwind ? { background: css } : {}}
            ></div>

            {/* Info Section */}
            <motion.div
                variants={infoVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 w-full h-full backdrop-brightness-50 backdrop-grayscale p-4 flex flex-col justify-between"
            >
                <h3 className="lg:text-xl font-extrabold font-chillax text-white">{name}</h3>

                <div className="flex gap-2">
                    <span className="text-xs bg-neutral-700 text-neutral-300 px-2 py-1 rounded-full">
                        {feel}
                    </span>
                </div>

                {/* Copy Buttons */}
                <div className="mt-2 flex gap-2">
                    {tailwind && (
                        <button
                            onClick={() => handleCopy(tailwind)}
                            className="flex-1 flex items-center justify-center gap-2 bg-neutral-600/30 hover:bg-neutral-600/70 border border-neutral-600/0 hover:border-neutral-400 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 relative overflow-hidden"
                            aria-pressed={copiedKey === tailwind}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {copiedKey === tailwind ? (
                                    <motion.span
                                        key="copied-tw"
                                        initial={entry}
                                        animate={center}
                                        exit={exit}
                                        transition={{ duration: 0.15 }}
                                        className="flex items-center gap-2 text-green-400"
                                    >
                                        <FaCheck size={16} />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="copy-tw"
                                        initial={entry}
                                        animate={center}
                                        exit={exit}
                                        transition={{ duration: 0.15 }}
                                        className="flex items-center gap-2"
                                    >
                                        <FaRegCopy size={16} /> Tailwind
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    )}

                    {css && (
                        <button
                            onClick={() => handleCopy(css)}
                            className="flex-1 flex items-center justify-center gap-2 bg-neutral-600/30 hover:bg-neutral-600/70 border border-neutral-600/0 hover:border-neutral-400 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 relative overflow-hidden"
                            aria-pressed={copiedKey === css}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {copiedKey === css ? (
                                    <motion.span
                                        key="copied-css"
                                        initial={entry}
                                        animate={center}
                                        exit={exit}
                                        transition={{ duration: 0.15 }}
                                        className="flex items-center gap-2 text-green-400"
                                    >
                                        <FaCheck size={16} />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="copy-css"
                                        initial={entry}
                                        animate={center}
                                        exit={exit}
                                        transition={{ duration: 0.15 }}
                                        className="flex items-center gap-2"
                                    >
                                        <FaRegCopy size={16} /> CSS
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// Component: GradientsBrowser
function GradientsBrowser() {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("Top");
    const [feelFilter, setFeelFilter] = useState("All");

    const types = ["Top", ...new Set(gradients.map(g => g.type))];
    const feels = ["All", ...new Set(gradients.map(g => g.feel))];

    const filteredGradients = gradients.filter(g => {
        const nameMatch = g.name.toLowerCase().includes(searchTerm.toLowerCase());
        const typeMatch = typeFilter === 'Top' || g.type === typeFilter;
        const feelMatch = feelFilter === 'All' || g.feel === feelFilter;
        return nameMatch && typeMatch && feelMatch;
    });

    return (
        <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                    <span className="text-neutral-400 text-sm">Feel:</span>
                    <div className="flex gap-2 flex-wrap">
                        {feels.map(feel => (
                            <button key={feel} onClick={() => setFeelFilter(feel)} className={`px-3 py-1 text-sm rounded-full transition-colors ${feelFilter === feel ? 'bg-blue-600 text-white' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'}`}>{feel}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredGradients.map((gradient, index) => (
                        <GradientCard key={`${gradient.name}-${index}`} {...gradient} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

// Component: ColorExtractor
function ImageColorExtractor() {
    const [image, setImage] = useState(null);
    const [palettes, setPalettes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copied, copy] = useCopyToClipboard();
    const [copiedColor, setCopiedColor] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                extractColors(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const extractColors = async (base64ImageData) => {
        setIsLoading(true);
        setError(null);
        setPalettes(null);

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        if (!apiKey) {
            setError("API key is missing.");
            setIsLoading(false);
            return;
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{
                parts: [
                    { text: "Extract a 3-color, 5-color, 7-color and a 10-color palette from this image. Provide the colors in HEX format(#------)." },
                    { inlineData: { mimeType: "image/jpeg", data: base64ImageData.split(',')[1] } }
                ]
            }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        "3-color": { "type": "ARRAY", "items": { "type": "STRING" } },
                        "5-color": { "type": "ARRAY", "items": { "type": "STRING" } },
                        "7-color": { "type": "ARRAY", "items": { "type": "STRING" } },
                        "10-color": { "type": "ARRAY", "items": { "type": "STRING" } },
                    }
                }
            }
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();
            const jsonText = result.candidates[0].content.parts[0].text;
            setPalettes(JSON.parse(jsonText));

        } catch (err) {
            setError("Could not extract colors. Please try another image.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = (color) => {
        copy(color);
        setCopiedColor(color);
    };

    return (
        <div className="w-full flex flex-col items-center gap-8">
            <div className="w-full max-w-2xl bg-neutral-800/50 border-2 border-dashed border-neutral-700 rounded-xl p-8 text-center">
                <input type="file" id="imageUpload" accept="image/*" className="hidden" onChange={handleImageChange} />
                <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center gap-4 text-neutral-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                    <span className="font-semibold">Click to upload an image</span>
                    <span className="text-sm">or drag and drop</span>
                </label>
            </div>

            {image && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
                    <img src={image} alt="Uploaded preview" className="rounded-xl shadow-lg" />
                </motion.div>
            )}

            {isLoading &&
                <div
                    class="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
                ></div>
            }
            {error && <div className="text-red-500">{error}</div>}

            {palettes && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col gap-6">
                    {Object.entries(palettes).map(([name, colors]) => (
                        <div key={name}>
                            <h3 className="text-lg font-semibold mb-2 text-white">{name.replace('-', ' ')} Palette</h3>
                            <div className="flex flex-wrap gap-2">
                                {colors.map((color, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -5 }}
                                        className="relative group"
                                        onClick={() => handleCopy(color)}
                                    >
                                        <div
                                            className="w-20 h-20 rounded-lg cursor-pointer"
                                            style={{ backgroundColor: color }}
                                        >
                                            <div className="w-full h-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <AnimatePresence>
                                                    {copied && copiedColor === color ? (
                                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                            <FaCheck size={24} className="text-green-400" />
                                                        </motion.div>
                                                    ) : (
                                                        <FaRegCopy size={24} />
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                        <span className="text-xs text-neutral-400 font-mono mt-1 block text-center">{color}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|     MAIN RENDER    |--------------------//
//--------------------|____________________|--------------------//
export default function Colors() {
    const [activeTab, setActiveTab] = useState("creator");

    const tabs = [
        { id: "creator", label: "Creator", icon: <FaDroplet size={20} /> },
        { id: "blocks", label: "Blocks", icon: <IoColorPalette size={20} /> },
        { id: "palettes", label: "Palettes", icon: <HiMiniSwatch size={20} /> },
        { id: "gradients", label: "Gradients", icon: <FaLayerGroup size={20} /> },
        { id: "extractor", label: "Extractor", icon: <MdOutlineImageSearch size={20} /> }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "creator":
                return <ColorCreator />;
            case "blocks":
                return <ColorBlocksBrowser />;
            case "palettes":
                return <CuratedPalettes />;
            case "gradients":
                return <GradientsBrowser />;
            case "extractor":
                return <ImageColorExtractor />;
            default:
                return null;
        }
    };

    return (
        <div className="text-white font-sans w-full min-h-screen p-4 sm:p-6 md:p-8">
            <div className="flex flex-col gap-8 items-center">
                <motion.header
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-chillax font-extrabold tracking-tight">Akshit's Color Space</h1>
                    <p className="text-neutral-400 mt-2">Your universe for color exploration.</p>
                </motion.header>

                <div className="w-full flex justify-center">
                    <div className="flex items-center gap-2 bg-neutral-800/50 border border-neutral-700/80 rounded-full p-1.5">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`${activeTab === tab.id ? "text-white" : "text-neutral-400 hover:text-white"} relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none`}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-neutral-700 rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.icon}</span>
                                <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <main className="w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
