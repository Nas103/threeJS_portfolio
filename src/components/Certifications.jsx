import { motion } from "framer-motion";

import { styles } from "../styles.js";
import { certifications, education } from "../constants/index.js";
import { SectionWrapper } from "../hoc/index.js";
import { fadeIn, textVariant } from "../utils/motion.js";

const orgStyle = {
  IBM: { color: "#5aa0f0", glyph: "I" },
  "Amazon Web Services": { color: "#ff9900", glyph: "☁" },
  Google: { color: "#4aa7ff", glyph: "G" },
  Meta: { color: "#22a7f0", glyph: "M" },
};

const CertificationCard = ({ index, title, organization, date, description }) => {
  const accent = orgStyle[organization] || { color: "#a78bfa", glyph: "✓" };
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.12, 0.6)} className='h-full'>
      <div className='h-full glass rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 group'>
        <div className='flex items-center justify-between mb-4'>
          <div
            className='w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold text-lg'
            style={{
              background: `${accent.color}1f`,
              color: accent.color,
              border: `1px solid ${accent.color}44`,
            }}
          >
            {accent.glyph}
          </div>
          <span className='text-[12px] text-secondary font-medium'>{date}</span>
        </div>
        <h3 className='font-display text-white text-[16px] font-semibold leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#a78bfa] transition-all'>
          {title}
        </h3>
        <p
          className='mt-1.5 text-[13px] font-semibold'
          style={{ color: accent.color }}
        >
          {organization}
        </p>
        <p className='mt-auto pt-3 text-[13px] text-secondary leading-relaxed'>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const EducationCard = ({ index, title, organization, date, description }) => (
  <motion.div variants={fadeIn("right", "spring", index * 0.15, 0.6)} className='h-full'>
    <div className='relative h-full glass rounded-2xl p-6 pl-10 transition-colors duration-300 hover:border-violet-400/40'>
      <span className='absolute left-4 top-6 h-3 w-3 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 shadow-glow' />
      <p className='text-[12px] text-[#c9c4e8] font-medium uppercase tracking-wider'>
        {date}
      </p>
      <h3 className='font-display text-white text-[16px] font-semibold mt-1.5'>
        {title}
      </h3>
      <p className='text-[13px] text-gradient font-semibold mt-0.5'>
        {organization}
      </p>
      <p className='text-[13px] text-secondary mt-2 leading-relaxed'>
        {description}
      </p>
    </div>
  </motion.div>
);

const Certifications = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={`${styles.sectionSubText} text-center`}>
        <span className='text-gradient font-semibold'>//</span> Learning never stops
      </p>
      <h2 className={`${styles.sectionHeadText} text-center`}>
        Education &amp; <span className='text-gradient'>credentials</span>.
      </h2>
    </motion.div>

    <div className='mt-14 grid md:grid-cols-2 gap-5 max-w-5xl mx-auto'>
      {education.map((edu, index) => (
        <EducationCard key={`edu-${index}`} index={index} {...edu} />
      ))}
      <motion.div
        variants={fadeIn("up", "spring", 0.4, 0.6)}
        className='md:col-span-2 flex items-center justify-center glass rounded-2xl p-5 text-center'
      >
        <p className='text-secondary text-[14px]'>
          <span className='text-white font-semibold'>Professional Certificates:</span>{" "}
          IBM AI Engineer, IBM AI Developer, AWS AI Practitioner, AWS Cloud
          Practitioner, Google IT Support, Meta Back-End Development — plus a
          continued self-driven curriculum in AI &amp; cloud.
        </p>
      </motion.div>
    </div>

    <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
      {certifications.map((cert, index) => (
        <CertificationCard key={`cert-${index}`} index={index} {...cert} />
      ))}
    </div>
  </>
);

export default SectionWrapper(Certifications, "certifications");