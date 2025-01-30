import { Request, Response } from "express"
import Utils from "../../../utils/index"
import prisma from "../../../db"
export default async function delete_course(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const course = await prisma.course.delete({
    where: { id },
    select: {
      id: true,
    },
  })
  if (!course) {
    Utils.sendError(res, {
      status: "error",
      message: `Course with id ${id} is not found`,
    })
    return
  }
  return Utils.sendSuccess(res, {
    id: course.id,
    message: "Course deleted",
  })
}
