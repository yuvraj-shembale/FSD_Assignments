# Assignment 5: College Website Backend

This directory contains the Node.js and Express backend for a functional college website, connected to a MongoDB database (NoSQL) as per Assignment 5's instructions.

## What is this?
It's a RESTful API built with Express and Mongoose. It defines a `Student` schema to store student records (Name, Roll Number, Department, Year). 

## Endpoints
- `GET /` - Basic welcome message.
- `GET /api/info` - Returns generic college information.
- `GET /api/students` - Fetches all enrolled students from the database.
- `POST /api/students` - Adds a new student record to the database.

## Prerequisites
You need Node.js and MongoDB installed on your system.

## Setup & Running
1. Open a terminal in this folder (`Assignment_5_College_Website`).
2. Run `npm install` (if the `node_modules` folder isn't there) to grab all dependencies (Express, Mongoose, Cors, Dotenv).
3. Ensure your local MongoDB server is running (usually on `mongodb://127.0.0.1:27017`).
4. Run `node server.js` to start the backend. 
5. You should see "Server is running on port 5000" and "Successfully connected to MongoDB" in the console.

You can then test the API using tools like Postman or simply by navigating to `http://localhost:5000/api/info` in your browser.
