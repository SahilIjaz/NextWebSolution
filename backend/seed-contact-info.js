import pool from './src/config/database.js';

async function seedContactInfo() {
    try {
        console.log('🌱 Seeding contact information...\n');

        const contactMethods = [
            {
                method_type: 'email',
                label: 'Email',
                value: 'nextweb.solutions.pk@gmail.com',
                icon_name: 'envelope',
                display_order: 1
            },
            {
                method_type: 'phone',
                label: 'Phone / WhatsApp',
                value: '+92 309 7553991',
                icon_name: 'phone',
                display_order: 2
            },
            {
                method_type: 'location',
                label: 'Location',
                value: 'Remote Job , Pakistan',
                icon_name: 'location-dot',
                display_order: 3
            },
            {
                method_type: 'hours',
                label: 'Working Hours',
                value: 'Mon – Fri, 9:00 AM – 6:00 PM PKT',
                icon_name: 'clock',
                display_order: 4
            }
        ];

        // Clear existing contact info
        await pool.query('DELETE FROM contact_info');
        console.log('🗑️  Cleared existing contact information\n');

        // Insert contact methods
        for (const contact of contactMethods) {
            const result = await pool.query(
                `INSERT INTO contact_info (method_type, label, value, icon_name, display_order)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING id, label, value`,
                [contact.method_type, contact.label, contact.value, contact.icon_name, contact.display_order]
            );
            const inserted = result.rows[0];
            console.log(`✅ Added: ${inserted.label} - ${inserted.value}`);
        }

        console.log(`\n✅ Successfully added ${contactMethods.length} contact methods!\n`);

        // Verify
        const verifyResult = await pool.query('SELECT COUNT(*) as count FROM contact_info');
        console.log(`📊 Total contact methods in database: ${verifyResult.rows[0].count}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding contact info:', error.message);
        process.exit(1);
    }
}

seedContactInfo();
