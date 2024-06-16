import { resolver } from "@blitzjs/rpc";
import db from "db";
import { CreateSignupInviteSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(CreateSignupInviteSchema),
  async (input, { ipAddress }) => {
    const foundInvite = await db.signupInvite.findFirst({
      where: { email: input.email },
    });

    if (foundInvite) throw new Error("Invite already exists for this email");

    const foundInviteByIp = await db.signupInvite.findFirst({
      where: { ipAddress },
    });

    if (foundInviteByIp) throw new Error("Cannot request more invites");

    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const signupInvite = await db.signupInvite.create({
      data: {
        ...input,
        ipAddress,
      },
    });

    return signupInvite;
  },
);
