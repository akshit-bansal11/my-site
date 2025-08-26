//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    DEPENDENCIES    |--------------------//
//--------------------|____________________|--------------------//
import React from "react";



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|       ASSETS       |--------------------//
//--------------------|____________________|--------------------//


//-----------------------------ICONS----------------------------//
import { GoArrowUpRight } from "react-icons/go";


//----------------------------PROJECTS--------------------------//
// Influera
import Inf from '../../../assets/images/projects/Websites/influera.webp';

// Medishare
import Med from '../../../assets/images/projects/Websites/mediShare.webp';



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|     COMPONENTS     |--------------------//
//--------------------|____________________|--------------------//
import ScrollSection from '../../common/sections/ScrollSection';
import ScrollSectionHeading from '../../common/headings/ScrollSectionHeading';
import TextOnlyButton from '../../common/buttons/TextOnlyButton';
import ProjectCard from '../../common/cards/ProjectCard';



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|     MAIN RENDER    |--------------------//
//--------------------|____________________|--------------------//
export default function Projects() {
    return (
        <ScrollSection id="projects">
            <div className="flex w-full gap-2 items-baseline">
                <ScrollSectionHeading heading="projects" />
                <TextOnlyButton
                    className="
                        text-white lg:text-neutral-300 lg:hover:text-white
                    "
                    to="/projects"
                >
                    <p>See More</p>
                    <GoArrowUpRight />
                </TextOnlyButton>
            </div>
            <div className="flex flex-col p-4 justify-center not-lg:items-center gap-8 lg:flex-row lg:justify-around">
                <ProjectCard
                    title="Medishare"
                    description="MediShare is a donation-based platform that connects medicine donors with people in need through a secure and verified system."
                    image={Med}
                    techStack={['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Cloudinary', 'Gemini API']}
                    delay={0}
                />
                <ProjectCard
                    title="Influera"
                    description="A website made to facilitate the collaboration between small-time influencers and potential investors and clients."
                    image={Inf}
                    techStack={['Node.js', 'Express', 'HTML', 'CSS', 'JavaScript', 'Cloudinary', 'Font Awesome']}
                    delay={0.1}
                    demoLink="https://influera.onrender.com/"
                    githubLink="https://github.com/akshit-bansal11/Influera"
                />
            </div>
        </ScrollSection>
    );
}