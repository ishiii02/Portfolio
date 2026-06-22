# Nash Francis — Professional Portfolio Website

> A modern, dark-themed, full-stack developer portfolio built with Node.js, Express, and EJS using strict MVC architecture.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey)](https://expressjs.com)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## 🤖 AI-Assisted Development

This project was architected and scaffolded with the assistance of **Claude Sonnet 4.6** by Anthropic.

| Phase | Claude's Role |
|-------|---------------|
| Phase 1 | Requirement analysis, tech stack recommendation, feature scoping |
| Phase 2 | Full MVC architecture design, data flow diagrams, security planning |
| Phase 3 | Project scaffolding, Git strategy, environment configuration |
| Phase 4 | Base layout, UI design system, component planning |
| Phase 5 | Core page implementation, MVC wiring |
| Phase 6 | Contact system, validation, email integration |
| Phase 7 | Performance optimization, SEO, deployment readiness |

**Other Tools Used:**
- **GitHub Copilot** — Code completion during development
- **Tailwind CSS IntelliSense** — Class suggestions in VS Code

> AI was used as an architectural and implementation assistant. All content, design decisions, and final code are owned by Nash Francis.

---

## 🏗️ Architecture

This project strictly follows the **Model-View-Controller (MVC)** pattern:

```
Request → Router → Controller → Model → View → Response
```

| Layer | Location | Responsibility |
|-------|----------|----------------|
| **Model** | `/models/` + `/data/` | Data shape, retrieval from JSON files |
| **View** | `/views/` | EJS templates, rendering HTML |
| **Controller** | `/controllers/` | Request handling, data orchestration |
| **Router** | `/routes/` | URL-to-controller mapping |
| **Service** | `/services/` | Business logic (email, validation) |
| **Middleware** | `/middleware/` | Security, rate limiting, error handling |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| EJS | Server-side HTML templating |
| Tailwind CSS | Utility-first responsive styling |
| AOS | Animate-on-scroll effects |
| GSAP (light) | Hero section animation |
| Vanilla JS | Client-side interactivity |
| Font Awesome | Icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js 18+ | JavaScript runtime |
| Express.js 4.x | Web framework + routing |
| Nodemailer | Contact form email delivery |
| express-validator | Input validation + sanitization |
| Helmet.js | HTTP security headers |
| express-rate-limit | Spam + DDoS protection |
| Morgan | HTTP request logging |
| dotenv | Environment variable management |

### Data
| Stage | Technology | Reason |
|-------|------------|--------|
| Launch | JSON flat files (`/data/`) | Zero setup, easy to edit |
| Future | PostgreSQL / Firebase | When blog or CMS is added |

### Deployment
| Option | Use Case |
|--------|---------|
| Vercel | Recommended — zero-config, Git-integrated |
| Render | Alternative for full Node.js server |
| Railway | Alternative with free tier |

---

## 📁 Folder Structure

```
nash-portfolio/
├── app.js                    # Express app (middleware + routes)
├── server.js                 # HTTP server entry point
├── .env                      # Environment variables (not committed)
├── .env.example              # Environment variable template
├── .gitignore
├── README.md
├── package.json
│
├── config/
│   ├── app.config.js         # Port, env, owner info
│   └── mailer.config.js      # SMTP configuration
│
├── routes/
│   ├── index.js              # Aggregates all routes
│   ├── home.routes.js
│   ├── about.routes.js
│   ├── skills.routes.js
│   ├── projects.routes.js
│   ├── experience.routes.js
│   └── contact.routes.js
│
├── controllers/
│   ├── home.controller.js
│   ├── about.controller.js
│   ├── skills.controller.js
│   ├── projects.controller.js
│   ├── experience.controller.js
│   └── contact.controller.js
│
├── models/
│   ├── project.model.js
│   ├── skill.model.js
│   └── experience.model.js
│
├── data/
│   ├── projects.json         # Project case studies
│   ├── skills.json           # Skill categories
│   └── experience.json       # Work + education timeline
│
├── services/
│   ├── mail.service.js       # Email sending logic
│   └── validation.service.js # Form validation rules
│
├── middleware/
│   ├── security.middleware.js  # Helmet + CSP
│   ├── rateLimit.middleware.js # Rate limiting
│   └── error.middleware.js     # 404 + 500 handlers
│
├── views/
│   ├── layouts/
│   │   └── main.ejs          # Base HTML shell
│   ├── partials/
│   │   ├── head.ejs          # Meta tags, CSS links
│   │   ├── navbar.ejs        # Navigation
│   │   ├── footer.ejs        # Footer
│   │   └── scripts.ejs       # JS includes
│   └── pages/
│       ├── home.ejs
│       ├── about.ejs
│       ├── skills.ejs
│       ├── projects.ejs
│       ├── project-detail.ejs
│       ├── experience.ejs
│       ├── contact.ejs
│       └── errors/
│           ├── 404.ejs
│           └── 500.ejs
│
└── public/
    ├── css/
    │   ├── style.css         # Compiled Tailwind
    │   └── animations.css    # Custom keyframes
    ├── js/
    │   ├── main.js           # Global JS
    │   ├── hero.js           # Hero animation
    │   └── contact.js        # Form UX feedback
    ├── images/
    │   ├── profile/
    │   ├── projects/
    │   └── icons/
    └── files/
        └── nash-francis-cv.pdf
```

---

## ⚙️ Quick Start

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org))
- npm 9+
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Nash-Francis/nash-portfolio.git
cd nash-portfolio

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your SMTP credentials

# 4. Run development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

### Production

```bash
npm start
```

---

## 🔒 Security

| Threat | Mitigation |
|--------|-----------|
| XSS | Helmet CSP + EJS auto-escaping |
| Form spam | Rate limiting + honeypot field |
| Injection | express-validator sanitizes all inputs |
| Sensitive data | `.env` excluded from Git |
| Clickjacking | `X-Frame-Options: DENY` via Helmet |
| Dependencies | Regular `npm audit` |

---

## 🌿 Git Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code only |
| `develop` | Integration branch for features |
| `feature/*` | Individual feature development |
| `fix/*` | Bug fixes |
| `release/*` | Pre-release staging |

**Workflow:**
```
feature/hero-animation → develop → (review) → main
```

---

## 📋 Development Phases

- [x] Phase 1 — Requirement Analysis
- [x] Phase 2 — Architecture Design
- [x] Phase 3 — Project Setup + Git Initialization
- [ ] Phase 4 — Base Layout + UI Foundation
- [ ] Phase 5 — Core Pages (Public Portfolio)
- [ ] Phase 6 — Contact System + Enhancements
- [ ] Phase 7 — Optimization + Deployment Readiness

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```
Add environment variables in Vercel dashboard under **Settings → Environment Variables**.

### Render
1. Connect GitHub repo to Render
2. Build command: `npm install`
3. Start command: `npm start`
4. Add env vars in Render dashboard

---

## 📝 Changelog

### v0.3.0 — Phase 3 (Current)
- Scaffolded full MVC project structure
- Initialized Git repository with branch strategy
- Configured security middleware (Helmet, rate limiting)
- Set up environment variable structure
- Written detailed README

### v0.2.0 — Phase 2
- Completed full architecture design
- Defined data flow, security layers, scalability plan

### v0.1.0 — Phase 1
- Requirement analysis complete
- Tech stack selected: Node.js + Express + EJS + Tailwind

---

## 👤 Author

**Nash Francis**
- GitHub: [@Nash-Francis](https://github.com/Nash-Francis)
- LinkedIn: [linkedin.com/in/nashfrancis](https://linkedin.com/in/nashfrancis)

---

© 2025 Nash Francis. MIT License.
