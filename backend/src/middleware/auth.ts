import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { UserRole } from "../models/User";

// the exact shape stored inside a signed JWT
export interface JwtPayload {
  id: string;
  roles: UserRole[];
}

// Global authentication guard - verifies the Bearer token on every protected route
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // extract the Authorization header from the incoming request
    const authHeader = req.headers.authorization;

    // rejects the request if the Bearer token is missing or formatted wrong
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ message: "Access Denied: Missing or malformed authorization token" });
      return;
    }

    // pull the raw token out of the "Bearer <token>" payload
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    req.user = {
      id: decoded.id,
      roles: decoded.roles,
    };

    next();
  } catch (error) {
    // checks if the JWT token is expired and tells the user to re-authenticate
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: "Session expired. Please log in again." });
      return;
    }

    // any other verification failure (bad signature, tampered token, or...)
    res
      .status(401)
      .json({ message: "Access Denied: Missing or malformed authorization token" });
  }
};


export const requireHost = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // req.user is guaranteed to exist because verifyToken runs first
  const roles = req.user?.roles ?? [];

  // Denies access if the user does not have the 'host' role
  if (!roles.includes("host")) {
    res.status(403).json({ message: "Access Denied: Host privileges required" });
    return;
  }

  next();
};
