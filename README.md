<div align="center">

# 🚀 EduOrbit

### AI-Powered Scholarship & University Guidance Platform

*Find the right scholarship. Choose the right university. Plan your journey — all in one orbit.*

<br />

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

[🌐 Live Demo](https://edu-orbit-m7l54tbkd-abirahmad30905-9301.vercel.app) · [🐛 Report Bug](https://github.com/abirhosen30/edu-orbit/issues) · [✨ Request Feature](https://github.com/abirhosen30/edu-orbit/issues)

</div>

---

## 📑 Table of Contents

- [Live Demo](#-live-demo)
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🌐 Live Demo

🔗 **Deployed on Vercel:** [https://edu-orbit-m7l54tbkd-abirahmad30905-9301.vercel.app](https://edu-orbit-m7l54tbkd-abirahmad30905-9301.vercel.app)

---

## 📖 About the Project

**EduOrbit** is a web platform that helps students discover scholarships and universities that actually fit their profile. Instead of searching through hundreds of scattered websites, students can explore opportunities, get AI-powered guidance, and keep their applications organized in one place.

### 🎯 Problem it solves

- Scholarship information is scattered and hard to verify
- Students don't know which universities match their grades, budget, and goals
- Deadlines and requirements are easy to miss
- Personal guidance is expensive or unavailable

### 💡 Our solution

A single, smart platform that **searches, recommends, and guides** — powered by AI.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🎓 **Scholarship Explorer** | Browse and filter scholarships by country, degree level, and funding type |
| 🏛️ **University Finder** | Compare universities by program, location, tuition, and requirements |
| 🤖 **AI Guidance** | Get personalized recommendations based on your academic profile |
| 🔐 **Secure Authentication** | Sign up, log in, and manage your own profile safely |
| 📌 **Save & Track** | Bookmark scholarships and universities to review later |
| ⏰ **Deadline Awareness** | Stay on top of important application dates |
| 📱 **Responsive Design** | Works smoothly on mobile, tablet, and desktop |

> 📝 *Edit this table to match the features you have actually built.*

---

## 🛠 Tech Stack

**Frontend**

- ⚛️ React
- 🎨 Tailwind CSS
- 🔀 React Router

**Backend**

- 🟢 Node.js
- 🚂 Express.js
- 🔑 JWT / Authentication

**Database**

- 🍃 MongoDB (Mongoose)

**AI**

- 🧠 AI API integration for personalized guidance

**Deployment**

- ▲ Vercel (client) · your server host (API)

---

## 📂 Project Structure

```bash
edu-orbit/
├── client/                     # Frontend (React)
│   ├── public/
│   └── src/
│       ├── assets/             # Images, icons, fonts
│       ├── components/         # Reusable UI components
│       ├── pages/              # Route-level pages
│       ├── layouts/            # Shared layouts (Navbar, Footer)
│       ├── hooks/              # Custom React hooks
│       ├── services/           # API calls
│       ├── context/            # Auth & global state
│       ├── App.jsx
│       └── main.jsx
│
├── server/                     # Backend (Node + Express)
│   ├── config/                 # DB & environment config
│   ├── controllers/            # Request handlers
│   ├── middleware/             # Auth, error handling
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API routes
│   ├── utils/                  # Helper functions
│   └── index.js
│
├── .gitignore
├── README.md
└── package.json
```

> 📝 *Adjust folder names if your repo is organized differently.*

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/abirhosen30/edu-orbit.git
cd edu-orbit
```

**2. Install dependencies**

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

**3. Set up environment variables**

Create a `.env` file in both `client/` and `server/` (see the section below).

**4. Run the project**

```bash
# Start the backend (from /server)
npm run dev

# Start the frontend (from /client)
npm run dev
```

Open **http://localhost:5173** in your browser. 🎉

---

## 🔑 Environment Variables

**`server/.env`**

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key
CLIENT_URL=http://localhost:5173
```

**`client/.env`**

```env
VITE_API_URL=http://localhost:5000
```

> ⚠️ Never commit your `.env` files. Make sure they are listed in `.gitignore`.

---

## 📜 Available Scripts

| Command | Where | What it does |
|---|---|---|
| `npm run dev` | client / server | Starts the development server |
| `npm run build` | client | Builds the app for production |
| `npm run preview` | client | Previews the production build |
| `npm start` | server | Runs the server in production mode |

---

## 🖼 Screenshots

<div align="center">

| Home | Scholarships |
|---|---|
| ![Home](./screenshots/home.png) | ![Scholarships](./screenshots/scholarships.png) |

| University Finder | AI Guidance |
|---|---|
| ![Universities](./screenshots/universities.png) | ![AI](./screenshots/ai.png) |

</div>

> 📝 *Create a `screenshots/` folder and add your own images.*

---

## 🗺 Roadmap

- [x] Project setup and authentication
- [x] Scholarship & university listings
- [ ] AI-powered recommendation engine
- [ ] Application tracker dashboard
- [ ] Email deadline reminders
- [ ] Admin panel for managing listings
- [ ] Multi-language support (বাংলা / English)

See the [open issues](https://github.com/abirhosen30/edu-orbit/issues) for the full list of proposed features.

---

## 🤝 Contributing

Contributions make the open-source community amazing. Any contribution you make is **greatly appreciated**!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m "Add some AmazingFeature"`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👨‍💻 Author

<div align="center">

**Abir Hosen**

[![GitHub](https://img.shields.io/badge/GitHub-abirhosen30-181717?style=for-the-badge&logo=github)](https://github.com/abirhosen30)

⭐ If you like this project, give it a star — it motivates me a lot!

</div>
