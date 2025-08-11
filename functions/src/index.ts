import * as functions from 'firebase-functions';
import { Resend } from 'resend';

const resend = new Resend(functions.config().resend.api_key);

export const sendEmail = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return; // Explicitly return void
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).send('Missing required fields (name, email, message)');
    return; // Explicitly return void
  }

  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Replace with your verified Resend email
      to: 'your-email@example.com', // Replace with the recipient email address
      subject: `New message from ${name} via your portfolio`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    });

    // Send a success response and return nothing
    res.status(200).send('Email sent successfully!');
    return; // Explicitly return void

  } catch (error) {
    console.error('Error sending email:', error);
    // Send an error response and return nothing
    res.status(500).send('Error sending email');
    return; // Explicitly return void
  }
});
