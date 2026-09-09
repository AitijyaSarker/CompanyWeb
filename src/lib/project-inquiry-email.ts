import { db } from "@/lib/db";

export async function sendProjectInquiryEmail({
  projectTitle,
  name,
  email,
  phone,
  company,
  message,
}: {
  projectTitle: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) return false;

  const admin = await db.adminUser.findFirst({ orderBy: { createdAt: "asc" } });
  if (!admin) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [admin.email],
      reply_to: email,
      subject: `Project access request: ${projectTitle}`,
      text: [`Project: ${projectTitle}`, `Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "Not provided"}`, `Company: ${company || "Not provided"}`, "", message || "No message provided"].join("\n"),
    }),
  });
  return response.ok;
}