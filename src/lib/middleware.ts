import { NextRequest } from 'next/server';
import { getAdminFromToken } from './auth';
import { unauthorizedResponse, toJson } from './api-response';

/**
 * Middleware to check if request is authenticated
 */
export async function authMiddleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return toJson(unauthorizedResponse('Missing or invalid authorization header'));
  }

  const token = authHeader.slice(7); // Remove 'Bearer ' prefix
  const admin = await getAdminFromToken(token);

  if (!admin) {
    return toJson(unauthorizedResponse('Invalid or expired token'));
  }

  return admin;
}

/**
 * Extract token from request
 */
export function getToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.slice(7);
}

/**
 * Get admin info from cookies (for client-side)
 */
export function getAdminFromCookie(cookies: any) {
  const token = cookies.get('adminToken')?.value;
  return token || null;
}
