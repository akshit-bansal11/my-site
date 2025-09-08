//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    DEPENDENCIES    |--------------------//
//--------------------|____________________|--------------------//
import React from "react";



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|     COMPONENTS     |--------------------//
//--------------------|____________________|--------------------//
import ScrollSection from '../../common/sections/ScrollSection';
import ScrollSectionHeading from '../../common/headings/ScrollSectionHeading';
import ExpItem from '../../common/cards/ExpItem.jsx';



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|     MAIN RENDER    |--------------------//
//--------------------|____________________|--------------------//
export default function Experience() {
    return (
        <ScrollSection id="experience">
            <div className="flex w-full gap-2 items-baseline"><ScrollSectionHeading heading="experience" /></div>
            <div className="flex flex-col gap-2">
                <h1 className="text-neutral-400 text-[8px] md:text-lg lg:text-2xl">Internship</h1>
                <ExpItem
                    location="Remote"
                    company="Bluestock Fintech"
                    role="Software Development Engineer Intern"
                    date="Oct 2024 - Nov 2024"
                    points={[
                        "Developed an IPO Dashboard, a full-stack web application for tracking IPOs.",
                        "Implemented real-time IPO listings, user portfolio management, and financial analytics.",
                        "Used Node.js, Express.js, MySQL, and frontend frameworks for seamless user experience",
                    ]}
                />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-neutral-400 text-[8px] md:text-lg lg:text-2xl">Training</h1>
                <ExpItem
                    location="Punjab, India"
                    company="Bangalore Computer Education"
                    role="MERN Stack Development + AI Integration Training"
                    date="June 2025 - Aug 2025"
                    points={[
                        "MongoDB, Express.js, React.js, Node.js, Gemini API, Redux Toolkit, and Tailwind CSS.",
                        "Developed a full-stack web application with AI integration for enhanced user experience.",
                        "Focused on building scalable, maintainable, and efficient web applications.",
                    ]}
                />
                <ExpItem
                    location="Punjab, India"
                    company="Bangalore Computer Education"
                    role="Data Structures and Algorithms Training"
                    date="Dec 2024 - Mar 2025"
                    points={[
                        "In-depth training in data structures and algorithms, focusing on problem-solving skills.",
                        "Covered topics such as arrays, linked lists, trees, graphs, sorting algorithms, and dynamic programming.",
                        "Emphasized practical applications and coding challenges to enhance algorithmic thinking.",
                    ]}
                />
                <ExpItem
                    location="Punjab, India"
                    company="Bangalore Computer Education"
                    role="NodeJS Full Stack Development Training"
                    date="June 2024 - July 2024"
                    points={[
                        "Comprehensive training in Node.js for full-stack development.",
                        "Learned to build RESTful APIs, manage databases, and create dynamic web applications.",
                        "Focused on best practices in backend development, including security and performance optimization.",
                    ]}
                />
            </div>
        </ScrollSection>
    );
}