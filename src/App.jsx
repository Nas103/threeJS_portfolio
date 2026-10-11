import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  Certifications,
  Chat,
  Footer,
} from "./components";

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary min-h-screen'>
        <Navbar onOpenChat={() => setIsChatOpen(true)} />

        <Hero />
        <About />
        <Tech />
        <Experience />
        <Works />
        <Certifications />
        <Contact />
        <Footer />

        <button
          onClick={() => setIsChatOpen((v) => !v)}
          className='fixed bottom-6 right-6 z-50 p-4 rounded-full btn-gradient text-white shadow-glow'
          aria-label='Toggle chat'
        >
          {isChatOpen ? (
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          ) : (
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' />
            </svg>
          )}
        </button>

        <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </BrowserRouter>
  );
};

export default App;