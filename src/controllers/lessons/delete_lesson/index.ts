import { Request, Response } from "express"
import Utils from "../../../utils/index"
import prisma from "../../../db/index"
export default async function delete_lesson(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const lesson = await prisma.lesson.delete({
    where: { id },
    select: {
      id: true,
    },
  })
  if (!lesson) {
    Utils.sendError(res, {
      status: "message",
      message: `Lesson with id ${id} is not found`,
    })
    return
  }

  return Utils.sendSuccess(res, {
    id: lesson.id,
    message: "Lesson deleted",
  })
}
