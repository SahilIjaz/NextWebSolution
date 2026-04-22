# 🚀 Setup & Testing Guide

Complete guide to set up the NextWeb project and test all functionality.

## ✅ Prerequisites

- Node.js v16+ installed
- PostgreSQL database running
- Git (optional)

## 📋 Setup Steps

### 1. Initialize Database

This creates all necessary tables and indexes:

```bash
cd nextWebSolutions_backend
node init-db.js
```

**Expected Output:**
```
✓ Table "users": ✅ EXISTS
✓ Table "contacts": ✅ EXISTS
✓ Table "projects": ✅ EXISTS
✓ Table "testimonials": ✅ EXISTS
✓ Table "team_members": ✅ EXISTS
✓ Table "services": ✅ EXISTS
✓ Table "pricing_plans": ✅ EXISTS

📝 Creating tables if missing...
📝 Adding missing columns if needed...
✓ Missing columns added to projects table
✓ users table ready
✓ contacts table ready
✓ projects table ready
✓ testimonials table ready
✓ team_members table ready
✓ services table ready
✓ pricing_plans table ready

📊 Creating indexes...
✓ Indexes created

✅ Database initialization complete!
```

### 2. Seed Demo Admin User

This creates a demo account for testing:

```bash
cd nextWebSolutions_backend
node seed-demo-user.js
```

**Expected Output:**
```
🌱 Seeding demo admin user...

✅ Demo user created successfully!

📋 Demo Credentials:
   Email: admin@nextweb.pk
   Password: admin123

Use these credentials to login to the admin panel.
```

### 3. Start Backend Server

```bash
cd nextWebSolutions_backend
npm run dev
```

**Expected Output:**
```
✅ Server running on http://localhost:8000
📊 Database connected successfully
```

### 4. Access Admin Panel

Open in your browser:
```
http://localhost:3000/next_frontend/admin.html
```

Or if you're serving locally:
```
file:///path/to/NextWeb/next_frontend/admin.html
```

### 5. Login to Admin Panel

Use these credentials:
- **Email:** admin@nextweb.pk
- **Password:** admin123

## 🧪 Test All Features

### Test Team Member Creation ✅

1. **Go to Dashboard** → Click "Team Members" in sidebar
2. **Click** "+ Add Team Member" button
3. **Fill the form:**
   - Name: "Ahmed Hassan"
   - Role: "Lead Developer"
   - Email: "ahmed@example.com"
   - Bio: "Expert in full-stack web development"
   - Avatar Initials: "AH"
   - Avatar Color: "Green"
4. **Click** "Save Team Member"
5. **Expected Result:** 
   - Success toast notification appears
   - Team member appears in the table below

### Test Testimonial Creation ✅

1. **Go to Dashboard** → Click "Testimonials" in sidebar
2. **Click** "+ Add Testimonial" button
3. **Fill the form:**
   - Name: "Sarah Khan"
   - Role: "CEO, Tech Startup"
   - Message: "NextWeb transformed our online presence completely"
   - Rating: "⭐⭐⭐⭐⭐ Excellent"
   - Avatar Initials: "SK"
   - Avatar Color: "Purple"
4. **Click** "Save Testimonial"
5. **Expected Result:** 
   - Success toast notification appears
   - Testimonial appears in the table

### Test Service Creation ✅

1. **Go to Dashboard** → Click "Services" in sidebar
2. **Click** "+ Add Service" button
3. **Fill the form:**
   - Title: "Web Design"
   - Description: "Beautiful, responsive web designs"
   - Icon Name: "palette"
   - Features: (type one per line)
     ```
     Mobile Responsive Design
     UI/UX Optimization
     Performance Optimization
     Accessibility Compliance
     ```
   - Display Order: "1"
4. **Click** "Save Service"
5. **Expected Result:**
   - Success toast notification appears
   - Service appears in the table

### Test Pricing Plan Creation ✅

1. **Go to Dashboard** → Click "Pricing" in sidebar
2. **Click** "+ Add Pricing Plan" button
3. **Fill the form:**
   - Plan Name: "Starter"
   - Price: "35000" (in PKR)
   - Description: "Perfect for startups and small projects"
   - Plan Type: "project"
   - Features: (type one per line)
     ```
     Landing Page Design
     Mobile Responsive
     Basic SEO Setup
     Contact Form
     2 Revisions
     ```
   - Featured: Check this box
   - Display Order: "1"
4. **Click** "Save Pricing Plan"
5. **Expected Result:**
   - Success toast notification appears
   - Pricing plan appears in the table

### Test Portfolio Project Creation ✅

1. **Go to Dashboard** → Click "Portfolio" in sidebar
2. **Click** "+ Add Project" button
3. **Fill the form:**
   - Title: "LuxCart — E-Commerce Platform"
   - Description: "Full-stack Next.js e-commerce platform with Stripe"
   - Category: "Development"
   - Thumbnail URL: "https://via.placeholder.com/400x300"
   - Image URL: "https://via.placeholder.com/1200x800"
   - Technologies: "Next.js, React, Stripe, Tailwind CSS"
   - Tags: "Next.js, E-Commerce, Stripe"
   - Live Link: "https://example.com"
   - Case Study URL: "https://example.com/case-study"
4. **Click** "Save Project"
5. **Expected Result:**
   - Success toast notification appears
   - Project appears in the table

### Test Contact Form Management ✅

1. **Go to Dashboard** → Click "Contact Forms" in sidebar
2. **You should see** any contact submissions
3. **Click** "View" button on any contact
4. **Modal opens with:**
   - Full contact details
   - Status dropdown
5. **Change status** from "new" to "read"
6. **Expected Result:**
   - Status updates immediately
   - Database is updated

## 🔍 Troubleshooting

### Error: "Failed to save team"

**Solution:** 
1. Make sure the backend is running: `npm run dev`
2. Open browser DevTools (F12) → Network tab
3. Try again and check the response
4. Make sure you logged in with: admin@nextweb.pk / admin123

### Error: "Can't login"

**Solution:**
1. Run the seed script: `node seed-demo-user.js`
2. Use credentials: admin@nextweb.pk / admin123
3. Verify backend is running
4. Check .env file has proper DATABASE_URL and JWT_SECRET

### Error: "Database tables missing"

**Solution:**
1. Run: `node init-db.js`
2. Check database connection in .env
3. Verify PostgreSQL is running

### Changes not appearing

**Solution:**
1. Check browser console (F12) for errors
2. Check Network tab → see if API returned success
3. Refresh page if needed
4. Check database connection

## 📊 Database Tables

All tables are automatically created:

- **users** - Admin user accounts
- **team_members** - Team profile data
- **testimonials** - Client testimonials
- **services** - Service offerings
- **pricing_plans** - Pricing tiers
- **projects** - Portfolio projects
- **contacts** - Contact form submissions

## 🚀 Next Steps

After setup and testing:

1. **Add your content** using the admin panel
2. **Customize credentials** - Create your own admin account via register endpoint
3. **Deploy to production** - Update API_BASE_URL in admin-script.js
4. **Monitor contacts** - Check contact submissions regularly

## 📞 Quick Commands

**Initialize everything:**
```bash
cd nextWebSolutions_backend
node init-db.js
node seed-demo-user.js
npm run dev
```

**Then open:** http://localhost:3000/next_frontend/admin.html

**Login with:** admin@nextweb.pk / admin123

## ✨ You're All Set!

The admin panel is fully operational and ready to manage your website content.

---

**Status:** ✅ Ready to Use
**Last Updated:** April 22, 2026
**Version:** 1.0
