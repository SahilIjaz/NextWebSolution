import pool from './src/config/database.js';

async function seedPricing() {
    try {
        console.log('🌱 Seeding pricing plans...\n');

        const pricingPlans = [
            {
                plan_name: 'Starter',
                description: 'Perfect for startups & small businesses ready to launch.',
                price_pkr: 35000,
                price_currency: 'PKR',
                plan_type: 'project',
                features: [
                    'Landing Page Design',
                    'Mobile Responsive',
                    'Basic SEO Setup',
                    'Contact Form',
                    '2 Revisions'
                ],
                featured: false,
                display_order: 1
            },
            {
                plan_name: 'Growth',
                description: 'For growing businesses that want a serious web presence.',
                price_pkr: 75000,
                price_currency: 'PKR',
                plan_type: 'project',
                features: [
                    'Full Multi-Page Website',
                    'Advanced Animations',
                    'SEO + Performance Opt.',
                    'CMS Integration',
                    '5 Revisions',
                    '1 Month Support'
                ],
                featured: true,
                display_order: 2
            },
            {
                plan_name: 'Enterprise',
                description: 'Full-service digital partnership for scaling companies.',
                price_pkr: null,
                price_currency: 'PKR',
                plan_type: 'custom',
                features: [
                    'Everything in Growth',
                    'E-Commerce & Apps',
                    'Marketing Campaigns',
                    'Dedicated Account Manager',
                    'Unlimited Revisions',
                    '6 Months Support',
                    'Priority Response'
                ],
                featured: false,
                display_order: 3
            }
        ];

        // Clear existing pricing plans
        await pool.query('DELETE FROM pricing_plans');
        console.log('🗑️  Cleared existing pricing plans\n');

        // Insert pricing plans
        for (const plan of pricingPlans) {
            const result = await pool.query(
                `INSERT INTO pricing_plans (plan_name, description, price_pkr, price_currency, plan_type, features, featured, display_order)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 RETURNING id, plan_name, featured`,
                [plan.plan_name, plan.description, plan.price_pkr, plan.price_currency, plan.plan_type, JSON.stringify(plan.features), plan.featured, plan.display_order]
            );
            const inserted = result.rows[0];
            const featured = inserted.featured ? ' ⭐ (Featured)' : '';
            console.log(`✅ Added: ${inserted.plan_name}${featured}`);
        }

        console.log(`\n✅ Successfully added ${pricingPlans.length} pricing plans!\n`);

        // Verify
        const verifyResult = await pool.query('SELECT COUNT(*) as count FROM pricing_plans');
        console.log(`📊 Total pricing plans in database: ${verifyResult.rows[0].count}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding pricing plans:', error.message);
        process.exit(1);
    }
}

seedPricing();
