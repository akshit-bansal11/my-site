// navConfig.js (keep as .js)
import { FaCogs, FaHome, FaTools } from 'react-icons/fa';
import { FaUser, FaLaptopCode, FaGamepad, FaBriefcase, FaGraduationCap, FaGlobe, FaAnglesUp } from 'react-icons/fa6';
import { GrAchievement } from "react-icons/gr";

export const navConfigs = {
    home: [
        { text: 'Projects', to: 'projects', icon: FaLaptopCode },
        { text: 'Experience', to: 'experience', icon: FaBriefcase },
        { text: 'Skills', to: 'skills', icon: FaCogs },
        { text: 'Achievements & Certifications', to: 'certif', icon: GrAchievement },
        { text: 'Education', to: 'education', icon: FaGraduationCap },
    ],
    projects: [
        { text: 'Home', to: '/', icon: FaHome },
        { text: 'Websites', to: 'websites', icon: FaGlobe },
        { text: 'Games', to: 'games', icon: FaGamepad },
        { text: 'Tools', to: 'tools', icon: FaTools },
        { text: 'Designs', to: 'designs', icon: FaLaptopCode },
        { text: 'Scripts', to: 'scripts', icon: FaLaptopCode }
    ]
};
