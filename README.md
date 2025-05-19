# Finella Backend

**A robust, real-time self-management productivity API.** Handles user authentication, notes, to‑dos, salary entries, and automation scheduling with WebSocket notifications.

---

## 📌 Table of Contents

- [Finella Backend](#finella-backend)
  - [📌 Table of Contents](#-table-of-contents)
  - [About Finella Backend](#about-finella-backend)
  - [Live Demo](#live-demo)
  - [Key Features](#key-features)
  - [Architecture \& Flow](#architecture--flow)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Clone \& Install](#clone--install)
    - [Environment Variables](#environment-variables)
    - [Development](#development)
    - [Production](#production)
  - [API Endpoints](#api-endpoints)
  - [Real-Time Automations](#real-time-automations)
  - [Project Structure](#project-structure)
  - [Deployment](#deployment)
  - [License](#license)
  - [Author](#author)

---

## About Finella Backend

The Finella Backend powers the Finella Frontend by providing RESTful APIs and WebSocket channels for real-time updates. Core responsibilities include:

- **User Auth & Security**: Email verification, JWT issuance, password reset, and account lockout
- **Data Management**: CRUD operations for Notes, To‑Dos, Balance Entries, and Workplaces
- **Automation Scheduler**: Cron-driven tasks that emit real-time notifications via Socket.IO
- **Scalability**: Modular, feature-based code organization for easy maintenance and extension

---

## Live Demo

[🔗 Finella Backend App (on Render)](https://self-manager-backend.onrender.com)

---

## Key Features

- **JWT-Based Authentication**
- **Role Management** and **Permission** enforcement
- **Joi Validation** middleware for request payloads
- **Email Service** for verification and password resets
- **Socket.IO** integration for push notifications
- **Cron Scheduler** for automations and reminders
- **Centralized Error Handling** with consistent JSON responses

---

## Architecture & Flow

1. **Modular Feature Folders**: Each domain (Auth, Notes, ToDos, BalanceEntries, Workplaces, Automations) lives in its own `src/feature` folder, containing models, controllers, routes, and Joi schemas.
2. **Express Server**: `src/server.js` configures middleware (CORS, JSON parsing, logging, validation, error handlers) and mounts routers.
3. **Authentication**:
   - **SignUp**: Validates input → creates User → sends email token
   - **Verify Email**: Confirms token → activates account
   - **Login**: Checks lockout state → issues JWT containing only `userId` → returns `role` in response
   - **Password Reset**: Issues reset token → updates password on verification
4. **JWT Validation**: `common/middlewares/auth.mw.js` verifies tokens on HTTP and Socket handshakes, attaches `req.user`.
5. **Data Routes**: Protected routes for Notes, ToDos, BalanceEntries, and Workplaces use REST conventions and Joi validation.
6. **Automations**:

   - A scheduled service (`src/services/automation.service.js`) queries due automations every minute
   - Emits events via Socket.IO to the specific user room
   - Updates `lastTriggeredAt` to avoid duplicate triggers
7. **Error Handling**: NotFound and Error middleware in `common/middlewares` catch 404s and format all errors into JSON with proper status codes.

---

## Tech Stack

- **Node.js** (v16+)
- **Express**
- **Mongoose** (MongoDB ODM)
- **Socket.IO**
- **jsonwebtoken**
- **Joi** for validation
- **Nodemailer** for email delivery
- **Node-Cron** (or built-in `cron`) for scheduled tasks
- **Dotenv** for environment configuration

---

## Prerequisites

- **Node.js** ≥ 16
- **npm** or **yarn**
- **MongoDB** instance (local or Atlas)
- SMTP credentials for sending emails

---

## Getting Started

### Clone & Install

```bash
git clone https://github.com/yehonatan604/Finella-backend.git
cd Finella-backend
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```ini
## Server
PORT=8080
NODE_ENV=dev
API_URL="http://localhost:8080"

## JWT
JWT_SECRET="your_secret_key"

## Database
MONGO_URI=mongodb://localhost:27017/appName
ATLAS_URI=<your atlasDb URI>

## Mail
MAIL_PROVIDER="gmail"
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465

MAIL_USER="your_gmail_user@gmail.com"
MAIL_PASS="your google app password"

MAIL_SECRET="your_secret_key"

## Security
SECURITY_KEY="your_secret_key"
PASSWORD_RESET_KEY="your_secret_key"
```

### Development

```bash
npm run dev
```

- Uses **nodemon** for hot-reloading

### Production

```bash
npm run build   # if using transpilation
npm start       # starts the server in production mode
```

---

## API Endpoints

[🔗 Finella API Documentation](https://self-manager-backend.onrender.com)

---

## Real-Time Automations

- **Socket Namespace**: `io.of('/')` authenticates via JWT handshake
- **Rooms**: Each user joins room named by `userId`
- **Events**:
  - `automation-triggered`: Emitted when a scheduled automation due date is reached
  - `todo-alert`: Emitted on to-do deadline based on lockout and status
- **Client** subscribes to these events to display notifications in real time.

---

## Project Structure

```bash
src/
├── common/            # Shared middleware, services, and utilities
│   ├── extensions/    # Class Extensions
│   ├── middlewares/   # Error, validation, auth, etc.
│   ├── models/        # Shared Db Schemas
│   ├── router/        # Central router configuration
│   ├── validations/   # Shared Joi Validations
│   ├── services/      # env, email, JWT, socket setup, etc.
├── feature/           # Feature modules
│   ├── models/        # Feature Db Schemas
│   ├── routes/        # Feature domain logic and routes
│   ├── services/      # Feature business logic
│   ├── validations/   # Feature Joi Validations
├── server.js          # Express app setup and startup
└── .env               # Environment variables (not committed)
```

---

## Deployment

- Deploy on platforms like **Heroku**, **Render**, or **DigitalOcean App Platform**
- Ensure environment variables are set in production
- Use a process manager (PM2) for clustering and auto-restarts

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Author

Developed by [Yehonatan Moravia](https://github.com/yehonatan604) 🎉
