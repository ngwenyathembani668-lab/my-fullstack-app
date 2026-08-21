import { Request, Response, NextFunction } from "express";

// catches any route that doesn't exist and sends back a clean 404
export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({ message: "Route not found" });
};

// the global error trap - handles errors gracefully without leaking stack traces
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // send a safe generic message to the client
  res.status(err.status || 500).json({ message: err.message || "Server error" });
};