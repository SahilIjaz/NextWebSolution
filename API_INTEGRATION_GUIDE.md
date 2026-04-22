# NextWeb - API Integration Guide

Complete guide for integrating the NextWeb frontend with the backend API.

## Overview

The backend provides REST API endpoints that serve data to the frontend HTML/JavaScript application. The frontend automatically loads and displays data from these endpoints.

## Frontend Configuration

### API Base URL

The frontend uses the following API base URL (configure via environment or hardcode):

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
```

For local development, the API defaults to `http://localhost:8000/api`

### CORS Configuration

The backend is configured to accept requests from the frontend URL specified in `.env`:

```
FRONTEND_URL=http://localhost:3000  # For local development
```

## Backend API Structure

All API endpoints are prefixed with `/api` and return JSON responses with the following structure:

```json
{
  "status": 200,
  "success": true,
  "message": "Description of what happened",
  "data": { /* response data */ }
}
```

## Contact Form Submission

**Endpoint:** `POST /api/contact/submit`

**Accessibility:** PUBLIC (no authentication required)

**Frontend Implementation:**

The contact form in `next_frontend/index.html` (lines 806-873) automatically submits to the backend when users click the "Send Message" button.

**Form Fields:**
- `firstName` (required)
- `lastName` (required)
- `email` (required)
- `phone` (optional)
- `service` (required) - Selected from dropdown
- `budget` (optional) - Selected from dropdown
- `message` (required) - Textarea
- `agreeToTerms` (required) - Checkbox

**JavaScript Handler:** `submitForm()` in `script.js`

**Request Example:**
```javascript
fetch('http://localhost:8000/api/contact/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: "Ahmed",
    lastName: "Hassan",
    email: "ahmed@example.com",
    phone: "+92 300 0000000",
    service: "Web Design & Development",
    budget: "$5,000 – $15,000",
    message: "I need a new website...",
    agreeToTerms: true
  })
})
```

**Response Example:**
```json
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
    "created_at": "2026-04-22T14:30:00Z"
  }
}
```

## Testimonials Section

**Endpoints:**
- `GET /api/testimonials` - Retrieve all testimonials

**Frontend Function:** `loadTestimonials()` in `script.js`

**Display Location:** Home page, "What Clients Say" section (lines 197-240 in HTML)

**Data Structure:**
```json
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
```

**How to Add Testimonials:**

1. Use admin dashboard or API to create:
```bash
POST /api/testimonials
Content-Type: application/json
Authorization: Bearer [JWT_TOKEN]

{
  "name": "Client Name",
  "role": "Position, Company",
  "message": "Testimonial text...",
  "rating": 5,
  "avatarInitials": "CN",
  "avatarColor": "var(--green)"
}
```

2. Frontend will automatically load and display top 3 testimonials

## Team Section

**Endpoints:**
- `GET /api/team` - Retrieve all team members

**Frontend Function:** `loadTeamMembers()` in `script.js`

**Display Location:** About page, "Meet Our Experts" section (lines 677-704 in HTML)

**Data Structure:**
```json
{
  "id": 1,
  "name": "Abdullah Alvi",
  "role": "React Developer and UI/UX",
  "bio": "1+ years crafting digital brands...",
  "avatar_initials": "AA",
  "avatar_color": "var(--green)",
  "email": "abdullah@nextweb.pk"
}
```

**How to Add Team Members:**

```bash
POST /api/team
Content-Type: application/json
Authorization: Bearer [JWT_TOKEN]

{
  "name": "Team Member Name",
  "role": "Position",
  "bio": "Bio text...",
  "avatarInitials": "TM",
  "avatarColor": "var(--blue)",
  "email": "email@nextweb.pk"
}
```

## Services Section

**Endpoints:**
- `GET /api/services/services` - Retrieve all services

**Frontend Function:** `loadServices()` in `script.js`

**Display Location:** Services page, service cards grid (lines 270-376 in HTML)

**Data Structure:**
```json
{
  "id": 1,
  "title": "UI/UX Design",
  "description": "Pixel-perfect interfaces grounded in user research...",
  "icon_name": "palette",
  "features": [
    "User Research & Personas",
    "Wireframing & Prototyping",
    "Design System Creation",
    "Usability Testing"
  ],
  "display_order": 1
}
```

**How to Add Services:**

```bash
POST /api/services/services
Content-Type: application/json
Authorization: Bearer [JWT_TOKEN]

{
  "title": "Service Name",
  "description": "Service description...",
  "iconName": "fa-icon-name",
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "displayOrder": 1
}
```

## Pricing Plans

**Endpoints:**
- `GET /api/services/pricing` - Retrieve all pricing plans

**Frontend Function:** `loadPricingPlans()` in `script.js`

**Display Location:** Services page, pricing cards (lines 378-436 in HTML)

**Data Structure:**
```json
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
    "Basic SEO Setup",
    "Contact Form"
  ],
  "featured": false
}
```

**How to Add Pricing Plans:**

```bash
POST /api/services/pricing
Content-Type: application/json
Authorization: Bearer [JWT_TOKEN]

{
  "planName": "Growth",
  "description": "For growing businesses...",
  "pricePkr": 75000,
  "priceCurrency": "PKR",
  "planType": "project",
  "features": [
    "Full Multi-Page Website",
    "Advanced Animations",
    "SEO + Performance Opt."
  ],
  "featured": true
}
```

## Portfolio / Projects

**Endpoints:**
- `GET /api/portfolio` - Get projects with optional filtering
- `GET /api/portfolio?category=Web%20Design` - Filter by category

**Frontend Function:** `loadPortfolioProjects()` in `script.js`

**Display Location:** Portfolio page, project grid (lines 462-581 in HTML)

**Query Parameters:**
- `category` (optional) - Filter by category (e.g., "Web Design", "Development")
- `limit` (optional, default: 10) - Number of results
- `offset` (optional, default: 0) - Pagination offset

**Data Structure:**
```json
{
  "id": 1,
  "title": "LuxCart — Premium E-Commerce Platform",
  "description": "Full-stack Next.js e-commerce with Stripe payments...",
  "category": "Web Design",
  "thumbnail_url": "...",
  "image_url": "...",
  "tags": "Next.js, Stripe, Sanity CMS, Tailwind",
  "case_study_url": "...",
  "technologies": "Next.js, React, Stripe, Sanity"
}
```

**Portfolio Filtering in Frontend:**

The portfolio page has filter buttons (All, Web Design, Development, Branding, Marketing). Clicking a button automatically calls:

```javascript
loadPortfolioProjects(category)
```

**How to Add Projects:**

```bash
POST /api/portfolio
Content-Type: application/json
Authorization: Bearer [JWT_TOKEN]

{
  "title": "Project Name",
  "description": "Project description...",
  "category": "Web Design",
  "thumbnailUrl": "...",
  "imageUrl": "...",
  "tags": "Tag1, Tag2, Tag3",
  "caseStudyUrl": "...",
  "technologies": "Tech1, Tech2"
}
```

## Dynamic Data Loading Flow

### On Page Load
1. JavaScript fires `DOMContentLoaded` event
2. Loads testimonials → populates testimonial grid
3. Loads team members → populates team grid
4. Loads services → populates services grid
5. Loads pricing plans → populates pricing grid
6. Loads portfolio projects → populates portfolio grid

### On Navigation
- Portfolio filters dynamically fetch filtered projects
- Other sections remain static (cached)

## Error Handling

The frontend gracefully handles API errors:

```javascript
try {
  const response = await fetch(url);
  const data = await response.json();
  if (data.success) {
    // Process successful response
  } else {
    console.error('Error:', data.message);
  }
} catch (error) {
  console.error('API request failed:', error);
}
```

## Frontend-Backend Integration Checklist

- ✅ Contact form submission
- ✅ Testimonials loading and display
- ✅ Team members loading and display
- ✅ Services loading and display
- ✅ Pricing plans loading and display
- ✅ Portfolio projects with category filtering
- ✅ Error handling
- ✅ Responsive design compatible with API data

## Testing the Integration

### 1. Start Backend Server
```bash
cd nextWebSolutions_backend
npm run dev
```

Should output:
```
✅ Database Connected Successfully
✅ Server running on http://localhost:8000
```

### 2. Open Frontend in Browser
```
http://localhost:3000/next_frontend/index.html
```

### 3. Test Contact Form
- Fill out form and submit
- Should see success message
- Data should appear in database

### 4. Seed Sample Data (Admin)
Use admin API to add testimonials, team members, etc.:

```bash
# Add sample testimonial
curl -X POST http://localhost:8000/api/testimonials \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [token]" \
  -d '{
    "name": "Sample Client",
    "role": "CEO",
    "message": "Great work!",
    "rating": 5,
    "avatarInitials": "SC"
  }'
```

## Frontend API Function Reference

| Function | Purpose |
|----------|---------|
| `submitForm(e)` | Handles contact form submission |
| `loadTestimonials()` | Fetches testimonials from API |
| `loadTeamMembers()` | Fetches team members from API |
| `loadServices()` | Fetches services from API |
| `loadPricingPlans()` | Fetches pricing plans from API |
| `loadPortfolioProjects(category)` | Fetches portfolio with optional filtering |
| `populateTestimonials(data)` | Renders testimonials HTML |
| `populateTeamMembers(data)` | Renders team members HTML |
| `populateServices(data)` | Renders services HTML |
| `populatePricingPlans(data)` | Renders pricing plans HTML |
| `populatePortfolioProjects(data)` | Renders portfolio projects HTML |

## Database Initialization

To populate the database with initial data:

```sql
-- Add sample testimonials
INSERT INTO testimonials (name, role, message, rating, avatar_initials, avatar_color)
VALUES 
  ('Ahmed Hassan', 'CEO, TechStart Lahore', 'NextWeb transformed our entire online presence...', 5, 'AH', 'var(--green)'),
  ('Sara Rahim', 'Founder, StyleBoutique.pk', 'From branding to deployment...', 5, 'SR', 'var(--purple)'),
  ('Kamran Malik', 'Director, ProFinance Solutions', 'Outstanding SEO work...', 5, 'KM', 'var(--blue)');

-- Add team members
INSERT INTO team_members (name, role, bio, avatar_initials, avatar_color, email)
VALUES 
  ('Abdullah Alvi', 'React Developer and UI/UX', '1+ years crafting digital brands...', 'AA', 'var(--green)', 'abdullah@nextweb.pk'),
  ('Abdul Manan', 'Founder and Lead', 'Founder and Lead Engineer...', 'AM', 'var(--purple)', 'abdul@nextweb.pk'),
  ('Sahil Ijaz', 'Backend Specialist', 'Backend-focused developer...', 'SI', 'var(--blue)', 'sahil@nextweb.pk');

-- Add services
INSERT INTO services (title, description, icon_name, features, display_order)
VALUES 
  ('UI/UX Design', 'Pixel-perfect interfaces...', 'palette', 'User Research & Personas, Wireframing & Prototyping, Design System Creation, Usability Testing', 1),
  ('Web Development', 'Fast, scalable web apps...', 'code', 'Next.js / React Apps, E-Commerce Solutions, API Integration & Backend, Performance Optimization', 2);

-- Add pricing plans
INSERT INTO pricing_plans (plan_name, description, price_pkr, price_currency, plan_type, features, featured, display_order)
VALUES 
  ('Starter', 'Perfect for startups...', 35000, 'PKR', 'project', 'Landing Page Design, Mobile Responsive, Basic SEO Setup, Contact Form, 2 Revisions', false, 1),
  ('Growth', 'For growing businesses...', 75000, 'PKR', 'project', 'Full Multi-Page Website, Advanced Animations, SEO + Performance Opt., CMS Integration, 5 Revisions, 1 Month Support', true, 2),
  ('Enterprise', null, null, 'PKR', 'project', 'Everything in Growth, E-Commerce & Apps, Marketing Campaigns, Dedicated Account Manager, Unlimited Revisions, 6 Months Support, Priority Response', false, 3);
```

## Troubleshooting

### API Not Responding
- Check backend is running: `npm run dev`
- Verify API_BASE_URL in frontend script.js
- Check CORS configuration in `.env`

### Data Not Loading in Frontend
- Open browser DevTools Console (F12)
- Check for fetch errors
- Verify API endpoints are correct
- Ensure database is populated with data

### Contact Form Not Submitting
- Verify form fields match expected names
- Check browser console for error messages
- Ensure all required fields are filled
- Verify API endpoint accessibility

## Next Steps

1. Run database initialization scripts to seed sample data
2. Test all API endpoints using Postman or curl
3. Verify frontend loads and displays data correctly
4. Deploy to production following deployment guide
