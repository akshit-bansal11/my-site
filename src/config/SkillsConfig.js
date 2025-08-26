// React Icons
import { FaPython, FaHtml5, FaCss3, FaReact, FaBootstrap, FaNodeJs, FaGitAlt, FaGithub, FaFontAwesome, FaCodepen, FaMarkdown, FaSlack, FaWindows, FaUbuntu, FaNode } from "react-icons/fa6";
import { SiCplusplus, SiMongodb, SiFirebase, SiPerplexity, SiGithubcopilot, SiExpress, SiDotnet, SiNpm, SiPostman, SiAdobephotoshop, SiAdobeillustrator, SiClaude, SiNotion, SiVite,  SiNvm, SiJquery, SiMui, SiPostgresql, SiGnubash, SiAutocad, SiClion, SiPycharm, SiWebstorm, SiLatex, SiFramer } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import { RiPhpLine, RiTailwindCssFill, RiGeminiFill } from "react-icons/ri";
import { GrMysql } from "react-icons/gr";
import { TbBrandCSharp, TbBrandPowershell, TbSvg } from "react-icons/tb";
import { CgFigma } from "react-icons/cg";
import { VscVscode } from "react-icons/vsc";

// SVG Imports
import Grok from "../assets/icons/grok.svg"
import Firebase from "../assets/icons/firebaseStudio.svg"
import Napkin from "../assets/icons/napkin.svg"
import Trae from "../assets/icons/trae.svg"
import Recraft from "../assets/icons/recraft.svg"



export const skills = [
  {
    title: "Programming",
    skills: [[
      { icon: SiCplusplus, name: "C++" },
      { icon: IoLogoJavascript, name: "JavaScript" },
      { icon: FaPython, name: "Python" },
      { icon: RiPhpLine, name: "PHP" },
      { icon: TbBrandCSharp, name: "C#" },
    ]]
  },
  {
    title: "Frontend",
    skills: [
      [
        { icon: FaHtml5, name: "HTML5" },
        { icon: FaCss3, name: "CSS3" },
        { icon: IoLogoJavascript, name: "JavaScript" },
        { icon: SiJquery, name: "JQuery" },
        { icon: SiMui, name: "Material UI" },
        { icon: FaFontAwesome, name: "Font Awesome" },
        { icon: FaReact, name: "React" },
        { icon: FaBootstrap, name: "Bootstrap" },
        { icon: RiTailwindCssFill, name: "Tailwind" },
        { icon: SiVite, name: "Vite" }
      ]
    ]
  },
  {
    title: "Backend",
    skills: [
      [
        { icon: FaNodeJs, name: "Node.js" },
        { icon: SiExpress, name: "Express.js" },
        { icon: SiDotnet, name: ".NET" },
        { icon: SiFirebase, name: "Firebase" }
      ]
    ]
  },
  {
    title: "AI Tools",
    skills: [
      [
        { icon: FaNodeJs, name: "ChatGPT" },
        { icon: RiGeminiFill, name: "Gemini" },
        { icon: Grok, name: "Grok" },
        { icon: SiClaude, name: "Claude" },
        { icon: Trae, name: "Trae" },
        { icon: SiGithubcopilot, name: "Copilot" },
        { icon: SiPerplexity, name: "Perplexity" },
        { icon: Napkin, name: "Napkin" },
        { icon: Firebase, name: "Firebase Studio" },
        { icon: Recraft, name: "Recraft AI" },
      ]
    ]
  },
  {
    title: "Databases",
    skills: [[
      { icon: SiMongodb, name: "MongoDB" },
      { icon: SiPostgresql, name: "PostgresSQL" },
      { icon: GrMysql, name: "MySQL" }
    ]]
  },
  {
    title: "Tools & Workflow",
    skills: [
      [
        { icon: FaGitAlt, name: "Git" },
        { icon: FaGithub, name: "GitHub" },
        { icon: SiNpm, name: "npm" },
        { icon: SiNvm, name: "nvm" },
        { icon: SiPostman, name: "Postman" },
        { icon: SiGnubash, name: "Bash" },
        { icon: TbBrandPowershell, name: "Powershell" },
      ]
    ]
  },
  {
    title: "UI/UX & Design",
    skills: [[
      { icon: CgFigma, name: "Figma" },
      { icon: SiFramer, name: "Framer" },
      { icon: SiAdobeillustrator, name: "Illustrator" },
      { icon: SiAdobephotoshop, name: "Photoshop" },
      { icon: SiAutocad, name: "AutoCAD" },
      { icon: TbSvg, name: "SVG" },
    ]]
  },
  {
    title: "IDEs, Collaboration & Docs",
    skills: [[
      { icon: VscVscode, name: "VS Code" },
      { icon: SiClion, name: "CLion" },
      { icon: SiPycharm, name: "PyCharm" },
      { icon: SiWebstorm, name: "WebStorm" },
      { icon: FaCodepen, name: "Codepen" },
      { icon: SiNotion, name: "Notion" },
      { icon: FaMarkdown, name: "Markdown" },
      { icon: SiLatex, name: "Latex" },
      { icon: FaSlack, name: "Slack" }
    ]]
  },
  {
    title: "Operating Systems",
    skills: [[
      { icon: FaWindows, name: "Windows" },
      { icon: FaUbuntu, name: "Ubuntu" }
    ]]
  }
];