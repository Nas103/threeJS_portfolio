import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import aiIcon from "../assets/AI.png";
import micIcon from "../assets/mic.png";

const Chat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Rhulani's AI Assistant. I know everything about Rhulani and can answer any question about his skills, projects, and experience. How can I help you today?", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const speechRef = useRef(null);

  // Comprehensive knowledge base about Rhulani
  const rhulaniKnowledge = {
    personal: {
      name: "Rhulani Mashala",
      location: "Port Shepstone | Oslo Beach, South Africa",
      contact: {
        phone: "+27 65 944 3519",
        email: "nascode.dev@gmail.com",
        portfolio: "https://nas103.github.io/threeJS_portfolio"
      },
      languages: ["English (Native)"],
      education: [
        {
          institution: "Holberton School & ALX",
          degree: "Diploma Software Engineering",
          period: "2023 - 2025"
        },
        {
          institution: "ATTI COLLEGE",
          degree: "N4 Systems and Web Development",
          period: "2018 - 2019"
        },
        {
          institution: "UNISA",
          degree: "Diploma Accounting Sciences",
          period: "2025 - 2028"
        }
      ]
    },
    skills: {
      programming: ["Python", "JavaScript (ES6+)", "TypeScript", "C", "SQL", "NoSQL", "Java", "Ruby", "HTML5", "C#"],
      webBackend: ["Flask", "FastAPI", "Express.js", "Next.js", "SQLAlchemy", "RESTful APIs", "Redis", "PostgreSQL", "Node.js", ".NET"],
      frontend3D: ["React.js", "Three.js", "WebGL", "Tailwind CSS", "Next.js"],
      aiDataScience: ["TensorFlow", "PyTorch", "NLP", "Computer Vision", "Generative AI", "Machine Learning", "Deep Learning", "LLM", "Scikit-Learn", "Neural Networks"],
      cloudDevOps: ["AWS (EC2, S3, Lambda, DynamoDB)", "Docker", "Kubernetes", "CI/CD"],
      mobile: ["Swift", "Kotlin", "React Native", "IBM Cloud Mobile Services", "UI/UX Development"],
      securityIT: ["Linux Admin", "Networking", "Encryption", "Firewalls"]
    },
    experience: [
      {
        company: "Heybash FZCO",
        position: "Full-Stack Developer Intern",
        period: "Present",
        achievements: [
          "Developing and maintaining web apps using HubSpot, WordPress, and APIs",
          "Building custom modules and responsive UI components",
          "Managing tasks via Teamwork and ensuring timely delivery",
          "Attending daily stand-up meetings and collaborating with the team",
          "Maintaining code quality standards, security, and best practices"
        ]
      },
      {
        company: "ALX",
        position: "Software Engineer Apprentice",
        period: "2023 - 2025",
        achievements: [
          "Developed software solutions using Agile methodology, achieving a 30% reduction in maintenance costs",
          "Collaborated with cross-functional teams to design and test scalable software systems, improving user satisfaction by 25%",
          "Implemented DevOps practices to increase software reliability and efficiency, resulting in a 40% improvement in deployment speed",
          "Developed a command-line shell in C to emulate popular Unix shells, streamlining interactive program management and increasing productivity by 35%",
          "Worked with database structures such as SQL, MySQL, PostgreSQL, Redis, and ES6, improving database query performance by 30%",
          "Collaborated with team members to ensure seamless functionality and a user-friendly experience, contributing to a 25% boost in user engagement metrics",
          "Implemented efficient coding practices that optimized performance and reduced load times by 40%"
        ]
      },
      {
        company: "HexSoftwares",
        position: "AI Engineer | Software Engineer",
        period: "2023 - 2025",
        achievements: [
          "Developed and optimized machine learning models, improving accuracy by 25% through data preprocessing and feature engineering",
          "Implemented scalable AI pipelines, reducing training time by 30% using parallel computing and cloud resources",
          "Collaborated with cross-functional teams to deploy ML solutions, enhancing system efficiency and user experience by 20%"
        ]
      }
    ],
    certifications: [
      "Computer Science Career Path",
      "IBM AI Engineer Professional Certificate",
      "IBM AI Developer Professional Certificate",
      "Meta Backend Developer Professional Certificate",
      "Google IT Support Technician Specialist Professional Certificate",
      "Certified AWS Cloud Practitioner Essentials",
      "Certified AWS AI Practitioner",
      "iOS and Android Mobile App Developer Professional Certificate",
      "Data Science Professional Certificate",
      "Responsive Web Design Professional Certificate",
      "JavaScript Algorithms and Data Structures Professional Certificate",
      "Python Developer Professional Certificate JetBrains",
      "Certified Python Data Scientist Associate DataCamp"
    ],
    achievements: [
      "Microsoft Learn Challenge | Ignite Edition: Build AI apps with Microsoft Azure services",
      "Develop AI Applications with Azure AI Services"
    ],
    profileSummary: "Innovative Software Engineer & AI Engineer with expertise in full-stack development, AI engineering, IT Support technician, cloud computing, and DevOps. Skilled in building scalable back-end systems, interactive front-end experiences, and AI-powered applications. Strong foundation in data structures, algorithms, and systems engineering, with hands-on experience in AWS, machine learning, and cybersecurity. Passionate about 3D web development, mobile app development, and automation. Proven ability to optimize performance, enhance security, and deliver high-quality software solutions."
  };

  // Intelligent response generation system
  const generateIntelligentResponse = (userQuery) => {
    const query = userQuery.toLowerCase().trim();
    
    // Handle greetings with variety
    if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      const greetings = [
        `Hello! I'm Rhulani's AI Assistant. I'm excited to tell you all about this incredible developer! What would you like to know about Rhulani?`,
        `Hi there! Welcome to Rhulani's portfolio. I can tell you everything about his amazing skills, projects, and experience. What interests you most?`,
        `Hey! I'm here to share all the fascinating details about Rhulani Mashala. He's truly an exceptional developer - what would you like to discover?`
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Comprehensive "who is Rhulani" response
    if (query.includes("who") && (query.includes("rhulani") || query.includes("he") || query.includes("him"))) {
      return `Rhulani Mashala is an incredibly talented and innovative Software Engineer & AI Engineer from South Africa, currently based in Port Shepstone. 

${rhulaniKnowledge.profileSummary}

He's currently working as a Full-Stack Developer Intern at Heybash FZCO, where he's developing web applications using HubSpot, WordPress, and APIs. Previously, he was a Software Engineer Apprentice at ALX, where he achieved remarkable results including a 30% reduction in maintenance costs and a 40% improvement in deployment speed.

Rhulani is passionate about cutting-edge technology, particularly AI/ML, 3D web development, and creating scalable solutions that make a real impact. His combination of technical expertise and problem-solving mindset makes him an exceptional developer who can tackle complex challenges with innovative solutions.`;
    }

    // Detailed skills response
    if (query.includes("skill") || query.includes("tech") || query.includes("technology") || query.includes("what can he do")) {
      return `Rhulani's technical skills are absolutely outstanding! Let me break down his expertise:

**Programming Languages:** ${rhulaniKnowledge.skills.programming.join(", ")}

**Web & Backend Development:** ${rhulaniKnowledge.skills.webBackend.join(", ")}

**Frontend & 3D Development:** ${rhulaniKnowledge.skills.frontend3D.join(", ")}

**AI & Data Science:** ${rhulaniKnowledge.skills.aiDataScience.join(", ")}

**Cloud & DevOps:** ${rhulaniKnowledge.skills.cloudDevOps.join(", ")}

**Mobile Development:** ${rhulaniKnowledge.skills.mobile.join(", ")}

**Security & IT Support:** ${rhulaniKnowledge.skills.securityIT.join(", ")}

What makes Rhulani exceptional is his ability to combine these technologies to create innovative solutions. He's particularly strong in AI/ML applications, 3D web development with Three.js, and building scalable backend systems. His expertise spans the entire development stack, from database design to user interface creation.`;
    }

    // Detailed experience response
    if (query.includes("experience") || query.includes("work") || query.includes("job") || query.includes("career")) {
      return `Rhulani's professional experience is truly impressive! Here's his career journey:

**Current Role - Full-Stack Developer Intern at Heybash FZCO:**
- Developing and maintaining web applications using HubSpot, WordPress, and APIs
- Building custom modules and responsive UI components
- Managing tasks via Teamwork and ensuring timely delivery
- Attending daily stand-up meetings and collaborating with the team
- Maintaining code quality standards, security, and best practices

**Software Engineer Apprentice at ALX (2023-2025):**
- Developed software solutions using Agile methodology, achieving a 30% reduction in maintenance costs
- Collaborated with cross-functional teams to design and test scalable software systems, improving user satisfaction by 25%
- Implemented DevOps practices to increase software reliability and efficiency, resulting in a 40% improvement in deployment speed
- Developed a command-line shell in C to emulate popular Unix shells, streamlining interactive program management and increasing productivity by 35%
- Worked with database structures such as SQL, MySQL, PostgreSQL, Redis, and ES6, improving database query performance by 30%
- Collaborated with team members to ensure seamless functionality and a user-friendly experience, contributing to a 25% boost in user engagement metrics
- Implemented efficient coding practices that optimized performance and reduced load times by 40%

**AI Engineer at HexSoftwares (2023-2025):**
- Developed and optimized machine learning models, improving accuracy by 25% through data preprocessing and feature engineering
- Implemented scalable AI pipelines, reducing training time by 30% using parallel computing and cloud resources
- Collaborated with cross-functional teams to deploy ML solutions, enhancing system efficiency and user experience by 20%

His experience demonstrates consistent growth, leadership, and the ability to deliver measurable results across different technical domains.`;
    }

    // Projects and portfolio response
    if (query.includes("project") || query.includes("portfolio") || query.includes("work") || query.includes("what has he built")) {
      return `Rhulani's projects showcase his incredible creativity and technical prowess! Here are some highlights:

**This 3D Portfolio Website:**
- Built with React.js and Three.js for stunning 3D visualizations
- Features interactive 3D elements and smooth animations
- Demonstrates his expertise in modern web technologies and 3D graphics

**AI-Powered Applications:**
- Machine learning models with 25% improved accuracy
- Scalable AI pipelines with 30% faster training times
- Integration with TensorFlow, PyTorch, and various AI frameworks

**Software Solutions:**
- Command-line shell in C programming language
- Database optimization projects with 30% performance improvement
- DevOps implementations with 40% faster deployment speeds

**Web Applications:**
- Full-stack solutions using modern frameworks
- Responsive designs with optimized user experiences
- API integrations and database management systems

Each project demonstrates Rhulani's ability to solve complex problems, optimize performance, and create user-friendly solutions. His work consistently shows measurable improvements in efficiency, performance, and user satisfaction.`;
    }

    // AI expertise response
    if (query.includes("ai") || query.includes("artificial intelligence") || query.includes("machine learning") || query.includes("ml")) {
      return `Rhulani's expertise in AI is absolutely remarkable! He's deeply knowledgeable about:

**Machine Learning & Deep Learning:**
- Extensive experience with TensorFlow and PyTorch
- Neural network design and optimization
- Computer Vision applications
- Natural Language Processing (NLP)

**AI Development:**
- Generative AI technologies
- Large Language Models (LLM) integration
- Scikit-Learn for traditional ML algorithms
- AI pipeline development and optimization

**Real-World Applications:**
- At HexSoftwares, he improved ML model accuracy by 25%
- Implemented scalable AI pipelines with 30% faster training times
- Deployed ML solutions that enhanced system efficiency by 20%
- Created AI-powered applications that solve real business problems

**Technical Implementation:**
- API integrations with OpenAI and other AI services
- Cloud-based AI deployment on AWS
- Performance optimization for AI applications
- User-friendly AI interfaces

Rhulani has a unique ability to translate complex AI concepts into practical, user-friendly applications that deliver real value. His combination of theoretical knowledge and practical implementation skills makes him exceptional in the AI field.`;
    }

    // Education and certifications response
    if (query.includes("education") || query.includes("degree") || query.includes("certification") || query.includes("certificate") || query.includes("study")) {
      return `Rhulani's educational background and certifications are impressive! Here's his academic journey:

**Current Education:**
- **UNISA** - Diploma in Accounting Sciences (2025-2028)
- **Holberton School & ALX** - Diploma in Software Engineering (2023-2025)
- **ATTI COLLEGE** - N4 Systems and Web Development (2018-2019)

**Professional Certifications:**
${rhulaniKnowledge.certifications.map(cert => `• ${cert}`).join('\n')}

**Special Achievements:**
${rhulaniKnowledge.achievements.map(achievement => `• ${achievement}`).join('\n')}

What's remarkable about Rhulani is his commitment to continuous learning. He's constantly updating his skills through professional certifications and practical experience. His diverse educational background - from systems development to software engineering to accounting - gives him a unique perspective on business and technology integration.

His certifications span multiple domains including AI engineering, cloud computing, mobile development, and data science, showing his versatility and dedication to staying current with industry trends.`;
    }

    // Contact and collaboration response
    if (query.includes("contact") || query.includes("hire") || query.includes("collaborate") || query.includes("reach") || query.includes("email") || query.includes("phone")) {
      return `Great question! Rhulani is always open to exciting opportunities and collaborations. Here's how you can reach him:

**Contact Information:**
- **Phone:** ${rhulaniKnowledge.personal.contact.phone}
- **Email:** ${rhulaniKnowledge.personal.contact.email}
- **Portfolio:** ${rhulaniKnowledge.personal.contact.portfolio}
- **Location:** ${rhulaniKnowledge.personal.location}

**What Rhulani is looking for:**
- Full-time software engineering positions
- AI/ML engineering opportunities
- Freelance projects and consulting work
- Open source contributions
- Innovative technology collaborations

**Areas of interest:**
- AI-powered applications and solutions
- Full-stack development projects
- 3D web development and visualization
- Mobile app development
- Cloud computing and DevOps projects

Rhulani is particularly passionate about projects that combine multiple technologies and solve real-world problems. He thrives in environments that encourage innovation and continuous learning. Feel free to reach out with any opportunities or just to discuss technology!`;
    }

    // Future goals and aspirations
    if (query.includes("future") || query.includes("goal") || query.includes("aspiration") || query.includes("plan") || query.includes("dream")) {
      return `Rhulani is incredibly ambitious and forward-thinking! Here are his goals and aspirations:

**Short-term Goals (1-2 years):**
- Continue advancing his AI engineering expertise
- Contribute to open-source AI projects
- Build more innovative 3D web applications
- Expand his cloud computing and DevOps skills

**Long-term Vision:**
- Become a leading expert in AI engineering and full-stack development
- Create groundbreaking technological solutions that make a real difference
- Lead teams in developing cutting-edge applications
- Contribute to the advancement of AI technology in Africa and globally

**Areas of Focus:**
- Advancing AI/ML technologies for practical applications
- Developing scalable software solutions for businesses
- Creating innovative user experiences through 3D and interactive technologies
- Mentoring and inspiring other developers

Rhulani believes in the power of technology to solve real-world problems and is committed to continuous learning and innovation. He's particularly excited about the future of AI and how it can be integrated into everyday applications to improve people's lives.`;
    }

    // Navigation requests
    if (query.includes("take me to") || query.includes("go to") || query.includes("navigate to") || query.includes("show me") || query.includes("open")) {
      let sectionToNavigate = "";
      let response = "";
      
      if (query.includes("about")) {
        sectionToNavigate = "about";
        response = "Taking you to the About section where you can learn more about Rhulani's background and story!";
      } else if (query.includes("work") || query.includes("experience")) {
        sectionToNavigate = "work";
        response = "Navigating to the Work Experience section to show you Rhulani's impressive career journey!";
      } else if (query.includes("project") || query.includes("works")) {
        sectionToNavigate = "projects";
        response = "Here are Rhulani's amazing projects that showcase his technical skills and creativity!";
      } else if (query.includes("contact")) {
        sectionToNavigate = "contact";
        response = "Taking you to the Contact section where you can reach out to Rhulani!";
      } else if (query.includes("tech") || query.includes("technology") || query.includes("skill")) {
        sectionToNavigate = "tech";
        response = "Here are the cutting-edge technologies and skills that Rhulani masters!";
      } else if (query.includes("certifications")) {
        sectionToNavigate = "certifications";
        response = "Taking you to the Certifications section to see Rhulani's impressive qualifications!";
      } else if (query.includes("top") || query.includes("home")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return "Taking you back to the top of Rhulani's portfolio!";
      } else {
        return "I can take you to About, Work, Projects, Tech, Certifications, or Contact sections. Which one would you like to explore?";
      }
      
      if (sectionToNavigate) {
        setTimeout(() => navigateToSection(sectionToNavigate), 500);
      }
      
      return response;
    }

    // Handle unclear or off-topic questions
    if (query.includes("weather") || query.includes("time") || query.includes("date") || query.includes("joke") || query.includes("story") || query.includes("recipe") || query.includes("sport") || query.includes("movie") || query.includes("music")) {
      return `That's an interesting question, though it's not related to Rhulani's portfolio. I'm specifically designed to help you learn about Rhulani's amazing skills, projects, and experience. 

Is there something about Rhulani's work, background, or technical expertise you'd like to know? I can tell you about his AI engineering skills, full-stack development experience, impressive projects, or his career journey.`;
    }

    // Default response for unclear questions
    return `I'd love to tell you more about Rhulani! He's an exceptional developer with expertise in AI engineering, full-stack development, and 3D web technologies. 

You can ask me about:
• Who Rhulani is and his background
• His technical skills and technologies
• His work experience and achievements
• His projects and portfolio
• His education and certifications
• How to contact or collaborate with him

What would you like to know about Rhulani?`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      speechRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (speechRef.current) {
        speechRef.current.cancel();
      }
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
        console.error('Failed to start speech recognition:', error);
      }
    }
  };

  const speakText = (text) => {
    if (speechRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = speechRef.current.getVoices().find(voice => 
        voice.name.includes('Male') || voice.name.includes('male')
      ) || speechRef.current.getVoices()[0];
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechRef.current.speak(utterance);
    }
  };

  // Function to navigate to different sections
  const navigateToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Generate AI response
      const aiResponse = generateIntelligentResponse(input);
      
      setTimeout(() => {
        const responseMessage = { text: aiResponse, sender: "ai" };
        setMessages(prev => [...prev, responseMessage]);
        setIsTyping(false);
        
        // Only speak for non-navigation responses
        const query = input.toLowerCase();
        if (!query.includes("take me to") && !query.includes("go to") && !query.includes("navigate to") && !query.includes("show me") && !query.includes("open")) {
          speakText(aiResponse);
        }
      }, 1000);

    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { text: "I'm sorry, I encountered an error. Please try again later.", sender: "ai" }]);
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 w-80 sm:w-96 bg-tertiary rounded-lg shadow-xl z-50 overflow-hidden flex flex-col"
      style={{ height: "70vh", maxHeight: "500px" }}
    >
      <div className="bg-primary p-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <motion.img 
            src={aiIcon} 
            alt="AI Assistant" 
            className="w-15 h-9"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <h3 className="text-white font-bold">Rhulani's AI Assistant</h3>
        </div>
        <button 
          onClick={onClose} 
          className="text-white hover:text-gray-300 focus:outline-none"
        >
          ×
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-black bg-opacity-70">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-3 ${msg.sender === "user" ? "text-right" : "text-left"}`}
          >
            <div 
              className={`inline-block rounded-lg px-4 py-2 max-w-[75%] ${
                msg.sender === "user" 
                  ? "bg-violet-600 text-white" 
                  : "bg-gray-800 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="text-left mb-3">
            <div className="inline-block bg-gray-800 text-white rounded-lg px-4 py-2">
              <span className="typing-animation">AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-black bg-opacity-80 border-t border-gray-700">
        <div className="flex flex-col w-full space-y-2">
          <div className="flex w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about Rhulani..."
              className="flex-grow h-10 px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none"
              style={{ width: 'calc(100% - 50px)' }}
            />
            <button 
              type="button"
              onClick={toggleListening}
              className={`h-10 w-10 flex items-center justify-center ${isListening ? 'bg-red-600' : 'bg-gray-700'} text-white rounded-r-lg focus:outline-none ml-2`}
              title={isListening ? "Stop listening" : "Start voice input"}
            >
              <img src={micIcon} alt="Microphone" className="w-15 h-7" />
            </button>
          </div>
          <div className="flex justify-between items-center">
            {isListening && (
              <span className="text-sm text-red-400 animate-pulse">Listening...</span>
            )}
            {isSpeaking && (
              <span className="text-sm text-blue-400 animate-pulse">Speaking...</span>
            )}
            <div className="flex justify-end flex-grow">
              <button 
                type="submit" 
                className="h-10 min-w-[80px] bg-violet-600 hover:bg-violet-700 text-white px-4 rounded-lg focus:outline-none whitespace-nowrap"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default Chat;
