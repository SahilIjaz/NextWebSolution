import pool from './src/config/database.js';

async function seedPortfolio() {
    try {
        console.log('🌱 Seeding portfolio projects...\n');

        const projects = [
            {
                title: 'LuxCart — Premium E-Commerce Platform',
                description: 'Full-stack Next.js e-commerce with Stripe payments, inventory CMS, and 99 Lighthouse score.',
                category: 'Development',
                thumbnail_url: 'https://placehold.co/400x300?text=LuxCart',
                image_url: 'https://placehold.co/1200x800?text=LuxCart',
                technologies: 'Next.js, React, Stripe, Tailwind CSS',
                tags: 'Next.js, Stripe, Sanity CMS, Tailwind',
                live_link: 'https://luxcart.example.com',
                case_study_url: 'https://nextweb.pk/case-study/luxcart'
            },
            {
                title: 'FarmLink — AgriTech SaaS Dashboard',
                description: 'Real-time analytics dashboard for agricultural supply chain tracking across Pakistan.',
                category: 'Development',
                thumbnail_url: 'https://placehold.co/400x300?text=FarmLink',
                image_url: 'https://placehold.co/1200x800?text=FarmLink',
                technologies: 'React, Node.js, PostgreSQL, Chart.js',
                tags: 'React, Node.js, Charts, Analytics',
                live_link: 'https://farmlink.example.com',
                case_study_url: 'https://nextweb.pk/case-study/farmlink'
            },
            {
                title: 'ProFinance — Financial Consultancy Site',
                description: 'Conversion-optimized landing page with SEO strategy that tripled organic leads in 90 days.',
                category: 'Web Design',
                thumbnail_url: 'https://placehold.co/400x300?text=ProFinance',
                image_url: 'https://placehold.co/1200x800?text=ProFinance',
                technologies: 'Next.js, TypeScript, Tailwind CSS',
                tags: 'Web Design, SEO, Branding',
                live_link: 'https://profinance.example.com',
                case_study_url: 'https://nextweb.pk/case-study/profinance'
            },
            {
                title: 'StyleBoutique — Fashion Brand Identity',
                description: 'Complete brand identity system: logo, typography, color palette, packaging, and digital guidelines.',
                category: 'Branding',
                thumbnail_url: 'https://placehold.co/400x300?text=StyleBoutique',
                image_url: 'https://placehold.co/1200x800?text=StyleBoutique',
                technologies: 'Figma, Adobe Suite, Brand Strategy',
                tags: 'Branding, Identity, Print, Typography',
                live_link: 'https://styleboutique.pk',
                case_study_url: 'https://nextweb.pk/case-study/styleboutique'
            },
            {
                title: 'RealtyPro — Google Ads Campaign',
                description: 'Performance marketing campaign generating 400+ qualified leads per month at 3.2x ROAS.',
                category: 'Marketing',
                thumbnail_url: 'https://placehold.co/400x300?text=RealtyPro',
                image_url: 'https://placehold.co/1200x800?text=RealtyPro',
                technologies: 'Google Ads, Analytics, Conversion Tracking',
                tags: 'Google Ads, PPC, Analytics, Lead Generation',
                live_link: 'https://realtypro.example.com',
                case_study_url: 'https://nextweb.pk/case-study/realtypro'
            },
            {
                title: 'RestaurantHub — Restaurant Management Platform',
                description: 'Multi-location restaurant management system with online ordering, inventory, and staff scheduling.',
                category: 'Development',
                thumbnail_url: 'https://placehold.co/400x300?text=RestaurantHub',
                image_url: 'https://placehold.co/1200x800?text=RestaurantHub',
                technologies: 'React, Node.js, MongoDB, Stripe',
                tags: 'E-Commerce, SaaS, Restaurant Tech',
                live_link: 'https://restauranthub.example.com',
                case_study_url: 'https://nextweb.pk/case-study/restauranthub'
            }
        ];

        // Clear existing projects
        await pool.query('DELETE FROM projects');
        console.log('🗑️  Cleared existing projects\n');

        // Insert projects
        for (const project of projects) {
            const result = await pool.query(
                `INSERT INTO projects (title, description, category, thumbnail_url, image_url, technologies, tags, live_link, case_study_url)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                 RETURNING id, title, category`,
                [project.title, project.description, project.category, project.thumbnail_url, project.image_url, project.technologies, project.tags, project.live_link, project.case_study_url]
            );
            const inserted = result.rows[0];
            console.log(`✅ Added: ${inserted.title} (${inserted.category})`);
        }

        console.log(`\n✅ Successfully added ${projects.length} projects!\n`);

        // Verify
        const verifyResult = await pool.query('SELECT COUNT(*) as count FROM projects');
        console.log(`📊 Total projects in database: ${verifyResult.rows[0].count}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding projects:', error.message);
        process.exit(1);
    }
}

seedPortfolio();
