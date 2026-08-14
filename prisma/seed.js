const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user (password: "admin123" - CHANGE THIS IN PRODUCTION!)
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
    },
  });

  console.log('✅ Admin user created:', admin);

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { id: 'project-1' },
      update: {},
      create: {
        id: 'project-1',
        title: 'E-Commerce Platform',
        shortDesc: 'Full-stack e-commerce solution with payment integration',
        description: 'A complete e-commerce platform built with Next.js and Stripe integration. Features include product catalog, shopping cart, user authentication, and order management.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Stripe', 'PostgreSQL'],
        imageUrl: '/images/projects/ecommerce.jpg',
        imageAlt: 'E-commerce platform dashboard',
        projectUrl: 'https://example.com/ecommerce',
        githubUrl: 'https://github.com/example/ecommerce',
        caseStudy: 'This project demonstrates full-stack development capabilities with modern tools.',
        featured: true,
        order: 1,
      },
    }),
    prisma.project.upsert({
      where: { id: 'project-2' },
      update: {},
      create: {
        id: 'project-2',
        title: 'Task Management App',
        shortDesc: 'Collaborative task management with real-time updates',
        description: 'A real-time task management application with team collaboration features, built with React and Firebase.',
        technologies: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
        imageUrl: '/images/projects/taskapp.jpg',
        imageAlt: 'Task management application',
        projectUrl: 'https://example.com/tasks',
        githubUrl: 'https://github.com/example/taskapp',
        featured: true,
        order: 2,
      },
    }),
  ]);

  console.log('✅ Sample projects created:', projects.length);

  // Create sample skills
  const skills = await Promise.all([
    prisma.skill.createMany({
      data: [
        { name: 'React', level: 'Expert', category: 'Frontend', order: 1 },
        { name: 'Next.js', level: 'Expert', category: 'Frontend', order: 2 },
        { name: 'TypeScript', level: 'Advanced', category: 'Frontend', order: 3 },
        { name: 'Tailwind CSS', level: 'Advanced', category: 'Frontend', order: 4 },
        { name: 'Node.js', level: 'Advanced', category: 'Backend', order: 5 },
        { name: 'PostgreSQL', level: 'Advanced', category: 'Database', order: 6 },
        { name: 'MongoDB', level: 'Intermediate', category: 'Database', order: 7 },
        { name: 'Git', level: 'Expert', category: 'DevOps', order: 8 },
      ],
      skipDuplicates: true,
    }),
  ]);

  console.log('✅ Sample skills created');

  // Create site settings
  const settings = await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'My Portfolio',
      siteDescription: 'Professional portfolio showcasing my projects and expertise',
      bio: 'Full-stack developer passionate about building amazing web experiences.',
      email: 'contact@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      socialTwitter: 'https://twitter.com/example',
      socialLinkedIn: 'https://linkedin.com/in/example',
      socialGithub: 'https://github.com/example',
      resumeUrl: '/resume.pdf',
      primaryColor: '#3B82F6',
      secondaryColor: '#1F2937',
    },
  });

  console.log('✅ Site settings created');

  console.log('✨ Database seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
