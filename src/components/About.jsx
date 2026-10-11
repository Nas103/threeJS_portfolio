import { motion } from "framer-motion";

import { styles } from "../styles.js";
import { services, stats } from "../constants/index.js";
import { SectionWrapper } from "../hoc/index.js";
import { fadeIn, textVariant } from "../utils/motion.js";
import TiltPop from "./TiltPop.jsx";

const ServiceCard = ({ index, title, icon, description }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.6)}
    className='h-full [perspective:1200px]'
  >
    <TiltPop>
      <div className='h-full glass rounded-2xl p-6 flex flex-col items-center text-center transition-colors duration-300 hover:border-violet-400/40'>
        <div
          className='w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/25 to-fuchsia-500/25 flex items-center justify-center mb-4'
          style={{ transform: "translateZ(34px)" }}
        >
          <img src={icon} alt={title} className='w-9 h-9 object-contain' />
        </div>
        <h3
          className='font-display text-white text-[18px] font-semibold mb-2'
          style={{ transform: "translateZ(26px)" }}
        >
          {title}
        </h3>
        <p
          className='text-[13.5px] text-secondary leading-relaxed'
          style={{ transform: "translateZ(18px)" }}
        >
          {description}
        </p>
      </div>
    </TiltPop>
  </motion.div>
);

const About = () => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>
          <span className='text-gradient font-semibold'>//</span> Who I am
        </p>
        <h2 className={styles.sectionHeadText}>
          Turning ideas into <span className='text-gradient'>intelligent software</span>.
        </h2>
      </motion.div>

      <div className='grid lg:grid-cols-[1.4fr_1fr] gap-10 mt-10'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='text-secondary text-[16.5px] leading-[30px]'
        >
          I'm a Software Engineer and AI Engineer based in{" "}
          <span className='text-white'>South Africa</span> with{" "}
          <span className='text-white'>3+ years</span> of professional
          experience across AI voice agents, full-stack web applications, APIs,
          automation and machine learning. I work across the stack — from{" "}
          <span className='text-white'>Python</span>,{" "}
          <span className='text-white'>JavaScript/TypeScript</span> and{" "}
          <span className='text-white'>Node.js</span> backends to{" "}
          <span className='text-white'>React</span> and{" "}
          <span className='text-white'>Three.js</span> frontends — taking
          requirements from investigation through to implementation, testing
          and delivery.
          <br />
          <br />
          My GitHub portfolio spans AI, SaaS, retail, backend and web projects,
          and I'm currently building{" "}
          <span className='text-white'>AI voice-agent solutions</span> that
          connect directly to real business workflows. I'm open to remote and
          hybrid roles.
        </motion.p>

        <motion.div variants={fadeIn("left", "spring", 0.2, 0.8)}>
          <div className='glass gradient-border rounded-2xl p-7 h-full flex flex-col'>
            <p className='text-[11px] uppercase tracking-[0.25em] text-secondary mb-6'>
              Snapshot
            </p>
            <div className='grid grid-cols-2 gap-6'>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className='bg-black-200/60 rounded-xl p-4 border border-white/5'
                >
                  <p className='font-display font-bold text-[34px] leading-none text-gradient'>
                    {stat.value}
                  </p>
                  <p className='mt-2 text-[12px] text-secondary'>{stat.label}</p>
                </div>
              ))}
            </div>
            <div className='mt-auto pt-6 flex flex-col gap-3'>
              <button
                onClick={() => scrollTo("certifications")}
                className='btn-outline w-full text-white font-medium py-3 rounded-xl'
              >
                View Credentials
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div id='services' className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");