import { resolver } from "@blitzjs/rpc";
import db from "db";
import EmailTemplateDummy from "email/react-email/emails/dummy";
import { sendEmail } from "email/sendEmail";
import { createElement } from "react";
import { generateUnsubscribeLink } from "src/uploadthing/email-utils";
import { z } from "zod";

const Input = z.object({});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("User not found");

    let unsubscribeLink = await generateUnsubscribeLink({
      userId: user.id,
      userEmail: user.email,
    });

    await sendEmail({
      to: user.email,
      subject: "Hey there dummy user",
      react: createElement(EmailTemplateDummy, {
        props: {
          name: user.name,
          emailVerifyUrl: "",
          unsubscribeLink,
        },
      }),
    });
  },
);
