import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles.js";
import { github } from "../assets";
import { RibbonGlow } from "./canvas/index.js";
import { projects } from "../constants/index.js";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion.js";

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.25, 0.7)}
    className='h-full'
  >
    <Tilt
      options={{ max: 10, scale: 1.02, speed: 600 }}
      className='h-full'
    >
      <div className='h-full glass-strong rounded-2xl overflow-hidden flex flex-col transition-colors duration-300 hover:border-fuchsia-400/40 group'>
        <div className='relative h-[220px] overflow-hidden'>
          <img
            src={image}
            alt={name}
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-[#0d0f22] via-transparent to-transparent' />
          <div
            onClick={() => window.open(source_code_link, "_blank")}
            className='absolute top-4 right-4 w-11 h-11 rounded-full glass-strong flex items-center justify-center cursor-pointer hover:border-fuchsia-400/60 transition-all'
            title='View source code'
          >
            <img src={github} alt='github' className='w-5 h-5 object-contain' />
          </div>
        </div>

        <div className='p-6 flex flex-col flex-1'>
          <h3 className='font-display text-white text-[20px] font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-indigo-400 transition-all'>
            {name}
          </h3>
          <p className='mt-2.5 text-secondary text-[14px] leading-relaxed flex-1'>
            {description}
          </p>
          <div className='mt-4 flex flex-wrap gap-2.5'>
            {tags.map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className='text-[12.5px] font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10'
              >
                <span className={tag.color}>#{tag.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Tilt>
  </motion.div>
);

const Works = () => (
  <motion.section
    variants={staggerContainer()}
    initial='hidden'
    whileInView='show'
    viewport={{ once: true, amount: 0.15 }}
    className='relative w-full overflow-hidden'
  >
    {/* Projects background — Ribbon Glow */}
    <div className='absolute inset-0'>
      <RibbonGlow
        background='#08060f'
        color1='#f0abfc'
        color2='#6366f1'
        speed={40}
        size={128}
        angle={-140}
        hover={75}
        reach={320}
      />
    </div>

    {/* readability + texture overlays */}
    <div className='absolute inset-0 bg-gradient-to-b from-[#05060f] via-[#05060f]/72 to-[#05060f] pointer-events-none' />
    <div className='absolute inset-0 bg-grid opacity-20 pointer-events-none' />

    <div className={`${styles.padding} max-w-7xl mx-auto relative z-10`}>
      <span className='hash-span' id='projects'>
        &nbsp;
      </span>

      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>
          <span className='text-gradient font-semibold'>//</span> What I've built
        </p>
        <h2 className={`${styles.sectionHeadText}`}>
          Featured <span className='text-gradient'>projects</span>.
        </h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-4 text-secondary text-[16.5px] max-w-3xl leading-[30px]'
        >
          A selection of projects spanning AI voice agents, SaaS, retail, 3D web
          and machine learning — each one solving a real problem with modern
          engineering.
        </motion.p>
      </div>

      <div className='mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </div>
  </motion.section>
);

export default Works;
