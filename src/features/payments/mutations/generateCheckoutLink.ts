import { resolver } from "@blitzjs/rpc";
import db from "db";
import { env } from "src/env.mjs";
import { z } from "zod";
import { lemonClient } from "../lemonClient";

const Input = z.object({});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("User not found");

    console.log("generating checkout link...");

    const checkoutLink = await lemonClient.createCheckout({
      storeId: env.LEMONSQUEEZY_STORE_ID,
      variantId: env.LEMONSQUEEZY_LIFETIME_PLAN_VARIANT_ID,
      attributes: {
        checkout_data: {
          email: user.email,
          custom: {
            user_id: user.id,
          },
        },
      },
    });

    console.log("Checkout Link", checkoutLink.data.attributes);
    const { url } = checkoutLink.data.attributes;
    console.log("Checkout Link", url);

    return url;
  },
);
