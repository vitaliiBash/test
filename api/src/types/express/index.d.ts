import { User } from "@prisma/client";

declare global {
    namespace Express {
        export interface Request {
            user?: User; // Make it optional if not all requests have a user
        }
    }
}
