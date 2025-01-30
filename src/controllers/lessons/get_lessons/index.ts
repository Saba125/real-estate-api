import { Request, Response } from "express"
import Utils from "../../../utils/index"
import prisma from "../../../db/index"
export default async function get_lessons(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const lessons = await prisma.lesson.findMany({
    where: {
      course_id: id,
    },
  })
  return Utils.sendSuccess(res, {
    lessons,
  })
}
