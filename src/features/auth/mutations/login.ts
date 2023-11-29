import { resolver } from "@blitzjs/rpc";
import { authenticateUser } from "src/utils/auth-utils";
import { Role } from "types";
import { z } from "zod";
import { email, password } from "../schemas";

export const Input = z.object({
  email,
  password,
});

export default resolver.pipe(resolver.zod(Input), async (params, ctx) => {
  const { email, password } = params;
  // This throws an error if credentials are invalid
  const user = await authenticateUser(email, password);

  await ctx.session.$create({ userId: user.id, role: user.role as Role });

  return user;
});
