import { Request, Response } from "express"
import Utils from "../../../utils/index"
import prisma from "../../../db/index"
import quizSchema from "./schema"
export default async function add_quiz(req: Request, res: Response) {
  const { error } = quizSchema.validate(req.body)
  if (error) {
    Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
    return
  }
  const quiz = await prisma.quiz.create({
    data: {
      ...req.body,
    },
  })
  return Utils.sendSuccess(res, {
    quiz,
  })
}
