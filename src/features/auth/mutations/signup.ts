import { SecurePassword } from "@blitzjs/auth/secure-password";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { EmailTemplateWelcome } from "email/react-email/emails/welcome";
import { sendEmail } from "email/sendEmail";
import { createElement } from "react";
import { Role } from "types";
import { SignupInput } from "../schemas";

export default resolver.pipe(
  resolver.zod(SignupInput),
  async ({ email, name, password }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim());

    const user = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        name,
        hashedPassword,
        role: "USER",
        onboarded: false,
      },
      select: { id: true, name: true, email: true, role: true },
    });

    if (user) {
      await sendEmail({
        to: user.email,
        subject: "Welcome to Eventio!",
        react: createElement(EmailTemplateWelcome, {
          props: { name: user.name, emailVerifyUrl: "" },
        }),
      });
      await ctx.session.$create({ userId: user.id, role: user.role as Role });
      return user;
    }

    return null;
  },
);
