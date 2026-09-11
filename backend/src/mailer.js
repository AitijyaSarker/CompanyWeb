import nodemailer from "nodemailer";

const notificationRecipient = process.env.NOTIFICATION_EMAIL || "contact@ultrabulbit.com";
const defaultFrom = process.env.MAIL_FROM || `"ULTRABULB IT" <${notificationRecipient}>`;

let transporterPromise = null;

async function getTransporter() {
  if (transporterPromise) return transporterPromise;

  transporterPromise = (async () => {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER || process.env.SMTP_USERNAME;
    const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    const secure = process.env.SMTP_SECURE === "true" || port === 465;

    if (host && user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });
      console.log(`[Mailer] Initialized SMTP transport (${host}:${port})`);
      return transporter;
    }

    // Fallback: Create Ethereal sandbox test account
    try {
      const testAccount = await nodemailer.createTestAccount();
      const testTransporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log(`[Mailer] Initialized Ethereal Sandbox mailer (${testAccount.user})`);
      return testTransporter;
    } catch (err) {
      console.warn("[Mailer] Could not create Ethereal test account, using fallback stream transport", err);
      return nodemailer.createTransport({
        streamTransport: true,
        newline: "windows",
        buffer: true,
      });
    }
  })();

  return transporterPromise;
}

export async function sendBookingNotification(booking) {
  try {
    const transporter = await getTransporter();
    const { name, email, phone, topic, date, timeSlot, company, message } = booking;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030712; color: #f8fafc; margin: 0; padding: 24px; }
    .card { background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 32px; max-width: 600px; margin: 0 auto; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .header { border-bottom: 1px solid #1e293b; padding-bottom: 20px; margin-bottom: 24px; }
    .badge { display: inline-block; background: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.4); color: #38bdf8; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; }
    h1 { color: #ffffff; font-size: 22px; margin: 12px 0 4px 0; font-weight: 800; }
    .row { display: flex; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .label { font-size: 13px; color: #94a3b8; width: 140px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
    .val { font-size: 14px; color: #f1f5f9; font-weight: 500; }
    .message-box { background: #020617; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; margin-top: 16px; font-size: 14px; color: #cbd5e1; line-height: 1.6; white-space: pre-wrap; }
    .footer { margin-top: 28px; text-align: center; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">New Scheduled Consultation</span>
      <h1>ULTRABULB IT — Booking Alert</h1>
      <p style="color: #94a3b8; font-size: 13px; margin: 0;">A new meeting has been booked via the online scheduler.</p>
    </div>

    <div>
      <div class="row">
        <div class="label">Client Name:</div>
        <div class="val"><strong>${name}</strong></div>
      </div>
      <div class="row">
        <div class="label">Email:</div>
        <div class="val"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></div>
      </div>
      <div class="row">
        <div class="label">Phone:</div>
        <div class="val">${phone || "Not provided"}</div>
      </div>
      <div class="row">
        <div class="label">Company:</div>
        <div class="val">${company || "Not provided"}</div>
      </div>
      <div class="row">
        <div class="label">Topic / Service:</div>
        <div class="val"><span style="color: #38bdf8; font-weight: 600;">${topic}</span></div>
      </div>
      <div class="row">
        <div class="label">Date:</div>
        <div class="val"><strong>${date}</strong></div>
      </div>
      <div class="row">
        <div class="label">Time Slot:</div>
        <div class="val"><strong>${timeSlot}</strong></div>
      </div>
    </div>

    ${message ? `
    <div style="margin-top: 20px;">
      <div class="label" style="width: 100%; margin-bottom: 6px;">Client Message / Agenda:</div>
      <div class="message-box">${message}</div>
    </div>
    ` : ""}

    <div class="footer">
      <p>Delivered automatically to <strong>${notificationRecipient}</strong> by ULTRABULB IT System Scheduler.</p>
    </div>
  </div>
</body>
</html>
    `;

    const info = await transporter.sendMail({
      from: defaultFrom,
      to: notificationRecipient,
      replyTo: email,
      subject: `[New Booking] ${topic} — ${name} (${date} at ${timeSlot})`,
      text: `New Meeting Booking:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nCompany: ${company || "N/A"}\nTopic: ${topic}\nDate: ${date}\nTime: ${timeSlot}\n\nMessage:\n${message || "N/A"}`,
      html,
    });

    console.log(`[Mailer] Booking notification sent to ${notificationRecipient}; Message ID: ${info.messageId}`);
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`[Mailer] Sandbox Email Preview URL: ${previewUrl}`);
    }
    return info;
  } catch (err) {
    console.error("[Mailer] Failed to send booking notification email:", err);
    return null;
  }
}

export async function sendContactNotification(contact) {
  try {
    const transporter = await getTransporter();
    const { name, email, subject, message, phone } = contact;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030712; color: #f8fafc; margin: 0; padding: 24px; }
    .card { background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 32px; max-width: 600px; margin: 0 auto; }
    .header { border-bottom: 1px solid #1e293b; padding-bottom: 20px; margin-bottom: 24px; }
    .badge { display: inline-block; background: rgba(14, 165, 233, 0.15); border: 1px solid rgba(14, 165, 233, 0.4); color: #38bdf8; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; }
    h1 { color: #ffffff; font-size: 20px; margin: 12px 0 4px 0; font-weight: 800; }
    .row { display: flex; margin-bottom: 12px; }
    .label { font-size: 13px; color: #94a3b8; width: 120px; font-weight: 600; }
    .val { font-size: 14px; color: #f1f5f9; }
    .message-box { background: #020617; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; margin-top: 16px; font-size: 14px; color: #cbd5e1; line-height: 1.6; white-space: pre-wrap; }
    .footer { margin-top: 24px; text-align: center; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">Contact Form Inquiry</span>
      <h1>${subject || "New Message Received"}</h1>
    </div>
    <div class="row"><div class="label">Sender:</div><div class="val"><strong>${name}</strong></div></div>
    <div class="row"><div class="label">Email:</div><div class="val"><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></div></div>
    <div class="row"><div class="label">Phone:</div><div class="val">${phone || "Not provided"}</div></div>
    <div style="margin-top: 16px;">
      <div class="label">Message:</div>
      <div class="message-box">${message}</div>
    </div>
    <div class="footer">Delivered to <strong>${notificationRecipient}</strong></div>
  </div>
</body>
</html>
    `;

    const info = await transporter.sendMail({
      from: defaultFrom,
      to: notificationRecipient,
      replyTo: email,
      subject: `[Contact Form] ${subject || "Inquiry"} — ${name}`,
      text: `Contact Message:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html,
    });

    console.log(`[Mailer] Contact notification sent to ${notificationRecipient}; ID: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error("[Mailer] Failed to send contact email:", err);
    return null;
  }
}
