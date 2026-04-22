// ═══════════════════════════════════════════════════════════════
// ADMIN PANEL SCRIPT
// ═══════════════════════════════════════════════════════════════

const API_BASE_URL = 'http://localhost:8000/api';
let authToken = localStorage.getItem('adminToken');
let currentContactId = null;

// ═══════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    if (!authToken) {
        showLoginForm();
    } else {
        initAdmin();
    }
});

function initAdmin() {
    loadDashboard();
    loadTestimonials();
    loadTeamMembers();
    loadServices();
    loadPricingPlans();
    loadProjects();
    loadContacts();
    setInterval(loadContacts, 30000); // Refresh contacts every 30 seconds
}

// ═══════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════

function showLoginForm() {
    document.body.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #0a0a0a;">
            <div style="background: #050505; border: 1px solid #1f2937; border-radius: 10px; padding: 40px; max-width: 400px; width: 100%;">
                <h1 style="color: #b8f04a; margin-bottom: 30px; text-align: center;">NextWeb Admin</h1>
                <form onsubmit="handleLogin(event)">
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; color: #fff; font-weight: 500;">Email</label>
                        <input type="email" id="login-email" required style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid #1f2937; color: #fff; border-radius: 5px;">
                    </div>
                    <div style="margin-bottom: 30px;">
                        <label style="display: block; margin-bottom: 8px; color: #fff; font-weight: 500;">Password</label>
                        <input type="password" id="login-password" required style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid #1f2937; color: #fff; border-radius: 5px;">
                    </div>
                    <button type="submit" style="width: 100%; padding: 12px; background: #b8f04a; color: #050505; border: none; border-radius: 5px; font-weight: 600; cursor: pointer;">Login</button>
                </form>
                <p style="color: #6b7280; font-size: 0.9rem; margin-top: 20px; text-align: center;">
                    Demo: Use any email and password to login
                </p>
            </div>
        </div>
    `;
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success && data.data && data.data.token) {
            authToken = data.data.token;
            localStorage.setItem('adminToken', authToken);
            localStorage.setItem('userEmail', email);
            document.getElementById('user-name').textContent = email;
            location.reload();
        } else {
            // Demo mode: allow any login
            authToken = 'demo-token-' + btoa(email + ':' + password);
            localStorage.setItem('adminToken', authToken);
            localStorage.setItem('userEmail', email);
            document.getElementById('user-name').textContent = email;
            location.reload();
        }
    } catch (error) {
        console.error('Login error:', error);
        // For demo, allow login with any credentials
        authToken = 'demo-token-' + btoa(email + ':' + password);
        localStorage.setItem('adminToken', authToken);
        localStorage.setItem('userEmail', email);
        location.reload();
    }
}

function logout() {
    localStorage.removeItem('adminToken');
    authToken = null;
    location.reload();
}

// ═══════════════════════════════════════════════════════════════
// UI FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected tab
    const tab = document.getElementById(tabName);
    if (tab) {
        tab.classList.add('active');
    }

    // Mark nav item as active
    document.querySelector(`.nav-item[data-tab="${tabName}"]`)?.classList.add('active');

    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        testimonials: 'Testimonials',
        team: 'Team Members',
        services: 'Services',
        pricing: 'Pricing Plans',
        projects: 'Portfolio Projects',
        contacts: 'Contact Submissions'
    };

    document.getElementById('page-title').textContent = titles[tabName] || tabName;
}

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}

function openModal(type) {
    const modal = document.getElementById('modal');
    modal.classList.add('active');

    // Hide all forms
    document.querySelectorAll('.form-content').forEach(form => {
        form.classList.remove('active');
    });

    // Show selected form
    const form = document.getElementById(`form-${type}`);
    if (form) {
        form.classList.add('active');
    }

    // Clear form fields if not viewing existing item
    if (type !== 'contact') {
        clearForm(type);
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    clearAllForms();
}

function clearAllForms() {
    document.querySelectorAll('form').forEach(form => {
        form.reset();
    });
}

function clearForm(type) {
    const form = document.getElementById(`form-${type}`)?.querySelector('form');
    if (form) {
        form.reset();
    }
}

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    if (isError) {
        toast.classList.add('error');
    } else {
        toast.classList.remove('error');
    }
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ═══════════════════════════════════════════════════════════════
// FORM SUBMISSION
// ═══════════════════════════════════════════════════════════════

async function submitForm(event, type) {
    event.preventDefault();

    let formData = {};
    let endpoint = '';
    let method = 'POST';

    if (type === 'testimonial') {
        formData = {
            name: document.getElementById('testimonial-name').value,
            role: document.getElementById('testimonial-role').value,
            message: document.getElementById('testimonial-message').value,
            rating: parseInt(document.getElementById('testimonial-rating').value),
            avatarInitials: document.getElementById('testimonial-initials').value,
            avatarColor: document.getElementById('testimonial-color').value
        };
        endpoint = '/testimonials';
    } else if (type === 'team') {
        formData = {
            name: document.getElementById('team-name').value,
            role: document.getElementById('team-role').value,
            email: document.getElementById('team-email').value,
            bio: document.getElementById('team-bio').value,
            avatarInitials: document.getElementById('team-initials').value,
            avatarColor: document.getElementById('team-color').value
        };
        endpoint = '/team';
    } else if (type === 'service') {
        const features = document.getElementById('service-features').value
            .split('\n')
            .filter(f => f.trim())
            .map(f => f.trim());

        formData = {
            title: document.getElementById('service-title').value,
            description: document.getElementById('service-description').value,
            iconName: document.getElementById('service-icon').value,
            features: features,
            displayOrder: parseInt(document.getElementById('service-order').value)
        };
        endpoint = '/services/services';
    } else if (type === 'pricing') {
        const features = document.getElementById('pricing-features').value
            .split('\n')
            .filter(f => f.trim())
            .map(f => f.trim());

        formData = {
            planName: document.getElementById('pricing-name').value,
            description: document.getElementById('pricing-description').value,
            pricePkr: document.getElementById('pricing-price').value ? parseInt(document.getElementById('pricing-price').value) : null,
            priceCurrency: 'PKR',
            planType: document.getElementById('pricing-type').value,
            features: features,
            featured: document.getElementById('pricing-featured').checked,
            displayOrder: parseInt(document.getElementById('pricing-order').value)
        };
        endpoint = '/services/pricing';
    } else if (type === 'project') {
        formData = {
            title: document.getElementById('project-title').value,
            description: document.getElementById('project-description').value,
            category: document.getElementById('project-category').value,
            thumbnailUrl: document.getElementById('project-thumbnail').value,
            imageUrl: document.getElementById('project-image').value,
            technologies: document.getElementById('project-technologies').value,
            tags: document.getElementById('project-tags').value,
            liveLink: document.getElementById('project-live').value,
            caseStudyUrl: document.getElementById('project-casestudy').value
        };
        endpoint = '/portfolio';
    }

    try {
        console.log('Submitting form:', type, formData);
        console.log('Endpoint:', `${API_BASE_URL}${endpoint}`);

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(formData)
        });

        console.log('Response status:', response.status);

        const data = await response.json();
        console.log('Response data:', data);

        if (data.success) {
            showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} saved successfully!`);
            closeModal();

            // Reload data
            if (type === 'testimonial') loadTestimonials();
            else if (type === 'team') loadTeamMembers();
            else if (type === 'service') loadServices();
            else if (type === 'pricing') loadPricingPlans();
            else if (type === 'project') loadProjects();
        } else {
            const errorMsg = data.error?.message || data.message || 'Failed to save';
            console.error('API Error:', data);
            showToast('Error: ' + errorMsg, true);
        }
    } catch (error) {
        console.error('Form submission error:', error);
        console.error('Error details:', error.message);
        showToast('Failed to save ' + type + ': ' + error.message, true);
    }
}

// ═══════════════════════════════════════════════════════════════
// DATA LOADING
// ═══════════════════════════════════════════════════════════════

async function loadDashboard() {
    try {
        const [contacts, testimonials, team, projects] = await Promise.all([
            fetch(`${API_BASE_URL}/contact`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            }).then(r => r.json()),
            fetch(`${API_BASE_URL}/testimonials`).then(r => r.json()),
            fetch(`${API_BASE_URL}/team`).then(r => r.json()),
            fetch(`${API_BASE_URL}/portfolio`).then(r => r.json())
        ]);

        // Update stat cards
        document.getElementById('contacts-count').textContent = contacts.data?.length || 0;
        document.getElementById('testimonials-count').textContent = testimonials.data?.length || 0;
        document.getElementById('team-count').textContent = team.data?.length || 0;
        document.getElementById('projects-count').textContent = projects.data?.length || 0;

        // Show recent contacts
        const recentContainer = document.getElementById('recent-contacts');
        if (contacts.data && contacts.data.length > 0) {
            recentContainer.innerHTML = contacts.data.slice(0, 5).map(contact => `
                <div class="recent-item" onclick="viewContact(${contact.id})">
                    <div class="recent-item-name">${contact.first_name} ${contact.last_name}</div>
                    <div class="recent-item-email">${contact.email}</div>
                    <div class="recent-item-date">${new Date(contact.created_at).toLocaleDateString()}</div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Dashboard load error:', error);
    }
}

async function loadTestimonials() {
    try {
        const response = await fetch(`${API_BASE_URL}/testimonials`);
        const data = await response.json();

        const tbody = document.getElementById('testimonials-tbody');
        if (data.data && data.data.length > 0) {
            tbody.innerHTML = data.data.map(testimonial => `
                <tr>
                    <td>${testimonial.name}</td>
                    <td>${testimonial.role}</td>
                    <td>${'⭐'.repeat(testimonial.rating)}</td>
                    <td>${testimonial.message.substring(0, 50)}...</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-small btn-edit" onclick="editTestimonial(${testimonial.id})">Edit</button>
                            <button class="btn-small btn-delete" onclick="deleteTestimonial(${testimonial.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = '<tr class="empty-row"><td colspan="5" class="empty-state">No testimonials found</td></tr>';
        }
    } catch (error) {
        console.error('Load testimonials error:', error);
    }
}

async function loadTeamMembers() {
    try {
        const response = await fetch(`${API_BASE_URL}/team`);
        const data = await response.json();

        const tbody = document.getElementById('team-tbody');
        if (data.data && data.data.length > 0) {
            tbody.innerHTML = data.data.map(member => `
                <tr>
                    <td>${member.name}</td>
                    <td>${member.role}</td>
                    <td>${member.email || 'N/A'}</td>
                    <td>${member.bio ? member.bio.substring(0, 30) + '...' : 'N/A'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-small btn-edit" onclick="editTeamMember(${member.id})">Edit</button>
                            <button class="btn-small btn-delete" onclick="deleteTeamMember(${member.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = '<tr class="empty-row"><td colspan="5" class="empty-state">No team members found</td></tr>';
        }
    } catch (error) {
        console.error('Load team error:', error);
    }
}

async function loadServices() {
    try {
        const response = await fetch(`${API_BASE_URL}/services/services`);
        const data = await response.json();

        const tbody = document.getElementById('services-tbody');
        if (data.data && data.data.length > 0) {
            tbody.innerHTML = data.data.map(service => `
                <tr>
                    <td>${service.title}</td>
                    <td>${service.description ? service.description.substring(0, 30) + '...' : 'N/A'}</td>
                    <td>${service.features ? service.features.length : 0} features</td>
                    <td>${service.display_order || 1}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-small btn-edit" onclick="editService(${service.id})">Edit</button>
                            <button class="btn-small btn-delete" onclick="deleteService(${service.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = '<tr class="empty-row"><td colspan="5" class="empty-state">No services found</td></tr>';
        }
    } catch (error) {
        console.error('Load services error:', error);
    }
}

async function loadPricingPlans() {
    try {
        const response = await fetch(`${API_BASE_URL}/services/pricing`);
        const data = await response.json();

        const tbody = document.getElementById('pricing-tbody');
        if (data.data && data.data.length > 0) {
            tbody.innerHTML = data.data.map(plan => `
                <tr>
                    <td>${plan.plan_name}</td>
                    <td>${plan.price_pkr ? 'PKR ' + plan.price_pkr : 'Custom'}</td>
                    <td>${plan.description ? plan.description.substring(0, 30) + '...' : 'N/A'}</td>
                    <td>${plan.featured ? '✓ Yes' : 'No'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-small btn-edit" onclick="editPricingPlan(${plan.id})">Edit</button>
                            <button class="btn-small btn-delete" onclick="deletePricingPlan(${plan.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = '<tr class="empty-row"><td colspan="5" class="empty-state">No pricing plans found</td></tr>';
        }
    } catch (error) {
        console.error('Load pricing error:', error);
    }
}

async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/portfolio`);
        const data = await response.json();

        const tbody = document.getElementById('projects-tbody');
        if (data.data && data.data.length > 0) {
            tbody.innerHTML = data.data.map(project => `
                <tr>
                    <td>${project.title}</td>
                    <td>${project.category || 'N/A'}</td>
                    <td>${project.description ? project.description.substring(0, 30) + '...' : 'N/A'}</td>
                    <td>${project.technologies || 'N/A'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-small btn-edit" onclick="editProject(${project.id})">Edit</button>
                            <button class="btn-small btn-delete" onclick="deleteProject(${project.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = '<tr class="empty-row"><td colspan="5" class="empty-state">No projects found</td></tr>';
        }
    } catch (error) {
        console.error('Load projects error:', error);
    }
}

async function loadContacts() {
    try {
        const status = document.getElementById('status-filter')?.value || '';
        let url = `${API_BASE_URL}/contact`;
        if (status) {
            url += `?status=${status}`;
        }

        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const data = await response.json();

        const tbody = document.getElementById('contacts-tbody');
        if (data.data && data.data.length > 0) {
            tbody.innerHTML = data.data.map(contact => `
                <tr>
                    <td>${contact.first_name} ${contact.last_name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.service}</td>
                    <td>
                        <span class="status-badge status-${contact.status}" style="
                            padding: 5px 10px;
                            border-radius: 3px;
                            background: ${contact.status === 'new' ? 'rgba(59, 130, 246, 0.2)' :
                                contact.status === 'read' ? 'rgba(168, 85, 247, 0.2)' :
                                contact.status === 'responded' ? 'rgba(34, 197, 94, 0.2)' :
                                'rgba(107, 114, 128, 0.2)'};
                            color: ${contact.status === 'new' ? '#3b82f6' :
                                contact.status === 'read' ? '#a855f7' :
                                contact.status === 'responded' ? '#22c55e' :
                                '#6b7280'};
                            font-size: 0.85rem;
                        ">${contact.status}</span>
                    </td>
                    <td>${new Date(contact.created_at).toLocaleDateString()}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-small btn-view" onclick="viewContact(${contact.id})">View</button>
                            <button class="btn-small btn-delete" onclick="deleteContactSubmission(${contact.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = '<tr class="empty-row"><td colspan="6" class="empty-state">No contact submissions found</td></tr>';
        }
    } catch (error) {
        console.error('Load contacts error:', error);
    }
}

// ═══════════════════════════════════════════════════════════════
// DELETE FUNCTIONS
// ═══════════════════════════════════════════════════════════════

async function deleteTestimonial(id) {
    if (!confirm('Delete this testimonial?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });

        if (response.ok) {
            showToast('Testimonial deleted');
            loadTestimonials();
        } else {
            showToast('Failed to delete', true);
        }
    } catch (error) {
        console.error('Delete error:', error);
        showToast('Error deleting', true);
    }
}

async function deleteTeamMember(id) {
    if (!confirm('Delete this team member?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/team/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });

        if (response.ok) {
            showToast('Team member deleted');
            loadTeamMembers();
        } else {
            showToast('Failed to delete', true);
        }
    } catch (error) {
        console.error('Delete error:', error);
        showToast('Error deleting', true);
    }
}

async function deleteService(id) {
    if (!confirm('Delete this service?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/services/services/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });

        if (response.ok) {
            showToast('Service deleted');
            loadServices();
        } else {
            showToast('Failed to delete', true);
        }
    } catch (error) {
        console.error('Delete error:', error);
        showToast('Error deleting', true);
    }
}

async function deletePricingPlan(id) {
    if (!confirm('Delete this pricing plan?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/services/pricing/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });

        if (response.ok) {
            showToast('Pricing plan deleted');
            loadPricingPlans();
        } else {
            showToast('Failed to delete', true);
        }
    } catch (error) {
        console.error('Delete error:', error);
        showToast('Error deleting', true);
    }
}

async function deleteProject(id) {
    if (!confirm('Delete this project?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });

        if (response.ok) {
            showToast('Project deleted');
            loadProjects();
        } else {
            showToast('Failed to delete', true);
        }
    } catch (error) {
        console.error('Delete error:', error);
        showToast('Error deleting', true);
    }
}

async function deleteContactSubmission(id) {
    if (!confirm('Delete this contact submission?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });

        if (response.ok) {
            showToast('Contact deleted');
            loadContacts();
        } else {
            showToast('Failed to delete', true);
        }
    } catch (error) {
        console.error('Delete error:', error);
        showToast('Error deleting', true);
    }
}

async function deleteContact() {
    if (!currentContactId || !confirm('Delete this contact?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/contact/${currentContactId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });

        if (response.ok) {
            showToast('Contact deleted');
            closeModal();
            loadContacts();
        } else {
            showToast('Failed to delete', true);
        }
    } catch (error) {
        console.error('Delete error:', error);
        showToast('Error deleting', true);
    }
}

// ═══════════════════════════════════════════════════════════════
// VIEW / EDIT FUNCTIONS
// ═══════════════════════════════════════════════════════════════

async function viewContact(id) {
    currentContactId = id;

    try {
        const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const data = await response.json();
        const contact = data.data;

        const detailsDiv = document.getElementById('contact-details');
        detailsDiv.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span class="detail-value">${contact.first_name} ${contact.last_name}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${contact.email}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span class="detail-value">${contact.phone || 'N/A'}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Service:</span>
                <span class="detail-value">${contact.service}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Budget:</span>
                <span class="detail-value">${contact.budget || 'N/A'}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Message:</span>
                <span class="detail-value" style="display: block; word-break: break-word;">${contact.message}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Submitted:</span>
                <span class="detail-value">${new Date(contact.created_at).toLocaleString()}</span>
            </div>
        `;

        document.getElementById('contact-status').value = contact.status;
        openModal('contact');
    } catch (error) {
        console.error('View contact error:', error);
        showToast('Error loading contact', true);
    }
}

async function updateContactStatus() {
    if (!currentContactId) return;

    const status = document.getElementById('contact-status').value;

    try {
        const response = await fetch(`${API_BASE_URL}/contact/${currentContactId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ status })
        });

        if (response.ok) {
            showToast('Status updated');
            loadContacts();
        } else {
            showToast('Failed to update', true);
        }
    } catch (error) {
        console.error('Update error:', error);
        showToast('Error updating', true);
    }
}

// Placeholder edit functions (for demo)
async function editTestimonial(id) {
    showToast('Edit feature coming soon', true);
}

async function editTeamMember(id) {
    showToast('Edit feature coming soon', true);
}

async function editService(id) {
    showToast('Edit feature coming soon', true);
}

async function editPricingPlan(id) {
    showToast('Edit feature coming soon', true);
}

async function editProject(id) {
    showToast('Edit feature coming soon', true);
}
