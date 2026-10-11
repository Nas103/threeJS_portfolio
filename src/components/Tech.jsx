import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BallCanvas, KeepAlive } from "./canvas/index.js";
import { SectionWrapper } from "../hoc/index.js";
import { technologies } from "../constants/index.js";
import { styles } from "../styles.js";
import { textVariant } from "../utils/motion.js";

const codeExamples = [
  {
    language: "Python",
    code: `class VoiceAgent:
    def __init__(self, client):
        self.client = client
        self.conversation = []

    def handle(self, transcript):
        # Route real customer workflows
        intent = self.classify(transcript)
        return self.execute(intent)`            },
  {
    language: "TypeScript",
    code: `interface ApiResponse<T> {
  data: T;
  success: boolean;
}

async function syncWebhook<T>(url: string, payload: T) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.status === 200;
}`            },
  {
    language: "Node.js",
    code: `const express = require("express");
const app = express();

app.post("/webhook", (req, res) => {
  const { event, data } = req.body;
  // Trigger agent workflow
  workflow.emit(event, data);
  res.sendStatus(200);
});

app.listen(3000);`            },
  {
    language: "PostgreSQL",
    code: `CREATE TABLE voice_sessions (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    transcript TEXT,
    intent VARCHAR(50),
    resolved_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_intent ON voice_sessions (intent);`            },
  {
    language: "React",
    code: `import { Canvas } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";

function TechOrb() {
  const [decal] = useTexture(["/icons/react.svg"]);
  return (
    <Float speed={2} floatIntensity={2}>
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#fff8eb" flatShading />
      </mesh>
    </Float>
  );
}`            },
  {
    language: "Docker",
    code: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]`            },
  {
    language: "AWS",
    code: `# Voice agent infrastructure
Resources:
  VoiceTopic:
    Type: AWS::SNS::Topic
  LambdaHandler:
    Type: AWS::Lambda::Function
    Properties:
      Runtime: python3.12
      Handler: agent.handler
      Events:
        VoiceCall:
          Type: SNS
          Properties:
            Topic: !Ref VoiceTopic`            },
  {
    language: "Machine Learning",
    code: `import torch
import torch.nn as nn

class IntentModel(nn.Module):
    def __init__(self, vocab, hidden):
        super().__init__()
        self.embed = nn.Embedding(vocab, 128)
        self.lstm = nn.LSTM(128, hidden, batch_first=True)
        self.fc = nn.Linear(hidden, 8)

    def forward(self, x):
        h, _ = self.lstm(self.embed(x))
        return torch.softmax(self.fc(h[:, -1]), dim=1)`            },
];

const Tech = () => {
  const [codeIndex, setCodeIndex] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const full = codeExamples[codeIndex].code;
    let chars = 0;
    let timer;

    const tick = () => {
      chars += 1;
      setTyped(full.slice(0, chars));
      if (chars < full.length) {
        timer = setTimeout(tick, 18);
      } else {
        timer = setTimeout(() => {
          setTyped("");
          setCodeIndex((i) => (i + 1) % codeExamples.length);
        }, 3200);
      }
    };

    setTyped("");
    timer = setTimeout(tick, 18);
    return () => clearTimeout(timer);
  }, [codeIndex]);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          <span className='text-gradient font-semibold'>//</span> My stack
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Skills &amp; <span className='text-gradient'>technologies</span>.
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='text-center text-secondary text-[16px] mt-4 max-w-2xl mx-auto'
        >
          Python, JavaScript/TypeScript, React/Next.js, Node.js, SQL, REST APIs
          and modern AI tooling — used end-to-end to ship reliable software.
        </motion.p>
      </motion.div>

      <div className='mt-14 glass gradient-border rounded-2xl overflow-hidden max-w-5xl mx-auto'>
        <div className='flex items-center gap-2 px-6 py-4 border-b border-white/5'>
          <span className='h-3 w-3 rounded-full bg-red-500/80' />
          <span className='h-3 w-3 rounded-full bg-yellow-500/80' />
          <span className='h-3 w-3 rounded-full bg-green-500/80' />
          <span className='ml-3 text-[13px] text-secondary font-medium'>
            {codeExamples[codeIndex].language}
          </span>
        </div>
        <pre className='p-6 text-[13.5px] leading-relaxed font-mono overflow-hidden text-gradient-orange min-h-[240px]'>
          <code>{typed}</code>
          <span className='text-white animate-pulse'>|</span>
        </pre>
      </div>

      <div className='mt-16'>
        <div className='flex flex-row flex-wrap justify-center gap-6 max-w-7xl mx-auto'>
          {technologies.map((technology, index) => (
            <motion.div
              key={technology.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 7) * 0.08 }}
              className='w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center'
            >
              <div className='w-full h-full'>
                <KeepAlive
                  placeholder={
                    <div className='w-full h-full flex items-center justify-center'>
                      <img
                        src={technology.icon}
                        alt={technology.name}
                        className='w-2/3 h-2/3 object-contain drop-shadow-[0_0_18px_rgba(139,92,246,0.45)]'
                      />
                    </div>
                  }
                >
                  <BallCanvas icon={technology.icon} />
                </KeepAlive>
              </div>
              <p className='text-white text-[12px] sm:text-[13px] mt-2 font-medium text-center'>
                {technology.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");