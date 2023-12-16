import { isDev } from "src/config";
import { Email } from "./types";

export const sendBulkEmail = ({ emails }: { emails: Email[] }) => {
  console.log("emails", emails);

  if (isDev) {
    console.log("sending a bunch of emails in dev");
  }
};
