import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

// Basic error handling for the entire app
const renderApp = () => {
  try {
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      throw new Error("Root element not found");
    }
    
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
  } catch (error) {
    console.error("Failed to render the application:", error);
    
    // Fallback UI when app completely fails to render
    const rootElement = document.getElementById("root") || document.body;
    rootElement.innerHTML = `
      <div style="min-height: 100vh; background-color: #050816; color: white; display: flex; align-items: center; justify-content: center; text-align: center; padding: 20px;">
        <div>
          <h1 style="font-size: 24px; margin-bottom: 16px;">Application Error</h1>
          <p style="margin-bottom: 24px;">We're having trouble loading the portfolio. Please try refreshing the page.</p>
          <p style="color: red; margin-bottom: 16px;">${error.message}</p>
          <button 
            onclick="window.location.reload()" 
            style="background-color: #915eff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;"
          >
            Reload
          </button>
        </div>
      </div>
    `;
  }
};

renderApp();
