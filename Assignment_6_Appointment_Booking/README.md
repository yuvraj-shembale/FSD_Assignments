# Assignment 6: Appointment Booking Backend

This is the backend for an Online Appointment Booking Application built using Node.js, Express, and MongoDB.

## Details
This application gives users the ability to manage appointments (for example, booking a doctor's appointment). It provides full RESTful routing.

### Data Model (`Appointment`)
- `patientName`: String
- `doctorName`: String
- `appointmentDate`: Date
- `reason`: String
- `status`: 'Pending', 'Confirmed', 'Completed', or 'Cancelled'

### API Endpoints
- `GET /api/appointments`: Fetch all upcoming appointments sorted by date.
- `POST /api/appointments`: Create a new appointment. Requires a JSON body.
- `PATCH /api/appointments/:id`: Update an appointment's status (e.g. marking it as Confirmed).

## How to execute
1. CD into this directory.
2. Ensure you have run `npm install` to download Express and Mongoose.
3. Start your local MongoDB server.
4. Run `node server.js`
5. The API will be accessible on port `4000`. You can use tools like Postman to POST new appointments.
