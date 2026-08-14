import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { contactFormSchema } from '@/lib/validations';
import { sendContactNotification, sendContactConfirmation } from '@/lib/email';
import { successResponse, badRequestResponse, toJson } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    // Get auth token from header
    const authHeader = req.headers.get('authorization');
    
    // Only admin can view all messages
    if (!authHeader?.startsWith('Bearer ')) {
      return toJson(badRequestResponse('Unauthorized'));
    }

    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return toJson(successResponse(messages, 'Messages retrieved'));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to fetch messages'
      )
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return toJson(
        badRequestResponse(
          'Invalid input',
          validation.error.message
        )
      );
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
        subject: validation.data.subject,
        message: validation.data.message,
      },
    });

    // Send emails
    try {
      await sendContactNotification(
        validation.data.name,
        validation.data.email,
        validation.data.subject,
        validation.data.message
      );
      await sendContactConfirmation(validation.data.email, validation.data.name);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the request if email fails
    }

    return toJson(successResponse(message, 'Message received! Thank you for contacting us.'));
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Failed to create message'
      )
    );
  }
}
