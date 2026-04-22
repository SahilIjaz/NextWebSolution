# 📋 Hardcoded Data Audit

Complete audit of all hardcoded data in the frontend that should be coming from the backend API. These sections currently have static HTML but should fetch from database.

## 📊 Summary

| Section | Status | Items | Priority |
|---------|--------|-------|----------|
| Testimonials | ❌ Hardcoded | 3 | HIGH |
| Services | ❌ Hardcoded | 6 | HIGH |
| Pricing Plans | ❌ Hardcoded | 3 | HIGH |
| Portfolio Projects | ❌ Hardcoded | 6+ | HIGH |
| Tech Stack/Badges | ❌ Hardcoded | 17 | LOW |
| Team Members | ✅ **DONE** | 3 | COMPLETE |

---

## 1️⃣ TESTIMONIALS (3 items hardcoded)

**Current Status:** Hardcoded HTML  
**Should Be:** Fetched from API `/api/testimonials`  
**Priority:** HIGH

### Hardcoded Testimonials:

1. **Ahmed Hassan** - CEO, TechStart Lahore
   - Rating: 5 stars
   - Message: "NextWeb transformed our entire online presence..."
   - Avatar: AH (green)

2. **Sara Rahim** - Founder, StyleBoutique.pk
   - Rating: 5 stars
   - Message: "From branding to deployment, the entire team..."
   - Avatar: SR (purple)

3. **Kamran Malik** - Director, ProFinance Solutions
   - Rating: 5 stars
   - Message: "Outstanding SEO work. We went from page 4..."
   - Avatar: KM (blue)

### What Needs to Happen:

```javascript
// Current: HTML is static, hardcoded
<div class="testimonial-grid">
    <div class="testimonial-card">
        <div class="stars">★★★★★</div>
        <p>"NextWeb transformed..."</p>
        // ... hardcoded avatar, author, role
    </div>
</div>

// Should Be: Fetched from API
async function loadTestimonials() {
    const response = await fetch(`${API_BASE_URL}/testimonials`);
    const data = await response.json();
    populateTestimonials(data.data);
}
```

### Database Fields Required:
- `id` - Unique identifier
- `name` - Author name
- `role` - Author role/company
- `message` - Testimonial text
- `rating` - 1-5 stars
- `avatar_initials` - 2-letter initials
- `avatar_color` - Color name (green, purple, blue)

**API Endpoint:** Already implemented ✅  
**Frontend Function:** Already exists ✅  
**Database Table:** Already exists ✅

---

## 2️⃣ SERVICES (6 items hardcoded)

**Current Status:** Hardcoded HTML  
**Should Be:** Fetched from API `/api/services/services`  
**Priority:** HIGH

### Hardcoded Services:

1. **UI/UX Design** (01)
   - Icon: palette
   - Features: User Research, Wireframing, Design System, Usability Testing

2. **Web Development** (02)
   - Icon: code
   - Features: Next.js/React, E-Commerce, API Integration, Performance

3. **SEO & PPC** (03)
   - Icon: chart-line
   - Features: Technical SEO, Content Strategy, Google/Meta Ads, Analytics

4. **Social Media Management** (04)
   - Icon: hashtag
   - Features: Content Calendar, Graphic/Video, Audience Growth, Influencer

5. **Branding & Identity** (05)
   - Icon: pen-nib
   - Features: Logo, Brand Guidelines, Collateral, Strategy

6. **Marketing Consulting** (06)
   - Icon: rocket
   - Features: Market Research, Go-To-Market, Funnel Optimization, Growth Hacking

### What Needs to Happen:

```javascript
// Current: Services are hardcoded with features
<div class="service-card">
    <div class="service-num">01</div>
    <div class="card-icon"><i class="fa-solid fa-palette"></i></div>
    <h3>UI/UX Design</h3>
    // ... hardcoded features list
</div>

// Should Be: Fetched from API
async function loadServices() {
    const response = await fetch(`${API_BASE_URL}/services/services`);
    const data = await response.json();
    populateServices(data.data);
}
```

### Database Fields Required:
- `id` - Unique identifier
- `title` - Service name
- `description` - Service description
- `icon_name` - Font Awesome icon name
- `features` - Array/JSON of features
- `display_order` - Sort order (1-6)

**API Endpoint:** Already implemented ✅  
**Frontend Function:** Already exists ✅  
**Database Table:** Already exists ✅

---

## 3️⃣ PRICING PLANS (3 items hardcoded)

**Current Status:** Hardcoded HTML  
**Should Be:** Fetched from API `/api/services/pricing`  
**Priority:** HIGH

### Hardcoded Pricing Plans:

1. **Starter** - PKR 35K / project
   - Features: Landing Page, Mobile, SEO, Contact Form, 2 Revisions
   - Featured: No

2. **Growth** - PKR 75K / project (⭐ Featured/Most Popular)
   - Features: Multi-Page Website, Advanced Animations, SEO, CMS, 5 Revisions, 1 Month Support
   - Featured: Yes

3. **Enterprise** - Custom / project
   - Features: Everything in Growth + E-Commerce + Apps + Marketing + Dedicated Manager + Unlimited Revisions + 6 Months Support
   - Featured: No

### What Needs to Happen:

```javascript
// Current: Pricing is hardcoded with features
<div class="pricing-card featured">
    <div class="plan-name">Growth</div>
    <div class="plan-price">PKR 75K <span>/ project</span></div>
    // ... hardcoded features with checkmarks
</div>

// Should Be: Fetched from API
async function loadPricingPlans() {
    const response = await fetch(`${API_BASE_URL}/services/pricing`);
    const data = await response.json();
    populatePricingPlans(data.data);
}
```

### Database Fields Required:
- `id` - Unique identifier
- `plan_name` - Plan name
- `description` - Plan description
- `price_pkr` - Price in PKR
- `price_currency` - Currency (PKR, USD, etc.)
- `plan_type` - Type (project, monthly, etc.)
- `features` - Array/JSON of features
- `featured` - Boolean (is this featured/popular?)
- `display_order` - Sort order (1-3)

**API Endpoint:** Already implemented ✅  
**Frontend Function:** Already exists ✅  
**Database Table:** Already exists ✅

---

## 4️⃣ PORTFOLIO PROJECTS (6+ items hardcoded)

**Current Status:** Hardcoded HTML  
**Should Be:** Fetched from API `/api/portfolio`  
**Priority:** HIGH

### Hardcoded Projects:

1. **LuxCart — Premium E-Commerce Platform**
   - Category: Development
   - Tags: Next.js, Stripe, Sanity CMS, Tailwind
   - Description: Full-stack Next.js e-commerce with Stripe payments...

2. **FarmLink — AgriTech SaaS Dashboard**
   - Category: Development
   - Tags: React, Node.js, Charts
   - Description: Real-time analytics dashboard for agricultural supply chain...

3. **ProFinance — Financial Consultancy Site**
   - Category: Web Design
   - Tags: Web Design, SEO, Branding
   - Description: Conversion-optimized landing page with SEO strategy...

4. **StyleBoutique — Fashion Brand Identity**
   - Category: Branding
   - Tags: Branding, Identity, Print
   - Description: Complete brand identity system...

5. **RealtyPro — Google Ads Campaign**
   - Category: Marketing
   - Tags: Google Ads, PPC, Analytics
   - Description: Performance marketing campaign generating 400+ leads...

6. **Restaurant Website** (and more...)
   - Category: (various)
   - Tags: (various)

### What Needs to Happen:

```javascript
// Current: Projects are hardcoded with filtering
<div class="portfolio-card">
    <div class="portfolio-thumb">
        <div class="portfolio-thumb-inner" style="...">ECOM</div>
    </div>
    <div class="portfolio-info">
        <h3>LuxCart — Premium E-Commerce Platform</h3>
        // ... hardcoded tags and description
    </div>
</div>

// Should Be: Fetched from API with filtering
async function loadPortfolioProjects() {
    const response = await fetch(`${API_BASE_URL}/portfolio`);
    const data = await response.json();
    populatePortfolioProjects(data.data);
}

// Category filtering should also use API
async function filterByCategory(category) {
    const url = category === 'All' 
        ? `${API_BASE_URL}/portfolio`
        : `${API_BASE_URL}/portfolio?category=${category}`;
    const response = await fetch(url);
    // ...
}
```

### Database Fields Required:
- `id` - Unique identifier
- `title` - Project name
- `description` - Project description
- `category` - Category (Web Design, Development, Branding, Marketing, E-Commerce)
- `thumbnail_url` - Image thumbnail URL
- `image_url` - Full project image URL
- `technologies` - Comma-separated technologies
- `tags` - Comma-separated tags
- `live_link` - URL to live project
- `case_study_url` - URL to case study

**API Endpoint:** Already implemented ✅  
**Frontend Function:** Already exists ✅  
**Database Table:** Already exists ✅

---

## 5️⃣ TECH STACK BADGES (17 items hardcoded)

**Current Status:** Hardcoded HTML  
**Should Be:** Could be fetched from API or kept hardcoded  
**Priority:** LOW

### Hardcoded Tech Badges:

```
React, Next.js, TypeScript, Node.js, Tailwind CSS, Figma, Framer Motion,
PostgreSQL, MongoDB, AWS, Vercel, Stripe, Sanity CMS, WordPress, 
Google Ads, Meta Business, Semrush, GA4
```

### Notes:
- These are typically reference data (static)
- Could stay hardcoded for performance
- OR create `/api/tech-stack` endpoint
- Not critical to make dynamic

---

## 📈 Implementation Priority

### Phase 1 (Already Done ✅)
- ✅ Team Members - COMPLETE
- ✅ API endpoints created
- ✅ Database tables ready

### Phase 2 (Recommended Next)
1. **Testimonials** - Easy, 3 items
   - Endpoint: Already working ✅
   - Function: Already exists ✅
   - Just need to replace HTML

2. **Services** - Easy, 6 items
   - Endpoint: Already working ✅
   - Function: Already exists ✅
   - Just need to replace HTML

3. **Pricing Plans** - Easy, 3 items
   - Endpoint: Already working ✅
   - Function: Already exists ✅
   - Just need to replace HTML

### Phase 3 (After Phase 2)
4. **Portfolio Projects** - Medium complexity
   - Endpoint: Already working ✅
   - Function: Already exists ✅
   - Need to handle category filtering

### Phase 4 (Optional)
5. **Tech Stack** - Low priority
   - Can stay hardcoded
   - OR create simple endpoint

---

## 🎯 What's Already Ready

All backend infrastructure is already in place:

✅ Database tables exist  
✅ API endpoints created  
✅ Frontend functions exist  
✅ Authentication working  

**What needs to be done:** Replace hardcoded HTML with API calls

---

## 🔄 Data Flow (Once Implemented)

```
Database
    ↓
API Endpoint
    ↓
Frontend fetch()
    ↓
Populate Function
    ↓
Dynamic HTML Render
    ↓
Website Display
```

---

## 📝 Checklist for Full Implementation

### Testimonials
- [ ] Remove hardcoded testimonial cards from HTML
- [ ] Create seed script: `seed-testimonials.js`
- [ ] Add testimonial data to database
- [ ] Verify `loadTestimonials()` loads correctly
- [ ] Test on website

### Services
- [ ] Remove hardcoded service cards from HTML
- [ ] Create seed script: `seed-services.js`
- [ ] Add service data to database
- [ ] Verify `loadServices()` loads correctly
- [ ] Test on website

### Pricing Plans
- [ ] Remove hardcoded pricing cards from HTML
- [ ] Create seed script: `seed-pricing.js`
- [ ] Add pricing data to database
- [ ] Verify `loadPricingPlans()` loads correctly
- [ ] Test on website

### Portfolio Projects
- [ ] Remove hardcoded project cards from HTML
- [ ] Create seed script: `seed-portfolio.js`
- [ ] Add project data to database
- [ ] Verify category filtering works
- [ ] Verify `loadPortfolioProjects()` loads correctly
- [ ] Test on website

---

## 🚀 Quick Start Commands

Once you're ready to migrate:

```bash
# 1. Seed testimonials
node seed-testimonials.js

# 2. Seed services
node seed-services.js

# 3. Seed pricing
node seed-pricing.js

# 4. Seed portfolio
node seed-portfolio.js

# 5. Remove hardcoded HTML from index.html

# 6. Test on website
# http://localhost:3000/next_frontend/index.html
```

---

## 💡 Summary

**Status:** Backend 100% ready, frontend 50% integrated

**Done:** Team members are fetching from database ✅

**To Do:** Testimonials, Services, Pricing, Portfolio - same process

**Time to Complete:** ~30 minutes for all 4 sections

**Next Step:** Let me know which section you want to integrate next!

---

**Date:** April 22, 2026  
**Status:** Audit Complete  
**All Systems:** Ready for Data Migration
