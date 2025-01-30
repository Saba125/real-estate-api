import { Request, Response } from "express"
import Utils from "../../../utils/index"
import prisma from "../../../db/index"
export default async function get_quiz(req: Request, res: Response) {
  const lessonId = parseInt(req.params.lessonId)
  const quiz = await prisma.quiz.findMany({
    where: {
      lessonId,
    },
  })
  return Utils.sendSuccess(res, {
    quiz,
  })
}
