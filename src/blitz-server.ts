import {
  AuthServerPlugin,
  PrismaStorage,
  simpleRolesIsAuthorized,
} from "@blitzjs/auth";
import { setupBlitzServer } from "@blitzjs/next";
import { BlitzLogger, BlitzServerMiddleware } from "blitz";
import db from "db";
import { authConfig } from "./blitz-client";
import { geolocationMiddleware } from "./middlewares/geolocationMiddleware";

export const { gSSP, gSP, api } = setupBlitzServer({
  plugins: [
    AuthServerPlugin({
      ...authConfig,
      storage: PrismaStorage(db),
      isAuthorized: simpleRolesIsAuthorized,
    }),
    BlitzServerMiddleware(geolocationMiddleware),
  ],
  logger: BlitzLogger({}),
});
