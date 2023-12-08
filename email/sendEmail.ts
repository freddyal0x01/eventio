import { Resend } from "resend";
import { CreateEmailOptions } from "resend/build/src/emails/interfaces";
import { isDev } from "src/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ subject, to, html }) => {
  let message: CreateEmailOptions = {
    from: "onboarding@resend.dev",
    subject,
    to,
    html,
  };

  if (isDev) {
    const previewEmail = (await import("preview-email")).default;
    await previewEmail(message);
  } else {
    await resend.emails.send(message);
  }
};
