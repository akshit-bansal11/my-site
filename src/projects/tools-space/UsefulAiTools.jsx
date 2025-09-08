import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi'; // Using Feather Icons (part of react-icons)

import { aiTools } from "./data/aiTools"

// Hardcoded main categories as required, adding "All" for usability
const mainCategories = [
    "All",
    "Generation Tools",
    "Productivity Tools",
    "Chatbot Platforms",
    "Code Generation Tools",
    "Research Tools",
    "Utility Tools"
];

/**
 * FilterButton (Helper Component)
 * A reusable button for the filter bars.
 */
const FilterButton = ({ label, onClick, isActive, isSubcategory = false }) => {
    const baseStyles = "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950 shadow-sm";

    // Different styling for main vs. sub categories
    const activeStyles = isSubcategory
        ? "bg-neutral-200 text-neutral-900 ring-neutral-200"
        : "bg-neutral-50 text-neutral-950 ring-neutral-50";

    const inactiveStyles = isSubcategory
        ? "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200"
        : "bg-neutral-900 text-neutral-300 border border-neutral-700 hover:bg-neutral-800 hover:text-neutral-100";

    return (
        <motion.button
            onClick={onClick}
            className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {label}
        </motion.button>
    );
};

/**
 * ToolCard (Helper Component)
 * Renders a single AI tool card with animations.
 */
const ToolCard = ({ tool }) => {
    // Variants for the fade-up animation on filter change / scroll-in
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            layout // This is essential for the grid re-flow animation
            variants={cardVariants}
            initial="hidden" // Start hidden
            animate="visible" // Animate to visible (triggered by AnimatePresence)
            exit="exit" // Animate out when removed from the list
            whileInView="visible" // Also triggers animation on scroll-in
            transition={{ duration: 0.2, ease: "easeInOut" }} // Default transition
            whileHover={{
                scale: 1.1,
                rotate: 2
            }}
            className="bg-neutral-600/20 rounded-2xl border border-neutral-600 shadow-md overflow-hidden flex flex-col group"
        >
            {/* Card Content */}
            <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-neutral-100 mb-2">{tool.name}</h3>
                <p className="text-neutral-400 text-sm mb-4">{tool.description}</p>
            </div>

            {/* Card Footer/Link Button */}
            <div className="p-6 pt-0 mt-auto">
                <motion.a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 text-neutral-950 font-medium text-sm transition-colors duration-300 hover:bg-neutral-200 group-hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2 focus:ring-offset-neutral-900"
                >
                    Visit Tool
                    <FiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                </motion.a>
            </div>
        </motion.div>
    );
};

/**
 * Main UsefulAiTools Component
 */
const UsefulAiTools = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSubcategory, setSelectedSubcategory] = useState("All");

    // Memoize dynamic subcategories based on the selected main category
    const dynamicSubcategories = useMemo(() => {
        if (selectedCategory === "All") {
            return []; // Hide sub-filter bar if "All" is selected
        }
        // Get all unique subcategories for the chosen main category
        const subs = aiTools
            .filter(tool => tool.category === selectedCategory)
            .map(tool => tool.subcategory);

        // Return unique values, prefixed with "All"
        return ["All", ...new Set(subs)];
    }, [selectedCategory]);

    // Memoize the final filtered list of tools
    const filteredTools = useMemo(() => {
        // Start with all data
        let tools = aiTools;

        // Filter by main category (if not "All")
        if (selectedCategory !== "All") {
            tools = tools.filter(tool => tool.category === selectedCategory);
        }

        // Further filter by subcategory (if a main category IS selected AND subcategory is not "All")
        if (selectedCategory !== "All" && selectedSubcategory !== "All") {
            tools = tools.filter(tool => tool.subcategory === selectedSubcategory);
        }

        return tools;
    }, [selectedCategory, selectedSubcategory]);

    // Handlers
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSelectedSubcategory("All"); // Reset sub-filter when main category changes
    };

    const handleSubcategoryChange = (subcategory) => {
        setSelectedSubcategory(subcategory);
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 text-neutral-200 min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-neutral-100 mb-8 tracking-tight">
                AI Tool Kit
            </h1>

            {/* --- Filter Section --- */}
            <nav className="flex flex-col items-center gap-4 mb-12">
                {/* Main Category Filters */}
                <div className="flex flex-wrap justify-center gap-3">
                    {mainCategories.map(category => (
                        <FilterButton
                            key={category}
                            label={category}
                            onClick={() => handleCategoryChange(category)}
                            isActive={selectedCategory === category}
                        />
                    ))}
                </div>

                {/* Dynamic Sub-Category Filters (Animates in/out) */}
                <AnimatePresence>
                    {dynamicSubcategories.length > 0 && (
                        <motion.div
                            className="flex flex-wrap justify-center gap-2 mt-4"
                            initial={{ height: 0, opacity: 0, y: -10 }}
                            animate={{ height: 'auto', opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            {dynamicSubcategories.map(sub => (
                                <FilterButton
                                    key={sub}
                                    label={sub}
                                    onClick={() => handleSubcategoryChange(sub)}
                                    isActive={selectedSubcategory === sub}
                                    isSubcategory={true} // Apply different styling
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* --- Tools Grid --- */}
            {/* This motion.div container uses 'layout' to smoothly animate the container height/position changes when the grid contents change size. */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {/* AnimatePresence handles the exit/enter animations of children (the ToolCards) 
            when the filteredTools array changes. */}
                <AnimatePresence>
                    {filteredTools.map(tool => (
                        <ToolCard key={tool.name} tool={tool} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default UsefulAiTools;