const express = require('express');
const mongoose = require('./local-db');
const cors = require('cors');
require('dotenv').config();

const Appointment = require('./models/Appointment');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/appointmentDB')
.then(() => console.log('Connected to MongoDB Database: appointmentDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// --- Routes --- //

// 1. Get all appointments
app.get('/api/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ appointmentDate: 1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Book a new appointment
app.post('/api/appointments', async (req, res) => {
    const { patientName, doctorName, appointmentDate, reason } = req.body;
    
    if (!patientName || !doctorName || !appointmentDate || !reason) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const newAppointment = new Appointment({
            patientName,
            doctorName,
            appointmentDate,
            reason
        });
        
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 3. Update appointment status (e.g., Confirm or Cancel)
app.patch('/api/appointments/:id', async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status },
            { new: true }
        );
        if (!updatedAppointment) return res.status(404).json({ error: "Appointment not found" });
        res.json(updatedAppointment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4. Default welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Appointment Booking API. Use /api/appointments for functionality.');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Appointment Booking Server running on http://localhost:${PORT}`);
});
