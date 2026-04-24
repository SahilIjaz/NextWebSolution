import pool from './src/config/database.js';

async function seedRealProjects() {
    try {
        console.log('🌱 Seeding real portfolio projects...\n');

        const projects = [
            {
                title: 'Story Connect — Social Media Platform',
                description: 'Social media platform for story sharing, messaging, and content discovery with a custom feed algorithm.',
                category: 'Development',
                thumbnail_url: 'https://placehold.co/400x300?text=StoryConnect',
                image_url: 'https://placehold.co/1200x800?text=StoryConnect',
                technologies: 'React, Node.js, MongoDB, Socket.io',
                tags: 'Social Media, Real-time, Feed Algorithm',
                live_link: 'https://anaya-d9z9.vercel.app/',
                case_study_url: 'https://nextweb.pk/case-study/storyconnect'
            },
            {
                title: 'Echo Hub — Real-time Social Platform',
                description: 'Full-stack social media application built with Next.js and real-time chat using Socket.io.',
                category: 'Development',
                thumbnail_url: 'https://placehold.co/400x300?text=EchoHub',
                image_url: 'https://placehold.co/1200x800?text=EchoHub',
                technologies: 'Next.js, Node.js, Socket.io, MongoDB',
                tags: 'Social Media, Real-time Chat, Next.js',
                live_link: 'https://connect-hub-git-main-sahil-ijazs-projects.vercel.app/',
                case_study_url: 'https://nextweb.pk/case-study/echohub'
            },
            {
                title: 'CulinaryHub — Community Platform',
                description: 'Community platform for chefs, users, and farmers to share recipes, courses, and event announcements.',
                category: 'Development',
                thumbnail_url: 'https://placehold.co/400x300?text=CulinaryHub',
                image_url: 'https://placehold.co/1200x800?text=CulinaryHub',
                technologies: 'React, Node.js, PostgreSQL, Stripe',
                tags: 'Community, Recipes, E-Learning',
                live_link: 'https://mulberry-tree.vercel.app',
                case_study_url: 'https://nextweb.pk/case-study/culinaryhub'
            },
            {
                title: 'DocMind AI — Intelligent PDF Chat',
                description: 'Chat with any PDF using RAG + Claude AI. Upload PDFs and have intelligent conversations powered by Claude.',
                category: 'Development',
                thumbnail_url: 'https://placehold.co/400x300?text=DocMindAI',
                image_url: 'https://placehold.co/1200x800?text=DocMindAI',
                technologies: 'Next.js, Claude AI, RAG, React',
                tags: 'AI, PDF Processing, Claude API',
                live_link: 'https://study-mate-frontend-three.vercel.app',
                case_study_url: 'https://nextweb.pk/case-study/docmindai'
            },
            {
                title: 'ResumeBoost — AI Resume Analysis',
                description: 'Get Claude AI feedback on your resume in seconds. Upload your resume and get detailed analysis for job titles.',
                category: 'Development',
                thumbnail_url: 'https://placehold.co/400x300?text=ResumeBoost',
                image_url: 'https://placehold.co/1200x800?text=ResumeBoost',
                technologies: 'Next.js, Claude AI, PDF.js, React',
                tags: 'AI, Resume, Job Search, Claude API',
                live_link: 'https://ai-resume-analyzer-sepia-tau.vercel.app',
                case_study_url: 'https://nextweb.pk/case-study/resumeboost'
            },
            {
                title: 'FreshDeliver — Grocery Delivery Platform',
                description: 'Multi-tenant grocery delivery platform with role-based access for vendors, customers, and admins.',
                category: 'Development',
                thumbnail_url: 'https://placehold.co/400x300?text=FreshDeliver',
                image_url: 'https://placehold.co/1200x800?text=FreshDeliver',
                technologies: 'React, Node.js, MongoDB, Stripe',
                tags: 'E-Commerce, Delivery, Multi-tenant, SaaS',
                live_link: 'https://grocio-app-frontend.netlify.app/',
                case_study_url: 'https://nextweb.pk/case-study/freshdeliver'
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

seedRealProjects();
