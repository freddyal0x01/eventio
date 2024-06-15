import EmailTemplateBlackFriday from "email/react-email/emails/black-friday-sale";
import EmailTemplateDummy from "email/react-email/emails/dummy";
import { EmailTemplate } from "./types";

export const emailTemplates = [
  {
    name: "Black Friday",
    value: EmailTemplate.BlackFriday,
    component: EmailTemplateBlackFriday,
  },
  {
    name: "Dummy",
    value: EmailTemplate.Dummy,
    component: EmailTemplateDummy,
  },
];
