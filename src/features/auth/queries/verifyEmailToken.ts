import { hash256 } from "@blitzjs/auth";
import { resolver } from "@blitzjs/rpc";
import db, { TokenType } from "db";
import { z } from "zod";

const Input = z.object({
  token: z.string(),
});

export default resolver.pipe(resolver.zod(Input), async ({ token }) => {
  let hashedToken = hash256(token);

  const possibleToken = await db.token.findFirst({
    where: { hashedToken, type: TokenType.VERIFY_EMAIL },
    include: { user: true },
  });

  if (!possibleToken) throw new Error("Invalid token");

  await db.token.delete({ where: { id: possibleToken.id } });

  if (possibleToken.expiresAt < new Date()) throw new Error("Token expired");

  await db.user.update({
    where: { id: possibleToken.userId },
    data: { emailVerifiedAt: new Date() },
  });

  return true;
});
