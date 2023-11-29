import { resolver } from "@blitzjs/rpc";
import { z } from "zod";

const Input = z.object({
  todoTitle: z.string(),
  id: z.string(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async (params, ctx) => {
    const { todoTitle } = params;
    const userId = ctx.session.userId;
    return "todo created";
  },
);
