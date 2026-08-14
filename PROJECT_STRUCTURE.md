# Project Structure

## Complete Directory Layout

```
personal-website/
│
├── public/                          # Static files served directly
│   ├── images/
│   │   ├── projects/               # Portfolio project images
│   │   ├── icons/                  # SVG icons
│   │   └── avatars/                # Profile images
│   ├── downloads/                  # Downloadable files (resume, etc.)
│   └── favicon.ico
│
├── prisma/                          # Database
│   ├── schema.prisma               # Database schema definition
│   └── seed.js                     # Database seed/initialization script
│
├── src/
│   ├── app/                        # Next.js app directory (App Router)
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   ├── globals.css             # Global styles (imported in layout)
│   │   │
│   │   ├── (public)/               # Public pages group
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx        # Projects list
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx    # Project detail
│   │   │   ├── skills/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── testimonials/
│   │   │   │   └── page.tsx
│   │   │   └── blog/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (admin)/                # Admin pages group (protected)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── admin/
│   │   │       ├── layout.tsx      # Admin layout
│   │   │       ├── dashboard/
│   │   │       │   └── page.tsx
│   │   │       ├── projects/
│   │   │       │   ├── page.tsx    # List projects
│   │   │       │   ├── new/page.tsx
│   │   │       │   └── [id]/
│   │   │       │       └── page.tsx
│   │   │       ├── skills/
│   │   │       │   └── page.tsx
│   │   │       ├── messages/
│   │   │       │   └── page.tsx
│   │   │       ├── testimonials/
│   │   │       │   └── page.tsx
│   │   │       ├── settings/
│   │   │       │   └── page.tsx
│   │   │       └── analytics/
│   │   │           └── page.tsx
│   │   │
│   │   └── api/                    # API routes
│   │       ├── auth/
│   │       │   ├── login/route.ts
│   │       │   ├── logout/route.ts
│   │       │   └── me/route.ts
│   │       ├── projects/
│   │       │   ├── route.ts        # GET all, POST new
│   │       │   └── [id]/route.ts   # GET one, PUT update, DELETE
│   │       ├── skills/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── messages/
│   │       │   ├── route.ts        # POST contact form, GET all (admin)
│   │       │   └── [id]/route.ts   # GET one, PUT update
│   │       ├── testimonials/
│   │       │   ├── route.ts        # GET approved, POST new
│   │       │   └── [id]/route.ts   # PUT approve/reject (admin)
│   │       ├── settings/
│   │       │   └── route.ts
│   │       ├── analytics/
│   │       │   └── route.ts
│   │       └── health/
│   │           └── route.ts        # Health check
│   │
│   ├── components/                 # Reusable React components
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── TextArea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Loading.tsx
│   │   ├── forms/
│   │   │   ├── ContactForm.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── TestimonialForm.tsx
│   │   │   └── ProjectForm.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── FeaturedProjects.tsx
│   │       ├── SkillsSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       └── CTASection.tsx
│   │
│   ├── lib/                        # Utility functions & helpers
│   │   ├── db.ts                   # Prisma database connection
│   │   ├── auth.ts                 # Authentication utilities
│   │   ├── email.ts                # Email service (Resend)
│   │   ├── validations.ts          # Zod validation schemas
│   │   ├── constants.ts            # App constants
│   │   ├── api-response.ts         # API response helpers
│   │   ├── middleware.ts           # Authentication middleware
│   │   └── utils.ts                # General utilities
│   │
│   └── styles/                     # Global styles
│       └── globals.css             # Tailwind + custom CSS
│
├── .env.local                       # Environment variables (git ignored)
├── .env.example                     # Example environment variables
├── .gitignore                       # Git ignore patterns
├── .gitattributes                   # Git attributes
├── .eslintrc.json                   # ESLint configuration
├── next.config.js                   # Next.js configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Project dependencies & scripts
└── README.md                        # Project documentation
```

## Key Directories Explained

### `/public`
- Static files that don't change (images, downloads, fonts)
- Directly accessible via URL (e.g., `/images/logo.png`)

### `/prisma`
- Database configuration and schemas
- `schema.prisma` - Defines all data models
- `seed.js` - Initial data for development

### `/src/app`
- **Next.js App Router** - Main application structure
- Page components automatically become routes
- `page.tsx` = route, `layout.tsx` = shared layout

### `/src/components`
- **Reusable React components** organized by type
- Common: header, footer, shared layouts
- UI: form elements, buttons, cards
- Forms: contact, login, testimonial forms
- Sections: hero, features, testimonials sections

### `/src/lib`
- **Utility functions** that don't have UI
- Database connections
- Authentication logic
- Email service
- Validation schemas
- API response helpers

### `/src/api`
- **Backend API endpoints**
- Structured by resource (projects, skills, etc.)
- Handle CRUD operations
- Protected routes require authentication

## Route Structure

### Public Routes
- `/` - Home
- `/about` - About page
- `/projects` - Projects listing
- `/projects/[id]` - Project detail
- `/skills` - Skills showcase
- `/contact` - Contact form page
- `/testimonials` - Testimonials page

### Admin Routes (Protected)
- `/login` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/projects` - Manage projects
- `/admin/skills` - Manage skills
- `/admin/messages` - View contact messages
- `/admin/testimonials` - Approve testimonials
- `/admin/settings` - Site settings
- `/admin/analytics` - View analytics

### API Endpoints
- `POST /api/auth/login` - Admin login
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (admin)
- `GET /api/messages` - Get messages (admin)
- `POST /api/messages` - Submit contact form
- `POST /api/testimonials` - Submit testimonial
- `PUT /api/testimonials/[id]` - Approve testimonial (admin)
- etc.

## File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `ContactForm.tsx`)
- **Pages**: `lowercase/page.tsx` (e.g., `projects/page.tsx`)
- **API Routes**: `lowercase/route.ts` (e.g., `api/projects/route.ts`)
- **Utilities**: `camelCase.ts` (e.g., `apiResponse.ts`)
- **Types**: Can use `.d.ts` suffix or inline (e.g., `types.ts`)

## Database Models

1. **Admin** - Admin user account
2. **Project** - Portfolio projects
3. **Skill** - Technical skills
4. **Message** - Contact form submissions
5. **Testimonial** - Visitor testimonials
6. **SiteSettings** - Global site configuration
7. **PageView** - Analytics tracking

## Next Steps

1. Install dependencies: `npm install`
2. Set up `.env.local` with your credentials
3. Push database schema: `npm run db:push`
4. Seed database: `npm run db:seed`
5. Start development: `npm run dev`
6. Create components and pages in `/src`
7. Build API routes in `/src/app/api`

---

See `README.md` for setup and deployment instructions.
