import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles.js";
import { certifications } from "../constants/index.js";
import { SectionWrapper } from "../hoc/index.js";
import { textVariant } from "../utils/motion.js";

const CertificationCard = ({ certification }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "linear-gradient(to right, rgba(121, 40, 202, 0.1), rgba(255, 0, 128, 0.1))",
        color: "#fff",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(121, 40, 202, 0.3)" }}
      date={certification.date}
      iconStyle={{ 
        background: "linear-gradient(to right, #7928CA, #FF0080)",
        boxShadow: "0 0 0 4px #1d1836, inset 0 2px 0 rgba(255, 255, 255, 0.2), 0 3px 10px 3px rgba(121, 40, 202, 0.3)"
      }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <span className="text-white text-xl font-bold">{certification.organization.charAt(0)}</span>
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold cursor-text-gradient'>{certification.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {certification.organization}
        </p>
      </div>

      <p className='mt-5 text-white-100 text-[14px] tracking-wider'>
        {certification.description}
      </p>
    </VerticalTimelineElement>
  );
};

const Certifications = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          My Professional Development
        </p>
        <h2 className={`${styles.sectionHeadText} text-center cursor-text-gradient`}>
          Certifications.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {certifications.map((certification, index) => (
            <CertificationCard
              key={`certification-${index}`}
              certification={certification}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Certifications, "certifications");