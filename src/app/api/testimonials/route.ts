import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { testimonialSchema } from '@/lib/validations';
import { sendTestimonialNotification } from '@/lib/email';
import { successResponse, badRequestResponse, toJson } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    // Get approved testimonials only for public
    const testimonials = await prisma.testimonial.findMany({
      where: { approved: true },
      orderBy: { order: 'asc' },
    });

    return toJson(successResponse(testimonials, 'Testimonials retrieved'));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to fetch testimonials'
      )
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = testimonialSchema.safeParse(body);
    if (!validation.success) {
      return toJson(
        badRequestResponse('Invalid input', validation.error.message)
      );
    }

    // Create testimonial (not approved by default)
    const testimonial = await prisma.testimonial.create({
      data: {
        ...validation.data,
        approved: false,
      },
    });

    // Send admin notification
    try {
      await sendTestimonialNotification(
        validation.data.author,
        validation.data.email,
        validation.data.content
      );
    } catch (emailError) {
      console.error('Email sending error:', emailError);
    }

    return toJson(
      successResponse(
        testimonial,
        'Thank you for your testimonial! It will be reviewed and published soon.'
      )
    );
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to create testimonial'
      )
    );
  }
}
