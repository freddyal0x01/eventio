import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const Input = z.object({});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize("ADMIN"),
  async ({}, { session: { userId } }) => {
    const todos = await db.todo.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        title: true,
        done: true,
      },
    });
    return todos;
  },
);
