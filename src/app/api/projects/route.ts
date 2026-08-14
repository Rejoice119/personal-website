import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { projectSchema } from '@/lib/validations';
import { getAdminFromToken } from '@/lib/auth';
import { successResponse, badRequestResponse, unauthorizedResponse, toJson } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    // Get featured query param
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured') === 'true';

    const projects = await prisma.project.findMany({
      where: featured ? { featured: true } : {},
      orderBy: { order: 'asc' },
    });

    return toJson(successResponse(projects, 'Projects retrieved'));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to fetch projects'
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
    const validation = projectSchema.safeParse(body);
    if (!validation.success) {
      return toJson(
        badRequestResponse('Invalid input', validation.error.message)
      );
    }

    // Create project
    const project = await prisma.project.create({
      data: validation.data,
    });

    return toJson(successResponse(project, 'Project created successfully'));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to create project'
      )
    );
  }
}
