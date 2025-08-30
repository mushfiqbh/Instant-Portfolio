import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Error:", err.message);

  res.status(401).json({
    success: false,
    message: err.message,
  });
};
