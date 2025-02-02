import { Request, Response } from "express"
import { IDbTools } from "../../../../interfaces"
import Utils from "../../../utils"
import addPropertySchema from "./schema"
export default async function add_property(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const body = req.body
  console.log(body)
  const images = req.files
    ? (req.files as Express.Multer.File[]).map(
        (file) => `/images/${file.filename}`
      )
    : []
  const { error } = addPropertySchema.validate({
    ...req.body,
    images,
  })
  const user: any = req.user
  if (error) {
    return Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
  }
  const dbRes = await db.insert("property", {
    title: body.title,
    description: body.description,
    price: body.price,
    type: body.type,
    location: body.location,
    images,
    sellerid: user.id,
    status: body.status,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    property: dbRes.data,
  })
}
