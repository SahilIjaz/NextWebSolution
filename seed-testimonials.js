import pool from './src/config/database.js';

async function seedTestimonials() {
    try {
        console.log('🌱 Seeding testimonials...\n');

        const testimonials = [
            {
                name: 'Ahmed Hassan',
                role: 'CEO, TechStart Lahore',
                message: 'NextWeb transformed our entire online presence. The attention to detail and quality of delivery was beyond expectations. Highly recommend to any serious business.',
                rating: 5,
                avatar_initials: 'AH',
                avatar_color: 'green'
            },
            {
                name: 'Sara Rahim',
                role: 'Founder, StyleBoutique.pk',
                message: 'From branding to deployment, the entire team at NextWeb was professional, fast, and incredibly creative. Our conversion rate jumped 3x after the redesign.',
                rating: 5,
                avatar_initials: 'SR',
                avatar_color: 'purple'
            },
            {
                name: 'Kamran Malik',
                role: 'Director, ProFinance Solutions',
                message: 'Outstanding SEO work. We went from page 4 to page 1 on Google in under 90 days. The team is strategic, data-driven and genuinely invested in your growth.',
                rating: 5,
                avatar_initials: 'KM',
                avatar_color: 'blue'
            }
        ];

        // Clear existing testimonials
        await pool.query('DELETE FROM testimonials');
        console.log('🗑️  Cleared existing testimonials\n');

        // Insert testimonials
        for (const testimonial of testimonials) {
            const result = await pool.query(
                `INSERT INTO testimonials (name, role, message, rating, avatar_initials, avatar_color)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING id, name, role, rating`,
                [testimonial.name, testimonial.role, testimonial.message, testimonial.rating, testimonial.avatar_initials, testimonial.avatar_color]
            );
            const inserted = result.rows[0];
            console.log(`✅ Added: ${inserted.name} (${inserted.rating}⭐)`);
        }

        console.log(`\n✅ Successfully added ${testimonials.length} testimonials!\n`);

        // Verify
        const verifyResult = await pool.query('SELECT COUNT(*) as count FROM testimonials');
        console.log(`📊 Total testimonials in database: ${verifyResult.rows[0].count}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding testimonials:', error.message);
        process.exit(1);
    }
}

seedTestimonials();
