//--------------------| DEPENDENCIES |--------------------//
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import tinycolor from "tinycolor2";
import { FaCheck, FaRegCopy, FaArrowRightArrowLeft } from "react-icons/fa6";

//--------------------| HELPERS |--------------------//
const isHexColor = (v) => /^#([0-9a-f]{3}){1,2}$/i.test(v);
const isCssAngle = (v) => /^-?\d+(\.\d+)?deg$/i.test(v);

const twToCss = {
    "to-t": "to top",
    "to-tr": "to top right",
    "to-r": "to right",
    "to-br": "to bottom right",
    "to-b": "to bottom",
    "to-bl": "to bottom left",
    "to-l": "to left",
    "to-tl": "to top left",
};
const cssToTw = Object.fromEntries(Object.entries(twToCss).map(([k, v]) => [v, k]));

//--------------------| REUSABLES |--------------------//
const InputField = ({ label, name, value, error, onChange, placeholder }) => (
    <div className="flex-1">
        <label htmlFor={name} className="block text-sm text-neutral-400 mb-2">{label}</label>
        <input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 rounded-lg bg-neutral-800 text-neutral-100 border focus:outline-none focus:ring-2 ${error ? "border-red-500/50 focus:ring-red-500" : "border-neutral-700 focus:ring-neutral-400"}`}
        />
        <AnimatePresence>
            {error && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-400 mt-1">
                    {error}
                </motion.p>
            )}
        </AnimatePresence>
    </div>
);

const CopyButton = ({ text, isCopied, onCopy }) => (
    <motion.button
        onClick={onCopy}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-full bg-neutral-700/50 hover:bg-neutral-700 transition-colors"
    >
        <AnimatePresence mode="wait">
            {isCopied ? (
                <motion.div key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                    <FaCheck className="w-5 h-5 text-green-400" />
                </motion.div>
            ) : (
                <motion.div key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                    <FaRegCopy className="w-5 h-5 text-neutral-400" />
                </motion.div>
            )}
        </AnimatePresence>
    </motion.button>
);


//--------------------| GRADIENT CONVERTER |--------------------//
function GradientClassConverter() {
    const [mode, setMode] = useState("tw-to-css");
    const [copied, setCopied] = useState(false);
    const [inputs, setInputs] = useState({ from: "#10b981", via: "", to: "#3b82f6", twDir: "to-r", cssType: "to right", cssAngle: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const e = {};
        if (!isHexColor(inputs.from)) e.from = "Invalid hex.";
        if (inputs.via && !isHexColor(inputs.via)) e.via = "Invalid hex.";
        if (!isHexColor(inputs.to)) e.to = "Invalid hex.";
        if (mode === "css-to-tw" && inputs.cssType === "angle") {
            if (!inputs.cssAngle) e.cssAngle = "Required.";
            else if (!isCssAngle(inputs.cssAngle)) e.cssAngle = "Invalid (e.g., 45deg).";
        }
        setErrors(e);
    }, [inputs, mode]);

    const handle = (e) => setInputs((p) => ({ ...p, [e.target.name]: e.target.value }));
    const copy = (val) => navigator.clipboard.writeText(val).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });

    const result = useMemo(() => {
        if (Object.keys(errors).length) return "";
        const { from, via, to, twDir, cssType, cssAngle } = inputs;
        const stops = [from, via, to].filter(Boolean).join(", ");

        if (mode === "tw-to-css")
            return twDir === "radial" ? `background: radial-gradient(circle, ${stops});` : `background: linear-gradient(${twToCss[twDir]}, ${stops});`;

        const fromCls = `from-[${from}]`, viaCls = via ? `via-[${via}]` : "", toCls = `to-[${to}]`;
        if (cssType === "angle") return `bg-gradient-to-r [background-image:linear-gradient(${cssAngle},var(--tw-gradient-stops))] ${fromCls} ${viaCls} ${toCls}`;
        if (cssType === "radial") return `bg-[radial-gradient(circle,var(--tw-gradient-stops))] ${fromCls} ${viaCls} ${toCls}`;
        return `bg-gradient-${cssToTw[cssType]} ${fromCls} ${viaCls} ${toCls}`;
    }, [inputs, mode, errors]);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl bg-neutral-800/50 rounded-2xl border border-neutral-700/50 p-6 md:p-8 space-y-8">
            
            <h1 className="text-2xl md:text-3xl font-chillax font-extrabold text-center text-neutral-300">Gradient Class Converter</h1>
            {/* Toggle */}
            <div className="flex items-center justify-center gap-2">
                <div className={`flex-1 p-2 text-center rounded-lg font-medium ${mode === "tw-to-css" ? "bg-neutral-700 text-neutral-100" : "bg-neutral-800/50 text-neutral-400"}`}>Tailwind → CSS</div>
                <motion.button onClick={() => setMode(mode === "tw-to-css" ? "css-to-tw" : "tw-to-css")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-3 rounded-full bg-neutral-700/50 hover:bg-neutral-700">
                    <FaArrowRightArrowLeft className="text-neutral-300" />
                </motion.button>
                <div className={`flex-1 p-2 text-center rounded-lg font-medium ${mode === "css-to-tw" ? "bg-neutral-700 text-neutral-100" : "bg-neutral-800/50 text-neutral-400"}`}>CSS → Tailwind</div>
            </div>

            {/* Inputs */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <InputField label="From*" name="from" value={inputs.from} error={errors.from} onChange={handle} placeholder="#RRGGBB" />
                <InputField label="Via" name="via" value={inputs.via} error={errors.via} onChange={handle} placeholder="Optional" />
                <InputField label="To*" name="to" value={inputs.to} error={errors.to} onChange={handle} placeholder="#RRGGBB" />
            </div>

            {mode === "tw-to-css" ? (
                <select name="twDir" value={inputs.twDir} onChange={handle} className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-neutral-100 border border-neutral-700">
                    {Object.keys(twToCss).map((d) => <option key={d} value={d}>{d}</option>)}
                    <option value="radial">radial</option>
                </select>
            ) : (
                <div className="flex flex-col md:flex-row gap-4">
                    <select name="cssType" value={inputs.cssType} onChange={handle} className="flex-1 px-3 py-2 rounded-lg bg-neutral-800 text-neutral-100 border border-neutral-700">
                        {Object.keys(cssToTw).map((d) => <option key={d} value={d}>{d}</option>)}
                        <option value="radial">Radial</option>
                        <option value="angle">Angle</option>
                    </select>
                    {inputs.cssType === "angle" && <InputField label="Angle*" name="cssAngle" value={inputs.cssAngle} error={errors.cssAngle} onChange={handle} placeholder="e.g., 45deg" />}
                </div>
            )}

            {/* Result */}
            <AnimatePresence>
                {result && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <label className="block text-sm text-neutral-400 mb-2">Result</label>
                        <div className="relative">
                            <textarea readOnly value={result} className="w-full p-4 pr-12 rounded-lg bg-neutral-950/70 text-neutral-200 border border-neutral-700/50 font-mono text-sm resize-none" rows={1} />
                            <div className="absolute top-3 right-3"><CopyButton text={result} isCopied={copied} onCopy={() => copy(result)} /></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

//--------------------| COLOR CONVERTER |--------------------//
function ColorCodeConverter() {
    const [input, setInput] = useState("#9f9f9f"), [type, setType] = useState("rgb"), [copied, setCopied] = useState(false);
    const col = useMemo(() => tinycolor(input), [input]);
    const valid = col.isValid();

    const result = useMemo(() => {
        if (!valid) return "";
        return type === "hex" ? col.toHexString() : type === "rgb" ? col.toRgbString() : col.toHslString();
    }, [col, type, valid]);

    const copy = (val) => navigator.clipboard.writeText(val).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-8 w-full max-w-md bg-neutral-800/50 rounded-2xl border border-neutral-700/50 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-chillax font-extrabold text-center text-neutral-300">Color Code Converter</h1>

            {/* Input */}
            <div>
                <label className="block text-sm text-neutral-400 mb-2">Enter Color</label>
                <div className="flex items-center">
                    <motion.div animate={{ backgroundColor: valid ? col.toHexString() : "#3f3f46" }} className="w-10 h-10 rounded-l-lg border-y border-l" />
                    <input value={input} onChange={(e) => setInput(e.target.value)} className={`w-full h-10 px-3 rounded-r-lg bg-neutral-800 text-neutral-100 border border-l-0 ${valid ? "border-neutral-700 focus:ring-green-500" : "border-red-500/50 focus:ring-red-500"}`} />
                </div>
            </div>

            {/* Select */}
            <div>
                <label className="block text-sm text-neutral-400 mb-2">Convert To</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-neutral-100 border border-neutral-700">
                    <option value="hex">Hex</option>
                    <option value="rgb">RGB</option>
                    <option value="hsl">HSL</option>
                </select>
            </div>

            {/* Result */}
            <AnimatePresence>
                {valid && result && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full rounded-lg bg-neutral-900/70 p-4 border border-neutral-700/50 flex justify-between items-center gap-4">
                        <p className="text-sm text-neutral-300 break-all">{result}</p>
                        <CopyButton text={result} isCopied={copied} onCopy={() => copy(result)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}


//--------------------| MAIN EXPORT |--------------------//
export default function Converter() {
    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Color Converter */}
            <div className="flex-1 min-w-0">
                <ColorCodeConverter />
            </div>

            {/* Gradient Converter */}
            <div className="flex-1 min-w-0">
                <GradientClassConverter />
            </div>
        </div>
    );
}