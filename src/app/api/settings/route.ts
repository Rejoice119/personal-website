import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminFromToken } from '@/lib/auth';
import { successResponse, badRequestResponse, unauthorizedResponse, toJson } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'default' },
    });

    return toJson(successResponse(settings, 'Settings retrieved'));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to fetch settings'
      )
    );
  }
}

export async function PUT(req: NextRequest) {
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

    // Update settings
    const settings = await prisma.siteSettings.update({
      where: { id: 'default' },
      data: body,
    });

    return toJson(successResponse(settings, 'Settings updated successfully'));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to update settings'
      )
    );
  }
}
