import { motion } from "framer-motion";

import { styles } from "../styles.js";
import { SectionWrapper } from "../hoc/index.js";
import { fadeIn, textVariant } from "../utils/motion.js";
import { testimonials } from "../constants/index.js";

const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.7)}
    className='h-full'
  >
    <div className='h-full glass rounded-2xl p-7 flex flex-col transition-colors duration-300 hover:border-violet-400/40'>
      <div className='text-gradient font-display text-[44px] leading-none'>
        "
      </div>
      <p className='text-white text-[15px] leading-[26px]'>{testimonial}</p>
      <div className='mt-6 pt-5 border-t border-white/5 flex items-center gap-3'>
        <img
          src={image}
          alt={name}
          className='w-11 h-11 rounded-full object-cover border border-violet-400/40'
          loading='lazy'
        />
        <div>
          <p className='text-white font-semibold text-[14px]'>
            <span className='text-gradient'>{name}</span>
          </p>
          <p className='text-secondary text-[12px]'>
            {designation} · {company}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => (
  <div className={`mt-4`}>
    <motion.div variants={textVariant()}>
      <p className={`${styles.sectionSubText} text-center`}>
        <span className='text-gradient font-semibold'>//</span> Kind words
      </p>
      <h2 className={`${styles.sectionHeadText} text-center`}>
        What people <span className='text-gradient'>say</span>.
      </h2>
    </motion.div>

    <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-5'>
      {testimonials.map((t, index) => (
        <FeedbackCard key={t.name} index={index} {...t} />
      ))}
    </div>
  </div>
);

export default SectionWrapper(Feedbacks, "");