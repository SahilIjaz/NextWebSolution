import pool from './src/config/database.js';

async function seedTeamMembers() {
    try {
        console.log('🌱 Seeding team members...\n');

        const teamMembers = [
            {
                name: 'Abdullah Alvi',
                role: 'React Developer and UI/UX',
                email: 'abdullah@nextweb.pk',
                bio: '1+ years crafting digital brands. Expert in UI/UX strategy and visual systems that convert.',
                avatar_initials: 'AA',
                avatar_color: 'green'
            },
            {
                name: 'Abdul Manan',
                role: 'Founder and Lead',
                email: 'abdul@nextweb.pk',
                bio: 'Founder and Lead Engineer driving product development with expertise in React, Next.js, and scalable cloud infrastructure.',
                avatar_initials: 'AM',
                avatar_color: 'purple'
            },
            {
                name: 'Sahil Ijaz',
                role: 'Backend Specialist',
                email: 'sahil@nextweb.pk',
                bio: 'Backend-focused developer with a data-driven approach to building scalable systems and optimizing performance.',
                avatar_initials: 'SI',
                avatar_color: 'blue'
            }
        ];

        // Clear existing team members
        await pool.query('DELETE FROM team_members');
        console.log('🗑️  Cleared existing team members\n');

        // Insert team members
        for (const member of teamMembers) {
            const result = await pool.query(
                `INSERT INTO team_members (name, role, email, bio, avatar_initials, avatar_color)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING id, name, role, email`,
                [member.name, member.role, member.email, member.bio, member.avatar_initials, member.avatar_color]
            );
            const inserted = result.rows[0];
            console.log(`✅ Added: ${inserted.name} (${inserted.role})`);
        }

        console.log(`\n✅ Successfully added ${teamMembers.length} team members!\n`);

        // Verify
        const verifyResult = await pool.query('SELECT COUNT(*) as count FROM team_members');
        console.log(`📊 Total team members in database: ${verifyResult.rows[0].count}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding team members:', error.message);
        process.exit(1);
    }
}

seedTeamMembers();
