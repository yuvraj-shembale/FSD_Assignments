const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Feedback = require('./models/Feedback');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentFeedbackDB')
.then(() => console.log('Successfully connected to MongoDB.'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
// 1. Get all feedback
app.get('/api/feedback', async (req, res) => {
    try {
        const fetchFeedback = await Feedback.find().sort({ createdAt: -1 });
        res.json(fetchFeedback);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Add new feedback
app.post('/api/feedback', async (req, res) => {
    const { studentName, course, rating, comments } = req.body;
    
    if(!studentName || !course || !rating) {
        return res.status(400).json({ message: "Please provide all required fields."});
    }

    try {
        const feedback = new Feedback({
            studentName,
            course,
            rating,
            comments
        });

        const newFeedback = await feedback.save();
        res.status(201).json(newFeedback);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('API is running.');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
