import React, { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import { styles } from "../styles.js";
import { motion } from "framer-motion";
import { certifications } from "../constants/index.js";

const Chat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Rhulani's AI assistant. How can I help you learn more about this portfolio?", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

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

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
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
      // Predefined responses based on keywords
      const userQuery = input.toLowerCase();

      setTimeout(() => {
        let aiResponse = { text: "", sender: "ai" };
        let shouldNavigate = false;
        let sectionToNavigate = "";

        // Check for navigation requests
        if (userQuery.includes("take me to") || userQuery.includes("go to") || userQuery.includes("navigate to") || userQuery.includes("show me")) {
          shouldNavigate = true;

          if (userQuery.includes("about")) {
            sectionToNavigate = "about";
            aiResponse.text = "Taking you to the About section now!";
          } else if (userQuery.includes("work") || userQuery.includes("experience")) {
            sectionToNavigate = "work";
            aiResponse.text = "Navigating to the Work Experience section!";
          } else if (userQuery.includes("project") || userQuery.includes("works")) {
            sectionToNavigate = "projects";
            aiResponse.text = "Here are Rhulani's projects!";
          } else if (userQuery.includes("contact")) {
            sectionToNavigate = "contact";
            aiResponse.text = "Taking you to the Contact section!";
          } else if (userQuery.includes("tech") || userQuery.includes("technology") || userQuery.includes("skill")) {
            sectionToNavigate = "tech";
            aiResponse.text = "Here are the technologies Rhulani works with!";
          } else if (userQuery.includes("certifications") || userQuery.includes("certification") || userQuery.includes("certificate")) {
            sectionToNavigate = "certifications";
            aiResponse.text = "Taking you to the Certifications section!";
          } else if (userQuery.includes("top") || userQuery.includes("home")) {
            sectionToNavigate = "home";
            aiResponse.text = "Taking you back to the top!";
            window.scrollTo({ top: 0, behavior: "smooth" });
            shouldNavigate = false; // Already navigated
          } else {
            shouldNavigate = false;
            aiResponse.text = "I'm not sure which section you want to navigate to. You can ask me to take you to About, Work, Projects, Tech, Certifications, or Contact sections.";
          }
        } else if (userQuery.includes("experience") || userQuery.includes("work")) {
          aiResponse.text = "Rhulani has experience as a Software Engineer, AI Developer, and Full-Stack Developer. Check out the 'Work' section for more details! Would you like me to take you there?";
        } else if (userQuery.includes("project") || userQuery.includes("portfolio")) {
          aiResponse.text = "Rhulani has worked on various projects including an Xora AI app, RPG Game, and a Calorie Counter. You can find them in the 'Projects' section! Would you like me to take you there?";
        } else if (userQuery.includes("contact") || userQuery.includes("hire")) {
          aiResponse.text = "You can contact Rhulani through the Contact form at the bottom of the page. Feel free to reach out for collaboration or job opportunities! Would you like me to take you to the contact section?";
        } else if (userQuery.includes("skill") || userQuery.includes("tech")) {
          aiResponse.text = "Rhulani is skilled in various technologies including JavaScript, React, Node.js, Python, and AI development. Would you like me to show you the technologies section?";
        } else if (userQuery.includes("certification") || userQuery.includes("certifications") || userQuery.includes("certificate")) {
          const certList = certifications.slice(0, 3).map(cert => cert.title).join(", ") + ", and more";
          aiResponse.text = `Rhulani has earned several professional certifications including ${certList}. Would you like me to take you to the Certifications section to see all of them?`;
        } else if (userQuery.includes("hello") || userQuery.includes("hi") || userQuery.includes("hey")) {
          aiResponse.text = "Hello there! Welcome to Rhulani's portfolio. How can I assist you today? I can tell you about Rhulani's skills, projects, certifications, or navigate you to different sections of the portfolio.";
        } else {
          aiResponse.text = "Thanks for your message! Rhulani has expertise in software engineering, AI development, and full-stack development. Is there something specific you'd like to know about the portfolio, projects, certifications, or skills? I can also navigate you to any section you'd like to see.";
        }

        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);

        // Navigate after a short delay to ensure the message is seen
        if (shouldNavigate && sectionToNavigate) {
          setTimeout(() => {
            navigateToSection(sectionToNavigate);
          }, 1000);
        }
      }, 1000);

    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { text: "Sorry, I encountered an error. Please try again later.", sender: "ai" }]);
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
        <h3 className="text-white font-bold">Portfolio AI Assistant</h3>
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
              <span className="typing-animation">AI is typing...</span>
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
              placeholder="Ask me anything..."
              className="flex-grow h-10 px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none"
            />
            <button 
              type="button"
              onClick={toggleListening}
              className={`h-10 w-10 flex items-center justify-center ${isListening ? 'cursor-gradient' : 'bg-gray-700'} text-white rounded-r-lg focus:outline-none`}
              title={isListening ? "Stop listening" : "Start voice input"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="flex justify-between items-center">
            {isListening && (
              <span className="text-sm text-violet-400 animate-pulse">Listening...</span>
            )}
            <div className="flex justify-end flex-grow">
              <button 
                type="submit" 
                className="h-10 min-w-[80px] cursor-gradient text-white px-4 rounded-lg focus:outline-none whitespace-nowrap"
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
