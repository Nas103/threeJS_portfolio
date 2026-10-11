import { motion } from "framer-motion";
import { WavesBg, CanvasErrorBoundary, KeepAlive } from "./canvas/index.js";
import { stats } from "../constants/index.js";

const heroChips = [
  "AI Voice Agents",
  "Python",
  "React / Next.js",
  "Node.js",
  "Machine Learning",
];

const Hero = () => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className='relative w-full min-h-screen overflow-hidden'>
      {/* Header background — WebGL waves */}
      <KeepAlive
        className='absolute inset-0'
        placeholder={
          <div className='absolute inset-0 bg-gradient-to-br from-[#0b0a1f] via-[#05060f] to-black' />
        }
      >
        <CanvasErrorBoundary
          fallback={
            <div className='absolute inset-0 bg-gradient-to-br from-[#0b0a1f] via-[#05060f] to-black' />
          }
        >
          <WavesBg xScale={1.0} yScale={0.5} distortion={0.05} speed={1} />
        </CanvasErrorBoundary>
      </KeepAlive>

      {/* readability + texture overlays */}
      <div className='absolute inset-0 bg-gradient-to-r from-[#05060f]/90 via-[#05060f]/35 to-transparent pointer-events-none' />
      <div className='absolute inset-0 bg-grid opacity-30 pointer-events-none' />

      <div className='relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-28 lg:pt-32 pb-16 flex items-center min-h-screen'>
        <div className='max-w-3xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6'
          >
            <span className='h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse' />
            <span className='text-[13px] text-[#c9c4e8]'>
              Open to Remote / Hybrid roles
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='font-display font-bold text-white text-[42px] xs:text-[56px] md:text-[68px] leading-[1.05] [text-shadow:0_4px_40px_rgba(5,6,15,0.85)]'
          >
            Hi, I'm{" "}
            <span className='text-gradient-shine'>Rhulani</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mt-5 text-[18px] md:text-[22px] text-secondary leading-relaxed max-w-xl [text-shadow:0_2px_24px_rgba(5,6,15,0.9)]'
          >
            Software Engineer &amp; AI Engineer — I build{" "}
            <span className='text-white'>AI voice agents</span>, full-stack
            applications and{" "}
            <span className='text-white'>immersive 3D experiences</span> that
            solve real-world problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='mt-6 flex flex-wrap gap-2'
          >
            {heroChips.map((chip) => (
              <span
                key={chip}
                className='text-[13px] font-medium px-3.5 py-1.5 rounded-full glass text-[#d5d0ee]'
              >
                {chip}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mt-8 flex flex-wrap items-center gap-4'
          >
            <button
              onClick={() => scrollTo("projects")}
              className='btn-gradient text-white font-semibold px-8 py-3.5 rounded-full'
            >
              View Projects
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className='btn-outline text-white font-semibold px-8 py-3.5 rounded-full'
            >
              Contact Me
            </button>
            <a
              href={`${import.meta.env.BASE_URL}Rhulani_Mashala_CV.pdf`}
              download='Rhulani_Mashala_CV.pdf'
              className='btn-outline text-white font-semibold px-8 py-3.5 rounded-full flex items-center gap-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-[18px] h-[18px]'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v12m0 0l-4-4m4 4l4-4M5 20h14' />
              </svg>
              Download CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl'
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className='font-display font-bold text-[30px] leading-none bg-gradient-to-br from-white to-[#a78bfa] bg-clip-text text-transparent'>
                  {stat.value}
                </p>
                <p className='mt-1.5 text-[12px] text-secondary'>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
