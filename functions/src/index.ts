import * as functions from "firebase-functions/v2";
import {Resend} from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error(
    "Resend API key missing! Set it with environment variable RESEND_API_KEY"
  );
}

const resend = apiKey ? new Resend(apiKey) : null;

// This is how you define an HTTPS function in v2:
export const sendEmail = functions.https.onRequest({
  region: "us-central1",
}, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const {name, email, message} = req.body;

  if (!name || !email || !message) {
    res.status(400).send("Missing required fields");
    return;
  }

  if (!resend) {
    res.status(500).send("Server misconfigured: missing API key");
    return;
  }

  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "your-email@example.com",
      subject: `New message from ${name} via your portfolio`,
      html:
        `<p><strong>Name:</strong> ${name}</p>` +
        `<p><strong>Email:</strong> ${email}</p>` +
        `<p><strong>Message:</strong> ${message}</p>`,
    });

    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});
