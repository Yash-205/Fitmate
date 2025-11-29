# FitMate - Fitness Coaching Platform

A full-stack fitness coaching platform built with React, TypeScript, Express, and MongoDB.

## 📁 Project Structure

```
Fitmate/
├── client/          # Frontend (Vite + React + TypeScript)
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── server/          # Backend (Express + MongoDB + TypeScript)
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
└── package.json     # Root workspace config
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Install root dependencies:**
```bash
npm install
```

2. **Install client dependencies:**
```bash
cd client
npm install
cd ..
```

3. **Install server dependencies:**
```bash
cd server
npm install
cd ..
```

### Running the Application

**Option 1: Run both client and server together (recommended)**
```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 (Client):
```bash
npm run dev:client
# or
cd client && npm run dev
```

Terminal 2 (Server):
```bash
npm run dev:server
# or
cd server && npm run dev
```

### Environment Variables

**Server (.env):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitmate
NODE_ENV=development
```

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS (if applicable)

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- TypeScript

## 📝 Available Scripts

### Root Level
- `npm run dev` - Run both client and server
- `npm run dev:client` - Run only client
- `npm run dev:server` - Run only server
- `npm run build` - Build both client and server

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server
- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript
- `npm start` - Run compiled JavaScript

## 🌐 API Endpoints

- `GET /api/health` - Health check endpoint

## 📦 Node Modules

Each folder (client/server) has its own `node_modules`:
- **client/node_modules** - Frontend dependencies
- **server/node_modules** - Backend dependencies
- **node_modules** (root) - Shared dev tools (concurrently)

This keeps dependencies isolated and allows independent deployment.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test both client and server
4. Submit a pull request

## 📄 License

MIT