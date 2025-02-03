import { Request, Response } from "express"
import { IDbTools } from "../../../../interfaces"
import Utils from "../../../utils"
export default async function add_review(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const user: any = req.user
  const body = req.body
  const dbRes = await db.insert("reviews", {
    sellerid: body.sellerid,
    rating: body.rating,
    buyerid: user.id,
    comment: body.comment,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    review: dbRes.data,
  })
}
