import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const allowedKeys = z.enum(["settingsEmailMarketing", "settingsEmailProduct"]);

const Input = z.object({
  key: allowedKeys,
  value: z.boolean(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ key, value }, { session: { userId } }) => {
    console.log(`setting ${key} to ${value}`);
    return db.user.update({
      where: {
        id: userId,
      },
      data: {
        [key]: value,
      },
    });
  },
);
