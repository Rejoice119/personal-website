import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './db';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key';
const SALT_ROUNDS = 10;

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Compare password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Create JWT token
export function createToken(adminId: string): string {
  return jwt.sign({ id: adminId }, JWT_SECRET, { expiresIn: '7d' });
}

// Verify JWT token
export function verifyToken(token: string): { id: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string };
  } catch {
    return null;
  }
}

// Login admin
export async function loginAdmin(email: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { email } });
  
  if (!admin) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await verifyPassword(password, admin.password);
  
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = createToken(admin.id);
  return { token, admin: { id: admin.id, email: admin.email, name: admin.name } };
}

// Get admin from token
export async function getAdminFromToken(token: string) {
  const payload = verifyToken(token);
  
  if (!payload) {
    return null;
  }

  return prisma.admin.findUnique({
    where: { id: payload.id },
    select: { id: true, email: true, name: true },
  });
}
