// API Response types
export const API_RESPONSE = {
  SUCCESS: 'success',
  ERROR: 'error',
};

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// Skill levels
export const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

// Skill categories
export const SKILL_CATEGORIES = ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Other'] as const;

// Message status
export const MESSAGE_STATUS = {
  UNREAD: 'unread',
  READ: 'read',
  REPLIED: 'replied',
} as const;

// Rate limiting
export const RATE_LIMITS = {
  CONTACT_FORM: { requests: 5, windowMs: 60 * 60 * 1000 }, // 5 requests per hour
  LOGIN: { requests: 5, windowMs: 15 * 60 * 1000 }, // 5 attempts per 15 minutes
};

// SEO defaults
export const SEO = {
  TITLE: 'My Portfolio | Professional Web Developer',
  DESCRIPTION: 'Showcase of my projects and expertise in web development',
  KEYWORDS: 'developer, portfolio, projects, skills',
  IMAGE: '/og-image.jpg',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Utility function to format date
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Utility function to get initials
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Utility function to truncate text
export function truncate(text: string, length: number = 100): string {
  return text.length > length ? text.slice(0, length) + '...' : text;
}

// Utility function to hash IP (for privacy)
export async function hashIp(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Get client IP from headers
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  return (forwarded ? forwarded.split(', ')[0] : req.headers.get('x-real-ip')) || 'unknown';
}
