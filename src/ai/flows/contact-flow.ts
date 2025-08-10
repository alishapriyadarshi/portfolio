'use server';
/**
 * @fileOverview A flow for sending a contact email.
 *
 * - sendContactEmail - A function that handles sending the contact email.
 * - ContactFormInput - The input type for the sendContactEmail function.
 * - ContactFormOutput - The return type for the sendContactEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { contactFormSchema } from '@/lib/schemas';

export type ContactFormInput = z.infer<typeof contactFormSchema>;

const ContactFormOutputSchema = z.object({
    message: z.string(),
    success: z.boolean(),
});

export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

export async function sendContactEmail(input: ContactFormInput): Promise<ContactFormOutput> {
    return contactFlow(input);
}

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: contactFormSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (data) => {
    // In a real application, you would use a service like SendGrid or Nodemailer
    // to send an email here. For this demo, we'll just log it to the console
    // as if it were sent.
    console.log('--- New Contact Form Submission ---');
    console.log(`To: alishapriyadarshi098@gmail.com`);
    console.log(`From: ${data.name} <${data.email}>`);
    console.log(`Message: ${data.message}`);
    console.log('---------------------------------');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      message: 'Your message has been sent successfully!',
      success: true,
    };
  }
);
