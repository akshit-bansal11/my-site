// ──────────────────────────────────────────────
// Dependencies
// ──────────────────────────────────────────────
import React from 'react'
import { motion } from 'framer-motion'

// ──────────────────────────────────────────────
// Components
// ──────────────────────────────────────────────
import ScrollSection from '../components/common/sections/ScrollSection'
import ProjectCard from '../components/common/cards/ProjectCard'
import ProjectCardSmall from '../components/common/cards/ProjectCardSmall'
import ProjectCardSmallWimg from '../components/common/cards/ProjectCardSmallWimg'
import ScrollSectionHeading from '../components/common/headings/ScrollSectionHeading'

// ──────────────────────────────────────────────
// Images
// ──────────────────────────────────────────────
import Inf from '../../assets/images/projects/Websites/influera.webp'
import Med from '../../assets/images/projects/Websites/mediShare.webp'
import rps from '../../assets/images/projects/Games/rps.webp'
import drumKit from '../../assets/images/projects/Games/drumKit.webp'
import ticTacToe from '../../assets/images/projects/Games/ttt.webp'
import mem from '../../assets/images/projects/Games/memory.webp'
import calc from '../../assets/images/projects/Tools/calc.webp'
import adclock from '../../assets/images/projects/Tools/adclock.webp'
import todo from '../../assets/images/projects/Tools/todo.webp'
import barClock from '../../assets/images/projects/Tools/barClock.webp'
import count from '../../assets/images/projects/Tools/count.webp'
import dclock from '../../assets/images/projects/Tools/dclock.webp'
import code from '../../assets/images/projects/code.webp'
import ipo from '../../assets/images/designs/ipo.webp'
import ecom from '../../assets/images/designs/ecom.webp'
import { head, image } from 'framer-motion/client'

// ──────────────────────────────────────────────
// Animation variants for section entry
// ──────────────────────────────────────────────
const sectionMotion = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 }
}

// ──────────────────────────────────────────────
// Data for all project sections
// ──────────────────────────────────────────────
const projectsData = {
    websites: [
        {
            type: 'large',
            title: 'Medishare',
            description: 'MediShare is a donation-based platform that connects medicine donors with people in need through a secure and verified system.',
            image: Med,
            techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Cloudinary', 'Gemini API']
        },
        {
            type: 'large',
            title: 'Influera',
            description: 'A website made to facilitate the collaboration between small-time influencers and potential investors and clients.',
            image: Inf,
            techStack: ['Node.js', 'Express', 'HTML', 'CSS', 'JavaScript', 'Cloudinary', 'Font Awesome'],
            demoLink: 'https://influera.onrender.com/',
            githubLink: 'https://github.com/akshit-bansal11/Influera'
        },
        {
            type: 'large',
            title: 'Color Space',
            description: "Color Space is a comprehensive, all-in-one web application designed for designers and developers. It provides a full suite of tools to create, browse, extract, and convert colors and gradients, all in one centralized hub.",
            image: Med,
            techStack: ['React', 'Tailwind', 'Gemini API'],
            demoLink: "https://color-space-akshit-bansal11.vercel.app/",
            githubLink: "https://github.com/akshit-bansal11/color-space"
        }
    ],
    games: [
        {
            type: 'small',
            title: 'Rock, Paper, Scissors',
            description: 'A simple rock, paper, scissors game built with HTML, CSS & JavaScript. Play against the computer and try to win!',
            image: rps,
            techStack: ['HTML', 'CSS', 'JavaScript'],
            demoLink: 'https://akshit-bansal11.github.io/rock-paper-scissors/',
            githubLink: 'https://github.com/akshit-bansal11/rock-paper-scissors'
        },
        {
            type: 'small',
            title: 'Drum Kit',
            description: 'A simple drum kit game built with HTML, CSS & JavaScript. Play different sounds by pressing the keys.',
            image: drumKit,
            techStack: ['HTML', 'CSS', 'JavaScript'],
            demoLink: 'https://akshit-bansal11.github.io/drum-kit/',
            githubLink: 'https://github.com/akshit-bansal11/drum-kit'
        },
        {
            type: 'small',
            title: 'Memory Game',
            description: 'A fun and modern Memory Game built with React, Vite, Tailwind CSS, Framer Motion, and React Icons.',
            image: mem,
            techStack: ['React', 'Tailwind'],
            demoLink: 'https://memory-game-akshit-bansal11.vercel.app/',
            githubLink: 'https://github.com/akshit-bansal11/memory-game'
        },
        {
            type: 'small',
            title: 'Tic Tac Toe',
            description: 'A simple tic tac toe game built with HTML, CSS & JavaScript to against your friends.',
            image: ticTacToe,
            techStack: ['HTML', 'CSS', 'JavaScript'],
            demoLink: 'https://akshit-bansal11.github.io/tic-tac-toe/',
            githubLink: 'https://github.com/akshit-bansal11/tic-tac-toe'
        },
        {
            type: 'small',
            title: 'Batting Strike Calculator',
            description: 'A simple batting strike calculator built with Python. Calculate your batting strike rate and average.',
            image: code,
            techStack: ['Python'],
            githubLink: 'https://github.com/akshit-bansal11/batting-strike-calculator'
        }
    ],
    tools: [
        {
            type: 'small',
            title: 'Bar Clock',
            description: 'A simple bar clock built with React & Tailwind. Displays the current time in a unique way.',
            image: barClock,
            techStack: ['React', 'Tailwind'],
            demoLink: 'https://akshit-bansal11.github.io/bar-clock/',
            githubLink: 'https://bar-clock-akshit-bansal11.vercel.app/'
        },
        {
            type: 'small',
            title: 'Audio Visualizer',
            description: 'A Real-Time Audio Visualizer built with C# & .NET. Visualizes the audio from all sources and from any audio device connected to the system.',
            image: code,
            techStack: ['C#', '.NET'],
            githubLink: 'https://github.com/akshit-bansal11/audio-visualizer'
        },
        {
            type: 'small',
            title: 'Color Picker',
            description: 'A simple color picker tool built with React and Tailwind. Pick colors and get the code in HEX, RGB, RGBA and Tailwind formats.',
            image: code,
            techStack: ['C#', '.NET'],
            githubLink: 'https://github.com/akshit-bansal11/audio-visualizer'
        },
        {
            type: 'small',
            title: 'Counter',
            description: 'A simple click counter built with React & Tailwind. Click the button to increase the count.',
            image: count,
            techStack: ['React', 'Tailwind'],
            demoLink: 'https://counter-self-beta.vercel.app/',
            githubLink: 'https://github.com/akshit-bansal11/counter/'
        },
        {
            type: 'small',
            title: 'Analog + Digital Clock',
            description: 'A simple analog and digital clock built with HTML, Tailwind & Vanilla JavaScript. Displays the current time in both analog and digital formats.',
            image: adclock,
            techStack: ['HTML', 'Tailwind', 'JavaScript'],
            githubLink: 'https://github.com/akshit-bansal11/analog-digital-clock',
            demoLink: 'https://akshit-bansal11.github.io/analog-digital-clock/'
        },
        {
            type: 'small',
            title: 'To Do List',
            description: 'A simple to-do list application built with React & Tailwind. Add, edit, and delete tasks easily.',
            image: todo,
            techStack: ['React', 'Tailwind'],
            githubLink: 'https://github.com/akshit-bansal11/to-do-list',
            demoLink: 'https://to-do-list-akshit-bansal11.vercel.app/'
        },
        {
            type: 'small',
            title: 'Digital Clock',
            description: 'A simple digital clock built with HTML, Tailwind & Vanilla JavaScript.',
            image: dclock,
            techStack: ['HTML', 'Tailwind', 'JavaScript'],
            githubLink: 'https://github.com/akshit-bansal11/digital-clock',
            demoLink: 'https://akshit-bansal11.github.io/digital-clock/'
        },
        {
            type: 'small',
            title: 'C++ Login/Signup System',
            description: 'A simple login/signup system built with C++. It allows users to register and login with a username and password.',
            image: code,
            techStack: ['C++'],
            githubLink: 'https://github.com/akshit-bansal11/cpp-login-signup'
        },
        {
            type: 'small',
            title: 'Simple Calculator',
            description: 'A simple calculator built with HTML, CSS & JavaScript. Perform basic arithmetic operations.',
            image: calc,
            techStack: ['HTML', 'CSS', 'JavaScript'],
            githubLink: 'https://github.com/akshit-bansal11/simple-calculator',
            demoLink: 'https://akshit-bansal11.github.io/simple-calculator/'
        }
    ],
    designs: [
        {
            type: 'large',
            title: 'IPO Dashboard - Bluestock Fintech',
            description: "A dashboard design for Bluestock Fintech's IPO section, showcasing the latest IPOs, upcoming IPOs, and past IPOs.",
            image: ipo,
            techStack: ['Figma'],
            designLink: 'https://www.figma.com/design/IyF5MKCS7GP2ChFBOiWXAK/bluestock-fintech-ui-ux-team?node-id=0-1&p=f&t=uex6AqWahwZjsA3R-0'
        },
        {
            type: 'large',
            title: 'E-Commerce Website Template',
            description: 'A modern e-commerce website template designed for a fictional clothing store, featuring a clean and user-friendly interface.',
            image: ecom,
            techStack: ['Figma'],
            designLink: 'https://www.figma.com/design/32zeVVPSZBHL9GFSEXUqHp/Ecom-base?node-id=1-3&p=f&t=JxJOvK2iMlsW3gJ2-0/'
        }
    ],
    scripts: [
        {
            type: 'smallWimg',
            title: 'Merge Folders',
            description: 'A python script to merge two or more folders.',
            techStack: ['Python'],
            githubLink: 'https://github.com/akshit-bansal11/useful-scripts'
        },
        {
            type: 'smallWimg',
            title: 'Audio Converter',
            description: 'A python script to convert audio files from one format to another.',
            techStack: ['Python'],
            githubLink: 'https://github.com/akshit-bansal11/useful-scripts'
        }
    ]
}


// ──────────────────────────────────────────────
// Renders project cards for a given section
// ──────────────────────────────────────────────
function renderProjectCards(projects, layout) {
    return (
        <motion.div
            initial={sectionMotion.initial}
            animate={sectionMotion.animate}
            className={layout}
        >
            {projects.map((project, idx) => {
                switch (project.type) {
                    case 'large':
                        return <ProjectCard key={idx} {...project} />
                    case 'small':
                        return <ProjectCardSmall key={idx} {...project} />
                    case 'smallWimg':
                        return <ProjectCardSmallWimg key={idx} {...project} />
                    default:
                        return null
                }
            })}
        </motion.div>
    )
}


// ──────────────────────────────────────────────
// Section configuration for layout and headings
// ──────────────────────────────────────────────
const sectionConfigs = [
    {
        id: 'websites',
        heading: 'websites',
        layout: 'flex lg:flex-row flex-col gap-2 lg:justify-around justify-center',
        dataKey: 'websites'
    },
    {
        id: 'games',
        heading: 'games',
        layout: 'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 flex-col lg:gap-y-10 gap-x-2 gap-y-2 justify-items-center',
        dataKey: 'games'
    },
    {
        id: 'tools',
        heading: 'tools',
        layout: 'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-2 flex-col lg:gap-y-10 gap-y-2 justify-items-center',
        dataKey: 'tools'
    },
    {
        id: 'designs',
        heading: 'designs',
        layout: 'flex lg:flex-row flex-col gap-2 lg:justify-around justify-center items-center',
        dataKey: 'designs'
    },
    {
        id: 'scripts',
        heading: 'scripts',
        layout: 'flex lg:flex-row flex-col gap-2 lg:justify-around justify-center items-center',
        dataKey: 'scripts'
    }
]

// ──────────────────────────────────────────────
// Main Projects Page Component
// ──────────────────────────────────────────────
function Projects() {
    return (
        <div className="w-full lg:px-10 md:px-15 px-5 h-full flex flex-col items-center gap-25">
            {sectionConfigs.map(({ id, heading, layout, dataKey }) => (
                <ScrollSection id={id} key={id}>
                    <div className="flex w-full gap-2 items-baseline"><ScrollSectionHeading heading={heading} /></div>
                    {renderProjectCards(projectsData[dataKey], layout)}
                </ScrollSection>
            ))}
        </div>
    )
}

export default Projects