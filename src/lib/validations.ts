import { z } from 'zod';

// Authentication
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Contact Form
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message is too long'),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// Testimonial Submission
export const testimonialSchema = z.object({
  author: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  position: z.string().optional(),
  content: z.string().min(10, 'Testimonial must be at least 10 characters').max(1000),
  rating: z.number().min(1).max(5).optional(),
  websiteUrl: z.string().url().optional().or(z.literal('')),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;

// Project Management
export const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  shortDesc: z.string().min(10, 'Short description must be at least 10 characters').max(200),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  technologies: z.array(z.string()).min(1, 'Add at least one technology'),
  imageUrl: z.string().url('Invalid image URL'),
  imageAlt: z.string().min(5, 'Alt text must be at least 5 characters'),
  projectUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  caseStudy: z.string().optional(),
  featured: z.boolean().default(false),
});

export type ProjectInput = z.infer<typeof projectSchema>;

// Skill Management
export const skillSchema = z.object({
  name: z.string().min(2, 'Skill name must be at least 2 characters'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
  category: z.string().min(2, 'Category must be at least 2 characters'),
});

export type SkillInput = z.infer<typeof skillSchema>;
