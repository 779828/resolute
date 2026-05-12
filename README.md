# Resolute - Student Registration System

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **Encryption:** AES-256-CBC (2-level encryption)

## How Encryption Works

This application implements a 2-level encryption system:

1. **Frontend (Level 1):** Before sending data to the backend, sensitive fields are encrypted using AES-256-CBC with a frontend secret key.
2. **Backend (Level 2):** The backend receives the already-encrypted data and applies a second layer of AES-256-CBC encryption with a different secret key before storing in MongoDB.

### Data Flow:
- **Create/Update:** Plain text → Frontend encrypts (Level 1) → Backend encrypts (Level 2) → Stored in MongoDB
- **Read/Fetch:** MongoDB → Backend decrypts Level 2 → Sends Level 1 encrypted data → Frontend decrypts Level 1 → Plain text displayed

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas connection string)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repo-url>
cd resolute
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resolute
ENCRYPTION_KEY=your-backend-32-char-secret-key!
ENCRYPTION_IV=your-16-char-iv!!
```

Start the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_ENCRYPTION_KEY=your-frontend-32-char-secret-key!
VITE_ENCRYPTION_IV=your-16-char-iv!!
```

Start the frontend:
```bash
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/register | Create a new student |
| GET | /api/students | Get all students |
| PUT | /api/student/:id | Update a student |
| DELETE | /api/student/:id | Delete a student |

## Features

- Login form with email & password validation
- Student Registration form with fields: Full Name, Email, Phone, DOB, Gender, Address, Course, Password
- Full CRUD operations on student records
- 2-level AES encryption for data security
