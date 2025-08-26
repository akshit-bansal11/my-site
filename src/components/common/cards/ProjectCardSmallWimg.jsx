//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|   DEPENDENCIES     |--------------------//
//--------------------|____________________|--------------------//
import React from 'react';
import { motion } from 'framer-motion';



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|      ASSETS        |--------------------//
//--------------------|____________________|--------------------//

//--------------------|      ICONS         |--------------------//
import { FiGithub } from "react-icons/fi";



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|   MAIN RENDER      |--------------------//
//--------------------|____________________|--------------------//
export default function ProjectCardText({ title, description, githubLink, techStack = [] }) {
  const ActionButton = ({ href, text, icon, variant = 'secondary' }) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 shadow-sm";
    const variantClasses = {
      secondary: "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700 focus:ring-neutral-600"
    };

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${variantClasses[variant]}`}>
        {icon}
        <span>{text}</span>
      </a>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative flex flex-col w-full max-w-md overflow-hidden rounded-xl bg-neutral-800/40 border border-neutral-700/80 shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:border-neutral-600"
    >
        <div className="flex flex-col gap-2">
          <h2 className="text-neutral-100 text-2xl font-clash font-semibold tracking-widest">{title}</h2>
          <p className="text-md text-neutral-300">{description}</p>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <li key={index} className="rounded-full bg-neutral-700/60 px-3 py-1 text-xs font-medium text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white">
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex-grow" />

        <div className="mt-6 flex justify-start gap-3">
          {githubLink && <ActionButton href={githubLink} text="GitHub" icon={<FiGithub />} />}
        </div>
    </motion.div>
  );
};