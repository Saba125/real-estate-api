import { Request, Response } from "express"
import { IDbTools } from "../../../../interfaces"
import Utils from "../../../utils"
import editPropertySchema from "./schema"
export default async function edit_property(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const { error } = editPropertySchema.validate(req.body)
  if (error) {
    return Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
  }
  const user: any = req.user
  const body = req.body
  const id = parseInt(req.params.id)
  const existingProperty: any = await db.selectSingle(
    `select * from property where id = $1`,
    [id]
  )
  if (!existingProperty) {
    return Utils.sendError(res, {
      status: "error",
      message: `Property with id ${id} does not exist`,
    })
  }
  if (existingProperty.sellerid !== user.id) {
    return Utils.sendError(res, {
      status: "error",
      message: `You can only edit your own property`,
    })
  }
  const images = req.files
    ? (req.files as Express.Multer.File[]).map(
        (file) => `/images/${file.filename}`
      )
    : existingProperty.images
  const dbRes = await db.update("property", {
    id,
    images,
    ...req.body,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    property: dbRes.data,
  })
}
