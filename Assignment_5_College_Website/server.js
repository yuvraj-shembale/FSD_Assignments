const express = require('express');
const mongoose = require('./local-db');
const cors = require('cors');
require('dotenv').config();

const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json()); // Parse JSON bodies

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/collegeDB')
.then(() => console.log('Successfully connected to MongoDB.'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
// 1. Get all students
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Add a new student
app.post('/api/students', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        rollNumber: req.body.rollNumber,
        department: req.body.department,
        year: req.body.year
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. Simple College Info endpoint
app.get('/api/info', (req, res) => {
    res.json({
        collegeName: "Tech University",
        location: "Pune, India",
        established: 1995,
        departments: ["Computer Engineering", "IT", "Mechanical", "Civil"]
    });
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the College Website API. Available endpoints: /api/students, /api/info');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
