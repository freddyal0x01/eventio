import * as nodemailer from "nodemailer";
import { env } from "src/env.mjs";

let user = env.NODEMAILER_LOCAL_USER;
let pass = env.NODEMAILER_LOCAL_PASS;

export const nodemailerAppTranport = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 1025,
  auth: {
    user: user,
    pass: pass,
  },
});
