"use server";

import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address."),
  message: z.string().trim().min(20, "A couple of sentences about the project, please (20+ characters).").max(4000),
  company: z.string().max(0).optional(),
});

export type ContactState = {
  status: "idle" | "error" | "sent" | "demo";
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: { name: string; email: string; message: string };
  message?: string;
};

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
  const parsed = schema.safeParse({ ...values, company: String(formData.get("company") ?? "") });

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if ((field === "name" || field === "email" || field === "message") && !errors[field]) {
        errors[field] = issue.message;
      }
    }
    if (Object.keys(errors).length === 0) return { status: "sent" };
    return { status: "error", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return {
      status: "demo",
      message: "Thanks! This is a demo site, so the message was checked but not sent anywhere.",
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: parsed.data.email,
    subject: `New project enquiry from ${parsed.data.name}`,
    text: `${parsed.data.message}\n\n${parsed.data.name} <${parsed.data.email}>`,
  });

  if (error) {
    return { status: "error", values, message: "The message could not be sent. Please try again in a minute." };
  }
  return { status: "sent", message: "Thanks! I'll reply within one working day." };
}
