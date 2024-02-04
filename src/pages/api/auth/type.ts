import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import {
  AuthOptions,
  Awaitable,
  CallbacksOptions,
  DefaultSession,
  ISODateString,
} from "next-auth";

export interface IAuthOptions extends AuthOptions {
  callbacks: Partial<ICallbacksOptions>;
}

interface ICallbacksOptions extends Omit<CallbacksOptions, "session"> {
  session: (
    params: {
      session: ISession;
      token: JWT;
      user: AdapterUser;
    } & {
      newSession: any;
      trigger: "update";
    },
  ) => Awaitable<ISession | DefaultSession>;
}

interface ISession {
  user?: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: ISODateString;
}
