import { Request, Response } from "express"
import Utils from "../../../utils/index"
import prisma from "../../../db/index"
import courseSchema from "../schema"
export default async function edit_course(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const { title, description, price, category } = req.body
  const course = await prisma.course.update({
    where: { id },
    data: {
      title,
      description,
      price,
      category,
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
    course,
  })
}
