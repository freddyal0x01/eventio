import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";
import { FRAGMENT_GET_ALL_USERS_WITH_SEARCH } from "../fragments";

const Input = z.object({
  usersPerPage: z.number(),
  activePage: z.number(),
  search: z.string().optional(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize("ADMIN"),
  async ({ usersPerPage, activePage, search }) => {
    return db.user.findMany({
      where: FRAGMENT_GET_ALL_USERS_WITH_SEARCH({ search }) as any,
      take: usersPerPage,
      skip: usersPerPage * (activePage - 1),
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
