# Rhulani Mashala — Portfolio

An interactive 3D portfolio for **Rhulani Mashala**, a Software Engineer & AI Engineer. It pairs React Three Fiber scenes with full-bleed WebGL shader backgrounds, animated sections, and a small AI assistant.

Live demo: https://nas103.github.io/threeJS_portfolio/

## Features

- **Hero** with a full-bleed WebGL **Ribbon Glow** background (framer-motion entrance).
- **Projects** section backed by its own Ribbon Glow shader, with tilted 3D cards.
- **3D scenes** via React Three Fiber + Drei (desktop computer model, planet, tech balls, stars).
- **Graceful WebGL fallback** — every canvas is wrapped in an error boundary, so devices without WebGL get static fallbacks instead of a blank page.
- **AI Assistant** chat widget (CV knowledge base + speech input/output) mounted globally.
- **Contact** form powered by EmailJS.
- Responsive layout, glassmorphism design tokens, custom Tailwind animations.

## Tech Stack

- **React 18** + **Vite 6**
- **@react-three/fiber** / **@react-three/drei** — 3D scenes and GLTF models
- **framer-motion** — scroll and entrance animations
- **Tailwind CSS** — design system and theming
- **react-tilt**, **react-vertical-timeline-component** — project cards and experience timeline
- **@emailjs/browser** — contact form delivery
- **gh-pages** — deployment

## Getting Started

```bash
git clone https://github.com/Nas103/threeJS_portfolio.git
cd threeJS_portfolio
npm install
npm run dev
```

Then open the printed URL (defaults to `http://localhost:5173/threeJS_portfolio/`).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build and publish to GitHub Pages |

## Configuration

Copy `.env` values for the contact form (EmailJS):

```
VITE_APP_EMAILJS_SERVICE_ID=...
VITE_APP_EMAILJS_TEMPLATE_ID=...
VITE_APP_EMAILJS_PUBLIC_KEY=...
```

## Project Structure

```
src/
├── assets/            # icons, tech logos, project thumbnails
├── components/        # page sections (Hero, Works, Contact, ...)
│   └── canvas/        # React Three Fiber scenes + RibbonGlow (WebGL)
├── constants/         # CV data: projects, experience, education, nav, ...
├── hoc/               # section wrapper
├── utils/             # framer-motion variants
├── styles.js          # shared Tailwind class strings
└── App.jsx            # page assembly
```

## Author

**Rhulani Mashala**

- GitHub: https://github.com/Nas103
- Email: nascode.dev@gmail.com
