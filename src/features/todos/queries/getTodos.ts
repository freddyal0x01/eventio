import { resolver } from "@blitzjs/rpc";
import { z } from "zod";

const Input = z.object({
  search: z.string(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async () => {
    const todos = [
      { title: "buy bread" },
      { title: "buy a turtle" },
      { title: "buy a football team" },
    ];
    return todos;
  },
);
