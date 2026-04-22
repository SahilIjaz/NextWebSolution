# 🖥️ Command Reference

Quick reference for all common commands needed to run the NextWeb project.

## 🚀 Quick Start (Copy & Paste)

```bash
# Navigate to backend
cd nextWebSolutions_backend

# Initialize database
node init-db.js

# Create demo user
node seed-demo-user.js

# Start backend server
npm run dev

# In another terminal, open admin panel:
# http://localhost:3000/next_frontend/admin.html

# Login with:
# Email: admin@nextweb.pk
# Password: admin123
```

## 📦 Database Commands

### Initialize Database
Creates all tables and indexes from scratch.
```bash
cd nextWebSolutions_backend
node init-db.js
```

**Expected Output:**
```
✅ Database initialization complete!
```

### Create Demo User
Creates a demo admin account for testing.
```bash
cd nextWebSolutions_backend
node seed-demo-user.js
```

**Credentials Created:**
- Email: `admin@nextweb.pk`
- Password: `admin123`

### Reset Database
Drop and recreate all tables (caution: deletes all data).
```bash
cd nextWebSolutions_backend
node init-db.js
node seed-demo-user.js
```

## 🔧 Backend Commands

### Start Backend Server
```bash
cd nextWebSolutions_backend
npm run dev
```

**Expected Output:**
```
✅ Server running on http://localhost:8000
✅ Database Connected Successfully
```

### Check Backend Health
```bash
curl http://localhost:8000/api/health
```

**Expected Response:**
```json
{"status":"OK","message":"Server is running"}
```

### Stop Backend Server
```
Ctrl + C
```

### Install Dependencies
```bash
cd nextWebSolutions_backend
npm install
```

## 🌐 Frontend Commands

### Open Admin Panel
In browser:
```
http://localhost:3000/next_frontend/admin.html
```

Or file protocol:
```
file:///path/to/NextWeb/next_frontend/admin.html
```

### Open Main Website
```
http://localhost:3000/next_frontend/index.html
```

## 🔐 Authentication Commands

### Get Login Token
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@nextweb.pk",
    "password": "admin123"
  }'
```

### Save Token for Testing
```bash
TOKEN=$(curl -s -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@nextweb.pk",
    "password": "admin123"
  }' | jq -r '.token')

echo $TOKEN
```

## 👥 Team Members Commands

### Create Team Member
```bash
curl -X POST http://localhost:8000/api/team \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Ahmed Hassan",
    "role": "Lead Developer",
    "email": "ahmed@example.com",
    "bio": "Expert developer",
    "avatarInitials": "AH",
    "avatarColor": "green"
  }'
```

### Get All Team Members
```bash
curl http://localhost:8000/api/team \
  -H "Authorization: Bearer $TOKEN"
```

### Delete Team Member
```bash
curl -X DELETE http://localhost:8000/api/team/1 \
  -H "Authorization: Bearer $TOKEN"
```

## ⭐ Testimonials Commands

### Create Testimonial
```bash
curl -X POST http://localhost:8000/api/testimonials \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Sarah Khan",
    "role": "CEO, Company",
    "message": "Great service!",
    "rating": 5,
    "avatarInitials": "SK",
    "avatarColor": "purple"
  }'
```

### Get All Testimonials
```bash
curl http://localhost:8000/api/testimonials \
  -H "Authorization: Bearer $TOKEN"
```

### Delete Testimonial
```bash
curl -X DELETE http://localhost:8000/api/testimonials/1 \
  -H "Authorization: Bearer $TOKEN"
```

## 🛠️ Services Commands

### Create Service
```bash
curl -X POST http://localhost:8000/api/services/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Web Design",
    "description": "Beautiful designs",
    "iconName": "palette",
    "features": ["Design", "Implementation"],
    "displayOrder": 1
  }'
```

### Get All Services
```bash
curl http://localhost:8000/api/services/services \
  -H "Authorization: Bearer $TOKEN"
```

### Delete Service
```bash
curl -X DELETE http://localhost:8000/api/services/services/1 \
  -H "Authorization: Bearer $TOKEN"
```

## 💰 Pricing Plans Commands

### Create Pricing Plan
```bash
curl -X POST http://localhost:8000/api/services/pricing \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "planName": "Starter",
    "description": "For startups",
    "pricePkr": 35000,
    "priceCurrency": "PKR",
    "planType": "project",
    "features": ["Landing Page", "Mobile"],
    "featured": true,
    "displayOrder": 1
  }'
```

### Get All Pricing Plans
```bash
curl http://localhost:8000/api/services/pricing \
  -H "Authorization: Bearer $TOKEN"
```

### Delete Pricing Plan
```bash
curl -X DELETE http://localhost:8000/api/services/pricing/1 \
  -H "Authorization: Bearer $TOKEN"
```

## 📁 Portfolio Commands

### Create Project
```bash
curl -X POST http://localhost:8000/api/portfolio \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "E-Commerce Platform",
    "description": "Full-stack project",
    "category": "Development",
    "thumbnailUrl": "https://via.placeholder.com/400",
    "imageUrl": "https://via.placeholder.com/1200",
    "technologies": "Next.js, React",
    "tags": "E-Commerce",
    "liveLink": "https://example.com",
    "caseStudyUrl": "https://example.com/case"
  }'
```

### Get All Projects
```bash
curl http://localhost:8000/api/portfolio \
  -H "Authorization: Bearer $TOKEN"
```

### Get Projects by Category
```bash
curl "http://localhost:8000/api/portfolio?category=Development" \
  -H "Authorization: Bearer $TOKEN"
```

### Delete Project
```bash
curl -X DELETE http://localhost:8000/api/portfolio/1 \
  -H "Authorization: Bearer $TOKEN"
```

## 📧 Contact Commands

### Get All Contacts
```bash
curl http://localhost:8000/api/contact \
  -H "Authorization: Bearer $TOKEN"
```

### Get Contacts by Status
```bash
curl "http://localhost:8000/api/contact?status=new" \
  -H "Authorization: Bearer $TOKEN"
```

### Get Contact by ID
```bash
curl http://localhost:8000/api/contact/1 \
  -H "Authorization: Bearer $TOKEN"
```

### Update Contact Status
```bash
curl -X PUT http://localhost:8000/api/contact/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"status": "responded"}'
```

### Delete Contact
```bash
curl -X DELETE http://localhost:8000/api/contact/1 \
  -H "Authorization: Bearer $TOKEN"
```

## 🐛 Debugging Commands

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

### Find Process on Port
```bash
# macOS/Linux
lsof -i :8000

# Windows
netstat -ano | findstr :8000
```

### Kill Process on Port
```bash
# macOS/Linux
lsof -ti:8000 | xargs kill

# Windows
taskkill /PID <PID> /F
```

### View Backend Logs
```bash
# Logs appear in terminal where npm run dev is running
# Ctrl+C to stop, up arrow to re-run previous command
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
cd nextWebSolutions_backend
rm -rf node_modules
npm install
```

## 📊 Testing Commands

### Test All Endpoints
```bash
# Save token
TOKEN=$(curl -s -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nextweb.pk","password":"admin123"}' | jq -r '.token')

# Test each endpoint
curl http://localhost:8000/api/team -H "Authorization: Bearer $TOKEN"
curl http://localhost:8000/api/testimonials -H "Authorization: Bearer $TOKEN"
curl http://localhost:8000/api/services/services -H "Authorization: Bearer $TOKEN"
curl http://localhost:8000/api/services/pricing -H "Authorization: Bearer $TOKEN"
curl http://localhost:8000/api/portfolio -H "Authorization: Bearer $TOKEN"
curl http://localhost:8000/api/contact -H "Authorization: Bearer $TOKEN"
```

### Run Test Script
Save as `test.sh` and run with `bash test.sh`:
```bash
#!/bin/bash
TOKEN=$(curl -s -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nextweb.pk","password":"admin123"}' | jq -r '.token')

echo "Testing all endpoints..."
curl http://localhost:8000/api/team -H "Authorization: Bearer $TOKEN" | jq .success
curl http://localhost:8000/api/testimonials -H "Authorization: Bearer $TOKEN" | jq .success
# ... add all other endpoints
```

## 📱 Environment Setup

### Check Environment Variables
```bash
# View .env file
cat nextWebSolutions_backend/.env

# Create .env if missing
cp nextWebSolutions_backend/.env.example nextWebSolutions_backend/.env
```

### Required .env Variables
```
DATABASE_URL=postgresql://user:password@localhost:5432/nextweb
JWT_SECRET=your-secret-key
PORT=8000
NODE_ENV=development
```

## 🔄 Full Workflow

Complete workflow from scratch:

```bash
# 1. Initialize
cd nextWebSolutions_backend
node init-db.js

# 2. Seed demo user
node seed-demo-user.js

# 3. Start backend
npm run dev

# 4. Open admin panel (in browser)
# http://localhost:3000/next_frontend/admin.html

# 5. Login
# admin@nextweb.pk / admin123

# 6. Start adding content!
```

## 💾 File Locations

```
Backend:          nextWebSolutions_backend/
Admin Panel:      next_frontend/admin.html
Init Script:      nextWebSolutions_backend/init-db.js
Seed Script:      nextWebSolutions_backend/seed-demo-user.js
Config:           nextWebSolutions_backend/.env
Database Schema:  nextWebSolutions_backend/src/config/database.js
```

## 📚 For More Information

- **QUICK_START_GUIDE.md** - Quick setup (5 min)
- **SETUP_AND_TEST.md** - Detailed guide (20 min)
- **API_TEST_COMMANDS.md** - API examples
- **DEBUGGING_RESOLUTION.md** - Issue fixes

---

**Last Updated:** April 22, 2026  
**All Commands Tested:** ✅ Yes
