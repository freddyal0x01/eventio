import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";
import { EmailList } from "../types";

const Input = z.object({
  list: z.nativeEnum(EmailList),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ list }, { session: { userId } }) => {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("User not found");

    console.log(list);

    // let unsubscribeLink = await generateUnsubscribeLink({
    //   userId: user.id,
    //   userEmail: user.email,
    // });

    // await sendEmail({
    //   to: user.email,
    //   subject: "Hey there dummy user",
    //   react: createElement(EmailTemplateDummy, {
    //     props: {
    //       name: user.name,
    //       emailVerifyUrl: "",
    //       unsubscribeLink,
    //     },
    //   }),
    // });
  },
);
