'use server'
import { z } from 'zod';
import { resend } from '@/lib/resend';

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(7).max(32),
  message: z.string().trim().min(10).max(5_000),
  turnstileToken: z.string().min(1).max(2_048),
});

type ContactData = z.infer<typeof ContactSchema>;

async function verifyTurnstile(token: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error('Turnstile secret key is missing.');
    return false;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: secretKey, response: token }),
      cache: 'no-store',
    });
    const result = await response.json() as { success?: boolean; action?: string };
    return response.ok && result.success === true && result.action === 'contact';
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

export async function submitContact(data: ContactData) {
  try {
    const parsedData = ContactSchema.safeParse(data);
    if (!parsedData.success) {
      return { success: false, message: 'Please check the form fields and try again.' };
    }

    const isHuman = await verifyTurnstile(parsedData.data.turnstileToken);
    if (!isHuman) {
      return { 
        success: false, 
        message: 'Verification failed. Please try again.'
      };
    }

    const from = process.env.RESEND_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL ?? 'contact@muaathrifath.me';
    if (!process.env.RESEND_API_KEY || !from) {
      console.error('Resend contact-form configuration is missing.');
      return { success: false, message: 'The contact form is temporarily unavailable.' };
    }

    const { name, email, phone, message } = parsedData.data;
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend contact email error:', error);
      return { success: false, message: 'Unable to send your message. Please try again later.' };
    }

    return { 
      success: true, 
      message: 'Thanks — your message has been sent.'
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    return { 
      success: false, 
      message: 'Failed to send your message'
    };
  }
}
