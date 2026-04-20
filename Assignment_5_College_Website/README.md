# Assignment 5: College Website (Local Edition)

This is a functional college website dashboard with a zero-setup local database. It uses Node.js and Express to manage student records.

## ✨ New Features
- **Zero-Setup Local Database**: No MongoDB or Cloud setup required! Data is saved automatically in `student.json`.
- **Modern Dashboard**: A complete web interface to view and manage student data.
- **Auto-Running**: No configuration needed; just start and go.

## 🚀 How to Run
1.  Open a terminal in this folder (`Assignment_5_College_Website`).
2.  Run `npm start`.
3.  Open your browser and navigate to: **[http://localhost:5001](http://localhost:5001)**

## 📊 Endpoints
- `GET /` - Serves the web dashboard.
- `GET /api/info` - Returns college information.
- `GET /api/students` - Fetches all students from the local file.
- `POST /api/students` - Adds a new student record to the local file.

## 📂 File Structure
- `server.js`: The Express server.
- `local-db.js`: The magic that handles local data storage.
- `public/index.html`: The modern dashboard UI.
- `student.json`: Where your data is actually saved!
