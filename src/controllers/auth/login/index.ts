import { Request, Response } from "express"
import { IDbTools } from "../../../../interfaces"
import loginSchema from "./schema"
import Utils from "../../../utils"
export default async function login(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const { error } = loginSchema.validate(req.body)
  const { email, password } = req.body
  const oneDay = 1000 * 60 * 60 * 24
  const hashedPassword = Utils.getCryptoHash(password)
  if (error) {
    return Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
  }
  const existingUser: any = await db.selectSingle(
    `select * from users where email = $1`,
    [email]
  )
  if (!existingUser) {
    return Utils.sendError(res, {
      status: "error",
      message: "User with this email does not exist",
    })
  }
  if (!existingUser.isverified) {
    return Utils.sendError(res, {
      status: "error",
      message: "You are not verified",
    })
  }
  if (existingUser.password !== hashedPassword) {
    return Utils.sendError(res, {
      status: "error",
      message: "Password is incorrect",
    })
  }
  const token = Utils.createToken(existingUser)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  })
  Utils.sendSuccess(res, {
    user: existingUser,
    token,
  })
}
