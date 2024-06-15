import { hash256 } from "@blitzjs/auth";
import { resolver } from "@blitzjs/rpc";
import db, { TokenType } from "db";
import { z } from "zod";

const allowedKeys = z.enum(["settingsEmailMarketing", "settingsEmailProduct"]);

const Input = z.object({
  key: allowedKeys,
  value: z.boolean(),
  token: z.string(),
});

// Only for logged our users who are managing their email settings
export default resolver.pipe(
  resolver.zod(Input),
  async ({ key, value, token }, { session: { userId } }) => {
    const hashedToken = hash256(token);

    const possibleToken = await db.token.findFirst({
      where: { hashedToken, type: TokenType.UNSUBSCRIBE_EMAIL },
    });

    if (!possibleToken) throw new Error("Token not found");

    if (possibleToken.expiresAt < new Date()) throw new Error("Token expired");

    return db.user.update({
      where: {
        id: possibleToken.userId,
      },
      data: {
        [key]: value,
      },
    });
  },
);
