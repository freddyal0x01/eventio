import { NextApiRequest, NextApiResponse } from "next";
import getRawBody from "raw-body";
import { onOrderCreated } from "./hooks/onOrderCreated";
import { onOrderRefunded } from "./hooks/onOrderRefunded";
import { LemonEventType, ResBody } from "./types";
import { returnError, returnOkay } from "./utils";
import { validateLemonSqueezyHook } from "./validateLemonSqueezyHook";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("🍋: hello");

  console.log("req.method", req.method);

  if (req.method !== "POST") {
    console.log("🍋: method not allowed");
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const rawBody = await getRawBody(req);

    console.log("rawBody", rawBody);

    const isValidHook = await validateLemonSqueezyHook({ req, rawBody });

    console.log("🍋: isValidHook", isValidHook);

    if (!isValidHook) {
      return res.status(400).json({
        message: "Invalid signature.",
      });
    }

    //@ts-ignore
    const event: ResBody["body"] = JSON.parse(rawBody);

    const eventType = event.meta.event_name;

    const handlers = {
      [LemonEventType.OrderCreated]: onOrderCreated,
      [LemonEventType.OrderRefunded]: onOrderRefunded,
    };

    const foundHandler = handlers[eventType];

    if (foundHandler) {
      try {
        await foundHandler({ event });
        returnOkay(res);
      } catch (err) {
        console.log(`🍋 : error in handling ${eventType} event`, err);
        returnError(res);
      }
    } else {
      console.log(`🍋 : No handler found for ${eventType} event`);
    }

    console.log("eventType", eventType);
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.status(400).json({
        message: `Webhook error: ${e}`,
      });
    }
    if (e instanceof Error) {
      return res.status(400).json({
        message: `Webhook error: ${e.message}`,
      });
    }
    throw e;
  }
};

export default handler;
