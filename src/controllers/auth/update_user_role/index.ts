import Utils from "../../../utils/index"
import prisma from "../../../db/index"
import { Request, Response } from "express"
export default async function update_user_role(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const { role } = req.body
  if (!role) {
    Utils.sendError(res, {
      status: "error",
      message: "Role is missing",
    })
  }
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  })
  return Utils.sendSuccess(res, {
    user,
  })
}
