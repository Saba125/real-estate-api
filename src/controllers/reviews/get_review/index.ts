import { Request, Response } from "express"
import Utils from "../../../utils"
import { IDbTools } from "../../../../interfaces"
export default async function get_review(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const reviewId = parseInt(req.params.id)
  const dbRes = await db.selectSingle(`select * from reviews where id = $1`, [
    reviewId,
  ])
  if (!dbRes) {
    return Utils.sendError(res, {
      status: "error",
      message: `Review with id ${reviewId} is not found`,
    })
  }
  Utils.sendSuccess(res, {
    review: dbRes,
  })
}
