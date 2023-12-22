import db from "db";
import { storePrismaJson } from "src/utils/utils";
import { getUserIdFromLemonSqueezyEvent } from "../utils";

export const onOrderCreated = async ({ event }) => {
  const userId = await getUserIdFromLemonSqueezyEvent({ event });

  const createOrder = db.lemonSqueezyOrder.create({
    data: {
      orderId: event.data.attributes.order_number.toString(),
      user: {
        connect: {
          id: userId,
        },
      },
      attributes: storePrismaJson(event.data.attributes),
    },
  });

  // const giveUserLifetimeAccess = db.user.update({
  //   where: {
  //     id: userId,
  //   },
  //   data: {
  //     hasLifetimeAccess: true,
  //   },
  // });

  return db.$transaction([createOrder]);
};
