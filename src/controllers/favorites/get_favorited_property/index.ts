import { Request, Response } from "express"
import { IDbTools } from "../../../../interfaces"
import Utils from "../../../utils"
export default async function get_favorited_property(
  req: Request,
  res: Response
) {
  const db: IDbTools = req.app.locals.db
  const user: any = req.user
  const favorites = await db.select(
    `select p.* from property p left join favorites f on f.propertyid = p.id  where f.userid = $1`,
    [user.id]
  )
  console.log(favorites)
}
