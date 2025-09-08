//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    DEPENDENCIES    |--------------------//
//--------------------|____________________|--------------------//
import React from 'react';
import { motion } from 'framer-motion';


//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|       ASSETS       |--------------------//
//--------------------|____________________|--------------------//

//--------------------|       ICONS        |--------------------//
import { FiGithub } from "react-icons/fi"
import { FaExternalLinkAlt, FaFigma } from "react-icons/fa"



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    MAIN RENDER     |--------------------//
//--------------------|____________________|--------------------//
export default function ProjectCard({
  title,
  description,
  image,
  demoLink,
  designLink,
  githubLink,
  techStack = [] 
}) {
  const ActionButton = ({ href, text, icon, variant = 'primary' }) => {
    const baseClasses = `
      inline-flex items-center justify-center rounded-lg
      md:gap-2 gap-1 lg:px-4 md:px-2 md:py-2 p-1 
      md:text-sm text-xs font-medium
      shadow-sm
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900
      transition-all duration-300 ease-in-out
    `;
    const variantClasses = {
      primary: `
        bg-neutral-200 text-neutral-900 shadow-white/10
        hover:bg-white 
        focus:ring-neutral-400
      `,
      secondary: `
        bg-neutral-800 text-neutral-300
        border border-neutral-700 
        hover:bg-neutral-700 hover:text-white
        focus:ring-neutral-600
      `
    };

    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`
            ${baseClasses}
            ${variantClasses[variant]}
          `}
        >
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
      className={`
        group relative flex flex-col overflow-hidden rounded-xl
        w-full not-md:max-w-md md:max-w-lg
        bg-neutral-800/40 
        shadow-lg
        border border-neutral-700/80 
        hover:shadow-xl hover:border-neutral-600
        transition-all duration-300
      `}
    >
      <div className="overflow-hidden border-b border-neutral-700/80">
        <img
          src={image}
          alt={`${title} preview`}
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className='flex flex-col flex-grow p-6'>
        <div className="flex flex-col gap-2">
          <h2 className="text-neutral-100 lg:text-2xl md:text-xl text-lg font-clash font-semibold tracking-widest">{title}</h2>
          <p className="lg:text-base md:text-sm text-xs text-neutral-300">{description}</p>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <li key={index} className="rounded-full bg-neutral-700/60 md:px-3 px-1 py-1 md:text-xs text-[8px] font-medium text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white">
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex-grow" />

        <div className="mt-6 flex justify-start gap-3">
          {demoLink || githubLink || designLink ? (
            <>
              {demoLink && <ActionButton href={demoLink} text="Demo" icon={<FaExternalLinkAlt />} variant="primary" />}
              {githubLink && <ActionButton href={githubLink} text="GitHub" icon={<FiGithub />} variant="secondary" />}
              {designLink && <ActionButton href={designLink} text="Design" icon={<FaFigma />} variant="secondary" />}
            </>
          ) : (
            <div className="text-left text-orange-400 md:text-xs text-[8px] font-semibold tracking-wider uppercase">
              * Private Project
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};