import { UserRole } from "../models/User";

// Extends the global Express Request namespace so TypeScript knows
// about the custom `user` field attached by the verifyToken middleware.
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        roles: UserRole[];
      };
    }
  }
}

export {};