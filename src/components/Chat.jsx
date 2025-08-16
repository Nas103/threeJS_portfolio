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

  // Random positive expressions for relevant questions
  const positiveExpressions = [
    "Rhulani is absolutely incredible! ",
    "You got an idea, he'll turn it into a solution, he's truly exceptional! ",
    "Rhulani is absolutely brilliant! ",
    "Rhulani is incredibly talented! ",
    "He is absolutely outstanding! ",
    "For someone who is remarkably skilled! ",
    "He absolutely phenomenal! ",
    "Rhulani is incredibly impressive! ",
    "Rhulani is absolutely marvelous! ",
    "Rhulani is exceptionally gifted! ",
    "Rhulani is absolutely fantastic! ",
    "Rhulani is incredibly accomplished! ",
    "Rhulani is absolutely remarkable! ",
    "Rhulani is exceptionally talented! ",
    "Rhulani is absolutely extraordinary! "
  ];

  // Random expressions for irrelevant questions
  const irrelevantExpressions = [
    "I'm not sure that's related to Rhulani's portfolio, but ",
    "That's an interesting question, though not portfolio-related. ",
    "I'm here to help with portfolio questions, but ",
    "That's outside my scope, but ",
    "I'm focused on Rhulani's work, but ",
    "That's not really about the portfolio, but ",
    "I'm here for portfolio questions, though ",
    "That's beyond my expertise, but ",
    "I'm designed for portfolio help, but ",
    "That's not portfolio-related, but "
  ];

  // Function to get random positive expression
  const getRandomExpression = () => {
    return positiveExpressions[Math.floor(Math.random() * positiveExpressions.length)];
  };

  // Function to get random irrelevant expression
  const getRandomIrrelevantExpression = () => {
    return irrelevantExpressions[Math.floor(Math.random() * irrelevantExpressions.length)];
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

  const generateAIResponse = (userQuery) => {
    const query = userQuery.toLowerCase();
    
    // Check for greetings first
    if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("good morning") || query.includes("good afternoon") || query.includes("good evening")) {
      const greetings = [
        "Hello there! 👋 How can I help you learn about Rhulani's portfolio today?",
        "Hi! 😊 Welcome to Rhulani's portfolio. What would you like to know?",
        "Hey! 👋 Great to see you here. How can I assist you with Rhulani's work?",
        "Hello! 😄 I'm here to help you explore Rhulani's skills and projects. What interests you?",
        "Hi there! 👋 Ready to discover what makes Rhulani an exceptional developer?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Check for navigation requests
    if (query.includes("take me to") || query.includes("go to") || query.includes("navigate to") || query.includes("show me") || query.includes("open")) {
      let sectionToNavigate = "";
      let response = "";
      
      if (query.includes("about")) {
        sectionToNavigate = "about";
        response = "Taking you to the About section now!";
      } else if (query.includes("work") || query.includes("experience")) {
        sectionToNavigate = "work";
        response = "Navigating to the Work Experience section!";
      } else if (query.includes("project") || query.includes("works")) {
        sectionToNavigate = "projects";
        response = "Here are Rhulani's projects!";
      } else if (query.includes("contact")) {
        sectionToNavigate = "contact";
        response = "Taking you to the Contact section!";
      } else if (query.includes("tech") || query.includes("technology") || query.includes("skill")) {
        sectionToNavigate = "tech";
        response = "Here are the technologies Rhulani works with!";
      } else if (query.includes("certifications")) {
        sectionToNavigate = "certifications";
        response = "Taking you to the Certifications section!";
      } else if (query.includes("top") || query.includes("home")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return "Taking you back to the top!";
      } else {
        return "I can take you to About, Work, Projects, Tech, Certifications, or Contact sections. Which one would you like to see?";
      }
      
      // Navigate immediately for navigation requests
      if (sectionToNavigate) {
        setTimeout(() => navigateToSection(sectionToNavigate), 500);
      }
      
      return response;
    }
    
    // Check for relevant portfolio questions
    if (query.includes("who") && query.includes("rhulani")) {
      return "Rhulani Mashala is an exceptional AI Engineer and Full-Stack Developer from South Africa. He's incredibly passionate about creating intelligent solutions for real-world challenges and has a remarkable ability to blend cutting-edge AI technology with practical software development.";
    }
    
    if (query.includes("skill") || query.includes("tech") || query.includes("technology")) {
      return getRandomExpression() + "Rhulani's technical skills are absolutely outstanding! He's a master of multiple programming languages including JavaScript, Python, C++, and Java. His expertise in AI/ML frameworks like TensorFlow and PyTorch is exceptional, and he's incredibly proficient with modern web technologies like React, Node.js, and Three.js. He's also skilled with databases like PostgreSQL and cloud platforms like AWS.";
    }
    
    if (query.includes("experience") || query.includes("work")) {
      return getRandomExpression() + "Rhulani's professional experience is truly impressive! He's currently working as a Software Engineer at TechCorp, where he's been leading the development of AI-powered applications. Previously, he was an AI Developer at InnovateAI, where he significantly improved system performance by 40%. His ability to mentor junior developers and implement CI/CD pipelines shows his leadership and technical excellence.";
    }
    
    if (query.includes("project") || query.includes("portfolio")) {
      return getRandomExpression() + "Rhulani's projects are absolutely brilliant! He's built the Xora AI chatbot using OpenAI's GPT technology, created an impressive RPG game with real-time multiplayer features, developed a comprehensive Calorie Counter health app, and of course, this stunning 3D portfolio website using React and Three.js. Each project showcases his creativity and technical prowess.";
    }
    
    if (query.includes("education") || query.includes("degree")) {
      return "Rhulani holds a Bachelor's degree in Computer Science from the University of Technology, with a specialized focus on Artificial Intelligence and Software Engineering. His academic background perfectly complements his practical skills and real-world experience.";
    }
    
    if (query.includes("certification") || query.includes("certificate")) {
      return "Rhulani has earned prestigious certifications including AWS Certified Developer, Google Cloud Professional, Microsoft Azure Developer, and TensorFlow Developer Certificate. These certifications demonstrate his commitment to staying current with the latest technologies.";
    }
    
    if (query.includes("ai") || query.includes("artificial intelligence")) {
      return getRandomExpression() + "Rhulani's expertise in AI is absolutely remarkable! He's deeply knowledgeable about machine learning, deep learning, and natural language processing. He's worked extensively with TensorFlow, PyTorch, and OpenAI APIs, and has a unique ability to translate complex AI concepts into practical, user-friendly applications.";
    }
    
    if (query.includes("future") || query.includes("goal") || query.includes("aspiration")) {
      return getRandomExpression() + "Rhulani is incredibly ambitious and forward-thinking! He's passionate about advancing AI technology and creating solutions that make a real difference in people's lives. His goal is to become a leading expert in AI engineering and to contribute to groundbreaking technological innovations.";
    }
    
    if (query.includes("hire") || query.includes("contact") || query.includes("collaborate")) {
      return "You can contact Rhulani through the Contact form at the bottom of the page. Feel free to reach out for collaboration or job opportunities! Would you like me to take you to the contact section?";
    }
    
    // Check for irrelevant questions
    if (query.includes("weather") || query.includes("time") || query.includes("date") || query.includes("joke") || query.includes("story") || query.includes("recipe") || query.includes("sport") || query.includes("movie") || query.includes("music")) {
      return getRandomIrrelevantExpression() + "I'm specifically designed to help with questions about Rhulani's portfolio, skills, and projects. Is there something about his work you'd like to know?";
    }
    
    // Default response for unclear questions
    return "I'm here to help you learn about Rhulani's portfolio! You can ask me about his skills, projects, experience, certifications, or I can navigate you to different sections. What would you like to know?";
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
      const aiResponse = generateAIResponse(input);
      
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
              <img src={micIcon} alt="Microphone" className="w-7 h-7" />
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
