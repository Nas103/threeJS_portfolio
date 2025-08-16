import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BallCanvas } from "./canvas/index.js";
import { SectionWrapper } from "../hoc/index.js";
import { technologies } from "../constants/index.js";

const Tech = () => {
  const [currentCode, setCurrentCode] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const codeIndexRef = useRef(0);
  const charIndexRef = useRef(0);

  // Different code examples for various technologies
  const codeExamples = [
    {
      language: "Python",
      code: `import tensorflow as tf
import numpy as np

class NeuralNetwork:
    def __init__(self, layers):
        self.layers = layers
        self.weights = []
        self.biases = []
        
    def forward(self, X):
        # Forward propagation
        activation = X
        for w, b in zip(self.weights, self.biases):
            z = np.dot(w, activation) + b
            activation = self.sigmoid(z)
        return activation
    
    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))`
    },
    {
      language: "JavaScript",
      code: `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    observer.observe(document.querySelector('.portfolio'));
    return () => observer.disconnect();
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      className="portfolio"
    >
      <h1>Welcome to my Portfolio</h1>
    </motion.div>
  );
};`
    },
    {
      language: "C++",
      code: `#include <iostream>
#include <vector>
#include <algorithm>

class DataStructure {
private:
    std::vector<int> data;
    
public:
    void insert(int value) {
        data.push_back(value);
        std::sort(data.begin(), data.end());
    }
    
    bool search(int value) {
        return std::binary_search(data.begin(), data.end(), value);
    }
    
    void display() {
        for (const auto& item : data) {
            std::cout << item << " ";
        }
        std::cout << std::endl;
    }
};`
    },
    {
      language: "React",
      code: `import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const ThreeDScene = () => {
  const [rotation, setRotation] = useState(0);
  
  const handleFrame = useCallback((state) => {
    setRotation(prev => prev + 0.01);
  }, []);
  
  return (
    <Canvas onFrame={handleFrame}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh rotation-y={rotation}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};`
    },
    {
      language: "PostgreSQL",
      code: `-- Database schema for portfolio
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    technologies TEXT[],
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample project
INSERT INTO projects (title, description, technologies) VALUES (
    'AI Portfolio',
    'A 3D portfolio built with React and Three.js',
    ARRAY['React', 'Three.js', 'Node.js', 'PostgreSQL']
);

-- Query projects by technology
SELECT title, description 
FROM projects 
WHERE 'React' = ANY(technologies);`
    },
    {
      language: "Node.js",
      code: `const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

app.use(cors());
app.use(express.json());

// API endpoints
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});`
    },
    {
      language: "TypeScript",
      code: `interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  createdAt: Date;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

class ProjectService {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  async getProjects(): Promise<ApiResponse<Project[]>> {
    try {
      const response = await fetch(\`\${this.baseUrl}/api/projects\`);
      const data = await response.json();
      
      return {
        data: data.map((project: any) => ({
          ...project,
          createdAt: new Date(project.createdAt)
        })),
        success: true,
        message: 'Projects retrieved successfully'
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}`
    },
    {
      language: "Docker",
      code: `# Dockerfile for portfolio application
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["npm", "start"]`
    },
    {
      language: "AWS",
      code: `# AWS CloudFormation template
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Portfolio Application Infrastructure'

Resources:
  PortfolioBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub 'rhulani-portfolio-\${AWS::AccountId}'
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: error.html
      PublicAccessBlockConfiguration:
        BlockPublicAcls: false
        BlockPublicPolicy: false
        
  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Origins:
          - DomainName: !GetAtt PortfolioBucket.RegionalDomainName
            Id: S3Origin
            S3OriginConfig:
              OriginAccessIdentity: !Ref OriginAccessIdentity
        Enabled: true
        DefaultRootObject: index.html`
    },
    {
      language: "Machine Learning",
      code: `import torch
import torch.nn as nn
import torch.optim as optim

class PortfolioRecommendationModel(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(PortfolioRecommendationModel, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_size, hidden_size)
        self.fc3 = nn.Linear(hidden_size, output_size)
        self.dropout = nn.Dropout(0.2)
        
    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.dropout(x)
        x = self.fc2(x)
        x = self.relu(x)
        x = self.dropout(x)
        x = self.fc3(x)
        return torch.softmax(x, dim=1)
        
# Training loop
def train_model(model, train_loader, epochs=100):
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    for epoch in range(epochs):
        for batch_idx, (data, target) in enumerate(train_loader):
            optimizer.zero_grad()
            output = model(data)
            loss = criterion(output, target)
            loss.backward()
            optimizer.step()`
    }
  ];

  useEffect(() => {
    const typeCode = () => {
      if (codeIndexRef.current >= codeExamples.length) {
        codeIndexRef.current = 0;
      }

      const currentExample = codeExamples[codeIndexRef.current];
      setCurrentLanguage(currentExample.language);

      if (charIndexRef.current < currentExample.code.length) {
        setCurrentCode(prev => prev + currentExample.code[charIndexRef.current]);
        charIndexRef.current++;
        setTimeout(typeCode, 50); // Typing speed
      } else {
        // Wait before starting next language
        setTimeout(() => {
          setCurrentCode("");
          charIndexRef.current = 0;
          codeIndexRef.current++;
          typeCode();
        }, 3000); // Wait 3 seconds before next language
      }
    };

    typeCode();
  }, []);

  return (
    <div className="relative w-full min-h-screen py-16">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-white mb-6">
          Tech Stack
        </h2>
        <p className="text-gray-300 text-xl max-w-3xl mx-auto">
          I work with cutting-edge technologies to create innovative solutions
        </p>
      </motion.div>

      {/* Code Examples Section - Top Half */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-black bg-opacity-90 rounded-2xl overflow-hidden mx-auto max-w-6xl"
        >
          <div className="p-8">
            {/* Code Header */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-gray-300 ml-3 text-lg font-medium">{currentLanguage}</span>
            </div>
            
            {/* Code Content */}
            <pre className="text-green-400 text-base font-mono overflow-hidden leading-relaxed">
              <code>{currentCode}</code>
              <span className="animate-pulse">|</span>
            </pre>
          </div>
        </motion.div>
      </div>

      {/* Tech Stack 3D Models Section - Bottom Half */}
      <div className="mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Technologies I Master
          </h3>
          <p className="text-gray-400 text-lg">
            Interactive 3D representations of my technical expertise
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-row flex-wrap justify-center gap-12 max-w-7xl mx-auto"
        >
          {technologies.map((technology, index) => (
            <motion.div
              key={technology.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-32 h-32 flex flex-col items-center"
            >
              <div className="w-full h-full">
                <BallCanvas icon={technology.icon} />
              </div>
              <p className="text-white text-sm mt-3 font-medium text-center">
                {technology.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
