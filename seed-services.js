import pool from './src/config/database.js';

async function seedServices() {
    try {
        console.log('🌱 Seeding services...\n');

        const services = [
            {
                title: 'UI/UX Design',
                description: 'Pixel-perfect interfaces grounded in user research...',
                icon_name: 'palette',
                features: ['User Research & Personas', 'Wireframing & Prototyping', 'Design System Creation', 'Usability Testing'],
                display_order: 1
            },
            {
                title: 'Web Development',
                description: 'Fast, scalable, and secure web applications...',
                icon_name: 'code',
                features: ['Next.js / React Apps', 'E-Commerce Solutions', 'API Integration & Backend', 'Performance Optimization'],
                display_order: 2
            },
            {
                title: 'SEO & PPC',
                description: 'Data-driven search strategies...',
                icon_name: 'chart-line',
                features: ['Technical SEO Audit', 'Content Strategy', 'Google / Meta Ads', 'Monthly Analytics Reports'],
                display_order: 3
            },
            {
                title: 'Social Media Management',
                description: 'Build a community and grow brand awareness...',
                icon_name: 'hashtag',
                features: ['Content Calendar Planning', 'Graphic & Video Production', 'Audience Growth Strategy', 'Influencer Outreach'],
                display_order: 4
            },
            {
                title: 'Branding & Identity',
                description: 'Distinctive brand identities...',
                icon_name: 'pen-nib',
                features: ['Logo & Visual Identity', 'Brand Guidelines', 'Marketing Collateral', 'Brand Strategy'],
                display_order: 5
            },
            {
                title: 'Marketing Consulting',
                description: 'Strategic growth advisory...',
                icon_name: 'rocket',
                features: ['Market Research', 'Go-To-Market Strategy', 'Funnel Optimization', 'Growth Hacking'],
                display_order: 6
            }
        ];

        // Clear existing services
        await pool.query('DELETE FROM services');
        console.log('🗑️  Cleared existing services\n');

        // Insert services
        for (const service of services) {
            const result = await pool.query(
                `INSERT INTO services (title, description, icon_name, features, display_order)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING id, title, display_order`,
                [service.title, service.description, service.icon_name, JSON.stringify(service.features), service.display_order]
            );
            const inserted = result.rows[0];
            console.log(`✅ Added: ${inserted.title} (Order: ${inserted.display_order})`);
        }

        console.log(`\n✅ Successfully added ${services.length} services!\n`);

        // Verify
        const verifyResult = await pool.query('SELECT COUNT(*) as count FROM services');
        console.log(`📊 Total services in database: ${verifyResult.rows[0].count}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding services:', error.message);
        process.exit(1);
    }
}

seedServices();
