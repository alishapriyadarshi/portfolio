'use server';

import { z } from 'zod';
import { contactFormSchema } from './schemas';
import { Resend } from 'resend';

type ContactFormInput = z.infer<typeof contactFormSchema>;

// IMPORTANT: Using the API key directly in code is not recommended for production.
// It's better to use an environment variable like process.env.RESEND_API_KEY
const resend = new Resend('re_97rY5S3f_MsP3KhTBrqJek14nLduXJXoa');

export async function sendContactEmail(data: ContactFormInput) {
  const result = contactFormSchema.safeParse(data);

  if (result.success) {
    try {
      const { name, email, message } = result.data;
      
      // For testing, Resend recommends sending TO onboarding@resend.dev.
      // This email will appear in your Resend account, not your personal inbox.
      // This confirms the connection is working.
      // To send to your own email, you must verify your domain in Resend.
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'alishapriyadarshi098@gmail.com',
        subject: `New message from ${name} via your portfolio`,
        reply_to: email,
        html: `
          <h1>New Contact Form Submission</h1>
          <p>You have received a new message from your portfolio contact form.</p>
          <hr />
          <h2>Sender Details:</h2>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
          </ul>
          <hr />
          <h2>Message:</h2>
          <p>${message}</p>
        `
      });

      return { success: true, message: 'Your message has been sent successfully!' };
    } catch (error) {
      console.error('Email sending error:', error);
      // This will now return a more specific error if Resend fails.
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { success: false, message: `Failed to send email: ${errorMessage}` };
    }
  }

  if (result.error) {
    return { success: false, message: 'There was an error with your submission.', errors: result.error.format() };
  }

  return { success: false, message: 'An unknown error occurred.' };
}
