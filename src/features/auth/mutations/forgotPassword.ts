import { resolver } from "@blitzjs/rpc";
import db, { TokenType } from "db";
import EmailTemplateResetPassword from "email/react-email/emails/reset-password";
import { sendEmail } from "email/sendEmail";
import { createElement } from "react";
import { URL_ORIGIN } from "src/config";
import { regenerateToken } from "src/utils/blitz-utils";
import { ForgotPasswordInput } from "../schemas";

export default resolver.pipe(
  resolver.zod(ForgotPasswordInput),
  async ({ email }) => {
    const user = await db.user.findFirst({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      await new Promise((resolve) => setTimeout(resolve, 750));
      return true;
    }

    const token = await regenerateToken({
      tokenType: TokenType.RESET_PASSWORD,
      userId: user.id,
      userEmail: user.email,
    });

    let resetPasswordUrl = `${URL_ORIGIN}/auth/reset-password?token=${token}`;

    await sendEmail({
      to: user.email,
      subject: "Reset your password for Eventio",
      react: createElement(EmailTemplateResetPassword, {
        props: {
          resetPasswordUrl,
        },
      }),
    });

    return;
  },
);
