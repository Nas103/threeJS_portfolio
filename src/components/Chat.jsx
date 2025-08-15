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

  // Random positive expressions to start responses
  const positiveExpressions = [
    "Rhulani is absolutely incredible! ",
    "Rhulani is truly exceptional! ",
    "Rhulani is absolutely brilliant! ",
    "Rhulani is incredibly talented! ",
    "Rhulani is absolutely outstanding! ",
    "Rhulani is remarkably skilled! ",
    "Rhulani is absolutely phenomenal! ",
    "Rhulani is incredibly impressive! ",
    "Rhulani is absolutely marvelous! ",
    "Rhulani is exceptionally gifted! ",
    "Rhulani is absolutely fantastic! ",
    "Rhulani is incredibly accomplished! ",
    "Rhulani is absolutely remarkable! ",
    "Rhulani is exceptionally talented! ",
    "Rhulani is absolutely extraordinary! "
  ];

  // Function to get random positive expression
  const getRandomExpression = () => {
    return positiveExpressions[Math.floor(Math.random() * positiveExpressions.length)];
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

  const generateGPT5Response = (userQuery) => {
    const query = userQuery.toLowerCase();
    
    // Use random positive expressions
    let positiveIntro = getRandomExpression();
    
    if (query.includes("who") && query.includes("rhulani")) {
      return positiveIntro + "Rhulani Mashala is an exceptional AI Engineer and Full-Stack Developer from South Africa. He's incredibly passionate about creating intelligent solutions for real-world challenges and has a remarkable ability to blend cutting-edge AI technology with practical software development.";
    }
    
    if (query.includes("skill") || query.includes("tech") || query.includes("technology")) {
      return positiveIntro + "Rhulani's technical skills are absolutely outstanding! He's a master of multiple programming languages including JavaScript, Python, C++, and Java. His expertise in AI/ML frameworks like TensorFlow and PyTorch is exceptional, and he's incredibly proficient with modern web technologies like React, Node.js, and Three.js. He's also skilled with databases like PostgreSQL and cloud platforms like AWS.";
    }
    
    if (query.includes("experience") || query.includes("work")) {
      return positiveIntro + "Rhulani's professional experience is truly impressive! He's currently working as a Software Engineer at TechCorp, where he's been leading the development of AI-powered applications. Previously, he was an AI Developer at InnovateAI, where he significantly improved system performance by 40%. His ability to mentor junior developers and implement CI/CD pipelines shows his leadership and technical excellence.";
    }
    
    if (query.includes("project") || query.includes("portfolio")) {
      return positiveIntro + "Rhulani's projects are absolutely brilliant! He's built the Xora AI chatbot using OpenAI's GPT technology, created an impressive RPG game with real-time multiplayer features, developed a comprehensive Calorie Counter health app, and of course, this stunning 3D portfolio website using React and Three.js. Each project showcases his creativity and technical prowess.";
    }
    
    if (query.includes("education") || query.includes("degree")) {
      return positiveIntro + "Rhulani holds a Bachelor's degree in Computer Science from the University of Technology, with a specialized focus on Artificial Intelligence and Software Engineering. His academic background perfectly complements his practical skills and real-world experience.";
    }
    
    if (query.includes("certification") || query.includes("certificate")) {
      return positiveIntro + "Rhulani's certifications are a testament to his dedication to excellence! He's earned prestigious certifications including AWS Certified Developer, Google Cloud Professional, Microsoft Azure Developer, and TensorFlow Developer Certificate. These certifications demonstrate his commitment to staying current with the latest technologies.";
    }
    
    if (query.includes("ai") || query.includes("artificial intelligence")) {
      return positiveIntro + "Rhulani's expertise in AI is absolutely remarkable! He's deeply knowledgeable about machine learning, deep learning, and natural language processing. He's worked extensively with TensorFlow, PyTorch, and OpenAI APIs, and has a unique ability to translate complex AI concepts into practical, user-friendly applications.";
    }
    
    if (query.includes("future") || query.includes("goal") || query.includes("aspiration")) {
      return positiveIntro + "Rhulani is incredibly ambitious and forward-thinking! He's passionate about advancing AI technology and creating solutions that make a real difference in people's lives. His goal is to become a leading expert in AI engineering and to contribute to groundbreaking technological innovations.";
    }
    
    if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      return positiveIntro + "It's wonderful to meet you! I'm Rhulani's AI assistant, and I'm here to tell you all about this amazing developer. Rhulani is not just technically skilled - he's also incredibly creative, innovative, and passionate about technology. What would you like to know about him?";
    }
    
    // Default response with positive reinforcement
    return positiveIntro + "Rhulani is an exceptional developer with a unique combination of technical skills, creativity, and passion for AI. He's worked on amazing projects, earned prestigious certifications, and has a bright future ahead. Is there something specific about his skills, projects, or experience you'd like to know more about?";
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
      // Generate GPT-5 style response
      const aiResponse = generateGPT5Response(input);
      
      setTimeout(() => {
        const responseMessage = { text: aiResponse, sender: "ai" };
        setMessages(prev => [...prev, responseMessage]);
        setIsTyping(false);
        
        // Speak the response with realistic male voice
        speakText(aiResponse);
        
        // Check for navigation requests
        const query = input.toLowerCase();
        if (query.includes("take me to") || query.includes("go to") || query.includes("navigate to") || query.includes("show me")) {
          let sectionToNavigate = "";
          if (query.includes("about")) sectionToNavigate = "about";
          else if (query.includes("work") || query.includes("experience")) sectionToNavigate = "work";
          else if (query.includes("project") || query.includes("works")) sectionToNavigate = "projects";
          else if (query.includes("contact")) sectionToNavigate = "contact";
          else if (query.includes("tech") || query.includes("technology") || query.includes("skill")) sectionToNavigate = "tech";
          else if (query.includes("certifications")) sectionToNavigate = "certifications";
          else if (query.includes("top") || query.includes("home")) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
          }
          
          if (sectionToNavigate) {
            setTimeout(() => navigateToSection(sectionToNavigate), 2000);
          }
        }
      }, 1000);

    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { text: "I&apos;m sorry, I encountered an error. But let me tell you - Rhulani is absolutely amazing and would love to help you with any questions! Please try again.", sender: "ai" }]);
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
          <img src={aiIcon} alt="AI Assistant" className="w-15 h-10" />
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
              <span className="typing-animation">🤖 AI is thinking...</span>
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
              <img src={micIcon} alt="Microphone" className="w-19 h-7" />
            </button>
          </div>
          <div className="flex justify-between items-center">
            {isListening && (
              <span className="text-sm text-red-400 animate-pulse">🎤 Listening...</span>
            )}
            {isSpeaking && (
              <span className="text-sm text-blue-400 animate-pulse">🔊 Speaking...</span>
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
