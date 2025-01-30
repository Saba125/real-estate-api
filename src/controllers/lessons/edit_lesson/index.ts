import { Request, Response } from "express"
import Utils from "../../../utils/index"
import prisma from "../../../db/index"
import editLessonSchema from "./schema"
export default async function edit_lesson(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const { title, duration, content } = req.body
  const { error } = editLessonSchema.validate(req.body)
  if (error) {
    Utils.sendError(res, {
      status: "message",
      message: error.details.map((item) => item.message),
    })
    return
  }

  const videoUrl = `/videos/${req?.file?.filename}`
  const lesson = await prisma.lesson.update({
    where: { id },
    data: {
      ...req.body,
    },
  })
  return Utils.sendSuccess(res, {
    lesson,
  })
}
