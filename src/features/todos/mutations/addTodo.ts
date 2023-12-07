import { resolver } from "@blitzjs/rpc";
import db from "db";
import { TodoInput } from "../schemas";

export default resolver.pipe(
  resolver.zod(TodoInput),
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
