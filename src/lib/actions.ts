'use server';

import { z } from 'zod';
import { contactFormSchema } from './schemas';
import { Resend } from 'resend';

type ContactFormInput = z.infer<typeof contactFormSchema>;

// Note: It's best practice to use process.env.RESEND_API_KEY
const resend = new Resend('re_5WLtNeiR_5vHZvMrwKTYdEQxHEEncf9Dm');

export async function sendContactEmail(data: ContactFormInput) {
  const result = contactFormSchema.safeParse(data);

  if (result.success) {
    try {
      const { name, email, message } = result.data;
      
      await resend.emails.send({
        from: 'onboarding@resend.dev', // This must be a verified domain in Resend
        to: 'alishapriyadarshi098@gmail.com',
        subject: `New message from ${name} via your portfolio`,
        reply_to: email,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <h2>Message:</h2>
          <p>${message}</p>
        `
      });

      return { success: true, message: 'Your message has been sent successfully!' };
    } catch (error) {
      console.error('Email sending error:', error);
      return { success: false, message: 'Failed to send email. Please try again later.' };
    }
  }

  if (result.error) {
    return { success: false, message: 'There was an error with your submission.', errors: result.error.format() };
  }

  return { success: false, message: 'An unknown error occurred.' };
}
