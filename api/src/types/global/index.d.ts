import { User } from "@prisma/client";
import { IncomingMessage } from "http";
import { InvitationTokenPayload } from "src/auth/types/auth";

declare global {
    namespace Express {
        export interface Request {
            user?: User; // Make it optional if not all requests have a user
            sharedTokenPayload?: InvitationTokenPayload
        }
    }
}

declare module "http" {
    export interface IncomingHttpHeaders {
        ['x-shared-authorization']?: string;
    }
}
