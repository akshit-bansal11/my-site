//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    DEPENDENCIES    |--------------------//
//--------------------|____________________|--------------------//
import React from 'react';



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|     COMPONENTS     |--------------------//
//--------------------|____________________|--------------------//
import ProfileHeader from '../components/layout/home/ProfileHeader.jsx';
import About from '../components/layout/home/About.jsx'
import Projects from '../components/layout/home/Projects.jsx'
import Experience from '../components/layout/home/Experience.jsx'
import Skills from '../components/layout/home/Skills.jsx';
import Certifications from "../components/layout/home/Certifications.jsx"
import Education from '../components/layout/home/Education.jsx';



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    MAIN RENDER     |--------------------//
//--------------------|____________________|--------------------//
function Home() {
    return (
        <div className="flex lg:px-10 md:px-15 px-5 flex-col items-center w-full gap-30 md:gap-20 lg:gap-30">
            <About
                text="Building Practical Web Experiences"
                delay={150}
                animateBy="words"
                direction="top"
                className="lg:text-[100px] md:text-[60px] mb-10 text-[30px] items-center justify-center text-white bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 bg-clip-text drop-shadow-2xl"
            />
            <ProfileHeader />
            <Projects />
            <Experience />
            <Skills />
            <Certifications />
            <Education />
        </div>
    );
}

export default Home;
