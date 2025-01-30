import { NextFunction, Request, Response } from "express"
import Utils from "../utils/index"
import jwt, { JwtPayload } from "jsonwebtoken"
import { User } from "@prisma/client"

// Extend the Request interface to include a `user` field
declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload | string // Make it optional and handle both JwtPayload and string types
  }
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.signedCookies?.token

  if (!token) {
    return Utils.sendError(
      res,
      {
        status: "error",
        message: "Token is missing",
      },
      401
    )
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)

    if (typeof decoded === "object" && decoded !== null && "user" in decoded) {
      const { user, ...rest } = decoded as JwtPayload
      req.user = { ...user, ...rest }
    } else {
      req.user = decoded
    }

    return next()
  } catch (error) {
    console.error("JWT verification error:", error)

    return Utils.sendError(
      res,
      {
        status: "error",
        message: "Invalid or expired token",
      },
      403
    )
  }
}
