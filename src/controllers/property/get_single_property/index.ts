import { Request, Response } from "express"
import { IDbTools } from "../../../../interfaces"
import Utils from "../../../utils"
export default async function get_single_property(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const db: IDbTools = req.app.locals.db
  const property = await db.selectSingle(
    `select * from property where id = $1`,
    [id]
  )
  Utils.sendSuccess(res, {
    property,
  })
}
