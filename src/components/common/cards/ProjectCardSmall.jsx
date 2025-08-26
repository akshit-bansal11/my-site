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
import { FaExternalLinkAlt } from "react-icons/fa";



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|   MAIN RENDER      |--------------------//
//--------------------|____________________|--------------------//
export default function ProjectCardSmall({ title, description, image, iframe, demoLink, githubLink, techStack = [] }) {
  const ActionButton = ({ href, text, icon, variant = 'primary' }) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 shadow-sm";
    const variantClasses = {
      primary: "bg-white text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-400 shadow-white/10",
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
      className="group relative flex flex-col w-full max-w-md overflow-hidden rounded-xl bg-neutral-800/40 border border-neutral-700/80 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-neutral-600"
    >
      <div className="overflow-hidden border-b border-neutral-700/80">
        {iframe ? (
          <iframe
            src={iframe}
            title={`${title} preview`}
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
            allowFullScreen
          />
        ) : (
          <img
            src={image}
            alt={`${title} preview`}
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <div className='flex flex-col flex-grow p-6'>
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
          {demoLink && <ActionButton href={demoLink} text="Demo" icon={<FaExternalLinkAlt />} variant="primary" />}
          {githubLink && <ActionButton href={githubLink} text="GitHub" icon={<FiGithub />} variant="secondary" />}
        </div>
      </div>
    </motion.div>
  );
};