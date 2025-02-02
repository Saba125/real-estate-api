import { Request, Response } from "express"
import { IDbTools } from "../../../../interfaces"
import Utils from "../../../utils"
export default async function delete_property(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const db: IDbTools = req.app.locals.db
  const user: any = req.user
  const existingProperty: any = await db.selectSingle(
    `select * from property where id = $1`,
    [id]
  )
  if (!existingProperty) {
    return Utils.sendError(res, {
      status: "error",
      message: `Property with id ${id} does note exist`,
    })
  }
  if (existingProperty.sellerid !== user.id) {
    return Utils.sendError(res, {
      status: "error",
      message: `You can only delete your property`,
    })
  }
  await db.delete(`property`, {
    id,
  })
  Utils.sendSuccess(res, {
    message: `Property deleted`,
    id,
  })
}
