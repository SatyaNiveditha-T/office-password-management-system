# Office Password Management System - Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- SQL Server 2019 or later
- SQL Server Management Studio (SSMS)
- npm or yarn package manager

## Database Setup (SSMS)

### Step 1: Create Database and Schema
1. Open **SQL Server Management Studio**
2. Connect with SQL Server Authentication using credentials from `.env`
3. Open and execute `backend/sql/database.sql` to create the database
4. Execute `backend/sql/tables.sql` to create tables and schema
5. (Optional) Execute `backend/sql/sampledata.sql` to add sample test data

### Step 2: Update Connection String
Update `backend/.env` with your SQL Server details:
```
DB_SERVER=YOUR_MACHINE_NAME (or localhost\SQLEXPRESS for named instance)
DB_PORT=1433
DB_NAME=OfficePasswordDB
DB_USER=sa
DB_PASSWORD=YourPassword
```

### Step 3: Create Admin User
Navigate to backend directory and run:
```bash
node utils/createAdmin.js
```
This creates an admin account with credentials:
- Email: `admin@office.com`
- Password: `Admin@123`

## Backend Setup

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Environment
Ensure `.env` file is properly configured with:
- Database credentials
- JWT_SECRET (for token generation)
- PORT (default: 5000)

### Step 3: Start Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

Server will run on `http://localhost:5000`

## Frontend Setup

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Configure Environment
Check `.env.local` has correct backend URL:
```
VITE_BACKEND_URL=http://localhost:5000
```

### Step 3: Start Frontend Development Server
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Running the Application

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Then open your browser to: `http://localhost:5173`

## Default Credentials
- Email: `admin@office.com`
- Password: `Admin@123`

## Troubleshooting

### SQL Server Connection Error
- Verify SQL Server is running
- Check credentials in `.env` file
- Ensure database `OfficePasswordDB` exists
- Check firewall allows port 1433

### Frontend Cannot Connect to Backend
- Ensure backend is running on port 5000
- Check CORS is enabled in `backend/app.js`
- Verify `VITE_BACKEND_URL` in `frontend/.env.local`

### Module Not Found Error
- Run `npm install` in both backend and frontend directories
- Delete `node_modules` and reinstall if persisting

## File Structure
```
├── backend/
│   ├── config/         # Database config
│   ├── controllers/    # API controllers
│   ├── routes/         # API routes
│   ├── models/         # Data models
│   ├── services/       # Business logic
│   ├── middleware/     # Express middleware
│   ├── utils/          # Helper utilities
│   ├── sql/            # Database scripts
│   ├── .env            # Environment config
│   ├── server.js       # Server entry
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/      # React pages
│   │   ├── components/ # React components
│   │   ├── api/        # API client
│   │   ├── App.jsx     # Main component
│   │   └── main.jsx    # Entry point
│   ├── .env.local      # Frontend config
│   └── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - List all users
- `GET /api/users/:userId` - Get user details
- `POST /api/users` - Create new user
- `PUT /api/users/:userId` - Update user
- `DELETE /api/users/:userId` - Delete user

## Notes
- Passwords are hashed using bcrypt
- JWT tokens expire in 1 day
- All responses include success flag and message
- SQL Server uses Windows or SQL Authentication (configured in `.env`)
