import Utils from "../../../utils/index"
import prisma from "../../../db/index"
import { Request, Response } from "express"
import registerSchema from "./schema"
export default async function register(req: Request, res: Response) {
  const { error } = registerSchema.validate(req.body)
  const { email, role, password } = req.body
  const oneDay = 1000 * 60 * 60 * 24
  const hashedPassword = Utils.getCryptoHash(password)
  if (error) {
    Utils.sendError(res, {
      status: "error",
      message: error.details.map((err) => err.message),
    })
    return
  }
  const user = await prisma.user.create({
    data: {
      email,
      role,
      password: hashedPassword,
    },
  })
  const token = Utils.createToken(user)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  })
  return Utils.sendSuccess(res, {
    user,
    token,
  })
}
