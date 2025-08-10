"use server"

import { z } from "zod"
import { contactFormSchema } from "@/lib/schemas"

export type ContactFormState = {
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
  success: boolean
}

export async function submitContactForm(
  data: z.infer<typeof contactFormSchema>
): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid form data.",
      success: false,
    }
  }

  // Simulate sending an email or saving to DB
  console.log("Contact form submitted:", validatedFields.data)
  await new Promise(resolve => setTimeout(resolve, 1000));


  return {
    message: "Your message has been sent successfully!",
    success: true,
  }
}
