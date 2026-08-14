import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminFromToken } from '@/lib/auth';
import { successResponse, badRequestResponse, unauthorizedResponse, toJson } from '@/lib/api-response';

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

    const message = await prisma.message.update({
      where: { id: params.id },
      data: body,
    });

    return toJson(successResponse(message, 'Message updated successfully'));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to update message'
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

    await prisma.message.delete({
      where: { id: params.id },
    });

    return toJson(successResponse(null, 'Message deleted successfully'));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to delete message'
      )
    );
  }
}
