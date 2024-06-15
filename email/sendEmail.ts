import { render } from "@react-email/components";
import { CreateEmailOptions } from "resend/build/src/emails/interfaces";
import { isDev } from "src/config";
import { resend } from "./resend";
import { nodemailerAppTranport } from "./transports/nodemailer-app-transport";
import { Email } from "./types";

export let EMAIL_DEFAULT_FROM = "onboarding@resend.dev";

export const sendEmail = async ({ subject, to, react }: Email) => {
  let message: CreateEmailOptions = {
    from: EMAIL_DEFAULT_FROM,
    to,
    subject,
    text: "",
  };

  if (isDev) {
    if (!react) throw new Error("The email doesn't have any content");
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
