import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminFromToken } from '@/lib/auth';
import { sendTestimonialApprovalNotification } from '@/lib/email';
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

    const testimonial = await prisma.testimonial.update({
      where: { id: params.id },
      data: body,
    });

    // Send approval email if approving
    if (body.approved && !testimonial.approved) {
      try {
        await sendTestimonialApprovalNotification(
          testimonial.author,
          testimonial.email
        );
      } catch (emailError) {
        console.error('Email sending error:', emailError);
      }
    }

    return toJson(successResponse(testimonial, 'Testimonial updated successfully'));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to update testimonial'
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

    await prisma.testimonial.delete({
      where: { id: params.id },
    });

    return toJson(successResponse(null, 'Testimonial deleted successfully'));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to delete testimonial'
      )
    );
  }
}
