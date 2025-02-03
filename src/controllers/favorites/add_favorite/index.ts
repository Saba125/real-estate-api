import { Request, Response } from "express"
import { IDbTools } from "../../../../interfaces"
import Utils from "../../../utils"
export default async function add_favorite(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const user: any = req.user
  const body = req.body
  const checkFavorite: any = await db.selectSingle(
    `select * from favorites where userid = $1 and propertyid = $2`,
    [user.id, body.propertyid]
  )
  if (checkFavorite) {
    const dbRes = await db.delete(`favorites`, {
      id: checkFavorite.id,
    })
    if (dbRes.error) {
      return Utils.sendError(res, dbRes.error.message)
    }
    return Utils.sendSuccess(res, {
      message: "Property has been removed from favorites",
    })
  } else {
    const dbRes = await db.insert(`favorites`, {
      userid: user.id,
      propertyid: body.propertyid,
    })
    if (dbRes.error) {
      return Utils.sendError(res, dbRes.error.message)
    }
    return Utils.sendSuccess(res, {
      message: "Property has been favorited",
    })
  }
}
