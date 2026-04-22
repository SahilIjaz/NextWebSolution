import pool from './src/config/database.js';

async function seedTechStack() {
    try {
        console.log('🌱 Seeding tech stack...\n');

        const technologies = [
            { name: 'React', category: 'Frontend', display_order: 1 },
            { name: 'Next.js', category: 'Frontend', display_order: 2 },
            { name: 'TypeScript', category: 'Frontend', display_order: 3 },
            { name: 'Node.js', category: 'Backend', display_order: 4 },
            { name: 'Tailwind CSS', category: 'Frontend', display_order: 5 },
            { name: 'Figma', category: 'Design', display_order: 6 },
            { name: 'Framer Motion', category: 'Frontend', display_order: 7 },
            { name: 'PostgreSQL', category: 'Database', display_order: 8 },
            { name: 'MongoDB', category: 'Database', display_order: 9 },
            { name: 'AWS', category: 'Infrastructure', display_order: 10 },
            { name: 'Vercel', category: 'Infrastructure', display_order: 11 },
            { name: 'Stripe', category: 'Payments', display_order: 12 },
            { name: 'Sanity CMS', category: 'CMS', display_order: 13 },
            { name: 'WordPress', category: 'CMS', display_order: 14 },
            { name: 'Google Ads', category: 'Marketing', display_order: 15 },
            { name: 'Meta Business', category: 'Marketing', display_order: 16 },
            { name: 'Semrush', category: 'SEO', display_order: 17 },
            { name: 'GA4', category: 'Analytics', display_order: 18 }
        ];

        // Clear existing tech stack
        await pool.query('DELETE FROM tech_stack');
        console.log('🗑️  Cleared existing tech stack\n');

        // Insert technologies
        for (const tech of technologies) {
            const result = await pool.query(
                `INSERT INTO tech_stack (name, category, display_order)
                 VALUES ($1, $2, $3)
                 RETURNING id, name, category`,
                [tech.name, tech.category, tech.display_order]
            );
            const inserted = result.rows[0];
            console.log(`✅ Added: ${inserted.name} (${inserted.category})`);
        }

        console.log(`\n✅ Successfully added ${technologies.length} technologies!\n`);

        // Verify
        const verifyResult = await pool.query('SELECT COUNT(*) as count FROM tech_stack');
        console.log(`📊 Total technologies in database: ${verifyResult.rows[0].count}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding tech stack:', error.message);
        process.exit(1);
    }
}

seedTechStack();
