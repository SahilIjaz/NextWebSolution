# NextWeb - Quick Start Guide

Get the NextWeb application running in 5 minutes.

## Prerequisites

- Node.js (v14+)
- PostgreSQL (running and accessible)
- Git

## 1️⃣ Backend Setup (5 minutes)

### Step 1: Navigate to backend
```bash
cd nextWebSolutions_backend
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Update .env file
Edit `.env` with your PostgreSQL credentials:
```
PORT=8000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/nextweb_db
JWT_SECRET=nextweb_solutions_super_secret_key_2024
JWT_EXPIRY=7d
FRONTEND_URL=http://localhost:3000
```

### Step 4: Create and initialize database
```bash
# Create database
createdb nextweb_db

# Run schema
psql -U postgres -d nextweb_db -f db/schema.sql
```

### Step 5: Start backend server
```bash
npm run dev
```

Expected output:
```
✅ Database Connected Successfully
✅ Server running on http://localhost:8000
🔗 Health Check: http://localhost:8000/api/health
```

## 2️⃣ Frontend Setup (1 minute)

### Step 1: Open frontend in browser
```bash
# Simple approach: Open the HTML file directly
open next_frontend/index.html
# or
firefox next_frontend/index.html
```

Or serve via HTTP server:
```bash
# If you have Python 3
cd next_frontend
python -m http.server 3000

# If you have Node.js
npx http-server next_frontend -p 3000
```

Then open: `http://localhost:3000/next_frontend/index.html`

### Step 2: Verify frontend loads
- Should see NextWeb homepage
- Check browser console (F12) for any errors
- Network tab should show API calls

## 3️⃣ Test the Integration (2 minutes)

### Test 1: Contact Form
1. Navigate to Contact page (or scroll to form)
2. Fill out form with:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Service: Web Design & Development
   - Message: Test message
3. Check "I agree to Privacy Policy..."
4. Click "Send Message"
5. Should see success message ✓

### Test 2: Check Console
1. Open DevTools (F12)
2. Go to Console tab
3. Should see API logs and no errors
4. Network tab should show successful POST to /api/contact/submit

### Test 3: Verify Data Load
1. Check Testimonials section loads (home page)
2. Check Services load (services page)
3. Check Pricing displays (services page)
4. Check Team shows (about page)
5. Check Portfolio loads (portfolio page)

## 4️⃣ Add Sample Data (Optional)

### Add Testimonial via API
```bash
curl -X POST http://localhost:8000/api/testimonials \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Sample Client",
    "role": "CEO",
    "message": "Great work!",
    "rating": 5,
    "avatarInitials": "SC",
    "avatarColor": "var(--green)"
  }'
```

### Add Team Member via API
```bash
curl -X POST http://localhost:8000/api/team \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "John Doe",
    "role": "Developer",
    "bio": "Experienced developer...",
    "avatarInitials": "JD",
    "avatarColor": "var(--blue)",
    "email": "john@nextweb.pk"
  }'
```

### Add Portfolio Project via API
```bash
curl -X POST http://localhost:8000/api/portfolio \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "New Project",
    "description": "Project description...",
    "category": "Web Design",
    "tags": "React, Next.js, Tailwind",
    "technologies": "Next.js"
  }'
```

## 5️⃣ Troubleshooting

### Backend won't start
```bash
# Check if port 8000 is in use
lsof -i :8000

# Check database connection
psql -U postgres -d nextweb_db -c "SELECT NOW();"

# Verify .env file is correct
cat .env
```

### Frontend shows API errors
1. Check backend is running on port 8000
2. Verify API_BASE_URL in script.js matches backend
3. Check CORS in .env FRONTEND_URL
4. Open browser console (F12) to see error details

### Database errors
```bash
# Recreate database
dropdb nextweb_db
createdb nextweb_db
psql -U postgres -d nextweb_db -f db/schema.sql
```

### CORS issues
In `nextWebSolutions_backend/.env`:
```
FRONTEND_URL=http://localhost:3000
```

In `next_frontend/script.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

## 📁 Project Structure

```
NextWeb/
├── nextWebSolutions_backend/    # Backend API
│   ├── src/
│   │   ├── controllers/         # Business logic
│   │   ├── routes/              # API routes
│   │   └── server.js            # Express app
│   ├── db/
│   │   └── schema.sql           # Database
│   ├── .env                     # Config
│   ├── package.json
│   └── README.md
├── next_frontend/               # Frontend HTML/JS
│   ├── index.html
│   ├── script.js
│   └── style.css
└── IMPLEMENTATION_SUMMARY.md
```

## 🚀 Production Checklist

Before deploying:

- [ ] Update FRONTEND_URL in backend .env
- [ ] Update API_BASE_URL in frontend script.js
- [ ] Generate strong JWT_SECRET
- [ ] Set NODE_ENV=production
- [ ] Configure database with production credentials
- [ ] Test all API endpoints
- [ ] Run database backups
- [ ] Set up error logging
- [ ] Configure email notifications for contact forms
- [ ] SSL/HTTPS configuration
- [ ] Rate limiting on contact endpoint

## 📚 Documentation

- **README.md** - Backend setup and endpoints
- **API_INTEGRATION_GUIDE.md** - Detailed API documentation
- **IMPLEMENTATION_SUMMARY.md** - What was built
- **QUICK_START.md** - This file

## 🔗 Useful Links

- Backend Health Check: `http://localhost:8000/api/health`
- Frontend: `http://localhost:3000/next_frontend/index.html`
- API Base: `http://localhost:8000/api`

## 💡 Tips

### Auto-reload on code changes
Backend already uses nodemon, just save and reload.

### Database GUI
Use pgAdmin or DBeaver to view/manage PostgreSQL:
```bash
# Or use psql CLI
psql -U postgres -d nextweb_db
```

### API Testing
Use Postman or curl:
```bash
curl http://localhost:8000/api/health
```

### Clear all data (reset for testing)
```bash
psql -U postgres -d nextweb_db -f db/schema.sql
```

## ✅ Done!

Your NextWeb application is now running. You can:

1. ✅ Access the frontend on `http://localhost:3000`
2. ✅ Submit the contact form
3. ✅ View testimonials, team, services, pricing, portfolio
4. ✅ Use admin APIs to manage content

For detailed API documentation, see **API_INTEGRATION_GUIDE.md**

---

**Need help?** Check the documentation files or review the implementation summary.
