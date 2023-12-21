import db from "db";
import { storePrismaJson } from "src/utils/utils";

export const onOrderCreated = async ({ event }) => {
  let customData = event.meta.custom_data;

  let userId;

  if (customData) {
    userId = customData.user_id;
  } else {
    const foundUser = await db.user.findFirst({
      where: {
        email: event.data.attributes.user_email,
      },
    });

    if (!foundUser) {
      throw new Error("User not found");
    }

    userId = foundUser.id;
  }

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
