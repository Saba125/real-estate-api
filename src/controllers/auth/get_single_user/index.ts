import Utils from "../../../utils/index"
import prisma from "../../../db/index"
import { Request, Response } from "express"
export default async function get_single_user(req: Request, res: Response) {
  const { id } = req.params
  const idNumber = parseInt(id)
  if (isNaN(idNumber)) {
    return Utils.sendError(
      res,
      { message: "Invalid user ID", status: "error" },
      400
    )
  }
  const user = await prisma.user.findFirst({
    where: { id: idNumber },

    select: {
      id: true,
      email: true,
      role: true,
    },
  })
  if (!user) {
    Utils.sendError(res, {
      status: "error",
      message: `User with id ${id} is not found`,
    })
  }
  return Utils.sendSuccess(res, {
    user,
  })
}
