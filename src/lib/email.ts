import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'My Portfolio';

// Send contact form email to admin
export async function sendContactNotification(
  senderName: string,
  senderEmail: string,
  subject: string,
  message: string
) {
  try {
    const result = await resend.emails.send({
      from: `${SITE_NAME} <onboarding@resend.dev>`,
      to: ADMIN_EMAIL,
      replyTo: senderEmail,
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${senderName} (${senderEmail})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    return result;
  } catch (error) {
    console.error('Error sending contact notification:', error);
    throw error;
  }
}

// Send confirmation email to visitor
export async function sendContactConfirmation(visitorEmail: string, visitorName: string) {
  try {
    const result = await resend.emails.send({
      from: `${SITE_NAME} <onboarding@resend.dev>`,
      to: visitorEmail,
      subject: `We received your message - ${SITE_NAME}`,
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${visitorName},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>${SITE_NAME} Team</p>
      `,
    });
    return result;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
}

// Send testimonial submission notification to admin
export async function sendTestimonialNotification(
  author: string,
  email: string,
  testimonial: string
) {
  try {
    const result = await resend.emails.send({
      from: `${SITE_NAME} <onboarding@resend.dev>`,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `New Testimonial from ${author}`,
      html: `
        <h2>New Testimonial Submitted</h2>
        <p><strong>Author:</strong> ${author}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p><strong>Testimonial:</strong></p>
        <p>"${testimonial}"</p>
        <hr />
        <p>Login to your admin dashboard to approve this testimonial.</p>
      `,
    });
    return result;
  } catch (error) {
    console.error('Error sending testimonial notification:', error);
    throw error;
  }
}

// Send testimonial approval notification to author
export async function sendTestimonialApprovalNotification(
  authorName: string,
  authorEmail: string
) {
  try {
    const result = await resend.emails.send({
      from: `${SITE_NAME} <onboarding@resend.dev>`,
      to: authorEmail,
      subject: `Your testimonial has been published - ${SITE_NAME}`,
      html: `
        <h2>Your Testimonial is Live!</h2>
        <p>Hi ${authorName},</p>
        <p>Thank you for your testimonial! We've published it on our website.</p>
        <p>Best regards,<br>${SITE_NAME} Team</p>
      `,
    });
    return result;
  } catch (error) {
    console.error('Error sending approval notification:', error);
    throw error;
  }
}
