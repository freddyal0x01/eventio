import { resolver } from "@blitzjs/rpc";
import { authenticateUser } from "src/utils/auth-utils";
import { Role } from "types";
import { LoginInput } from "../schemas";

export default resolver.pipe(resolver.zod(LoginInput), async (params, ctx) => {
  const { email, password } = params;
  // This throws an error if credentials are invalid
  const user = await authenticateUser(email, password);

  await ctx.session.$create({ userId: user.id, role: user.role as Role });

  return user;
});
