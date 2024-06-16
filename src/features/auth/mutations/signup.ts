import { SecurePassword } from "@blitzjs/auth/secure-password";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { EmailTemplateWelcome } from "email/react-email/emails/welcome";
import { sendEmail } from "email/sendEmail";
import { createElement } from "react";
import { PrismaError } from "src/utils/blitz-utils";
import { Role } from "types";
import { SignupInput } from "../schemas";

export default resolver.pipe(
  resolver.zod(SignupInput),
  async ({ email, name, password }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim());

    const existingInvite = await db.signupInvite.findFirst({
      where: {
        email: email.toLowerCase().trim(),
      },
    });

    if (!existingInvite) {
      throw new Error("No invite found for this email address");
    }

    if (!existingInvite.accepted) {
      throw new Error("Invite has not been accepted yet");
    }

    try {
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
    } catch (err) {
      throw new PrismaError(err.message, err.code, err.meta);
    }

    return null;
  },
);
