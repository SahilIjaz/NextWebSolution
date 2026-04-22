# NextWeb Admin Panel - Complete Guide

Comprehensive guide for using the NextWeb Admin Panel to manage all website content.

## Overview

The admin panel is a full-featured interface for managing:
- Testimonials (with 5-star ratings)
- Team Members
- Services (with features)
- Pricing Plans
- Portfolio Projects
- Contact Form Submissions

## 🚀 Quick Start

### 1. Access the Admin Panel

Open the admin panel in your browser:
```
http://localhost:3000/next_frontend/admin.html
```

Or if serving differently:
```
file:///path/to/next_frontend/admin.html
```

### 2. Login

**Demo Credentials:**
- Email: admin@nextweb.pk
- Password: admin123
- Click "Login"

The system will authenticate you with a real JWT token. This demo account has full access to all features.

**Production (with real backend):**
- Use your registered admin email and password
- Token is stored in localStorage as `adminToken`

### 3. Navigate Dashboard

After login, you'll see the main dashboard with:
- 4 quick stat cards showing counts
- Recent contact submissions
- Navigation sidebar for different sections

## 📊 Dashboard

The dashboard shows:

**Stat Cards:**
- Contact Submissions (total count)
- Testimonials (total count)
- Team Members (total count)
- Projects (total count)

**Recent Contacts:**
- Shows last 5 contact form submissions
- Click any submission to view full details
- Auto-refreshes every 30 seconds

## ⭐ Managing Testimonials

### Add Testimonial

1. Click **"Testimonials"** in sidebar
2. Click **"+ Add Testimonial"** button
3. Fill in form:
   - **Name**: Client name
   - **Role/Company**: "CEO, Company Name"
   - **Message**: Testimonial text
   - **Rating**: 1-5 stars (select from dropdown)
   - **Avatar Initials**: 2-letter initials (e.g., "AH")
   - **Avatar Color**: Choose from Green, Purple, Blue
4. Click **"Save Testimonial"**

### View/Edit Testimonials

- Testimonials appear in a table
- Shows name, role, rating, and message preview
- **Edit**: Edit button (coming soon)
- **Delete**: Remove testimonial permanently

### Delete Testimonial

1. Find testimonial in table
2. Click **"Delete"** button
3. Confirm deletion

## 👥 Managing Team Members

### Add Team Member

1. Click **"Team Members"** in sidebar
2. Click **"+ Add Team Member"** button
3. Fill in form:
   - **Name**: Full name
   - **Role**: Job title (e.g., "React Developer")
   - **Email**: Email address
   - **Bio**: Short biography
   - **Avatar Initials**: 2-letter initials
   - **Avatar Color**: Choose from Green, Purple, Blue
4. Click **"Save Team Member"**

### View/Manage Team

- All team members display in table
- Shows name, role, email, and bio preview
- Edit or delete any member

## 🛠️ Managing Services

### Add Service

1. Click **"Services"** in sidebar
2. Click **"+ Add Service"** button
3. Fill in form:
   - **Title**: Service name (e.g., "Web Design")
   - **Description**: Service description
   - **Icon Name**: Font Awesome icon (e.g., "palette", "code", "chart-line")
   - **Features**: One feature per line:
     ```
     Feature 1
     Feature 2
     Feature 3
     Feature 4
     ```
   - **Display Order**: Number for ordering (1, 2, 3, etc.)
4. Click **"Save Service"**

### Font Awesome Icons

Common icons for services:
- `palette` - UI/UX Design
- `code` - Web Development
- `chart-line` - SEO/Analytics
- `hashtag` - Social Media
- `pen-nib` - Branding
- `rocket` - Marketing

### View/Manage Services

- Services display in table
- Shows title, description preview, feature count, order
- Edit or delete any service

## 💰 Managing Pricing Plans

### Add Pricing Plan

1. Click **"Pricing"** in sidebar
2. Click **"+ Add Pricing Plan"** button
3. Fill in form:
   - **Plan Name**: Name (e.g., "Starter", "Growth")
   - **Price (PKR)**: Price in Pakistani Rupees (or leave blank for "Custom")
   - **Description**: Plan description
   - **Plan Type**: Type (e.g., "project", "monthly")
   - **Features**: One feature per line:
     ```
     Feature 1
     Feature 2
     Feature 3
     ```
   - **Featured Plan**: Check to mark as featured/popular
   - **Display Order**: Number for ordering
4. Click **"Save Pricing Plan"**

### Pricing Plan Examples

**Starter Plan:**
- Price: 35000 PKR
- Features: Landing Page, Mobile Responsive, Basic SEO, Contact Form
- Featured: No

**Growth Plan:**
- Price: 75000 PKR
- Features: Multi-Page Website, Advanced Animations, SEO, CMS
- Featured: Yes (mark as most popular)

**Enterprise Plan:**
- Price: Custom (leave blank)
- Features: Everything in Growth + E-Commerce + Marketing
- Featured: No

### View/Manage Pricing

- Pricing plans display in table
- Shows plan name, price, description, featured status
- Edit or delete any plan

## 📁 Managing Portfolio Projects

### Add Project

1. Click **"Portfolio"** in sidebar
2. Click **"+ Add Project"** button
3. Fill in form:
   - **Title**: Project name
   - **Description**: Project description
   - **Category**: Select from:
     - Web Design
     - Development
     - Branding
     - Marketing
     - E-Commerce
   - **Thumbnail URL**: Image URL for portfolio grid
   - **Image URL**: Full project image URL
   - **Technologies**: Comma-separated list
     ```
     Next.js, React, Stripe
     ```
   - **Tags**: Comma-separated tags
     ```
     Next.js, Stripe, Sanity CMS
     ```
   - **Live Link**: URL to live project
   - **Case Study URL**: Link to case study or details
4. Click **"Save Project"**

### Project Categories

When adding a project, select one category:
- **Web Design** - Design-focused projects
- **Development** - Code-focused projects
- **Branding** - Branding and identity projects
- **Marketing** - Marketing campaigns and ads
- **E-Commerce** - E-commerce platforms

### Portfolio Filtering

When users visit the portfolio page, they can filter by:
- All (shows all projects)
- Web Design
- Development
- Branding
- Marketing

The projects you add with these categories will appear in the filtered views.

### View/Manage Projects

- Projects display in table
- Shows title, category, description, technologies
- Edit or delete any project

## 📧 Managing Contact Submissions

### View Contacts

1. Click **"Contact Forms"** in sidebar
2. See all contact form submissions in a table
3. Filter by status using dropdown:
   - All Status
   - New (unread)
   - Read (viewed)
   - Responded (replied to)
   - Archived

### View Contact Details

1. Click **"View"** button on any contact
2. Modal opens showing full details:
   - Name and email
   - Phone number
   - Service they're interested in
   - Budget range
   - Full message
   - Submission date/time
3. Change status using dropdown:
   - **new** → Just received
   - **read** → You've seen it
   - **responded** → You've replied
   - **archived** → Keep for records
4. Status updates immediately

### Delete Contact

- Click **"Delete"** button to remove submission permanently
- Use delete button in modal when viewing

## 🎨 Dashboard Cards & Stats

The dashboard automatically updates with:

**Stat Cards (auto-updating):**
- Contact Submissions: Total submissions count
- Testimonials: Total testimonials count
- Team Members: Total team members count
- Projects: Total portfolio projects count

**Recent Contacts:**
- Shows last 5 contact submissions
- Click any to view full details
- Refreshes every 30 seconds automatically

## 🔐 Authentication

### Login

```
Email: your-email@example.com
Password: your-password
```

In demo mode, any email/password works.

### Logout

Click **"Logout"** in sidebar to:
- Clear authentication token
- Return to login screen
- Require login on next visit

### Token Storage

Authentication token is stored in browser's localStorage:
- Key: `adminToken`
- Used for all API requests
- Expires based on JWT_EXPIRY (7 days default)

## 💾 Data Persistence

All data is saved to PostgreSQL database:

**Database Tables:**
- `testimonials` - Client testimonials
- `team_members` - Team profiles
- `services` - Service offerings
- `pricing_plans` - Pricing tiers
- `projects` - Portfolio projects
- `contacts` - Contact submissions

Data syncs automatically between:
- Admin panel (where you add data)
- Public website (where data displays)

## 🎯 Workflow Example

### Complete Setup Workflow

1. **Add Services** (first priority)
   - Define what your company offers
   - Add features for each service
   - Set display order (1, 2, 3...)

2. **Add Pricing Plans** (second priority)
   - Create Starter, Growth, Enterprise tiers
   - Set one as "Featured" (most popular)
   - Mark one as featured

3. **Add Team Members**
   - Add team bios
   - Upload initials and colors
   - Add email addresses

4. **Add Portfolio Projects**
   - Add 5-10 completed projects
   - Use proper categories
   - Add technologies and tags

5. **Add Testimonials**
   - Start with 2-3 initial testimonials
   - Add more as clients provide feedback
   - Focus on 5-star ratings

6. **Monitor Contacts**
   - Check dashboard regularly
   - Update contact status as you reply
   - Archive old submissions

## ⚠️ Important Notes

### Required Fields

When adding content, these fields are required:
- **Testimonials**: Name, Role, Message, Rating
- **Team**: Name, Role
- **Services**: Title
- **Pricing**: Plan Name
- **Projects**: Title, Category

### Optional Fields

These fields are optional:
- Email addresses
- Bio/Description text
- Icon names
- URLs

### Best Practices

1. **Use Descriptive Titles**
   - "UI/UX Design" ✓
   - "Design" ✗

2. **Complete Project Info**
   - Add technologies used
   - Include live links when possible
   - Add at least a brief description

3. **Organize with Order Numbers**
   - Services: 1, 2, 3 (order they appear)
   - Pricing: 1, 2, 3 (Starter, Growth, Enterprise)

4. **Use Consistent Avatar Colors**
   - Green for first person
   - Purple for second
   - Blue for third

5. **Regular Updates**
   - Add new projects regularly
   - Update testimonials as received
   - Monitor contact submissions daily

## 🔧 Troubleshooting

### Can't Login

1. Check backend is running: `npm run dev` in backend folder
2. Verify API_BASE_URL in admin-script.js points to correct server
3. Check browser console (F12) for error messages

### Changes Not Appearing

1. Refresh the admin page
2. Verify API response in Network tab (F12 DevTools)
3. Check database connection in backend .env

### Modal Won't Close

1. Click X button or click outside modal
2. Click "Cancel" or close button
3. If stuck, refresh the page

### Missing Data

1. Make sure you saved the form
2. Wait for "success" toast notification
3. Check if page reloaded to show new data

## 📱 Responsive Design

The admin panel works on:
- **Desktop** (1920x1080+) - Full sidebar
- **Tablet** (768px) - Collapsible sidebar
- **Mobile** (480px) - Hamburger menu, stacked layout

All forms are mobile-responsive and easy to fill on any device.

## 🚀 Advanced Features

### Coming Soon

- Edit existing items (currently add/delete)
- Bulk operations (delete multiple)
- Import/Export data
- Backup functionality
- Search and filtering on all tables
- Image upload (instead of URL)

## 📞 Support

For issues or questions:

1. Check browser console (F12) for errors
2. Verify backend API is running
3. Check database connection
4. Review API endpoints documentation

---

**Status:** ✅ Complete and Ready
**Version:** 1.0
**Last Updated:** April 22, 2026

Happy managing! 🚀
