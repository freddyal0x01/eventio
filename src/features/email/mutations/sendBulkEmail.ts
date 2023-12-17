import { resolver } from "@blitzjs/rpc";
import db from "db";
import { sendBulkEmail } from "email/sendBulkEmail";
import { Email } from "email/types";
import { chunk } from "lodash";
import { createElement } from "react";
import { isDev } from "src/config";
import { generateUnsubscribeLink } from "src/uploadthing/email-utils";
import { convertArrayToObject } from "src/utils/utils";
import { z } from "zod";
import { emailTemplates } from "../templates";
import { EmailList, EmailTemplate, SpecialVariables } from "../types";
import { remapVariables } from "../utils";

const Input = z.object({
  list: z.nativeEnum(EmailList),
  subject: z.string(),
  template: z.nativeEnum(EmailTemplate),
  variables: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    }),
  ),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ list, subject, template, variables }, { session: { userId } }) => {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("User not found");

    const foundEmailTemplate = emailTemplates.find((e) => e.value == template);

    if (!foundEmailTemplate) throw new Error("Email template not found");

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
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        username: true,
        avatarImageKey: true,
      },
    });

    let CHUNK_SIZE = isDev ? 3 : 100;

    const chunks = chunk(users, CHUNK_SIZE);

    for (const chunk of chunks) {
      const emails: Email[] = await Promise.all(
        chunk.map(async (user): Promise<Email> => {
          const specialVariables: SpecialVariables = {
            userName: user.name,
            userEmail: user.email,
            userId: user.id,
            userBio: user.bio,
            userUsername: user.username,
            userAvatarImageKey: user.avatarImageKey,
          };

          let replacedSubject = subject;

          for (const key in specialVariables) {
            replacedSubject = replacedSubject.replace(
              `{{${key}}}`,
              specialVariables[key],
            );
          }

          const remappedVariables = remapVariables({
            variables,
            specialVariables,
          });

          let unsubscribeLink = await generateUnsubscribeLink({
            userId: user.id,
            userEmail: user.email,
          });

          return {
            to: user.email,
            subject: replacedSubject,
            react: createElement(foundEmailTemplate.component, {
              props: {
                name: user.name,
                unsubscribeLink,
                ...convertArrayToObject(remappedVariables),
              },
            }),
          };
        }),
      );

      await sendBulkEmail({ emails });
    }
  },
);
