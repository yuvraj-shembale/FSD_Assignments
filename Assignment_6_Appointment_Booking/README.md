# Assignment 6: Appointment Booking (Local Edition)

This is a local-only online appointment booking application built using Node.js and Express. It features a zero-setup database which saves data directly to your computer.

## ✨ New Features
- **Zero-Setup Database**: No database server needed. Data is stored locally in `appointment.json`.
- **Medical Booking UI**: A clean, professional web interface to book and manage appointments.
- **Instant Connection**: No more "Connection Refused" errors!

## 🚀 How to Run
1.  Open a terminal in this folder (`Assignment_6_Appointment_Booking`).
2.  Run `npm start`. (Ensures all services start automatically).
3.  Open your browser and navigate to: **[http://localhost:4000](http://localhost:4000)**

## 📋 API Details
- `GET /api/appointments`: Fetch all appointments from the local JSON file.
- `POST /api/appointments`: Create a new appointment record.
- `PATCH /api/appointments/:id`: Update appointment status (e.g., Confirm or Cancel).

## 📂 File Structure
- `local-db.js`: Handles data persistence using local files.
- `public/index.html`: The professional booking interface.
- `appointment.json`: Your local database file.
