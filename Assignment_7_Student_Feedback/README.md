# Assignment 7: Student Feedback Review System

This assignment encompasses building a full-stack MERN application (MongoDB, Express, React, Node.js). It's a Student Feedback Review System where students can submit reviews for courses and see them live.

## Folder Structure
- `/backend`: The Express.js server and Mongoose models.
- `/frontend`: The React.js frontend bootstrapped with Vite.

## Backend Setup
1. CD into `backend`
2. Run `npm install`
3. Run `npm start` (or `node server.js`) to start the server on port 5000. Ensure MongoDB is running locally.

## Frontend Setup
1. CD into `frontend`
2. Run `npm install`
3. Run `npm run dev` to start the frontend.
4. Navigate to the localhost URL provided by Vite (usually `http://localhost:5173`).

## Usage
The React app connects to `http://localhost:5000/api/feedback` to post and fetch reviews. It uses functional components and hooks (`useState`, `useEffect`) to manage the state of the form and the list of feedbacks.
