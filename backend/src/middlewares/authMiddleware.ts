import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Express Request type globally
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(new Error("Unauthorized: Token missing"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!decoded?.id) {
      return next(new Error("Invalid token payload"));
    }

    req.userId = decoded.id as string;
    next();
  } catch (err) {
    return next(new Error("Invalid or expired token"));
  }
};

export default authMiddleware;
