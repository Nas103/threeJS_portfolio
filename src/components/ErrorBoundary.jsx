import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <div className="bg-tertiary p-4 rounded-lg mb-4 max-w-lg w-full overflow-auto">
            <p className="text-red-400 mb-2">{this.state.error && this.state.error.toString()}</p>
            <details className="mb-4">
              <summary className="cursor-pointer text-purple-400">View error details</summary>
              <pre className="mt-2 text-sm whitespace-pre-wrap">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          </div>
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition-colors"
            >
              Reload Page
            </button>
            <button 
              onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    // If there's no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
