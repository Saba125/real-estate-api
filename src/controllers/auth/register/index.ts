import { Request, Response } from "express"
import { IDbTools } from "../../../../interfaces"
import registerSchema from "./schema"
import Utils from "../../../utils"
import crypto, { hash } from "crypto"
export default async function register(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const { email, password } = req.body
  const hashedPassword = Utils.getCryptoHash(password)
  const verificationtoken = crypto.randomBytes(20).toString("hex")
  const codeExpirationDate = new Date(Date.now() + 1000 * 60 * 10)
  const { error } = registerSchema.validate(req.body)
  if (error) {
    return Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
  }
  const checkEmail = await db.selectSingle(
    `select * from users where email = $1`,
    [email]
  )
  if (checkEmail) {
    return Utils.sendError(res, {
      status: "error",
      message: `User with that email already exists`,
    })
  }
  const dbRes = await db.insert("users", {
    email,
    password: hashedPassword,
    verificationtoken,
    verified: codeExpirationDate,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  const verificationUrl = `http://localhost:5173/verify-email?verificationCode=${dbRes.data.verificationtoken}&email=${dbRes.data.email}`
  const token = Utils.createToken(dbRes.data)

  Utils.sendSuccess(res, {
    message: "Please check your email now",
  })
}
