# 7-State Process Architecture

An interactive, 3D WebGL diorama that visualizes the standard 7-State Operating System process cycle. 

## 🚀 Live Deployment
**[View the Deployment Here](https://7-state-process-simulation.vercel.app/)** 

---

## 📖 About the Project

Traditional flowcharts for OS Process Modeling can be dry. The **Silicon Metropolis** transforms this concept into an interactive, cyberpunk-inspired 3D motherboard environment. This project uses React, `@react-three/fiber`, and heavily adheres to **Supabase's core design system** for its pristine dark-mode UX overlay.

As a process object navigates through its lifecycle, users explore 7 different physical locations on the board:
- **NEW**: The Forge / Ingestion Node
- **READY**: The Memory Grid / RAM Buffer
- **RUNNING**: The CPU Core / The Monolith
- **BLOCKED**: The I/O Docks 
- **SUSPEND_READY**: Cold Storage / Disk Swap
- **SUSPEND_BLOCKED**: The Quarantine / Deep Wait
- **TERMINATED**: The Archive / Dissolution Stream

## 🛠️ Technology Stack
- **Framework**: React 19 via Vite
- **3D Rendering**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS v4 

## 💻 Local Execution

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.
