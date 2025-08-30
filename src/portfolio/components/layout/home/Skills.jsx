//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    DEPENDENCIES    |--------------------//
//--------------------|____________________|--------------------//
import React from 'react';



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|     COMPONENTS     |--------------------//
//--------------------|____________________|--------------------//


//--------------------|       COMMON       |--------------------//
import ScrollSection from '../../common/sections/ScrollSection.jsx';
import ScrollSectionHeading from '../../common/headings/ScrollSectionHeading.jsx';
import SkillSection from '../../common/sections/SkillSection.jsx';


//--------------------|       CONFIG       |--------------------//
import { skills } from '../../../config/SkillsConfig.js';



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    MAIN RENDER     |--------------------//
//--------------------|____________________|--------------------//
export default function Skills() {
    return (
        <ScrollSection id="skills">
            <div className="flex w-full"><ScrollSectionHeading heading="skills" /></div>
            <div className="flex flex-col md:gap-5 gap-2">
                {skills.map((section, index) => (
                    <SkillSection key={index} title={section.title} skills={section.skills} />
                ))}
            </div>
        </ScrollSection>
    );
}