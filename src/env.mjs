// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    RESEND_API_KEY: z.string(),
    NODEMAILER_LOCAL_USER: z.string().optional(),
    NODEMAILER_LOCAL_PASS: z.string().optional(),
    UPLOADTHING_SECRET: z.string(),
    UPLOADTHING_APP_ID: z.string(),
    LEMONSQUEEZY_WEBHOOK_SECRET: z.string(),
    LEMONSQUEEZY_API_KEY: z.string(),
    LEMONSQUEEZY_STORE_ID: z.string(),
    LOCAL_IP_ADDRESS: z.string().optional(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_LEMONSQUEEZY_LIFETIME_PLAN_VARIANT_ID: z.string(),
    NEXT_PUBLIC_LEMONSQUEEZY_ANNUAL_PLAN_VARIANT_ID: z.string(),
    NEXT_PUBLIC_LEMONSQUEEZY_MONTHLY_PLAN_VARIANT_ID: z.string(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NODEMAILER_LOCAL_USER: process.env.NODEMAILER_LOCAL_USER,
    NODEMAILER_LOCAL_PASS: process.env.NODEMAILER_LOCAL_PASS,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
    LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY,
    NEXT_PUBLIC_LEMONSQUEEZY_LIFETIME_PLAN_VARIANT_ID:
      process.env.NEXT_PUBLIC_LEMONSQUEEZY_LIFETIME_PLAN_VARIANT_ID,
    NEXT_PUBLIC_LEMONSQUEEZY_ANNUAL_PLAN_VARIANT_ID:
      process.env.NEXT_PUBLIC_LEMONSQUEEZY_ANNUAL_PLAN_VARIANT_ID,
    NEXT_PUBLIC_LEMONSQUEEZY_MONTHLY_PLAN_VARIANT_ID:
      process.env.NEXT_PUBLIC_LEMONSQUEEZY_MONTHLY_PLAN_VARIANT_ID,
    LEMONSQUEEZY_STORE_ID: process.env.LEMONSQUEEZY_STORE_ID,
    LOCAL_IP_ADDRESS: process.env.LOCAL_IP_ADDRESS,
  },
});
