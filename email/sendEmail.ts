import { render } from "@react-email/components";
import { Resend } from "resend";
import { CreateEmailOptions } from "resend/build/src/emails/interfaces";
import { isDev } from "src/config";
import { env } from "src/env.mjs";
import { nodemailerAppTranport } from "./transports/nodemailer-app-transport";
import { Email } from "./types";

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async ({ subject, to, react }: Email) => {
  let message: CreateEmailOptions = {
    from: "onboarding@resend.dev",
    to,
    subject,
    html: "",
  };

  if (isDev) {
    const html = render(react);
    return nodemailerAppTranport.sendMail({
      ...message,
      html,
    });
  }

  return resend.emails.send({
    ...message,
    react,
  });
};
