import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminFromToken } from '@/lib/auth';
import { successResponse, badRequestResponse, unauthorizedResponse, notFoundResponse, toJson } from '@/lib/api-response';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return toJson(notFoundResponse('Project not found'));
    }

    return toJson(successResponse(project));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to fetch project'
      )
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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

    const project = await prisma.project.update({
      where: { id: params.id },
      data: body,
    });

    return toJson(successResponse(project, 'Project updated successfully'));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to update project'
      )
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return toJson(unauthorizedResponse());
    }

    const token = authHeader.slice(7);
    const admin = await getAdminFromToken(token);
    if (!admin) {
      return toJson(unauthorizedResponse());
    }

    await prisma.project.delete({
      where: { id: params.id },
    });

    return toJson(successResponse(null, 'Project deleted successfully'));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to delete project'
      )
    );
  }
}
