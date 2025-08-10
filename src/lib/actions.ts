'use server';

import { z } from 'zod';
import { contactFormSchema } from './schemas';

type ContactFormInput = z.infer<typeof contactFormSchema>;

export async function sendContactEmail(data: ContactFormInput) {
  const result = contactFormSchema.safeParse(data);

  if (result.success) {
    // In a real application, you would use a service like SendGrid or Nodemailer
    // to send an email here. For this demo, we'll just log it to the console
    // and simulate a successful response.
    console.log('--- New Contact Form Submission ---');
    console.log(`To: alishapriyadarshi098@gmail.com`);
    console.log(`From: ${data.name} <${data.email}>`);
    console.log(`Message: ${data.message}`);
    console.log('---------------------------------');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, message: 'Your message has been sent successfully!' };
  }

  if (result.error) {
    return { success: false, message: 'There was an error with your submission.', errors: result.error.format() };
  }

  return { success: false, message: 'An unknown error occurred.' };
}
