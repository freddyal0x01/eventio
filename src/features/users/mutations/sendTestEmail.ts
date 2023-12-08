import { resolver } from "@blitzjs/rpc";
import { sendEmail } from "email/sendEmail";
import { z } from "zod";

const Input = z.object({
  to: z.string(),
  subject: z.string(),
  html: z.string(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async (input, { session: { userId } }) => {
    console.log(input);
    await sendEmail(input);
    console.log("email sent");
  },
);
