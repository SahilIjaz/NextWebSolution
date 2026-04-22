# NextWeb Solutions - Backend API

Express.js backend for NextWeb Software House Website with PostgreSQL database and JWT authentication.

## Project Structure

```
src/
├── server.js              # Main Express app
├── config/
│   └── database.js        # PostgreSQL connection
├── controllers/
│   ├── authController.js  # Auth logic
│   ├── contactController.js
│   ├── portfolioController.js
│   ├── testimonialController.js
│   ├── teamController.js
│   └── serviceController.js
├── routes/
│   ├── authRoutes.js
│   ├── contactRoutes.js
│   ├── portfolioRoutes.js
│   ├── testimonialRoutes.js
│   ├── teamRoutes.js
│   └── serviceRoutes.js
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

Server runs on `http://localhost:8000` (configurable via PORT env var)

## Database Schema

### Tables
- **users** - Admin user accounts
- **contacts** - Contact form submissions
- **projects** - Portfolio projects with category filtering
- **testimonials** - Client testimonials with ratings
- **team_members** - Team member profiles
- **services** - Service offerings
- **pricing_plans** - Pricing tiers

## Complete API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Contact Forms
- `POST /api/contact/submit` - Submit contact form (PUBLIC)
- `GET /api/contact` - Get all submissions (PROTECTED)
- `GET /api/contact/:id` - Get submission by ID (PROTECTED)
- `PUT /api/contact/:id/status` - Update submission status (PROTECTED)

### Portfolio / Projects
- `POST /api/portfolio` - Create project (PROTECTED)
- `GET /api/portfolio` - Get all projects with filtering (PUBLIC)
  - Query params: `category`, `limit`, `offset`
- `GET /api/portfolio/:id` - Get project by ID (PUBLIC)
- `PUT /api/portfolio/:id` - Update project (PROTECTED)
- `DELETE /api/portfolio/:id` - Delete project (PROTECTED)

### Testimonials
- `GET /api/testimonials` - Get all testimonials (PUBLIC)
- `POST /api/testimonials` - Create testimonial (PROTECTED)
- `GET /api/testimonials/:id` - Get testimonial by ID (PUBLIC)
- `PUT /api/testimonials/:id` - Update testimonial (PROTECTED)
- `DELETE /api/testimonials/:id` - Delete testimonial (PROTECTED)

### Team Members
- `GET /api/team` - Get all team members (PUBLIC)
- `POST /api/team` - Create team member (PROTECTED)
- `GET /api/team/:id` - Get team member by ID (PUBLIC)
- `PUT /api/team/:id` - Update team member (PROTECTED)
- `DELETE /api/team/:id` - Delete team member (PROTECTED)

### Services & Pricing
- `GET /api/services/services` - Get all services (PUBLIC)
- `POST /api/services/services` - Create service (PROTECTED)
- `PUT /api/services/services/:id` - Update service (PROTECTED)
- `DELETE /api/services/services/:id` - Delete service (PROTECTED)
- `GET /api/services/pricing` - Get all pricing plans (PUBLIC)
- `POST /api/services/pricing` - Create pricing plan (PROTECTED)
- `PUT /api/services/pricing/:id` - Update pricing plan (PROTECTED)
- `DELETE /api/services/pricing/:id` - Delete pricing plan (PROTECTED)

## Request/Response Examples

### Contact Form Submission
```bash
POST /api/contact/submit
Content-Type: application/json

{
  "firstName": "Ahmed",
  "lastName": "Hassan",
  "email": "ahmed@example.com",
  "phone": "+92 300 0000000",
  "service": "Web Design & Development",
  "budget": "$5,000 – $15,000",
  "message": "I want to build a modern website...",
  "agreeToTerms": true
}

Response:
{
  "status": 201,
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "id": 1,
    "first_name": "Ahmed",
    "last_name": "Hassan",
    "email": "ahmed@example.com",
    "service": "Web Design & Development",
    "created_at": "2026-04-22T10:30:00Z"
  }
}
```

### Get Portfolio Projects with Filtering
```bash
GET /api/portfolio?category=Web%20Design&limit=10&offset=0

Response:
{
  "status": 200,
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "LuxCart — Premium E-Commerce Platform",
      "description": "Full-stack Next.js e-commerce...",
      "category": "Web Design",
      "thumbnail_url": "...",
      "tags": "Next.js, Stripe, Sanity CMS",
      "case_study_url": "..."
    }
  ],
  "pagination": {
    "total": 6,
    "limit": 10,
    "offset": 0,
    "hasMore": false
  }
}
```

### Get Testimonials
```bash
GET /api/testimonials

Response:
{
  "status": 200,
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Ahmed Hassan",
      "role": "CEO, TechStart Lahore",
      "message": "NextWeb transformed our entire online presence...",
      "rating": 5,
      "avatar_initials": "AH",
      "avatar_color": "var(--green)",
      "created_at": "2026-04-20T08:15:00Z"
    }
  ]
}
```

### Get Team Members
```bash
GET /api/team

Response:
{
  "status": 200,
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Abdullah Alvi",
      "role": "React Developer and UI/UX",
      "bio": "1+ years crafting digital brands...",
      "avatar_initials": "AA",
      "avatar_color": "var(--green)",
      "email": "abdullah@nextweb.pk"
    }
  ]
}
```

### Get Services
```bash
GET /api/services/services

Response:
{
  "status": 200,
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "UI/UX Design",
      "description": "Pixel-perfect interfaces...",
      "icon_name": "palette",
      "features": [
        "User Research & Personas",
        "Wireframing & Prototyping",
        "Design System Creation",
        "Usability Testing"
      ],
      "display_order": 1
    }
  ]
}
```

### Get Pricing Plans
```bash
GET /api/services/pricing

Response:
{
  "status": 200,
  "success": true,
  "data": [
    {
      "id": 1,
      "plan_name": "Starter",
      "description": "Perfect for startups & small businesses...",
      "price_pkr": 35000,
      "price_currency": "PKR",
      "plan_type": "project",
      "features": [
        "Landing Page Design",
        "Mobile Responsive",
        "Basic SEO Setup"
      ],
      "featured": false
    }
  ]
}
```

## Environment Variables
See `.env.example` for required variables.

Example .env:
```
PORT=8000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d
FRONTEND_URL=http://localhost:3000
```

## Next Steps
1. Setup PostgreSQL database
2. Install dependencies: `npm install`
3. Configure `.env` file
4. Run database schema: `psql -U postgres -d nextweb_db -f db/schema.sql`
5. Start development server: `npm run dev`
6. Test endpoints using Postman or curl
