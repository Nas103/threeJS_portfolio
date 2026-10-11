import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles.js";
import { experiences } from "../constants/index.js";
import { AuroraFlow, KeepAlive, CanvasErrorBoundary } from "./canvas/index.js";
import { textVariant, staggerContainer } from "../utils/motion.js";

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "rgba(13, 15, 34, 0.72)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 20px 60px -24px rgba(0,0,0,0.7)",
      borderRadius: "18px",
      backdropFilter: "blur(10px)",
    }}
    contentArrowStyle={{ borderRight: "7px solid rgba(167,139,250,0.25)" }}
    date={experience.date}
    dateClassName='text-[#c9c4e8] font-medium'
    iconStyle={{
      background: `linear-gradient(135deg, ${experience.iconBg}, #05060f)`,
      boxShadow: "0 0 0 5px rgba(167,139,250,0.18), 0 0 28px rgba(123,97,255,0.45)",
    }}
    icon={
      <div className='flex justify-center items-center w-full h-full text-white font-display font-bold text-xl'>
        {experience.company_name.charAt(0).toUpperCase()}
      </div>
    }
  >
    <h3 className='font-display text-white text-[22px] font-bold'>
      {experience.title}
    </h3>
    <p className='text-secondary text-[16px] font-semibold mt-1' style={{ marginTop: 4 }}>
      {experience.company_name}
    </p>
    <ul className='mt-5 ml-5 space-y-2 list-disc marker:text-violet-400'>
      {experience.points.map((point, index) => (
        <li
          key={`experience-point-${index}`}
          className='text-white-100 text-[14px] pl-1 tracking-wide'
        >
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Experience = () => (
  <motion.section
    variants={staggerContainer()}
    initial='hidden'
    whileInView='show'
    viewport={{ once: true, amount: 0.1 }}
    className='relative w-full overflow-hidden'
  >
    <KeepAlive
      className='absolute inset-0'
      placeholder={
        <div className='absolute inset-0 bg-gradient-to-b from-[#0A0812] via-[#150f2e] to-[#0A0812]' />
      }
    >
      <CanvasErrorBoundary
        fallback={
          <div className='absolute inset-0 bg-gradient-to-b from-[#0A0812] via-[#150f2e] to-[#0A0812]' />
        }
      >
        <AuroraFlow
          background='#0A0812'
          color1='#7B61FF'
          color2='#2FD3F2'
          color3='#F062C8'
          speed={1}
          intensity={0.7}
        />
      </CanvasErrorBoundary>
    </KeepAlive>

    <div className='absolute inset-0 bg-gradient-to-b from-[#05060f] via-transparent to-[#05060f] pointer-events-none' />
    <div className='absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#05060f] to-transparent pointer-events-none' />
    <div className='absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#05060f] to-transparent pointer-events-none' />
    <div className='absolute inset-0 bg-grid opacity-10 pointer-events-none' />

    <div className={`${styles.padding} max-w-7xl mx-auto relative z-10`}>
      <span className='hash-span' id='experience'>
        &nbsp;
      </span>

      <motion.div variants={textVariant()} className='text-center'>
        <p className={`${styles.sectionSubText} text-center`}>
          <span className='text-gradient font-semibold'>//</span> My journey
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work <span className='text-gradient'>experience</span>.
        </h2>
      </motion.div>

      <div className='mt-16'>
        <VerticalTimeline lineColor='rgba(167,139,250,0.25)'>
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  </motion.section>
);

export default Experience;