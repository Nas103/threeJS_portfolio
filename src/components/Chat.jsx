import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import aiIcon from "../assets/AI.png";
import micIcon from "../assets/mic.png";

const Chat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm Rhulani's AI Assistant. Ask me anything about his skills, AI voice-agent work, projects, experience or credentials.",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const speechRef = useRef(null);

  const knowledge = {
    name: "Rhulani Mashala",
    role: "Software Engineer | AI Engineer",
    location: "South Africa · Open to Remote / Hybrid",
    contact: {
      email: "nascode.dev@gmail.com",
      github: "https://github.com/Nas103",
      portfolio: "https://nas103.github.io/threeJS_portfolio/",
    },
    skills: {
      languages: ["Python", "JavaScript", "TypeScript", "SQL", "Shell"],
      frontend: ["React", "Next.js", "HTML", "CSS", "responsive web development"],
      backend: ["Node.js", "REST APIs", "webhooks", "backend services", "API integrations"],
      ai: ["AI applications", "AI agents", "voice agents", "machine learning", "AI pipelines", "AI-assisted development"],
      systems: ["Linux", "Git", "GitHub", "troubleshooting", "debugging", "automation", "third-party integrations"],
      engineering: ["Full-stack development", "software design", "testing", "root-cause analysis", "maintainable code", "Agile workflows"],
    },
    experience: [
      {
        company: "Nexus AI Systems",
        position: "AI Voice Agent Engineer (Freelancer)",
        period: "May 2026 — Present",
        points: [
          "Develops AI voice-agent solutions for real business workflows, combining software engineering, APIs, automation and AI services.",
          "Builds and integrates backend services, REST APIs, webhooks and third-party systems to connect AI agents with business applications.",
          "Designs practical application workflows and troubleshoots integration, API and runtime issues.",
          "Uses Python, JavaScript/TypeScript, Node.js and modern AI development tools.",
        ],
      },
      {
        company: "Heybash",
        position: "Software Engineer",
        period: "Mar 2023 — Jan 2026",
        points: [
          "Developed full-stack web applications and software features using JavaScript, modern frontend technologies and APIs.",
          "Built and integrated application functionality across frontend and backend components.",
          "Investigated bugs, identified root causes and delivered fixes through collaborative workflows.",
          "Worked with Git and modern software development practices.",
        ],
      },
      {
        company: "HexSoftwares",
        position: "Machine Learning Intern",
        period: "Jan 2023 — Mar 2023",
        points: [
          "Built and experimented with Python-based machine learning solutions and AI pipelines.",
          "Worked through data preparation, model development, evaluation and iterative optimization.",
        ],
      },
    ],
    projects: [
      "Lily-s — AI-powered retail web application with an embedded mobile app.",
      "INTELIG-AI — large AI / SaaS application project.",
      "AI-Coding-Tutor — Python AI-focused coding project.",
      "Xora AI app — AI SaaS application for everyday automation.",
      "Dragon Compeller — fantasy RPG game in JavaScript.",
      "threeJS_portfolio — this interactive 3D portfolio (React + Three.js).",
    ],
    education: [
      "ALX / Holberton — Software Engineering Bootcamp, Backend specialization (Nov 2023 — Sep 2024).",
      "ATTI College — N4 Systems & Web Development (completed).",
      "UNISA — Diploma in Accounting Sciences (in progress).",
    ],
    certifications: [
      "IBM AI Engineer Professional Certificate",
      "IBM AI Developer Professional Certificate",
      "AWS AI Practitioner",
      "AWS Cloud Practitioner Essentials",
      "Google IT Support Technician Specialist",
      "Meta Back-End Development Professional Certificate",
    ],
    summary:
      "Software Engineer and AI Engineer with 3+ years of professional software-development experience across AI voice agents, full-stack web applications, APIs, automation and machine learning. Strong hands-on background in Python, JavaScript/TypeScript, Node.js, React, REST APIs, Git and Linux.",
  };

  const includesAny = (query, words) => words.some((w) => query.includes(w));

  const generateIntelligentResponse = (userQuery) => {
    const query = userQuery.toLowerCase().trim();

    if (includesAny(query, ["hello", "hi ", "hey", "greetings", "how are you", "good morning", "good afternoon"])) {
      return `Hi! I'm Rhulani's AI Assistant. He's a Software Engineer & AI Engineer building AI voice agents and full-stack apps. Ask me about his skills, experience, projects, or how to get in touch!`;
    }

    if (query.includes("who") || query.includes("about rhulani") || query.includes("introduce")) {
      return `${knowledge.summary}

He's currently a ${knowledge.experience[0].position} at ${knowledge.experience[0].company}, building AI voice agents wired into real business workflows. Before that he was a Software Engineer at Heybash and a Machine Learning Intern at HexSoftwares.

He's based in ${knowledge.location}.`;
    }

    if (includesAny(query, ["skill", "tech", "stack", "language", "what can he do", "expertise", "know"])) {
      return `Rhulani's technical skills:

• Languages: ${knowledge.skills.languages.join(", ")}
• Frontend: ${knowledge.skills.frontend.join(", ")}
• Backend: ${knowledge.skills.backend.join(", ")}
• AI / ML: ${knowledge.skills.ai.join(", ")}
• Systems / Tools: ${knowledge.skills.systems.join(", ")}
• Engineering: ${knowledge.skills.engineering.join(", ")}

He works end-to-end, from backend APIs and data to polished React/Three.js frontends.`;
    }

    if (includesAny(query, ["experience", "work", "job", "career", "role", "company", "companies"])) {
      return (
        "Rhulani's experience:\n\n" +
        knowledge.experience
          .map((e) => `${e.position} — ${e.company} (${e.period})\n  • ${e.points.slice(0, 2).join("\n  • ")}`)
          .join("\n\n")
      );
    }

    if (includesAny(query, ["project", "portfolio", "built", "build", "created"])) {
      return `Selected projects:\n\n${knowledge.projects.map((p) => `• ${p}`).join("\n")}\n\nHis GitHub is ${knowledge.contact.github}.`;
    }

    if (includesAny(query, ["ai", "voice", "agent", "machine learning", "ml", "artificial intelligence"])) {
      return `AI is Rhulani's core focus. Right now he builds AI voice agents at ${knowledge.experience[0].company}, connecting them to real business systems via REST APIs and webhooks.

His AI/ML background spans: ${knowledge.skills.ai.join(", ")} — including model development, evaluation and iteration from his ML internship.`;
    }

    if (includesAny(query, ["education", "degree", "study", "university", "college", "school", "bootcamp", "diploma"])) {
      return `Education:\n\n${knowledge.education.map((e) => `• ${e}`).join("\n")}`;
    }

    if (includesAny(query, ["cert", "certification", "credential", "certificate"])) {
      return `Certifications:\n\n${knowledge.certifications.map((c) => `• ${c}`).join("\n")}`;
    }

    if (includesAny(query, ["contact", "email", "hire", "reach", "collaborate", "connect", "available", "recruit"])) {
      return `Rhulani is open to remote / hybrid roles. Here's how to reach him:

• Email: ${knowledge.contact.email}
• GitHub: ${knowledge.contact.github}
• Portfolio: ${knowledge.contact.portfolio}
• Location: ${knowledge.location}`;
    }

    if (includesAny(query, ["navigate", "take me", "go to", "show me", "open"])) {
      const sections = {
        about: "about",
        skill: "skills",
        tech: "skills",
        experience: "experience",
        work: "experience",
        project: "projects",
        cert: "certifications",
        cred: "certifications",
        contact: "contact",
      };
      const key = Object.keys(sections).find((k) => query.includes(k));
      if (key) {
        const id = sections[key];
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 400);
        return `On my way — taking you to the "${key}" section!`;
      }
      return "I can take you to About, Skills, Experience, Projects, Credentials or Contact. Which one?";
    }

    return `I'd be happy to help! You can ask me about:
• Who Rhulani is and his background
• His skills and tech stack
• His work experience (AI voice agents, full-stack, ML)
• His projects
• His education and certifications
• How to contact or hire him`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        setInput(event.results[0][0].transcript);
        setIsListening(false);
      };
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }

    if ("speechSynthesis" in window) {
      speechRef.current = window.speechSynthesis;
    }

    return () => {
      recognitionRef.current?.abort();
      speechRef.current?.cancel();
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.abort();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
      }
    }
  };

  const speakText = (text) => {
    if (!speechRef.current) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechRef.current.getVoices();
    utterance.voice = voices.find((v) => v.name.includes("Male")) || voices[0];
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;
    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    speechRef.current.speak(utterance);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    const queryText = input;
    setInput("");
    setIsTyping(true);

    try {
      const aiResponse = generateIntelligentResponse(queryText);
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
        setIsTyping(false);
        const q = queryText.toLowerCase();
        if (!includesAny(q, ["navigate", "take me", "go to", "show me", "open"])) {
          speakText(aiResponse);
        }
      }, 900);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "I'm sorry, I encountered an error. Please try again.", sender: "ai" },
      ]);
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.98 }}
      className='fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 glass-strong rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col border border-white/10'
      style={{ height: "70vh", maxHeight: "540px" }}
    >
      <div className='p-4 flex justify-between items-center border-b border-white/10 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20'>
        <div className='flex items-center gap-3'>
          <motion.img
            src={aiIcon}
            alt='AI Assistant'
            className='w-9 h-9 rounded-lg object-contain'
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div>
            <h3 className='text-white font-display font-bold text-[14.5px] leading-none'>
              Rhulani's AI Assistant
            </h3>
            <span className='text-[11px] text-emerald-400 flex items-center gap-1 mt-1'>
              <span className='h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse' />
              Online
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className='text-white/70 hover:text-white text-2xl leading-none focus:outline-none'
          aria-label='Close chat'
        >
          ×
        </button>
      </div>

      <div className='flex-1 p-4 overflow-y-auto chat-scroll bg-black/40'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-2xl px-4 py-2.5 max-w-[82%] text-[13.5px] leading-relaxed whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-br-sm"
                  : "bg-white/5 border border-white/10 text-white rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className='justify-start mb-3 flex'>
            <div className='bg-white/5 border border-white/10 text-white rounded-2xl px-4 py-2.5'>
              <span className='typing-animation text-[13px]'>AI is thinking</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className='p-3 bg-black/60 border-t border-white/10'>
        <div className='flex items-center gap-2'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Ask about Rhulani...'
            className='flex-grow h-11 px-4 bg-white/5 border border-white/10 text-white text-[13.5px] rounded-xl focus:outline-none focus:border-violet-400/60'
          />
          <button
            type='button'
            onClick={toggleListening}
            className={`h-11 w-11 flex items-center justify-center rounded-xl border ${
              isListening ? "bg-red-600/80 border-red-400/50" : "bg-white/5 border-white/10"
            } focus:outline-none`}
            title={isListening ? "Stop listening" : "Voice input"}
          >
            <img src={micIcon} alt='Microphone' className='w-5 h-5 object-contain' />
          </button>
          <button
            type='submit'
            className='h-11 w-11 flex items-center justify-center btn-gradient rounded-xl text-white focus:outline-none'
            aria-label='Send'
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
            </svg>
          </button>
        </div>
        {(isListening || isSpeaking) && (
          <p className='text-[11px] mt-2 text-center'>
            {isListening && <span className='text-red-400 animate-pulse'>Listening...</span>}
            {isSpeaking && <span className='text-blue-400 animate-pulse'>Speaking...</span>}
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default Chat;