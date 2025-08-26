import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy, FiCheck, FiSearch, FiFilter } from 'react-icons/fi';

const gradientConfig = [
    {
        id: 1,
        name: "Gradient 1",
        type: "simple",
        class: "bg-gradient-to-r from-[#ff5450] to-[#ab0062]",
        colors: [{ color: '#ff5450', label: 'from' }, { color: '#ab0062', label: 'to' }]
    },
    {
        id: 2,
        name: "Gradient 2",
        type: "simple",
        class: "bg-gradient-to-br from-[#133e57] to-[#b8d1c5]",
        colors: [{ color: '#133e57', label: 'from' }, { color: '#b8d1c5', label: 'to' }]
    },
    {
        id: 3,
        name: "Gradient 3",
        type: "simple",
        class: "bg-gradient-to-br from-[#fef500] to-[#00a800]",
        colors: [{ color: '#fef500', label: 'from' }, { color: '#00a800', label: 'to' }]
    },
    {
        id: 4,
        name: "Gradient 4",
        type: "simple",
        class: "bg-gradient-to-br from-[#262D57] to-[#a89fc8]",
        colors: [{ color: '#262D57', label: 'from' }, { color: '#a89fc8', label: 'to' }]
    },
    {
        id: 5,
        name: "Gradient 5",
        type: "simple",
        class: "bg-gradient-to-br from-[#842A50] to-[#D17B68]",
        colors: [{ color: '#842A50', label: 'from' }, { color: '#D17B68', label: 'to' }]
    },
    {
        id: 8,
        name: "Golden Hour",
        type: "via",
        class: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500",
        colors: [{ color: 'yellow-400', label: 'from' }, { color: 'orange-500', label: 'via' }, { color: 'red-500', label: 'to' }]
    }
];

const GradientCard = ({ gradient, onCopy }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [copied, setCopied] = useState(false);

    const getSwatchStyle = (color) => (color.startsWith('#') ? { backgroundColor: color } : {});
    const getSwatchClass = (color) => (!color.startsWith('#') ? `bg-${color}` : '');

    const handleCopy = async () => {
        await navigator.clipboard.writeText(gradient.class);
        setCopied(true);
        onCopy(gradient.name);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group cursor-pointer"
        >
            <div className="relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 transition-all duration-300 hover:border-gray-600/50">
                {/* The gradient is now applied directly from the config */}
                <div className={`h-40 w-full ${gradient.class}`} />

                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/20 flex items-center justify-center"
                        >
                            <motion.button
                                initial={{ scale: 0.8 }} animate={{ scale: 1 }} whileTap={{ scale: 0.9 }}
                                onClick={handleCopy}
                                className="bg-black/80 text-white px-4 py-2 rounded-lg flex items-center gap-2 backdrop-blur-sm border border-white/10 hover:bg-black/90 transition-colors"
                            >
                                <FiCopy className="w-4 h-4" />
                                {copied ? 'Copied!' : 'Copy Code'}
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-100 text-lg">{gradient.name}</h3>
                        <span className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded-full capitalize">
                            {gradient.type}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                        {gradient.colors.map((colorInfo, index) => (
                            <div key={index} className="flex items-center gap-1.5">
                                <div
                                    className={`w-5 h-5 rounded border border-gray-600 ${getSwatchClass(colorInfo.color)}`}
                                    style={getSwatchStyle(colorInfo.color)}
                                    title={colorInfo.color}
                                />
                                <span className="text-xs text-gray-400 capitalize">{colorInfo.label}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-gray-400 text-sm font-mono break-all">
                        {gradient.class}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const FilterButton = ({ active, onClick, children }) => (
    <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${active
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
            : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-gray-200'
            }`}
    >
        {children}
    </motion.button>
);

export default function Gradients() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [copiedGradient, setCopiedGradient] = useState('');

    const filteredGradients = gradientConfig.filter(gradient => {
        const matchesSearch = gradient.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || gradient.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const handleCopy = (gradientName) => {
        setCopiedGradient(gradientName);
        setTimeout(() => setCopiedGradient(''), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                            Gradient Collection
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            A curated collection of beautiful gradients. Hover to copy the Tailwind CSS class.
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                    <div className="relative flex-1 w-full md:max-w-md">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text" placeholder="Search gradients..." value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 focus:outline-none transition-all backdrop-blur-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <FiFilter className="text-gray-400 w-5 h-5 mr-2" />
                        <div className="flex gap-2">
                            {['all', 'simple', 'via', 'custom'].map((type) => (
                                <FilterButton
                                    key={type} active={filterType === type}
                                    onClick={() => setFilterType(type)}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </FilterButton>
                            ))}
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {copiedGradient && (
                        <motion.div
                            initial={{ opacity: 0, y: -50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
                        >
                            <FiCheck className="w-5 h-5" />
                            Copied "{copiedGradient}" gradient!
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {filteredGradients.map((gradient) => (
                            <GradientCard key={gradient.id} gradient={gradient} onCopy={handleCopy} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                <AnimatePresence>
                    {filteredGradients.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                            <div className="text-gray-500 text-3xl mb-4">🤷‍♂️</div>
                            <p className="text-gray-400 text-lg">No gradients found.</p>
                            <p className="text-gray-500">Try adjusting your search or filter.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className="border-t border-gray-800 mt-16">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="text-center text-gray-400">
                        <p>Add more gradients to the <code className="bg-gray-800 px-2 py-1 rounded">gradientConfig</code> array.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}