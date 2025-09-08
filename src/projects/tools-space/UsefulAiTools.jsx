import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi'; // Using Feather Icons (part of react-icons)

/**
 * Hardcoded Data for AI Tools
 */
const aiToolsData = [
    // --- Original Tools Re-Categorized ---
    {
        name: "Recraft",
        description: "Turn your normal images to highly detailed SVGs",
        category: "Generation Tools",
        subcategory: "AI Image Generation",
        link: "https://www.recraft.ai/"
    },
    {
        name: "Ilus",
        description: "Generate high quality illustrations",
        category: "Generation Tools",
        subcategory: "AI Image Generation",
        link: "https://ilus.ai/"
    },
    {
        name: "Jenni",
        description: "An AI writing assistant focused on academic essays and research papers",
        category: "Generation Tools",
        subcategory: "AI Text Generation",
        link: "https://app.jenni.ai/"
    },
    {
        name: "TRAE",
        description: "An AI-powered IDE and code editor to automate development tasks",
        category: "Code Generation Tools",
        subcategory: "AI Coding Assistants",
        link: "https://www.trae.ai/"
    },
    {
        name: "Promptify",
        description: "A platform to generate, manage, and curate high-quality AI prompts",
        category: "Utility Tools",
        subcategory: "General Utilities",
        link: "https://app.promptify.com/"
    },
    {
        name: "ChatPDF",
        description: "Chat with any PDF document to get summaries and ask questions",
        category: "Utility Tools",
        subcategory: "Document Management",
        link: "https://www.chatpdf.com/"
    },
    {
        name: "Grok",
        description: "An AI chatbot by xAI with real-time access to 𝕏 (Twitter) data",
        category: "Chatbot Platforms",
        subcategory: "Conversational AI",
        link: "https://x.ai/grok"
    },
    {
        name: "Gemini",
        description: "Google's AI assistant integrated into Workspace and a standalone chat app",
        category: "Chatbot Platforms",
        subcategory: "Conversational AI",
        link: "https://gemini.google.com/"
    },
    {
        name: "Perplexity",
        description: "An AI search engine that provides direct, conversational answers with citations",
        category: "Research Tools",
        subcategory: "Literature Review Assistants",
        link: "https://www.perplexity.ai/"
    },
    {
        name: "Napkin",
        description: "An AI doc editor and visual tool for brainstorming and notes",
        category: "Productivity Tools",
        subcategory: "Note Taking & Ideation",
        link: "https://www.napkin.ai/"
    },
    {
        name: "Notion AI",
        description: "AI assistant integrated into Notion for writing, summarizing, and automation",
        category: "Productivity Tools",
        subcategory: "AI Writing Assistants",
        link: "https://www.notion.com/product/ai"
    },

    // --- Overlapping Tools (Updated per New Guide) ---
    {
        name: "ChatGPT",
        description: "Leads the conversational AI space with GPT-4o capabilities and diverse applications",
        category: "Chatbot Platforms",
        subcategory: "Conversational AI",
        link: "https://chatgpt.com/"
    },
    {
        name: "Claude",
        description: "Excels at processing long, complex documents with superior reasoning capabilities",
        category: "Chatbot Platforms",
        subcategory: "Conversational AI",
        link: "https://claude.ai/"
    },
    {
        name: "Microsoft Copilot",
        description: "Integrates seamlessly with Microsoft environments, providing AI assistance across Office apps",
        category: "Chatbot Platforms",
        subcategory: "Conversational AI",
        link: "https://copilot.microsoft.com/"
    },
    {
        name: "Cursor",
        description: "Provides an AI-powered code editor with VSCode familiarity and codebase-aware assistance",
        category: "Code Generation Tools",
        subcategory: "AI Coding Assistants",
        link: "https://cursor.com/"
    },

    // --- New Tools from Guide ---

    // Generation Tools
    {
        name: "DALL-E 3",
        description: "Excels at complex queries and customization via its conversational interface in ChatGPT.",
        category: "Generation Tools",
        subcategory: "AI Image Generation",
        link: "https://openai.com/dall-e-3/"
    },
    {
        name: "Midjourney",
        description: "Recognized for consistently delivering professional-grade, artistic, and realistic images via Discord.",
        category: "Generation Tools",
        subcategory: "AI Image Generation",
        link: "https://www.midjourney.com/"
    },
    {
        name: "Stable Diffusion",
        description: "Open-source alternative with highly customizable styles and image-to-image generation.",
        category: "Generation Tools",
        subcategory: "AI Image Generation",
        link: "https://stability.ai/stable-image"
    },
    {
        name: "Synthesia",
        description: "Leads in AI-powered video creation with realistic talking avatars in 140+ languages.",
        category: "Generation Tools",
        subcategory: "AI Video Generation",
        link: "https://www.synthesia.io/"
    },
    {
        name: "Runway ML",
        description: "Comprehensive AI video editing, text-to-video generation, and creative AI features.",
        category: "Generation Tools",
        subcategory: "AI Video Generation",
        link: "https://runwayml.com/"
    },
    {
        name: "ElevenLabs",
        description: "Dominates voice generation with ultra-realistic, expressive speech synthesis and voice cloning.",
        category: "Generation Tools",
        subcategory: "AI Voice Generation",
        link: "https://elevenlabs.io/"
    },
    {
        name: "Murf AI",
        description: "Provides professional-quality voice generation with an extensive voice library for workflows.",
        category: "Generation Tools",
        subcategory: "AI Voice Generation",
        link: "https://murf.ai/"
    },

    // Productivity Tools
    {
        name: "Grammarly",
        description: "The gold standard for grammar checking, writing enhancement, and plagiarism detection.",
        category: "Productivity Tools",
        subcategory: "AI Writing Assistants",
        link: "https://www.grammarly.com/"
    },
    {
        name: "Jasper",
        description: "Excels in marketing-focused content generation with advanced modes and brand voice consistency.",
        category: "Productivity Tools",
        subcategory: "AI Writing Assistants",
        link: "https://www.jasper.ai/"
    },
    {
        name: "Fathom",
        description: "The best free AI meeting assistant with unlimited transcription, note-taking, and summaries.",
        category: "Productivity Tools",
        subcategory: "AI Meeting Assistants",
        link: "https://fathom.video/"
    },
    {
        name: "Otter.ai",
        description: "Robust meeting transcription with real-time capabilities and extensive team collaboration features.",
        category: "Productivity Tools",
        subcategory: "AI Meeting Assistants",
        link: "https://otter.ai/"
    },
    {
        name: "Reclaim.ai",
        description: "Excels at protecting focus time and automating habit scheduling with smart time-blocking.",
        category: "Productivity Tools",
        subcategory: "AI Scheduling Assistants",
        link: "https://reclaim.ai/"
    },
    {
        name: "Motion",
        description: "Provides real-time calendar optimization with AI-generated workdays and conflict resolution.",
        category: "Productivity Tools",
        subcategory: "AI Scheduling Assistants",
        link: "https://www.usemotion.com/"
    },
    {
        name: "CalendarBridge",
        description: "Organization-wide AI scheduling that works entirely through email without booking links.",
        category: "Productivity Tools",
        subcategory: "AI Scheduling Assistants",
        link: "https://calendarbridge.com/"
    },
    {
        name: "Moveworks",
        description: "Enterprise-grade AI assistants for automating IT and HR support workflows.",
        category: "Productivity Tools",
        subcategory: "AI Workflow Automation",
        link: "https://www.moveworks.com/"
    },
    {
        name: "Gumloop",
        description: "Connects LLMs to internal workflows without coding to create sophisticated automations.",
        category: "Productivity Tools",
        subcategory: "AI Workflow Automation",
        link: "https://www.gumloop.com/"
    },
    {
        name: "n8n",
        description: "Provides workflow automation with deep AI integration for building complex processes.",
        category: "Productivity Tools",
        subcategory: "AI Workflow Automation",
        link: "https://n8n.io/"
    },
    {
        name: "Zapier",
        description: "Excels in workflow automation, enhanced with AI for intelligent task connections.",
        category: "Productivity Tools",
        subcategory: "AI Workflow Automation",
        link: "https://zapier.com/"
    },

    // Chatbot Platforms
    {
        name: "Manychat",
        description: "Dominates marketing automation on Instagram, WhatsApp, and Facebook.",
        category: "Chatbot Platforms",
        subcategory: "Specialized Chatbots",
        link: "https://manychat.com/"
    },
    {
        name: "Chatbase",
        description: "Allows quick training of an AI chatbot on custom data, documents, and websites.",
        category: "Chatbot Platforms",
        subcategory: "Specialized Chatbots",
        link: "https://www.chatbase.co/"
    },
    {
        name: "Botpress",
        description: "Advanced AI support chatbots with knowledge base training and image recognition.",
        category: "Chatbot Platforms",
        subcategory: "Specialized Chatbots",
        link: "https://botpress.com/"
    },

    // Code Generation Tools
    {
        name: "GitHub Copilot",
        description: "The most popular AI coding assistant with deep GitHub ecosystem integration.",
        category: "Code Generation Tools",
        subcategory: "AI Coding Assistants",
        link: "https://github.com/features/copilot"
    },
    {
        name: "Tabnine",
        description: "Uses deep learning to adapt to individual coding styles and provide personalized suggestions.",
        category: "Code Generation Tools",
        subcategory: "AI Coding Assistants",
        link: "https://www.tabnine.com/"
    },

    // Research Tools
    {
        name: "Research Rabbit",
        description: "Creates citation-based mapping to help discover related papers and visualize research networks.",
        category: "Research Tools",
        subcategory: "Literature Review Assistants",
        link: "https://www.researchrabbit.ai/"
    },
    {
        name: "Semantic Scholar",
        description: "AI-powered academic search with intelligent filtering and TLDR summaries of research papers.",
        category: "Research Tools",
        subcategory: "Literature Review Assistants",
        link: "https://www.semanticscholar.org/"
    },
    {
        name: "Litmaps",
        description: "Specializes in visualizing citation networks and tracking research evolution over time.",
        category: "Research Tools",
        subcategory: "Literature Review Assistants",
        link: "https://www.litmaps.com/"
    },
    {
        name: "Paperpal",
        description: "Comprehensive AI academic writing assistance from initial drafts to final submissions.",
        category: "Research Tools",
        subcategory: "Academic Writing Tools",
        link: "https://paperpal.com/"
    },
    {
        name: "NotebookLM",
        description: "Google's advanced research tool for organizing, summarizing, and analyzing documents.",
        category: "Research Tools",
        subcategory: "Academic Writing Tools",
        link: "https://workspace.google.com/products/notebooklm/"
    },
    {
        name: "SPSS",
        description: "A standard for statistical analysis in social sciences with AI-enhanced capabilities.",
        category: "Research Tools",
        subcategory: "Data Analysis Tools",
        link: "https://www.ibm.com/products/spss"
    },
    {
        name: "NVivo",
        description: "Specializes in qualitative data analysis for textual content like interviews and surveys.",
        category: "Research Tools",
        subcategory: "Data Analysis Tools",
        link: "https://lumivero.com/products/nvivo/"
    },

    // Utility Tools
    {
        name: "Docupile",
        description: "AI-powered document organization using OCR; automatically categorizes, names, and stores files.",
        category: "Utility Tools",
        subcategory: "Document Management",
        link: "https://www.docupile.com/"
    },
    {
        name: "M-Files Aino",
        description: "Enterprise-grade AI document management with intelligent search and agentic AI capabilities.",
        category: "Utility Tools",
        subcategory: "Document Management",
        link: "https://www.m-files.com/m-files-platform/capabilities/artificial-intelligence/"
    },
    {
        name: "organize",
        description: "An open-source file management automation tool that moves, renames, and extracts EXIF data.",
        category: "Utility Tools",
        subcategory: "File Organization",
        link: "https://github.com/tfeldmann/organize"
    },
    {
        name: "file.ai",
        description: "Helps automate accounting tasks and streamline data export to ERP systems.",
        category: "Utility Tools",
        subcategory: "General Utilities",
        link: "https://www.file.ai/"
    }
];

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
        const subs = aiToolsData
            .filter(tool => tool.category === selectedCategory)
            .map(tool => tool.subcategory);

        // Return unique values, prefixed with "All"
        return ["All", ...new Set(subs)];
    }, [selectedCategory]);

    // Memoize the final filtered list of tools
    const filteredTools = useMemo(() => {
        // Start with all data
        let tools = aiToolsData;

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