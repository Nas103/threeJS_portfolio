import React, { useState, Suspense } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles.js";
import { github } from "../assets";
import { SectionWrapper } from "../hoc/index.js";
import { projects } from "../constants/index.js";
import { fadeIn, textVariant } from "../utils/motion.js";
// Import directly to avoid issues
import ProjectInfoModal from "./ProjectInfoModal.jsx";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  const [showTechStack, setShowTechStack] = useState(false);
  // Check if it's the third project (index 2) or has the specific name
  const isIntelliGAI = name?.toLowerCase().includes("intellig") || index === 2;

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags?.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>

        {isIntelliGAI && (
          <div className="mt-4">
            <button
              onClick={() => setShowTechStack(true)}
              className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              View Tech Stack
            </button>
          </div>
        )}

        {/* Only render the modal when it's open to save resources */}
        {isIntelliGAI && showTechStack && (
          <ProjectInfoModal isOpen={showTechStack} onClose={() => setShowTechStack(false)} />
        )}
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <Suspense fallback={<div className="text-white">Loading projects...</div>}>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects?.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </Suspense>
  );
};

export default SectionWrapper(Works, "");
