import React, { Suspense } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles.js";
import { ComputersCanvas } from "./canvas/index.js";

// Fallback content if 3D canvas fails to load
const CanvasFallback = () => (
  <div className="w-full h-[60vh] flex items-center justify-center">
    <div className="text-white text-center">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent mb-4"></div>
      <p className="text-xl">Loading 3D View...</p>
    </div>
  </div>
);

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div className="heading-section">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='orange-gradient-text'>Rhulani</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 bg-gradient-to-l text-[4rem]`}>
            I'm an AI Engineer | Developer, <br className='sm:block hidden' />
            i create intelligent solutions for real-world challenges.
          </p>
        </div>
      </div>

      <div className="w-full h-screen absolute top-0 left-0">
        <ErrorBoundary fallback={<div className="w-full h-screen flex items-center justify-center">
            <div className="text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
              <p>We couldn't load the 3D view.</p>
            </div>
          </div>}>
          <Suspense fallback={<CanvasFallback />}>
            <ComputersCanvas />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
