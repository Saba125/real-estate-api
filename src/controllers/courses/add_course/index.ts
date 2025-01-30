import { Request, Response } from "express"
import Utils from "../../../utils/index"
import prisma from "../../../db/index"
import courseSchema from "../schema"
import { User } from "@prisma/client"
export default async function add_course(req: Request, res: Response) {
  const { error } = courseSchema.validate(req.body)
  const user: any = req.user
  if (error) {
    Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
    return
  }
  const course = await prisma.course.create({
    data: {
      ...req.body,
      user_id: user.id,
    },
  })
  return Utils.sendSuccess(res, {
    course,
  })
}
