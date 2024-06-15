import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";
import { FRAGMENT_GET_ALL_USERS_WITH_SEARCH } from "../fragments";

const Input = z.object({
  search: z.string().optional(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize("ADMIN"),
  async ({ search }) => {
    return db.user.count({
      where: FRAGMENT_GET_ALL_USERS_WITH_SEARCH({ search: search }) as any,
    });
  },
);
