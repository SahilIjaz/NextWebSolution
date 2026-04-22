import pool from './src/config/database.js';

async function seedValues() {
    try {
        console.log('🌱 Seeding company values...\n');

        const values = [
            {
                title: 'Precision',
                icon_name: 'bullseye',
                description: 'Every pixel, every line of code is intentional and purposeful.',
                display_order: 1
            },
            {
                title: 'Partnership',
                icon_name: 'handshake',
                description: 'We\'re not vendors — we\'re growth partners invested in your success.',
                display_order: 2
            },
            {
                title: 'Speed',
                icon_name: 'bolt',
                description: 'Fast delivery without sacrificing quality. We respect your timeline.',
                display_order: 3
            },
            {
                title: 'Results',
                icon_name: 'chart-column',
                description: 'Every decision is backed by data and measured against real outcomes.',
                display_order: 4
            }
        ];

        // Clear existing values
        await pool.query('DELETE FROM company_values');
        console.log('🗑️  Cleared existing values\n');

        // Insert values
        for (const value of values) {
            const result = await pool.query(
                `INSERT INTO company_values (title, icon_name, description, display_order)
                 VALUES ($1, $2, $3, $4)
                 RETURNING id, title, display_order`,
                [value.title, value.icon_name, value.description, value.display_order]
            );
            const inserted = result.rows[0];
            console.log(`✅ Added: ${inserted.title}`);
        }

        console.log(`\n✅ Successfully added ${values.length} values!\n`);

        // Verify
        const verifyResult = await pool.query('SELECT COUNT(*) as count FROM company_values');
        console.log(`📊 Total values in database: ${verifyResult.rows[0].count}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding values:', error.message);
        process.exit(1);
    }
}

seedValues();
