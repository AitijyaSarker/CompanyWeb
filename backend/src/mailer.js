import nodemailer from "nodemailer";
import dns from "node:dns";

if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

function getMailerConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const rawPort = process.env.SMTP_PORT?.trim();
  const port = rawPort ? Number(rawPort) : 465;
  const user = (process.env.SMTP_USER || process.env.SMTP_USERNAME)?.trim();
  const pass = (process.env.SMTP_PASS || process.env.SMTP_PASSWORD)?.trim();
  const rawSecure = process.env.SMTP_SECURE?.trim();
  const secure = rawSecure !== undefined ? rawSecure === "true" : port === 465;
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const brevoApiKey = process.env.BREVO_API_KEY?.trim();
  const recipient = (process.env.NOTIFICATION_EMAIL || "contact@ultrabulbit.com").trim();
  const from = (process.env.MAIL_FROM || (user ? `"ULTRABULB IT" <${user}>` : `"ULTRABULB IT" <${recipient}>`)).trim();

  return { host, port, user, pass, secure, resendApiKey, brevoApiKey, recipient, from };
}

async function sendViaResend(apiKey, { from, to, subject, html, text, replyTo }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      html,
      text,
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Resend API error (${res.status}): ${errText}`);
  }
  const data = await res.json();
  return { messageId: data.id, provider: "resend" };
}

async function sendViaBrevo(apiKey, { from, to, subject, html, text, replyTo }) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { email: from.includes("<") ? from.replace(/.*<([^>]+)>.*/, "$1") : from, name: "ULTRABULB IT" },
      to: [{ email: to }],
      replyTo: replyTo ? { email: replyTo } : undefined,
      subject,
      htmlContent: html,
      textContent: text,
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Brevo API error (${res.status}): ${errText}`);
  }
  const data = await res.json();
  return { messageId: data.messageId, provider: "brevo" };
}

let activeTransporter = null;
let lastConfigSignature = "";

async function createAndVerifyTransport(host, port, user, pass, secure) {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    family: 4,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
      servername: host,
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 15000,
  });

  await transporter.verify();
  return transporter;
}

export async function getTransporter() {
  const cfg = getMailerConfig();
  const signature = `${cfg.host}:${cfg.port}:${cfg.user}:${Boolean(cfg.pass)}:${cfg.secure}`;

  if (activeTransporter && lastConfigSignature === signature) {
    return activeTransporter;
  }

  if (cfg.host && cfg.user && cfg.pass) {
    const primaryPort = cfg.port;
    const primarySecure = cfg.secure;
    const alternatePort = primaryPort === 465 ? 587 : 465;
    const alternateSecure = alternatePort === 465;

    // Try primary port first
    try {
      console.log(`[Mailer] Testing SMTP transport on ${cfg.host}:${primaryPort} (secure: ${primarySecure})...`);
      const transporter = await createAndVerifyTransport(cfg.host, primaryPort, cfg.user, cfg.pass, primarySecure);
      console.log(`[Mailer] Successfully verified SMTP connection on ${cfg.host}:${primaryPort}`);
      activeTransporter = transporter;
      lastConfigSignature = signature;
      return transporter;
    } catch (primaryErr) {
      console.warn(`[Mailer] SMTP connection on ${cfg.host}:${primaryPort} failed (${primaryErr.message}). Trying alternate port ${alternatePort}...`);

      // Try alternate port (e.g. 587 if 465 timed out)
      try {
        const altTransporter = await createAndVerifyTransport(cfg.host, alternatePort, cfg.user, cfg.pass, alternateSecure);
        console.log(`[Mailer] Successfully verified SMTP connection on alternate port ${cfg.host}:${alternatePort}!`);
        activeTransporter = altTransporter;
        lastConfigSignature = signature;
        return altTransporter;
      } catch (altErr) {
        console.error(`[Mailer] Both ports ${primaryPort} and ${alternatePort} failed for ${cfg.host}:`, altErr.message || altErr);
        // Fallback to unverified primary transport
        const fallbackTransporter = nodemailer.createTransport({
          host: cfg.host,
          port: primaryPort,
          secure: primarySecure,
          family: 4,
          auth: { user: cfg.user, pass: cfg.pass },
          tls: { rejectUnauthorized: false, servername: cfg.host },
        });
        activeTransporter = fallbackTransporter;
        lastConfigSignature = signature;
        return fallbackTransporter;
      }
    }
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
    console.log(`[Mailer] No custom SMTP configured. Initialized Ethereal Sandbox mailer (${testAccount.user})`);
    activeTransporter = testTransporter;
    lastConfigSignature = "ethereal";
    return testTransporter;
  } catch (err) {
    console.warn("[Mailer] Could not create Ethereal test account, using stream transport fallback", err);
    activeTransporter = nodemailer.createTransport({
      streamTransport: true,
      newline: "windows",
      buffer: true,
    });
    lastConfigSignature = "stream";
    return activeTransporter;
  }
}

export async function verifyMailerConnection() {
  const cfg = getMailerConfig();
  const result = {
    configured: Boolean((cfg.host && cfg.user && cfg.pass) || cfg.resendApiKey || cfg.brevoApiKey),
    provider: cfg.resendApiKey ? "resend_api" : cfg.brevoApiKey ? "brevo_api" : cfg.host ? "smtp" : "none",
    host: cfg.host || null,
    port: cfg.port,
    user: cfg.user || null,
    secure: cfg.secure,
    recipient: cfg.recipient,
    from: cfg.from,
    verified: false,
    error: null,
  };

  if (cfg.resendApiKey) {
    result.verified = true;
    return result;
  }

  if (cfg.brevoApiKey) {
    result.verified = true;
    return result;
  }

  if (!cfg.host || !cfg.user || !cfg.pass) {
    result.error = "Missing SMTP_HOST, SMTP_USER, or SMTP_PASS in environment variables.";
    return result;
  }

  try {
    const transporter = await getTransporter();
    await transporter.verify();
    result.verified = true;
    return result;
  } catch (err) {
    result.error = err.message || String(err);
    result.code = err.code;
    result.response = err.response;
    return result;
  }
}

export async function sendBookingNotification(booking) {
  const cfg = getMailerConfig();
  try {
    const { name, email, phone, topic, date, timeSlot, company, message } = booking;
    const subject = `[New Booking] ${topic} — ${name} (${date} at ${timeSlot})`;
    const text = `New Meeting Booking:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nCompany: ${company || "N/A"}\nTopic: ${topic}\nDate: ${date}\nTime: ${timeSlot}\n\nMessage:\n${message || "N/A"}`;

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
      <p>Delivered automatically to <strong>${cfg.recipient}</strong> by ULTRABULB IT System Scheduler.</p>
    </div>
  </div>
</body>
</html>
    `;

    if (cfg.resendApiKey) {
      console.log(`[Mailer] Sending booking alert via Resend API to ${cfg.recipient}...`);
      const res = await sendViaResend(cfg.resendApiKey, { from: cfg.from, to: cfg.recipient, subject, html, text, replyTo: email });
      console.log(`[Mailer] Booking notification delivered via Resend; ID: ${res.messageId}`);
      return res;
    }

    if (cfg.brevoApiKey) {
      console.log(`[Mailer] Sending booking alert via Brevo API to ${cfg.recipient}...`);
      const res = await sendViaBrevo(cfg.brevoApiKey, { from: cfg.from, to: cfg.recipient, subject, html, text, replyTo: email });
      console.log(`[Mailer] Booking notification delivered via Brevo; ID: ${res.messageId}`);
      return res;
    }

    const transporter = await getTransporter();
    const info = await transporter.sendMail({
      from: cfg.from,
      to: cfg.recipient,
      replyTo: email,
      subject,
      text,
      html,
    });

    console.log(`[Mailer] Booking notification sent to ${cfg.recipient}; Message ID: ${info.messageId}`);
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`[Mailer] Sandbox Email Preview URL: ${previewUrl}`);
    }
    return info;
  } catch (err) {
    console.error("[Mailer] Failed to send booking notification email:", {
      message: err.message,
      code: err.code,
      response: err.response,
      command: err.command,
    });
    return null;
  }
}

export async function sendContactNotification(contact) {
  const cfg = getMailerConfig();
  try {
    const { name, email, subject, message, phone } = contact;
    const mailSubject = `[Contact Form] ${subject || "Inquiry"} — ${name}`;
    const text = `Contact Message:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nSubject: ${subject}\n\nMessage:\n${message}`;

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
    <div class="footer">Delivered to <strong>${cfg.recipient}</strong></div>
  </div>
</body>
</html>
    `;

    if (cfg.resendApiKey) {
      console.log(`[Mailer] Sending contact inquiry via Resend API to ${cfg.recipient}...`);
      const res = await sendViaResend(cfg.resendApiKey, { from: cfg.from, to: cfg.recipient, subject: mailSubject, html, text, replyTo: email });
      console.log(`[Mailer] Contact inquiry delivered via Resend; ID: ${res.messageId}`);
      return res;
    }

    if (cfg.brevoApiKey) {
      console.log(`[Mailer] Sending contact inquiry via Brevo API to ${cfg.recipient}...`);
      const res = await sendViaBrevo(cfg.brevoApiKey, { from: cfg.from, to: cfg.recipient, subject: mailSubject, html, text, replyTo: email });
      console.log(`[Mailer] Contact inquiry delivered via Brevo; ID: ${res.messageId}`);
      return res;
    }

    const transporter = await getTransporter();
    const info = await transporter.sendMail({
      from: cfg.from,
      to: cfg.recipient,
      replyTo: email,
      subject: mailSubject,
      text,
      html,
    });

    console.log(`[Mailer] Contact notification sent to ${cfg.recipient}; ID: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error("[Mailer] Failed to send contact email:", {
      message: err.message,
      code: err.code,
      response: err.response,
      command: err.command,
    });
    return null;
  }
}

export async function sendTestEmail(targetEmail) {
  const cfg = getMailerConfig();
  const to = (targetEmail || cfg.recipient).trim();
  const subject = `[SMTP Diagnostic Test] ULTRABULB IT Mailer Verification`;
  const text = `This is a diagnostic test email from ULTRABULB IT server.\n\nServer timestamp: ${new Date().toISOString()}\nHost: ${cfg.host || "Sandbox"}\nPort: ${cfg.port}\nAuth User: ${cfg.user || "Sandbox"}\nSecure: ${cfg.secure}\n`;
  const html = `
    <div style="font-family: sans-serif; background: #030712; color: #ffffff; padding: 24px; border-radius: 12px; max-width: 500px;">
      <h2 style="color: #00f0ff;">ULTRABULB IT — Mailer Active</h2>
      <p>Your mail server configuration is working properly!</p>
      <ul style="color: #94a3b8; font-size: 13px; line-height: 1.8;">
        <li><strong>Provider:</strong> ${cfg.resendApiKey ? "Resend API (Port 443)" : cfg.brevoApiKey ? "Brevo API (Port 443)" : cfg.host ? "Custom SMTP" : "Sandbox"}</li>
        <li><strong>Host:</strong> ${cfg.host || "N/A"}</li>
        <li><strong>Port:</strong> ${cfg.port}</li>
        <li><strong>Auth User:</strong> ${cfg.user || "N/A"}</li>
        <li><strong>Sender:</strong> ${cfg.from}</li>
        <li><strong>Timestamp:</strong> ${new Date().toISOString()}</li>
      </ul>
    </div>
  `;

  if (cfg.resendApiKey) {
    return sendViaResend(cfg.resendApiKey, { from: cfg.from, to, subject, html, text });
  }

  if (cfg.brevoApiKey) {
    return sendViaBrevo(cfg.brevoApiKey, { from: cfg.from, to, subject, html, text });
  }

  const transporter = await getTransporter();
  return transporter.sendMail({ from: cfg.from, to, subject, text, html });
}
