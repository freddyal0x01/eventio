import db from "db";
import { storePrismaJson } from "src/utils/utils";

export const onOrderCreated = async ({ event }) => {
  console.log("onOrderCreated", event);

  const userId = event.meta.custom_data.user_id;

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

  const giveUserLifetimeAccess = db.user.update({
    where: {
      id: userId,
    },
    data: {
      hasLifetimeAccess: true,
    },
  });

  return db.$transaction([createOrder, giveUserLifetimeAccess]);
};
