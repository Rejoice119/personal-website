import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { skillSchema } from '@/lib/validations';
import { getAdminFromToken } from '@/lib/auth';
import { successResponse, badRequestResponse, unauthorizedResponse, toJson } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: 'asc' },
    });

    return toJson(successResponse(skills, 'Skills retrieved'));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to fetch skills'
      )
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return toJson(unauthorizedResponse());
    }

    const token = authHeader.slice(7);
    const admin = await getAdminFromToken(token);
    if (!admin) {
      return toJson(unauthorizedResponse());
    }

    const body = await req.json();

    // Validate input
    const validation = skillSchema.safeParse(body);
    if (!validation.success) {
      return toJson(
        badRequestResponse('Invalid input', validation.error.message)
      );
    }

    // Create skill
    const skill = await prisma.skill.create({
      data: validation.data,
    });

    return toJson(successResponse(skill, 'Skill created successfully'));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to create skill'
      )
    );
  }
}
