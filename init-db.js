import pool from './src/config/database.js';

async function initDatabase() {
    try {
        console.log('Checking database tables...\n');

        // Check if tables exist
        const tables = [
            'users',
            'contacts',
            'projects',
            'testimonials',
            'team_members',
            'services',
            'pricing_plans'
        ];

        for (const table of tables) {
            const result = await pool.query(
                `SELECT EXISTS (
                    SELECT 1 FROM information_schema.tables
                    WHERE table_name = $1
                )`,
                [table]
            );

            const exists = result.rows[0].exists;
            console.log(`✓ Table "${table}": ${exists ? '✅ EXISTS' : '❌ MISSING'}`);
        }

        // Try to create missing tables
        console.log('\n📝 Creating tables if missing...\n');

        // Add missing columns to existing tables
        console.log('📝 Adding missing columns if needed...\n');

        try {
            await pool.query(`
                ALTER TABLE projects ADD COLUMN IF NOT EXISTS category VARCHAR(100);
                ALTER TABLE projects ADD COLUMN IF NOT EXISTS thumbnail_url VARCHAR(500);
                ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags TEXT;
                ALTER TABLE projects ADD COLUMN IF NOT EXISTS case_study_url VARCHAR(500);
            `);
            console.log('✓ Missing columns added to projects table');
        } catch (err) {
            console.log('ℹ Columns already exist or error occurred:', err.message.split('\n')[0]);
        }

        try {
            await pool.query(`
                ALTER TABLE contacts ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'new';
                ALTER TABLE contacts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
                ALTER TABLE contacts ADD COLUMN IF NOT EXISTS service VARCHAR(255);
                ALTER TABLE contacts ADD COLUMN IF NOT EXISTS budget VARCHAR(100);
            `);
            console.log('✓ Missing columns added to contacts table');
        } catch (err) {
            console.log('ℹ Columns already exist or error occurred:', err.message.split('\n')[0]);
        }

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
              id SERIAL PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              email VARCHAR(255) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✓ users table ready');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS contacts (
              id SERIAL PRIMARY KEY,
              first_name VARCHAR(255) NOT NULL,
              last_name VARCHAR(255) NOT NULL,
              email VARCHAR(255) NOT NULL,
              phone VARCHAR(20),
              service VARCHAR(255) NOT NULL,
              budget VARCHAR(100),
              message TEXT NOT NULL,
              agree_to_terms BOOLEAN DEFAULT false,
              status VARCHAR(50) DEFAULT 'new',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✓ contacts table ready');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS projects (
              id SERIAL PRIMARY KEY,
              user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
              title VARCHAR(255) NOT NULL,
              description TEXT,
              category VARCHAR(100),
              thumbnail_url VARCHAR(500),
              image_url VARCHAR(500),
              technologies TEXT,
              live_link VARCHAR(500),
              tags TEXT,
              case_study_url VARCHAR(500),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✓ projects table ready');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS testimonials (
              id SERIAL PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              role VARCHAR(255) NOT NULL,
              message TEXT NOT NULL,
              rating INTEGER CHECK (rating >= 1 AND rating <= 5),
              avatar_initials VARCHAR(10),
              avatar_color VARCHAR(50),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✓ testimonials table ready');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS team_members (
              id SERIAL PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              role VARCHAR(255) NOT NULL,
              bio TEXT,
              avatar_initials VARCHAR(10),
              avatar_color VARCHAR(50),
              email VARCHAR(255),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✓ team_members table ready');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS services (
              id SERIAL PRIMARY KEY,
              title VARCHAR(255) NOT NULL,
              description TEXT,
              icon_name VARCHAR(100),
              features TEXT,
              display_order INTEGER,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✓ services table ready');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS pricing_plans (
              id SERIAL PRIMARY KEY,
              plan_name VARCHAR(100) NOT NULL,
              description TEXT,
              price_pkr DECIMAL(10, 2),
              price_currency VARCHAR(10) DEFAULT 'PKR',
              plan_type VARCHAR(50),
              features TEXT,
              featured BOOLEAN DEFAULT false,
              display_order INTEGER,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✓ pricing_plans table ready');

        // Create indexes
        console.log('\n📊 Creating indexes...\n');

        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
            CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
            CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
            CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
            CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating);
            CREATE INDEX IF NOT EXISTS idx_services_order ON services(display_order);
            CREATE INDEX IF NOT EXISTS idx_pricing_order ON pricing_plans(display_order);
        `);
        console.log('✓ Indexes created');

        console.log('\n✅ Database initialization complete!\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Database initialization error:', error.message);
        console.error(error);
        process.exit(1);
    }
}

initDatabase();
