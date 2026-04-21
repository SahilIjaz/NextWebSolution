# NextWeb Solutions - Backend API

Express.js backend for Software House Website with PostgreSQL database and JWT authentication.

## Project Structure

```
src/
├── server.js              # Main Express app
├── config/
│   └── database.js        # PostgreSQL connection
├── controllers/
│   ├── authController.js  # Auth logic
│   ├── contactController.js
│   └── portfolioController.js
├── routes/
│   ├── authRoutes.js
│   ├── contactRoutes.js
│   └── portfolioRoutes.js
├── middleware/
│   └── auth.js            # JWT verification
└── utils/
    ├── jwt.js             # Token generation/verification
    └── validation.js      # Request validation
db/
└── schema.sql             # Database schema
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database
- Update `.env` with PostgreSQL credentials
- Create database: `createdb nextweb_db`
- Run schema: `psql -U postgres -d nextweb_db -f db/schema.sql`

### 3. Start Server
```bash
npm run dev    # Development with nodemon
npm start      # Production
```

Server runs on `http://localhost:5000`

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Contact
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact` - Get all contacts (protected)
- `GET /api/contact/:id` - Get contact by ID (protected)

### Portfolio
- `POST /api/portfolio` - Create project (protected)
- `GET /api/portfolio` - Get all projects
- `GET /api/portfolio/:id` - Get project by ID
- `PUT /api/portfolio/:id` - Update project (protected)
- `DELETE /api/portfolio/:id` - Delete project (protected)

## Environment Variables
See `.env.example` for required variables.

## Next Steps
1. Setup PostgreSQL database
2. Install dependencies: `npm install`
3. Configure `.env` file
4. Run database schema
5. Start development server: `npm run dev`
