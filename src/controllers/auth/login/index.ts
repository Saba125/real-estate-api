import Utils from "../../../utils/index"
import prisma from "../../../db/index"
import { Request, Response } from "express"
import loginSchema from "./schema"
export default async function login(req: Request, res: Response) {
  const { error } = loginSchema.validate(req.body)
  const oneDay = 1000 * 60 * 60 * 24
  const { email, password } = req.body
  if (error) {
    Utils.sendError(res, {
      status: "error",
      message: error.details.map((err) => err.message),
    })
    return
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (!user) {
    Utils.sendError(res, {
      status: "error",
      message: "User does not exist",
    })
    return
  }
  const hashedPassword = Utils.getCryptoHash(password)
  if (hashedPassword !== user?.password) {
    Utils.sendError(res, {
      status: "error",
      message: "Password is incorrect",
    })
    return
  }
  const token = Utils.createToken(user)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  })
  return Utils.sendSuccess(res, {
    token,
    user,
  })
}
