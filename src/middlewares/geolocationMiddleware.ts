import { getClientIp } from "request-ip";
import { isDev } from "../config";
import { env } from "../env.mjs";

export const geolocationMiddleware = async (req, res, next) => {
  const clientIp = isDev ? env.LOCAL_IP_ADDRESS : getClientIp(req);
  res.blitzCtx.ipAddress = clientIp;
  await next();
};
