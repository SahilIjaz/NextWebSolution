// Simple script to load testimonials from API and display them

const API_BASE_URL = 'http://localhost:8000/api';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, fetching testimonials...');
    fetchAndDisplayTestimonials();
});

// Fetch testimonials from API
async function fetchAndDisplayTestimonials() {
    try {
        console.log('Fetching from:', API_BASE_URL + '/testimonials');

        const response = await fetch(API_BASE_URL + '/testimonials');
        console.log('Response status:', response.status);

        const data = await response.json();
        console.log('Response data:', data);

        if (data.success && data.data) {
            console.log('Found ' + data.data.length + ' testimonials');
            displayTestimonials(data.data);
        } else {
            console.error('API response not successful');
        }
    } catch (error) {
        console.error('Error fetching testimonials:', error);
    }
}

// Display testimonials on the page
function displayTestimonials(testimonials) {
    const container = document.querySelector('.testimonial-grid');
    console.log('Container element:', container);

    if (!container) {
        console.error('Could not find .testimonial-grid container');
        return;
    }

    // Create HTML for testimonials
    let html = '';
    testimonials.forEach((testimonial, idx) => {
        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
        const color = ['green', 'purple', 'blue'][idx % 3];

        html += `
            <div class="testimonial-card reveal">
                <div class="stars" aria-label="${testimonial.rating} stars">${stars}</div>
                <p>"${testimonial.message}"</p>
                <div class="testimonial-author">
                    <div class="author-avatar" style="background:var(--${color})" aria-hidden="true">${testimonial.avatar_initials || 'N/A'}</div>
                    <div>
                        <div class="author-name">${testimonial.name}</div>
                        <div class="author-role">${testimonial.role}</div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    console.log('Testimonials inserted into page');
}
