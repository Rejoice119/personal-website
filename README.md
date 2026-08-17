# Personal Portfolio Website

A modern, full-stack personal portfolio website built with Next.js 14, React, and MySQL.

## Features

- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - Built with Tailwind CSS
- 📊 **Project Portfolio** - Showcase your best work with case studies
- 💬 **Contact Form** - Visitor messages with email notifications
- ⭐ **Visitor Testimonials** - Approval workflow for social proof
- 🔐 **Admin Dashboard** - Manage content without leaving your site
- 📈 **Analytics** - Track visitor engagement
- 🔍 **SEO Optimized** - Meta tags, structured data, and sitemap
- ⚡ **Fast Performance** - Server-side rendering, static generation
- 🚀 **Ready to Deploy** - One-click deployment to Vercel

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Email**: Resend
- **Hosting**: Vercel (Free tier available)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MySQL database (local MySQL or a managed MySQL provider)
- Resend API key (for email)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

4. Set up the database:
```bash
npx prisma db push
npm run db:seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Login

Default credentials (change these immediately in production):
- Email: `admin@example.com`
- Password: `admin123`

## Project Structure

```
personal-website/
├── public/                 # Static files
│   ├── images/
│   └── downloads/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js            # Seed data
├── src/
│   ├── app/               # Next.js app router
│   │   ├── api/           # API routes
│   │   ├── admin/         # Admin pages
│   │   └── page.tsx       # Home page
│   ├── components/        # Reusable components
│   ├── lib/               # Utilities & helpers
│   └── styles/            # Global styles
├── .env.local             # Environment variables (git ignored)
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Database Schema

- **Admin** - Admin user accounts
- **Project** - Portfolio projects
- **Skill** - Technical skills
- **Message** - Contact form submissions
- **Testimonial** - Visitor testimonials
- **SiteSettings** - Site configuration
- **PageView** - Analytics tracking

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

See [Next.js Deployment Documentation](https://nextjs.org/docs/deployment/vercel) for details.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Sync database schema
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

## Environment Variables

See `.env.local` for configuration options:

- `DATABASE_URL` - MySQL connection string
- `NEXTAUTH_SECRET` - Secret for NextAuth
- `RESEND_API_KEY` - Resend API key for emails
- `ADMIN_EMAIL` - Your email address

## Security

- ✅ Passwords hashed with bcrypt
- ✅ CSRF protection enabled
- ✅ Environment variables for secrets
- ✅ Input validation with Zod
- ✅ Rate limiting on forms
- ✅ Secure headers configured

## Performance

- ✅ Image optimization
- ✅ Static site generation (SSG)
- ✅ Server-side rendering (SSR)
- ✅ CSS minification
- ✅ Code splitting
- ✅ Caching strategies

## SEO

- ✅ Meta tags & OpenGraph
- ✅ Sitemap generation
- ✅ Structured data (JSON-LD)
- ✅ Mobile-responsive
- ✅ Fast load times

## License

MIT

## Support

For issues or questions, please check the Next.js documentation or contact the developer.

---

Built with ❤️ using Next.js
