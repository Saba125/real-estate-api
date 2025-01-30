import { Request, Response } from "express"
import Utils from "../../../utils/index"
import prisma from "../../../db/index"
export default async function submit_quiz(req: Request, res: Response) {
  const { quiz_id, answer } = req.body
  if (!quiz_id || !answer) {
    return Utils.sendError(res, {
      status: "error",
      message: "quiz_id and answer are required.",
    })
  }
  const quiz = await prisma.quiz.findFirst({
    where: {
      id: quiz_id,
    },
  })
  if (!quiz) {
    Utils.sendError(res, {
      status: "error",
      message: "quiz not found",
    })
    return
  }
  const correctAnswer = quiz.correct_answer === answer
  if (!correctAnswer) {
    Utils.sendError(res, {
      status: "error",
      message: "Answer is incorrect",
    })
    return
  }
  return Utils.sendSuccess(res, {
    data: {
      quiz_id,
      question: quiz.question,
      correct_answer: quiz.correct_answer,
    },
  })
}
