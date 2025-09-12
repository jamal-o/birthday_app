# Birthday Reminder App

A simple Node.js web application to register users and send automated birthday reminder emails. Built with Express, MongoDB, and Handlebars, this app allows users to register with their name, email, and date of birth. The system sends out birthday greetings via email automatically every day.

---

## Features

- User registration with validation
- List all registered users
- Automated daily birthday email reminders using cron jobs
- Responsive UI with Handlebars templates
- Environment-based configuration (development/production)
- MongoDB for persistent storage

---

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- express-handlebars
- nodemailer
- node-cron
- dotenv

---

## Data Model

**User**

| Field        | Type   | Description                       |
|--------------|--------|-----------------------------------|
| username     | String | Required, 2-50 chars              |
| email        | String | Required, unique, valid email     |
| dateOfBirth  | Date   | Required, must be in the past     |
| createdAt    | Date   | Auto-set on creation              |
| lastSentAt   | Date   | Last birthday email sent timestamp|

See [`models/user.js`](models/user.js) for full schema.

---

## API Endpoints

| Method | Endpoint    | Description                |
|--------|------------|----------------------------|
| GET    | `/`        | Render registration form   |
| POST   | `/users`   | Register a new user        |
| GET    | `/users`   | List all registered users  |

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB instance (local or Atlas)

### Installation

1. **Clone the repository**
   ```sh
   git clone <repo-url>
   cd birthday_app