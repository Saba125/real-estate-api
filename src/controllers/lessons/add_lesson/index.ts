import { Request, Response } from "express"
import Utils from "../../../utils/index"
import prisma from "../../../db/index"
import lessonSchema from "./schema"
export default async function add_lesson(req: Request, res: Response) {
  const user = req.user
  const { title, duration, content, course_id } = req.body
  const { error } = lessonSchema.validate(req.body)
  const parsedCourseId = parseInt(course_id)
  if (error) {
    Utils.sendError(res, {
      status: "failed",
      message: error.details.map((item) => item.message),
    })
    return
  }
  if (!req.file) {
    Utils.sendError(res, {
      status: "error",
      message: "File is not uploaded",
    })
    return
  }
  const videoUrl = `/videos/${req.file.filename}`
  const lesson = await prisma.lesson.create({
    data: {
      title,
      videoUrl,
      duration: 20.2,
      content,
      course_id: parsedCourseId,
    },
  })
  return Utils.sendSuccess(res, {
    lesson,
  })
}
