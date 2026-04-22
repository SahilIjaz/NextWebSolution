import bcrypt from 'bcryptjs';
import pool from './src/config/database.js';

async function seedDemoUser() {
    try {
        console.log('🌱 Seeding demo admin user...\n');

        // Check if demo user already exists
        const checkResult = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            ['admin@nextweb.pk']
        );

        if (checkResult.rows.length > 0) {
            console.log('✓ Demo user already exists');
            process.exit(0);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Create demo user
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email, name',
            ['Admin User', 'admin@nextweb.pk', hashedPassword]
        );

        const user = result.rows[0];
        console.log('✅ Demo user created successfully!\n');
        console.log('📋 Demo Credentials:');
        console.log('   Email: admin@nextweb.pk');
        console.log('   Password: admin123\n');
        console.log('Use these credentials to login to the admin panel.\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding demo user:', error.message);
        process.exit(1);
    }
}

seedDemoUser();
