const mongoose = require('../local-db');

const feedbackSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
