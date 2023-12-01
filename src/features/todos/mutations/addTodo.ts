import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const Input = z.object({
  todoTitle: z.string(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ todoTitle }, { session: { userId } }) => {
    console.log(
      `Creating a todo with the title: ${todoTitle} for user ${userId}`,
    );

    const todo = db.todo.create({
      data: {
        title: todoTitle,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    console.log(`todo: ${todo}`);

    return todo;
  },
);
