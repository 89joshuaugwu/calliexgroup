import "server-only";
import nodemailer from "nodemailer";

/**
 * Gmail SMTP notification sender. Requires a Google Account App Password
 * (NOT the regular password — Gmail rejects those for SMTP, which is the
 * "BadCredentials" error every Joshuazaza project has hit at least once).
 * Generate one at myaccount.google.com/apppasswords with 2FA enabled on
 * SMTP_USER, then set SMTP_USER / SMTP_APP_PASSWORD in .env.local.
 */
function getTransport() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("SMTP_USER / SMTP_APP_PASSWORD not configured.");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function notifyNewSubscriber(email: string) {
  const to = process.env.NEWSLETTER_NOTIFY_TO;
  if (!to) return; // notification is optional — skip quietly if unset

  const transport = getTransport();
  await transport.sendMail({
    from: `"Callie X Group Website" <${process.env.SMTP_USER}>`,
    to,
    subject: "New newsletter subscriber",
    text: `${email} just subscribed to the Callie X Group newsletter.`,
    html: `<p><strong>${email}</strong> just subscribed to the Callie X Group newsletter.</p>`,
  });
}
