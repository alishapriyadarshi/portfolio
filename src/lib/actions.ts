import { z } from 'zod';
import { contactFormSchema } from './schemas'; // Keep schema import

type ContactFormInput = z.infer<typeof contactFormSchema>;

export async function sendContactEmail(data: ContactFormInput) {
  const result = contactFormSchema.safeParse(data);

  if (result.success) {
 return { success: true, message: 'Your message has been sent successfully!' };
  }

  if (result.error) {
    return { success: false, message: 'There was an error with your submission.', errors: result.error.format() };
  }
  return { success: false, message: 'An unknown error occurred.' };
}
