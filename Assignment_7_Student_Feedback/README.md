# Assignment 7: Student Feedback (Zero-Setup Edition)

This is a full-stack MERN-style application that has been optimized to run 100% locally with zero database setup required.

## 🚀 How to Run (Same Device, No Setup)

### 1️⃣ Step 1: Start the Backend
1.  Open a terminal in the `/backend` folder.
2.  Run: `npm start`
3.  The server will start on port `5000` and use a local `feedback.json` file for storage.

### 2️⃣ Step 2: Start the Frontend
1.  Open a **second** terminal in the `/frontend` folder.
2.  Run: `npm install` (first time only).
3.  Run: `npm run dev`.
4.  Open the URL shown in the terminal (usually `http://localhost:5173`).

---

## 🛠️ Optimization Features
- **Local JSON DB**: Replaced external MongoDB with a local file-based database for zero-setup execution.
- **Root Launcher**: Added an `index.html` at the root with clear instructions.
- **Auto-Sync**: Data persists in `feedback.json` within the backend folder.

## 📂 Folder Structure
- `/backend`: The Node/Express server (optimized with `local-db.js`).
- `/frontend`: The React/Vite application.
- `index.html`: Instruction launchpad for the assignment.
