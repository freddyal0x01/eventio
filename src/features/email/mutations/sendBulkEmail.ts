import { resolver } from "@blitzjs/rpc";
import db from "db";
import EmailTemplateDummy from "email/react-email/emails/dummy";
import { sendBulkEmail } from "email/sendBulkEmail";
import { Email } from "email/types";
import { chunk } from "lodash";
import { createElement } from "react";
import { isDev } from "src/config";
import { generateUnsubscribeLink } from "src/uploadthing/email-utils";
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

    console.log("list is", list);

    const users = await db.user.findMany({
      where: {
        AND: [
          {
            ...(list == EmailList.Product && {
              settingsEmailProduct: true,
            }),
            ...(list == EmailList.Marketing && {
              settingsEmailMarketing: true,
            }),
          },
          {
            // Not the current user
            id: {
              not: user.id,
            },
          },
        ],
      },
    });

    let CHUNK_SIZE = isDev ? 3 : 100;

    const chunks = chunk(users, CHUNK_SIZE);

    console.log("chunks", chunks);

    console.log(`sending email to ${users.length} users`);

    for (const chunk of chunks) {
      const emails: Email[] = await Promise.all(
        chunk.map(async (user): Promise<Email> => {
          let unsubscribeLink = await generateUnsubscribeLink({
            userId: user.id,
            userEmail: user.email,
          });

          return {
            to: user.email,
            subject: `Hey there ${user.name}`,
            react: createElement(EmailTemplateDummy, {
              props: {
                name: user.name,
                emailVerifyUrl: "",
                unsubscribeLink,
              },
            }),
          };
        }),
      );

      console.log("emails are", emails);
      await sendBulkEmail({ emails });
    }
  },
);
