import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, Certifications, Chat } from "./components";

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <div id="about"><About /></div>
        <div id="work"><Experience /></div>
        <Tech />
        <Works />
        <div id="certifications"><Certifications /></div>
        <Feedbacks />
        <div className="relative z-0">
          <div id="contact"><Contact /></div>
          <StarsCanvas />
        </div>

        {/* Chat button */}
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 z-50 p-3 rounded-full cursor-gradient text-white shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>

        {/* Chat component */}
        <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </BrowserRouter>
  );
};

export default App;
