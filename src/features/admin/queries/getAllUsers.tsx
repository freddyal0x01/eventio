import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const Input = z.object({});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize("ADMIN"),
  async () => {
    return db.user.findMany({
      // where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        subscriptions: {
          select: {
            id: true,
            subscriptionId: true,
            attributes: true,
          },
        },
      },
    });
  },
);
