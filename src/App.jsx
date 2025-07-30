import { BrowserRouter } from "react-router-dom";
import { useState, Suspense, lazy } from "react";
import { ErrorBoundary, Navbar } from "./components";

// Fallback for lazy-loaded components
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-primary">
    <div className="text-white text-center">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent mb-4"></div>
      <p className="text-xl">Loading...</p>
    </div>
  </div>
);

// Lazy load components to improve initial loading
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Experience = lazy(() => import("./components/Experience"));
const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Hero = lazy(() => import("./components/Hero"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));
const Certifications = lazy(() => import("./components/Certifications"));
const Chat = lazy(() => import("./components/Chat"));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-primary text-white">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
      <p className="text-xl">Loading portfolio...</p>
    </div>
  </div>
);

// Error display for Suspense errors
const ErrorDisplay = () => (
  <div className="min-h-screen bg-primary flex items-center justify-center text-white p-4">
    <div className="text-center max-w-md">
      <h2 className="text-2xl font-bold mb-4">Failed to load content</h2>
      <p className="mb-6">There was a problem loading the portfolio. This could be due to a network issue or missing resources.</p>
      <button 
        onClick={() => window.location.reload()} 
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="relative z-0 bg-primary">
          <Navbar />
          
          <Suspense fallback={<LoadingFallback />}>
            <ErrorBoundary>
              <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
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
            </ErrorBoundary>
          </Suspense>

          {/* Chat button */}
          <button
            onClick={toggleChat}
            className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-violet-600 hover:bg-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Open chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>

          {/* Chat component - only load when needed */}
          {isChatOpen && (
            <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="animate-pulse text-white">Loading chat...</div>
            </div>}>
              <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            </Suspense>
          )}
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
