import Utils from "../../../utils/index"
import prisma from "../../../db/index"
import { Request, Response } from "express"
export default async function delete_user(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const user = await prisma.user.delete({ where: { id }, select: { id: true } })
  if (!user) {
    Utils.sendError(res, {
      status: "error",
      message: `User with id ${id} is not found`,
    })
    return
  }
  return Utils.sendSuccess(res, {
    id: user.id,
    msg: "User deleted",
  })
}
