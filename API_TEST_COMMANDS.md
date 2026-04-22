# 🧪 API Testing Commands

Complete list of cURL commands to test all API endpoints. Run these after starting the backend server.

## 🔐 Authentication

### Get Admin Token

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@nextweb.pk",
    "password": "admin123"
  }' | jq .
```

**Expected Response:**
```json
{
  "status": 200,
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@nextweb.pk",
    "name": "Admin User"
  }
}
```

**Save the token:**
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 👥 Team Members

### Create Team Member

```bash
curl -X POST http://localhost:8000/api/team \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Ahmed Hassan",
    "role": "Lead Developer",
    "email": "ahmed@example.com",
    "bio": "Expert in full-stack development",
    "avatarInitials": "AH",
    "avatarColor": "green"
  }' | jq .
```

### Get All Team Members

```bash
curl -X GET http://localhost:8000/api/team \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### Get Team Member by ID

```bash
curl -X GET http://localhost:8000/api/team/1 \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### Update Team Member

```bash
curl -X PUT http://localhost:8000/api/team/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "role": "Senior Developer"
  }' | jq .
```

### Delete Team Member

```bash
curl -X DELETE http://localhost:8000/api/team/1 \
  -H "Authorization: Bearer $TOKEN" | jq .
```

## ⭐ Testimonials

### Create Testimonial

```bash
curl -X POST http://localhost:8000/api/testimonials \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Sarah Khan",
    "role": "CEO, Tech Startup",
    "message": "NextWeb completely transformed our online presence",
    "rating": 5,
    "avatarInitials": "SK",
    "avatarColor": "purple"
  }' | jq .
```

### Get All Testimonials

```bash
curl -X GET http://localhost:8000/api/testimonials \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### Delete Testimonial

```bash
curl -X DELETE http://localhost:8000/api/testimonials/1 \
  -H "Authorization: Bearer $TOKEN" | jq .
```

## 🛠️ Services

### Create Service

```bash
curl -X POST http://localhost:8000/api/services/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Web Design",
    "description": "Beautiful and responsive web designs",
    "iconName": "palette",
    "features": [
      "Mobile Responsive Design",
      "UI/UX Optimization",
      "Performance Optimization"
    ],
    "displayOrder": 1
  }' | jq .
```

### Get All Services

```bash
curl -X GET http://localhost:8000/api/services/services \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### Delete Service

```bash
curl -X DELETE http://localhost:8000/api/services/services/1 \
  -H "Authorization: Bearer $TOKEN" | jq .
```

## 💰 Pricing Plans

### Create Pricing Plan

```bash
curl -X POST http://localhost:8000/api/services/pricing \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "planName": "Starter",
    "description": "Perfect for startups",
    "pricePkr": 35000,
    "priceCurrency": "PKR",
    "planType": "project",
    "features": [
      "Landing Page",
      "Mobile Responsive",
      "Basic SEO"
    ],
    "featured": true,
    "displayOrder": 1
  }' | jq .
```

### Get All Pricing Plans

```bash
curl -X GET http://localhost:8000/api/services/pricing \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### Delete Pricing Plan

```bash
curl -X DELETE http://localhost:8000/api/services/pricing/1 \
  -H "Authorization: Bearer $TOKEN" | jq .
```

## 📁 Portfolio Projects

### Create Project

```bash
curl -X POST http://localhost:8000/api/portfolio \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "LuxCart E-Commerce Platform",
    "description": "Full-stack e-commerce platform with Stripe integration",
    "category": "Development",
    "thumbnailUrl": "https://via.placeholder.com/400x300",
    "imageUrl": "https://via.placeholder.com/1200x800",
    "technologies": "Next.js, React, Stripe",
    "tags": "Next.js, E-Commerce",
    "liveLink": "https://example.com",
    "caseStudyUrl": "https://example.com/case-study"
  }' | jq .
```

### Get All Projects

```bash
curl -X GET http://localhost:8000/api/portfolio \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### Get Projects by Category

```bash
curl -X GET "http://localhost:8000/api/portfolio?category=Development" \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### Delete Project

```bash
curl -X DELETE http://localhost:8000/api/portfolio/1 \
  -H "Authorization: Bearer $TOKEN" | jq .
```

## 📧 Contacts

### Get All Contacts

```bash
curl -X GET http://localhost:8000/api/contacts \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### Get Contacts by Status

```bash
curl -X GET "http://localhost:8000/api/contacts?status=new" \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### Get Contact by ID

```bash
curl -X GET http://localhost:8000/api/contacts/1 \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### Update Contact Status

```bash
curl -X PUT http://localhost:8000/api/contacts/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "status": "responded"
  }' | jq .
```

### Delete Contact

```bash
curl -X DELETE http://localhost:8000/api/contacts/1 \
  -H "Authorization: Bearer $TOKEN" | jq .
```

## 📊 Dashboard Stats

### Get Dashboard Stats

```bash
curl -X GET http://localhost:8000/api/dashboard/stats \
  -H "Authorization: Bearer $TOKEN" | jq .
```

## 🚀 Quick Test Script

Save this as `test-api.sh` and run it:

```bash
#!/bin/bash

echo "🔐 Getting token..."
TOKEN=$(curl -s -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@nextweb.pk",
    "password": "admin123"
  }' | jq -r '.token')

echo "✅ Token: $TOKEN\n"

echo "👥 Testing Team Members..."
curl -s -X POST http://localhost:8000/api/team \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Test Member",
    "role": "Developer",
    "email": "test@example.com",
    "bio": "Test",
    "avatarInitials": "TM",
    "avatarColor": "green"
  }' | jq .

echo "\n⭐ Testing Testimonials..."
curl -s -X POST http://localhost:8000/api/testimonials \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Test User",
    "role": "Client",
    "message": "Great service!",
    "rating": 5,
    "avatarInitials": "TU",
    "avatarColor": "blue"
  }' | jq .

echo "\n✅ All tests completed!"
```

Run it:
```bash
chmod +x test-api.sh
./test-api.sh
```

## ✨ Success Indicators

✅ You should see:
- Status: 200 or 201 (success)
- success: true
- data with created/updated resource
- No error messages

❌ Common errors and fixes:

| Error | Fix |
|-------|-----|
| "Invalid or expired token" | Check TOKEN is set, re-login if needed |
| "No token provided" | Add -H "Authorization: Bearer $TOKEN" |
| "Failed to create..." | Check all required fields are provided |
| "Connection refused" | Make sure backend is running: npm run dev |

---

**Status:** ✅ Ready for Testing
**Last Updated:** April 22, 2026
