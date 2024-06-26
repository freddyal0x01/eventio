import { SimpleRolesIsAuthorized } from "@blitzjs/auth";
import { User } from "db";
import { PropsWithChildren } from "react";

export type Role = "ADMIN" | "USER";

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>;
    PublicData: {
      userId: User["id"];
      role: Role;
      impersonatingFromUserId?: string;
    };
  }
}

declare module "blitz" {
  export interface Ctx {
    ipAddress: string;
  }
}

export type ReactFC<T> = React.FC<PropsWithChildren & T>;
