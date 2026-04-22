# API Endpoints Reference

Complete reference of all NextWeb API endpoints organized by resource.

## Base URL
```
http://localhost:8000/api
```

## Authentication
Protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📧 Contact Submissions

### Submit Contact Form
```
POST /contact/submit
Content-Type: application/json

Request:
{
  "firstName": "Ahmed",
  "lastName": "Hassan",
  "email": "ahmed@example.com",
  "phone": "+92 300 0000000",
  "service": "Web Design & Development",
  "budget": "$5,000 – $15,000",
  "message": "I need a new website",
  "agreeToTerms": true
}

Response: 201 Created
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

### Get All Submissions (Protected)
```
GET /contact
Authorization: Bearer <token>

Response: 200 OK
{
  "status": 200,
  "success": true,
  "data": [
    {
      "id": 1,
      "first_name": "Ahmed",
      "last_name": "Hassan",
      "email": "ahmed@example.com",
      "phone": "+92 300 0000000",
      "service": "Web Design & Development",
      "budget": "$5,000 – $15,000",
      "message": "...",
      "status": "new",
      "created_at": "2026-04-22T14:30:00Z"
    }
  ]
}
```

### Get Single Submission (Protected)
```
GET /contact/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "status": 200,
  "success": true,
  "data": { /* full submission object */ }
}
```

### Update Submission Status (Protected)
```
PUT /contact/:id/status
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "status": "read" | "responded" | "archived"
}

Response: 200 OK
{
  "status": 200,
  "success": true,
  "message": "Contact status updated successfully",
  "data": {
    "id": 1,
    "status": "read",
    "updated_at": "2026-04-22T14:30:00Z"
  }
}
```

---

## 🎯 Portfolio / Projects

### Get All Projects
```
GET /portfolio?category=Web%20Design&limit=10&offset=0

Query Parameters:
- category (optional): Filter by category
- limit (optional): Number of results (default: 10)
- offset (optional): Pagination offset (default: 0)

Response: 200 OK
{
  "status": 200,
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "LuxCart — Premium E-Commerce Platform",
      "description": "Full-stack Next.js e-commerce with Stripe...",
      "category": "Web Design",
      "thumbnail_url": "https://...",
      "image_url": "https://...",
      "technologies": "Next.js, React, Stripe",
      "tags": "Next.js, Stripe, Sanity CMS",
      "live_link": "https://...",
      "case_study_url": "https://...",
      "created_at": "2026-04-20T08:00:00Z"
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

### Get Single Project
```
GET /portfolio/:id

Response: 200 OK
{
  "status": 200,
  "success": true,
  "data": { /* project object */ }
}
```

### Create Project (Protected)
```
POST /portfolio
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "title": "Project Name",
  "description": "Project description",
  "category": "Web Design",
  "thumbnailUrl": "https://...",
  "imageUrl": "https://...",
  "technologies": "Next.js, React",
  "tags": "tag1, tag2",
  "liveLink": "https://...",
  "caseStudyUrl": "https://..."
}

Response: 201 Created
```

### Update Project (Protected)
```
PUT /portfolio/:id
Authorization: Bearer <token>
Content-Type: application/json

Request: { /* same fields as create */ }

Response: 200 OK
```

### Delete Project (Protected)
```
DELETE /portfolio/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "status": 200,
  "success": true,
  "message": "Project deleted successfully"
}
```

---

## ⭐ Testimonials

### Get All Testimonials
```
GET /testimonials

Response: 200 OK
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

### Get Single Testimonial
```
GET /testimonials/:id

Response: 200 OK
{
  "status": 200,
  "success": true,
  "data": { /* testimonial object */ }
}
```

### Create Testimonial (Protected)
```
POST /testimonials
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "name": "Client Name",
  "role": "Position, Company",
  "message": "Testimonial message...",
  "rating": 5,
  "avatarInitials": "CN",
  "avatarColor": "var(--green)"
}

Response: 201 Created
```

### Update Testimonial (Protected)
```
PUT /testimonials/:id
Authorization: Bearer <token>
Content-Type: application/json

Request: { /* same fields as create */ }

Response: 200 OK
```

### Delete Testimonial (Protected)
```
DELETE /testimonials/:id
Authorization: Bearer <token>

Response: 200 OK
```

---

## 👥 Team Members

### Get All Team Members
```
GET /team

Response: 200 OK
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
      "email": "abdullah@nextweb.pk",
      "created_at": "2026-04-20T08:00:00Z"
    }
  ]
}
```

### Get Single Team Member
```
GET /team/:id

Response: 200 OK
```

### Create Team Member (Protected)
```
POST /team
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "name": "Team Member Name",
  "role": "Position",
  "bio": "Biography...",
  "avatarInitials": "TM",
  "avatarColor": "var(--blue)",
  "email": "email@nextweb.pk"
}

Response: 201 Created
```

### Update Team Member (Protected)
```
PUT /team/:id
Authorization: Bearer <token>
Content-Type: application/json

Request: { /* same fields as create */ }

Response: 200 OK
```

### Delete Team Member (Protected)
```
DELETE /team/:id
Authorization: Bearer <token>

Response: 200 OK
```

---

## 🛠️ Services

### Get All Services
```
GET /services/services

Response: 200 OK
{
  "status": 200,
  "success": true,
  "data": [
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
      "display_order": 1,
      "created_at": "2026-04-20T08:00:00Z"
    }
  ]
}
```

### Create Service (Protected)
```
POST /services/services
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "title": "Service Name",
  "description": "Service description...",
  "iconName": "palette",
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "displayOrder": 1
}

Response: 201 Created
```

### Update Service (Protected)
```
PUT /services/services/:id
Authorization: Bearer <token>
Content-Type: application/json

Request: { /* same fields as create */ }

Response: 200 OK
```

### Delete Service (Protected)
```
DELETE /services/services/:id
Authorization: Bearer <token>

Response: 200 OK
```

---

## 💰 Pricing Plans

### Get All Pricing Plans
```
GET /services/pricing

Response: 200 OK
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
        "Basic SEO Setup",
        "Contact Form",
        "2 Revisions"
      ],
      "featured": false,
      "display_order": 1,
      "created_at": "2026-04-20T08:00:00Z"
    }
  ]
}
```

### Create Pricing Plan (Protected)
```
POST /services/pricing
Authorization: Bearer <token>
Content-Type: application/json

Request:
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
  "featured": true,
  "displayOrder": 2
}

Response: 201 Created
```

### Update Pricing Plan (Protected)
```
PUT /services/pricing/:id
Authorization: Bearer <token>
Content-Type: application/json

Request: { /* same fields as create */ }

Response: 200 OK
```

### Delete Pricing Plan (Protected)
```
DELETE /services/pricing/:id
Authorization: Bearer <token>

Response: 200 OK
```

---

## 🔐 Authentication

### Register
```
POST /auth/register
Content-Type: application/json

Request:
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "secure_password"
}

Response: 201 Created
{
  "status": 201,
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "token": "eyJhbGc..."
  }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

Request:
{
  "email": "user@example.com",
  "password": "secure_password"
}

Response: 200 OK
{
  "status": 200,
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": 1,
      "email": "user@example.com"
    }
  }
}
```

---

## 🏥 System

### Health Check
```
GET /health

Response: 200 OK
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid token) |
| 403 | Forbidden (no permission) |
| 404 | Not Found |
| 500 | Server Error |

## Error Response Format

```json
{
  "status": 400,
  "success": false,
  "message": "Validation failed",
  "error": {
    "field": "email",
    "message": "Email is required"
  }
}
```

## Categories for Portfolio Filtering

Valid category values:
- `Web Design`
- `Development`
- `Branding`
- `Marketing`
- `All` (no filter)

## Submission Statuses

Valid status values for contact submissions:
- `new` (default)
- `read`
- `responded`
- `archived`

## Rating Scale

Testimonials use 1-5 star rating:
- 1 = Poor
- 2 = Fair
- 3 = Good
- 4 = Very Good
- 5 = Excellent

---

## Quick cURL Examples

### Test Contact Form
```bash
curl -X POST http://localhost:8000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+92 300 0000000",
    "service": "Web Design",
    "budget": "5000-15000",
    "message": "Test message",
    "agreeToTerms": true
  }'
```

### Test Get Testimonials
```bash
curl http://localhost:8000/api/testimonials
```

### Test Get Services
```bash
curl http://localhost:8000/api/services/services
```

### Test Get Pricing
```bash
curl http://localhost:8000/api/services/pricing
```

### Test Get Portfolio with Filter
```bash
curl "http://localhost:8000/api/portfolio?category=Web%20Design"
```

---

**Last Updated:** April 22, 2026
