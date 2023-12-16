import { isDev } from "src/config";
import { resend } from "./resend";
import { EMAIL_DEFAULT_FROM, sendEmail } from "./sendEmail";
import { Email } from "./types";

export type EmailWithText = Email & { text: string; from: string };

export const sendBulkEmail = async ({ emails }: { emails: Email[] }) => {
  if (isDev) {
    for (const email of emails) {
      await sendEmail(email);
    }
  } else {
    let mappedEmails: EmailWithText[] = emails.map((email) => ({
      ...email,
      from: EMAIL_DEFAULT_FROM,
      text: "",
    }));

    const maxEmailLimit = 100;

    if (mappedEmails.length > maxEmailLimit) {
      throw new Error(
        `You can't send more than ${maxEmailLimit} emails at once using Resend`,
      );
    }

    return resend.batch.send(mappedEmails);
  }
};
