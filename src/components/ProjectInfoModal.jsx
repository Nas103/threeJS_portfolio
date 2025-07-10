import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";

const TechSection = ({ title, items }) => {
  if (!items || !Array.isArray(items)) return null;
  
  return (
    <div className="mb-6">
      <h3 className="text-white font-bold text-[18px] mb-2">{title}</h3>
      <ul className="list-disc ml-5 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-[14px] text-secondary">
            <span className="font-medium text-white">{item.name}:</span> {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProjectInfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    // Prevent scrolling of the body when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);
  
  const techData = {
    backend: [
      { name: "Python (FastAPI)", description: "The main backend API is built with FastAPI, a modern, fast web framework for building APIs with Python." },
      { name: "PostgreSQL", description: "A powerful, open-source object-relational database system used for persistent data storage." },
      { name: "Redis", description: "An in-memory data structure store, used as a database, cache, and message broker." },
      { name: "OpenAI API & Anthropic API", description: "Integrations for AI-driven features such as code validation, interview question generation, and answer evaluation." },
      { name: "JWT Authentication", description: "Secure authentication using JSON Web Tokens." },
      { name: "Celery & Flower", description: "For background task processing and monitoring." },
      { name: "SQLAlchemy, Alembic", description: "For ORM (Object Relational Mapping) and database migrations." },
      { name: "Pydantic", description: "For data validation and settings management." },
      { name: "Stripe", description: "For payment and subscription management." },
    ],
    frontend: [
      { name: "React.js", description: "The main frontend framework for building user interfaces." },
      { name: "Next.js", description: "A React framework for server-side rendering, routing, and static site generation." },
      { name: "TypeScript", description: "A statically typed superset of JavaScript for safer, more robust code." },
      { name: "Tailwind CSS", description: "A utility-first CSS framework for rapid UI development." },
      { name: "Redux Toolkit", description: "For state management in React applications." },
      { name: "React Query", description: "For data fetching, caching, and synchronization." },
      { name: "Framer Motion", description: "For animations and transitions." },
      { name: "Monaco Editor", description: "The code editor that powers VSCode, used for in-browser code editing." },
      { name: "Stripe.js", description: "For handling payments on the frontend." },
      { name: "Firebase", description: "For authentication, analytics, or real-time features (as a supplement)." },
    ],
    vscode: [
      { name: "TypeScript", description: "The extension is written in TypeScript for type safety and maintainability." },
      { name: "VSCode Extension API", description: "Used to build and integrate the extension into the Visual Studio Code editor, providing interactive coding experiences." },
    ],
    infrastructure: [
      { name: "Docker", description: "For containerizing backend, frontend, and other services to ensure consistent environments." },
      { name: "Kubernetes", description: "For orchestrating and managing containers at scale (deployment, scaling, etc.)." },
      { name: "AWS/GCP", description: "Cloud platforms for hosting, storage, and other infrastructure needs." },
    ],
    other: [
      { name: "Pytest, Black, isort, Flake8, Mypy", description: "For testing, code formatting, linting, and static type checking in Python." },
      { name: "Poetry", description: "For Python dependency management and packaging." },
      { name: "Email Validator, FastAPI-Mail", description: "For email validation and sending emails." },
    ],
    features: [
      { name: "AI Interviewer and code validation", description: "Powered by OpenAI/Anthropic, FastAPI, React" },
      { name: "Interactive coding lessons and code editor", description: "Powered by Monaco, React, VSCode Extension" },
      { name: "Graded assessments and progress tracking", description: "Powered by Backend, PostgreSQL, React" },
      { name: "Subscription and payment management", description: "Powered by Stripe, React, FastAPI" },
      { name: "Modern UI/UX", description: "Powered by Tailwind CSS, Framer Motion, React" },
      { name: "Real-time features and caching", description: "Powered by Redis, Firebase" },
      { name: "Professional certification and admin dashboard", description: "Complete solution for educational management" },
    ],
  };

  // Handle backdrop click to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`${styles.padding} bg-tertiary rounded-2xl max-w-4xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`${styles.sectionHeadText}`}>InteliG AI Tech Stack</h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-white text-[24px] focus:outline-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TechSection title="Backend" items={techData.backend} />
            <TechSection title="Infrastructure" items={techData.infrastructure} />
            <TechSection title="VSCode Extension" items={techData.vscode} />
          </div>
          <div>
            <TechSection title="Frontend (Web Platform)" items={techData.frontend} />
            <TechSection title="Other/Shared" items={techData.other} />
            <TechSection title="Project Features" items={techData.features} />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectInfoModal;
