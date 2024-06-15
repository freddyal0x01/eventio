import db, { LemonSqueezySubscriptionStatus } from "db";
import { storePrismaJson } from "src/utils/utils";

export const onPlanChanged = async ({ event }) => {
  const { data } = event;
  const { attributes } = data;
  const { product_id, variant_id } = attributes;

  try {
    await db.lemonSqueezySubscription.update({
      where: {
        subscriptionId: event.data.id,
      },
      data: {
        attributes: storePrismaJson(data.attributes),
        status: data.attributes.status as LemonSqueezySubscriptionStatus,
        product: {
          connect: {
            productId: product_id.toString(),
          },
        },
        variant: {
          connect: {
            variantId: variant_id.toString(),
          },
        },
      },
    });
  } catch (err) {
    console.log("err", err);
  }

  return true;
};
