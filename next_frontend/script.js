
// ═══════════════════════════════════════
// CURSOR
// ═══════════════════════════════════════
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
(function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
})();
document.querySelectorAll('a, button, .btn, .nav-link, .filter-btn, .service-card, .portfolio-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width = '18px'; cursor.style.height = '18px'; ring.style.width = '50px'; ring.style.height = '50px'; });
    el.addEventListener('mouseleave', () => { cursor.style.width = '10px'; cursor.style.height = '10px'; ring.style.width = '36px'; ring.style.height = '36px'; });
});

// ═══════════════════════════════════════
// ROUTER
// ═══════════════════════════════════════
function navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link, .mobile-link').forEach(l => l.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    document.querySelectorAll('.nav-link, .mobile-link').forEach(l => {
        if (l.getAttribute('onclick') && l.getAttribute('onclick').includes("'" + page + "'")) l.classList.add('active');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(initReveal, 100);
    // Update aria-current
    document.querySelectorAll('.nav-link').forEach(l => {
        l.removeAttribute('aria-current');
        if (l.getAttribute('onclick') && l.getAttribute('onclick').includes("'" + page + "'")) l.setAttribute('aria-current', 'page');
    });
}

// ═══════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════
let menuOpen = false;
function toggleMenu() {
    menuOpen = !menuOpen;
    const menu = document.getElementById('mobileMenu');
    const btn = document.querySelector('.hamburger');
    menu.classList.toggle('open', menuOpen);
    btn.setAttribute('aria-expanded', menuOpen);
    const spans = btn.querySelectorAll('span');
    if (menuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
}

// ═══════════════════════════════════════
// PORTFOLIO FILTERS
// ═══════════════════════════════════════
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.textContent;
        loadPortfolioProjects(category);
    });
});

// ═══════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════
function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => { if (!el.classList.contains('visible')) observer.observe(el); });
}
initReveal();

// ═══════════════════════════════════════
// API CONFIGURATION
// ═══════════════════════════════════════
const API_BASE_URL = 'http://localhost:8000/api';

// ═══════════════════════════════════════
// FORM SUBMIT
// ═══════════════════════════════════════
async function submitForm(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const budget = document.getElementById('budget').value;
    const message = document.getElementById('message').value;
    const agreeToTerms = document.querySelector('input[type="checkbox"]').checked;

    if (!firstName || !lastName || !email || !service || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!agreeToTerms) {
        alert('You must agree to the Privacy Policy and Terms of Service.');
        return;
    }

    const btn = e.target;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/contact/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                phone,
                service,
                budget,
                message,
                agreeToTerms
            })
        });

        const data = await response.json();

        if (data.success) {
            btn.textContent = '✓ Sent!';
            btn.style.background = 'rgba(184,240,74,0.2)';
            btn.style.color = 'var(--green)';
            btn.style.border = '1.5px solid var(--green)';
            document.getElementById('successMsg').classList.add('show');
            document.querySelector('form')?.reset();
        } else {
            alert(`Error: ${data.message}`);
            btn.textContent = 'Send Message ↗';
            btn.disabled = false;
        }
    } catch (error) {
        console.error('Form submission error:', error);
        alert('Failed to send message. Please try again.');
        btn.textContent = 'Send Message ↗';
        btn.disabled = false;
    }
}

// ═══════════════════════════════════════
// NAVBAR SCROLL EFFECT
// ═══════════════════════════════════════
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    nav.style.background = window.scrollY > 20 ? 'rgba(5,5,5,0.97)' : 'rgba(5,5,5,0.85)';
});

// ═══════════════════════════════════════
// DATA FETCHING FUNCTIONS
// ═══════════════════════════════════════
async function loadTestimonials() {
    try {
        const response = await fetch(`${API_BASE_URL}/testimonials`);
        const data = await response.json();
        if (data.success) {
            populateTestimonials(data.data);
        }
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

function populateTestimonials(testimonials) {
    const container = document.querySelector('.testimonial-grid');
    console.log('populateTestimonials - Container found:', !!container, 'Records:', testimonials?.length);
    if (!container) {
        console.error('❌ Testimonial grid container not found!');
        return;
    }

    container.innerHTML = testimonials.slice(0, 3).map((testimonial, idx) => `
        <div class="testimonial-card reveal ${idx > 0 ? 'reveal-delay-' + idx : ''}">
            <div class="stars" aria-label="${testimonial.rating} stars">${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}</div>
            <p>"${testimonial.message}"</p>
            <div class="testimonial-author">
                <div class="author-avatar" style="background:var(--${['green', 'purple', 'blue'][idx % 3]})" aria-hidden="true">${testimonial.avatar_initials || 'N/A'}</div>
                <div>
                    <div class="author-name">${testimonial.name}</div>
                    <div class="author-role">${testimonial.role}</div>
                </div>
            </div>
        </div>
    `).join('');

    initReveal();
}

async function loadTeamMembers() {
    try {
        const response = await fetch(`${API_BASE_URL}/team`);
        const data = await response.json();
        if (data.success) {
            populateTeamMembers(data.data);
        }
    } catch (error) {
        console.error('Error loading team members:', error);
    }
}

function populateTeamMembers(members) {
    const container = document.querySelector('.team-grid');
    if (!container) return;

    container.innerHTML = members.map((member, idx) => `
        <div class="team-card reveal ${idx > 0 ? 'reveal-delay-' + idx : ''}">
            <div class="team-avatar" style="background:var(--${['green', 'purple', 'blue'][idx % 3]})" aria-hidden="true">${member.avatar_initials || 'N/A'}</div>
            <h3>${member.name}</h3>
            <div class="role">${member.role}</div>
            <p class="bio">${member.bio || ''}</p>
        </div>
    `).join('');

    initReveal();
}

async function loadServices() {
    try {
        const response = await fetch(`${API_BASE_URL}/services/services`);
        const data = await response.json();
        if (data.success) {
            populateServices(data.data);
        }
    } catch (error) {
        console.error('Error loading services:', error);
    }
}

function populateServices(services) {
    const container = document.querySelector('.services-grid');
    if (!container) return;

    container.innerHTML = services.map((service, idx) => `
        <div class="service-card reveal ${idx > 0 ? 'reveal-delay-' + (idx % 3) : ''}">
            <div class="service-num">${String(idx + 1).padStart(2, '0')}</div>
            <div class="card-icon"><i class="fa-solid fa-${service.icon_name || 'star'}"></i></div>
            <h3>${service.title}</h3>
            <p>${service.description || ''}</p>
            <div class="service-features">
                ${service.features.map(feature => `<div class="service-feature">${feature}</div>`).join('')}
            </div>
            <div class="service-cta">Explore Service <span>→</span></div>
        </div>
    `).join('');

    initReveal();
}

async function loadPricingPlans() {
    try {
        const response = await fetch(`${API_BASE_URL}/services/pricing`);
        const data = await response.json();
        if (data.success) {
            populatePricingPlans(data.data);
        }
    } catch (error) {
        console.error('Error loading pricing plans:', error);
    }
}

function populatePricingPlans(plans) {
    const container = document.querySelector('.pricing-grid');
    if (!container) return;

    container.innerHTML = plans.map((plan, idx) => `
        <div class="pricing-card reveal ${plan.featured ? 'featured' : ''} ${idx > 0 ? 'reveal-delay-' + (idx % 3) : ''}">
            <div class="plan-name">${plan.plan_name}</div>
            <div class="plan-price">${plan.price_pkr ? 'PKR ' + plan.price_pkr : 'Custom'} <span>/ ${plan.plan_type || 'project'}</span></div>
            <div class="plan-desc">${plan.description || ''}</div>
            <div class="plan-features">
                ${plan.features.map((feature, i) => {
                    const isIncluded = i < (plan.featured ? 6 : 5);
                    return `<div class="plan-feature"><span class="${isIncluded ? 'check' : 'cross'}">✓</span> ${feature}</div>`;
                }).join('')}
            </div>
            <a class="btn ${plan.featured ? 'btn-primary' : 'btn-outline'}" style="width:100%;justify-content:center" onclick="navigate('contact')">
                ${plan.featured ? 'Most Popular' : 'Get Started'} ${plan.featured ? '<span class="arrow">↗</span>' : ''}
            </a>
        </div>
    `).join('');

    initReveal();
}

async function loadPortfolioProjects(category = 'All') {
    try {
        const url = category === 'All' ? `${API_BASE_URL}/portfolio` : `${API_BASE_URL}/portfolio?category=${encodeURIComponent(category)}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
            populatePortfolioProjects(data.data);
        }
    } catch (error) {
        console.error('Error loading portfolio projects:', error);
    }
}

function populatePortfolioProjects(projects) {
    const container = document.querySelector('.portfolio-grid');
    if (!container) return;

    container.innerHTML = projects.map((project, idx) => `
        <div class="portfolio-card reveal ${idx > 0 ? 'reveal-delay-' + (idx % 2) : ''}">
            <div class="portfolio-thumb">
                <div class="portfolio-thumb-inner" style="background:linear-gradient(135deg,#0f3460,#533483)" aria-hidden="true">
                    ${project.thumbnail_url ? `<img src="${project.thumbnail_url}" alt="${project.title}" style="width:100%; height:100%; object-fit:cover;">` : 'PROJECT'}
                </div>
                <div class="portfolio-overlay" aria-hidden="true">
                    <a class="btn btn-primary" onclick="navigate('contact')">View Case Study ↗</a>
                </div>
            </div>
            <div class="portfolio-info">
                <h3>${project.title}</h3>
                <p>${project.description || ''}</p>
                <div class="portfolio-tags">
                    ${project.tags ? project.tags.split(',').map(tag => `<span class="ptag">${tag.trim()}</span>`).join('') : ''}
                </div>
            </div>
        </div>
    `).join('');

    initReveal();
}

async function loadCompanyValues() {
    try {
        const response = await fetch(`${API_BASE_URL}/company/values`);
        const data = await response.json();
        if (data.success) {
            populateValues(data.data);
        }
    } catch (error) {
        console.error('Error loading company values:', error);
    }
}

function populateValues(values) {
    const container = document.querySelector('.values-grid');
    if (!container) return;

    container.innerHTML = values.map((value, idx) => `
        <div class="value-card">
            <h4>
                <span><i class="fa-solid fa-${value.icon_name || 'star'}"></i></span>
                ${value.title}
            </h4>
            <p>${value.description || ''}</p>
        </div>
    `).join('');
}

async function loadTechStack() {
    try {
        const response = await fetch(`${API_BASE_URL}/company/tech-stack`);
        const data = await response.json();
        if (data.success) {
            populateTechStack(data.data);
        }
    } catch (error) {
        console.error('Error loading tech stack:', error);
    }
}

function populateTechStack(technologies) {
    const container = document.querySelector('.tech-stack');
    if (!container) return;

    container.innerHTML = technologies.map(tech => `
        <div class="tech-badge">${tech.name}</div>
    `).join('');
}

async function loadContactInfo() {
    try {
        const response = await fetch(`${API_BASE_URL}/company/contact-info`);
        const data = await response.json();
        if (data.success) {
            populateContactInfo(data.data);
        }
    } catch (error) {
        console.error('Error loading contact info:', error);
    }
}

function populateContactInfo(methods) {
    const container = document.querySelector('.contact-methods');
    if (!container) return;

    container.innerHTML = methods.map(method => `
        <div class="contact-method">
            <div class="method-icon" aria-hidden="true">
                <i class="fa-solid fa-${method.icon_name || 'circle'}"></i>
            </div>
            <div>
                <div class="method-label">${method.label}</div>
                <div class="method-value">${method.value}</div>
            </div>
        </div>
    `).join('');
}

// ═══════════════════════════════════════
// INITIALIZE DATA ON PAGE LOAD
// ═══════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOMContentLoaded fired - Loading all dynamic content...');
    console.log('API_BASE_URL:', API_BASE_URL);
    console.log('Testimonial grid:', document.querySelector('.testimonial-grid'));

    loadTestimonials();
    loadTeamMembers();
    loadServices();
    loadPricingPlans();
    loadPortfolioProjects();
    loadCompanyValues();
    loadTechStack();
    loadContactInfo();

    console.log('✅ All load functions called');
});
